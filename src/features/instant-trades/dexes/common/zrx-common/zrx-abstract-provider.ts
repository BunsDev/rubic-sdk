import { InstantTradeProvider } from 'src/features/instant-trades/instant-trade-provider';
import { PriceTokenAmount } from 'src/core/blockchain/tokens/price-token-amount';
import { SwapCalculationOptions } from 'src/features/instant-trades/models/swap-calculation-options';
import { PriceToken } from 'src/core/blockchain/tokens/price-token';
import { createTokenNativeAddressProxy } from 'src/features/instant-trades/dexes/common/utils/token-native-address-proxy';
import { zrxApiParams } from 'src/features/instant-trades/dexes/common/zrx-common/constants';
import { ZrxQuoteRequest } from 'src/features/instant-trades/dexes/common/zrx-common/models/zrx-quote-request';
import { Injector } from 'src/core/sdk/injector';
import { ZrxQuoteResponse } from 'src/features/instant-trades/dexes/common/zrx-common/models/zrx-types';
import { getZrxApiBaseUrl } from 'src/features/instant-trades/dexes/common/zrx-common/utils';
import { ZrxSwapCalculationOptions } from 'src/features/instant-trades/dexes/common/zrx-common/models/zrx-swap-calculation-options';
import BigNumber from 'bignumber.js';
import { ZrxTrade } from 'src/features/instant-trades/dexes/common/zrx-common/zrx-trade';
import { Cache } from 'src/common';
import { EMPTY_ADDRESS } from 'src/core/blockchain/constants/empty-address';
import { TRADE_TYPE, TradeType } from 'src/features';

export abstract class ZrxAbstractProvider extends InstantTradeProvider {
    protected readonly gasMargin = 1.4;

    private readonly defaultOptions: Required<ZrxSwapCalculationOptions> = {
        gasCalculation: 'calculate',
        slippageTolerance: 0.02,
        affiliateAddress: null,
        wrappedAddress: EMPTY_ADDRESS,
        fromAddress: ''
    };

    public get type(): TradeType {
        return TRADE_TYPE.ZRX;
    }

    @Cache
    private get apiBaseUrl(): string {
        return getZrxApiBaseUrl(this.blockchain);
    }

    public async calculate(
        from: PriceTokenAmount,
        to: PriceToken,
        options?: SwapCalculationOptions
    ): Promise<ZrxTrade> {
        const fullOptions = { ...this.defaultOptions, options };

        const fromClone = createTokenNativeAddressProxy(from, zrxApiParams.nativeTokenAddress);
        const toClone = createTokenNativeAddressProxy(to, zrxApiParams.nativeTokenAddress);

        const quoteParams: ZrxQuoteRequest = {
            params: {
                sellToken: fromClone.address,
                buyToken: toClone.address,
                sellAmount: fromClone.stringWeiAmount,
                slippagePercentage: fullOptions.slippageTolerance.toString(),
                affiliateAddress: fullOptions.affiliateAddress || undefined
            }
        };

        const apiTradeData = await this.getTradeData(quoteParams);

        const tradeStruct = {
            from,
            to: new PriceTokenAmount({
                ...to.asStruct,
                weiAmount: new BigNumber(apiTradeData.buyAmount)
            }),
            slippageTolerance: fullOptions.slippageTolerance,
            apiTradeData,
            path: [from, to]
        };
        if (fullOptions.gasCalculation === 'disabled') {
            return new ZrxTrade(tradeStruct);
        }

        const gasPriceInfo = await this.getGasPriceInfo();
        const gasFeeInfo = await this.getGasFeeInfo(apiTradeData.gas, gasPriceInfo);

        return new ZrxTrade({
            ...tradeStruct,
            gasFeeInfo
        });
    }

    /**
     * Fetches zrx data from api.
     */
    private getTradeData(params: ZrxQuoteRequest): Promise<ZrxQuoteResponse> {
        return Injector.httpClient.get<ZrxQuoteResponse>(`${this.apiBaseUrl}swap/v1/quote`, params);
    }
}