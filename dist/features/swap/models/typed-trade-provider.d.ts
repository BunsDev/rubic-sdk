import { InstantTradeProvider } from '@features/swap/instant-trade-provider';
import { TradeType } from '@features/swap/models/trade-type';
export declare type TypedTradeProviders = Readonly<Record<TradeType, InstantTradeProvider>>;