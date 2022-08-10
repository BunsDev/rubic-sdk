import { InstantTradeProvider } from 'src/features/instant-trades/instant-trade-provider';
import { PriceToken, Web3Pure } from 'src/core';
import { SwapCalculationOptions } from 'src/features';
import { combineOptions } from 'src/common/utils/options';
import { createTokenNativeAddressProxy } from 'src/features/instant-trades/dexes/common/utils/token-native-address-proxy';
import { GasPriceInfo } from 'src/features/instant-trades/models/gas-price-info';
import BigNumber from 'bignumber.js';
import {
    UniswapV3AlgebraCalculatedInfo,
    UniswapV3AlgebraCalculatedInfoWithProfit
} from 'src/features/instant-trades/dexes/common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-calculated-info';
import { InsufficientLiquidityError, RubicSdkError } from 'src/common';
import { UniswapV3AlgebraQuoterController } from 'src/features/instant-trades/dexes/common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-quoter-controller';
import { UniswapV3AlgebraProviderConfiguration } from 'src/features/instant-trades/dexes/common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-provider-configuration';
import { PriceTokenAmount } from 'src/core/blockchain/tokens/price-token-amount';
import {
    UniswapV3AlgebraAbstractTrade,
    UniswapV3AlgebraTradeStruct
} from 'src/features/instant-trades/dexes/common/uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-trade';
import { AlgebraTrade } from 'src/features/instant-trades/dexes/polygon/algebra/algebra-trade';
import { UniswapV3TradeClass } from 'src/features/instant-trades/dexes/common/uniswap-v3-abstract/models/uniswap-v3-trade-class';
import { UniswapV3AlgebraRoute } from 'src/features/instant-trades/dexes/common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-route';
import { Exact } from 'src/features/instant-trades/models/exact';
import { getFromToTokensAmountsByExact } from 'src/features/instant-trades/dexes/common/utils/get-from-to-tokens-amounts-by-exact';
import { EMPTY_ADDRESS } from 'src/core/blockchain/constants/empty-address';
import { AbiItem } from 'web3-utils';

export abstract class UniswapV3AlgebraAbstractProvider<
    T extends UniswapV3AlgebraAbstractTrade = UniswapV3AlgebraAbstractTrade
> extends InstantTradeProvider {
    protected abstract readonly contractAbi: AbiItem[];

    protected abstract readonly contractAddress: string;

    protected abstract readonly InstantTradeClass: UniswapV3TradeClass<T> | typeof AlgebraTrade;

    protected abstract readonly quoterController: UniswapV3AlgebraQuoterController;

    protected abstract readonly providerConfiguration: UniswapV3AlgebraProviderConfiguration;

    protected readonly isRubicOptimisationEnabled: boolean = true;

    protected readonly gasMargin = 1.2;

    protected readonly defaultOptions: Required<SwapCalculationOptions> = {
        gasCalculation: 'calculate',
        disableMultihops: false,
        deadlineMinutes: 20,
        slippageTolerance: 0.02,
        wrappedAddress: EMPTY_ADDRESS,
        fromAddress: ''
    };

    protected abstract createTradeInstance(
        tradeStruct: UniswapV3AlgebraTradeStruct,
        route: UniswapV3AlgebraRoute
    ): T;

    public async calculate(
        from: PriceTokenAmount,
        toToken: PriceToken,
        options?: SwapCalculationOptions
    ): Promise<T> {
        return this.calculateDifficultTrade(from, toToken, 'input', from.weiAmount, options);
    }

    /**
     * Calculates trade, based on amount, user wants to get.
     * @param fromToken Token to sell.
     * @param to Token to get with output amount.
     * @param options Additional options.
     */
    public async calculateExactOutput(
        fromToken: PriceToken,
        to: PriceTokenAmount,
        options?: SwapCalculationOptions
    ): Promise<T> {
        return this.calculateDifficultTrade(fromToken, to, 'output', to.weiAmount, options);
    }

    /**
     * Calculates input amount, based on amount, user wants to get.
     * @param fromToken Token to sell.
     * @param to Token to get with output amount.
     * @param options Additional options.
     */
    public async calculateExactOutputAmount(
        fromToken: PriceToken,
        to: PriceTokenAmount,
        options?: SwapCalculationOptions
    ): Promise<BigNumber> {
        return (await this.calculateExactOutput(fromToken, to, options)).from.tokenAmount;
    }

    private async calculateDifficultTrade(
        fromToken: PriceToken,
        toToken: PriceToken,
        exact: Exact,
        weiAmount: BigNumber,
        options?: SwapCalculationOptions
    ): Promise<T> {
        const fullOptions = combineOptions(options, this.defaultOptions);

        const fromClone = createTokenNativeAddressProxy(
            fromToken,
            this.providerConfiguration.wethAddress
        );
        const toClone = createTokenNativeAddressProxy(
            toToken,
            this.providerConfiguration.wethAddress
        );

        let gasPriceInfo: GasPriceInfo | undefined;
        if (fullOptions.gasCalculation !== 'disabled') {
            gasPriceInfo = await this.getGasPriceInfo();
        }

        const { route, estimatedGas } = await this.getRoute(
            fromClone,
            toClone,
            exact,
            weiAmount,
            fullOptions,
            gasPriceInfo?.gasPriceInUsd
        );

        const { from, to } = getFromToTokensAmountsByExact(
            fromToken,
            toToken,
            exact,
            weiAmount,
            route.outputAbsoluteAmount
        );

        const tradeStruct = {
            from,
            to,
            exact,
            slippageTolerance: fullOptions.slippageTolerance,
            deadlineMinutes: fullOptions.deadlineMinutes
        };
        if (fullOptions.gasCalculation === 'disabled') {
            return this.createTradeInstance(tradeStruct, route);
        }

        const gasFeeInfo = this.getGasFeeInfo(estimatedGas, gasPriceInfo!);
        return this.createTradeInstance(
            {
                ...tradeStruct,
                gasFeeInfo
            },
            route
        );
    }

    private async getRoute(
        from: PriceToken,
        to: PriceToken,
        exact: Exact,
        weiAmount: BigNumber,
        options: Required<SwapCalculationOptions>,
        gasPriceInUsd?: BigNumber
    ): Promise<UniswapV3AlgebraCalculatedInfo> {
        const routes = (
            await this.quoterController.getAllRoutes(
                from,
                to,
                exact,
                weiAmount.toFixed(0),
                options.disableMultihops ? 0 : this.providerConfiguration.maxTransitTokens
            )
        ).sort(
            (a, b) =>
                b.outputAbsoluteAmount.comparedTo(a.outputAbsoluteAmount) *
                (exact === 'input' ? 1 : -1)
        );

        if (routes.length === 0) {
            throw new InsufficientLiquidityError();
        }

        if (options.gasCalculation === 'disabled' && routes?.[0]) {
            return {
                route: routes[0]
            };
        }

        if (
            !this.isRubicOptimisationEnabled &&
            options.gasCalculation === 'rubicOptimisation' &&
            to.price?.isFinite() &&
            gasPriceInUsd
        ) {
            const estimatedGasLimits = await this.InstantTradeClass.estimateGasLimitForRoutes(
                from,
                to,
                exact,
                weiAmount,
                options,
                routes,
                this.contractAbi,
                this.contractAddress
            );

            const calculatedProfits: UniswapV3AlgebraCalculatedInfoWithProfit[] = routes.map(
                (route, index) => {
                    const estimatedGas = estimatedGasLimits[index];
                    if (!estimatedGas) {
                        throw new RubicSdkError('Estimated gas has have to be defined');
                    }
                    const gasFeeInUsd = gasPriceInUsd!.multipliedBy(estimatedGas);
                    const profit = Web3Pure.fromWei(route.outputAbsoluteAmount, to.decimals)
                        .multipliedBy(to.price)
                        .minus(gasFeeInUsd);

                    return {
                        route,
                        estimatedGas,
                        profit
                    };
                }
            );

            const sortedRoutes = calculatedProfits.sort((a, b) => b.profit.comparedTo(a.profit))[0];
            if (!sortedRoutes) {
                throw new RubicSdkError('Sorted routes have to be defined');
            }

            return sortedRoutes;
        }

        const route = routes[0];
        if (!route) {
            throw new RubicSdkError('Route has to be defined');
        }
        const estimatedGas = await this.InstantTradeClass.estimateGasLimitForRoute(
            from,
            to,
            exact,
            weiAmount,
            options,
            route,
            this.contractAbi,
            this.contractAddress
        );
        return {
            route,
            estimatedGas
        };
    }
}
