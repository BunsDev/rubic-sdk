import { RubicSdkError } from '@common/errors/rubic-sdk.error';
import { notNull } from '@common/utils/object';
import { combineOptions } from '@common/utils/options';
import pTimeout from '@common/utils/p-timeout';
import { Mutable } from '@common/utils/types/mutable';
import { BLOCKCHAIN_NAME } from '@core/blockchain/models/BLOCKCHAIN_NAME';
import { PriceToken } from '@core/blockchain/tokens/price-token';
import { PriceTokenAmount } from '@core/blockchain/tokens/price-token-amount';
import { Token } from '@core/blockchain/tokens/token';
import { InstantTradeProvider } from '@features/swap/instant-trade-provider';
import { SwapManagerCalculationOptions } from '@features/swap/models/swap-manager-calculation-options';
import { TradeType } from '@features/swap/models/trade-type';
import { TypedTradeProviders } from '@features/swap/models/typed-trade-provider';
import { InstantTrade } from 'src/features';
import { MarkRequired } from 'ts-essentials';
import { getPriceTokensFromInputTokens } from '@common/utils/tokens';
import { uniswapV2TradeProviders } from '@features/swap/constants/uniswap-v2-trade-providers';
import { uniswapV3TradeProviders } from '@features/swap/constants/uniswap-v3-trade-providers';
import { oneInchTradeProviders } from '@features/swap/constants/one-inch-trade-providers';
import { zeroXTradeProviders } from '@features/swap/constants/zero-x-trade-providers';

type RequiredSwapManagerCalculationOptions = MarkRequired<
    SwapManagerCalculationOptions,
    'timeout' | 'disabledProviders'
>;

export class InstantTradesManager {
    public static readonly defaultCalculationTimeout = 3000;

    private readonly uniswapV2TradeProviders = uniswapV2TradeProviders;

    private readonly uniswapV3TradeProviders = uniswapV3TradeProviders;

    private oneInchTradeProviders = oneInchTradeProviders;

    private zrxTradeProviders = zeroXTradeProviders;

    private tradeProviders: TypedTradeProviders = [
        ...this.uniswapV2TradeProviders,
        ...this.uniswapV3TradeProviders,
        ...this.oneInchTradeProviders,
        ...this.zrxTradeProviders
    ].reduce((acc, ProviderClass) => {
        const provider = new ProviderClass();
        acc[provider.type] = provider;
        return acc;
    }, {} as Mutable<TypedTradeProviders>);

    public readonly blockchainTradeProviders: Readonly<
        Record<BLOCKCHAIN_NAME, Partial<TypedTradeProviders>>
    > = Object.entries(this.tradeProviders).reduce(
        (acc, [type, provider]) => ({
            ...acc,
            [provider.blockchain]: { ...acc[provider.blockchain], [type]: provider }
        }),
        {} as Record<BLOCKCHAIN_NAME, Partial<TypedTradeProviders>>
    );

    public async calculateTrade(
        fromToken:
            | Token
            | {
                  address: string;
                  blockchain: BLOCKCHAIN_NAME;
              },
        fromAmount: string | number,
        toToken: Token | string,
        options?: SwapManagerCalculationOptions
    ): Promise<InstantTrade[]> {
        if (toToken instanceof Token && fromToken.blockchain !== toToken.blockchain) {
            throw new RubicSdkError('Blockchains of from and to tokens must be same.');
        }

        const { from, to } = await getPriceTokensFromInputTokens(
            fromToken,
            fromAmount.toString(),
            toToken
        );

        return this.calculateTradeFromTokens(from, to, this.getFullOptions(options));
    }

    private getFullOptions(
        options?: SwapManagerCalculationOptions
    ): RequiredSwapManagerCalculationOptions {
        return combineOptions(options, {
            timeout: InstantTradesManager.defaultCalculationTimeout,
            disabledProviders: [] as TradeType[]
        });
    }

    private async calculateTradeFromTokens(
        from: PriceTokenAmount,
        to: PriceToken,
        options: RequiredSwapManagerCalculationOptions
    ): Promise<InstantTrade[]> {
        const { timeout, disabledProviders, ...providersOptions } = options;
        const providers = Object.entries(this.blockchainTradeProviders[from.blockchain]).filter(
            ([type]) => !disabledProviders.includes(type as TradeType)
        ) as [TradeType, InstantTradeProvider][];

        if (!providers.length) {
            throw new RubicSdkError(`There are no providers for ${from.blockchain} blockchain`);
        }

        const calculationPromises = providers.map(async ([type, provider]) => {
            try {
                return await pTimeout(provider.calculate(from, to, providersOptions), timeout);
            } catch (e) {
                console.debug(
                    `[RUBIC_SDK] Trade calculation error occurred for ${type} trade provider.`,
                    e
                );
                return null;
            }
        });

        const results = await Promise.all(calculationPromises);
        return results.filter(notNull);
    }
}
