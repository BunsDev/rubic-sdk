import { BlockchainName } from 'src/core/blockchain/models/blockchain-name';
import { PriceToken } from 'src/core/blockchain/tokens/price-token';
import { PriceTokenAmount } from 'src/core/blockchain/tokens/price-token-amount';
import { InstantTrade } from 'src/features/instant-trades/instant-trade';
import { SwapCalculationOptions } from 'src/features/instant-trades/models/swap-calculation-options';
import { Web3Public } from 'src/core/blockchain/web3-public/web3-public';
import { Injector } from 'src/core/sdk/injector';
import { GasPriceInfo } from 'src/features/instant-trades/models/gas-price-info';
import { Web3Pure } from 'src/core/blockchain/web3-pure/web3-pure';
import BigNumber from 'bignumber.js';
import { GasFeeInfo } from 'src/features/instant-trades/models/gas-fee-info';
import { TradeType } from 'src/features';

/**
 * Abstract class for all instant trade providers.
 */
export abstract class InstantTradeProvider {
    /**
     * Provider blockchain.
     */
    public abstract readonly blockchain: BlockchainName;

    protected abstract readonly gasMargin: number;

    /**
     * Type of provider.
     */
    public abstract get type(): TradeType;

    protected get web3Public(): Web3Public {
        return Injector.web3PublicService.getWeb3Public(this.blockchain);
    }
    /**
     * Calculates instant trade.
     * @param from Token to sell with input amount.
     * @param to Token to get.
     * @param options Additional options.
     */
    public abstract calculate(
        from: PriceTokenAmount,
        to: PriceToken,
        options?: SwapCalculationOptions
    ): Promise<InstantTrade>;

    protected async getGasPriceInfo(): Promise<GasPriceInfo> {
        const [gasPrice, nativeCoinPrice] = await Promise.all([
            Injector.gasPriceApi.getGasPrice(this.blockchain),
            Injector.coingeckoApi.getNativeCoinPrice(this.blockchain)
        ]);
        const gasPriceInEth = Web3Pure.fromWei(gasPrice);
        const gasPriceInUsd = gasPriceInEth.multipliedBy(nativeCoinPrice);
        return {
            gasPrice: new BigNumber(gasPrice),
            gasPriceInEth,
            gasPriceInUsd
        };
    }

    protected getGasFeeInfo(
        estimatedGas: BigNumber | string | number | undefined,
        gasPriceInfo: GasPriceInfo | undefined
    ): GasFeeInfo {
        const gasLimit = estimatedGas
            ? Web3Pure.calculateGasMargin(estimatedGas, this.gasMargin)
            : undefined;

        if (!gasLimit) {
            return { gasPrice: gasPriceInfo?.gasPrice };
        }
        const gasFeeInEth = gasPriceInfo?.gasPriceInEth?.multipliedBy(gasLimit);
        const gasFeeInUsd = gasPriceInfo?.gasPriceInUsd?.multipliedBy(gasLimit);

        return {
            gasLimit,
            gasPrice: gasPriceInfo?.gasPrice,
            gasFeeInEth,
            gasFeeInUsd
        };
    }
}
