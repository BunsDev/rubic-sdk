import { JOE_CONTRACT_ADDRESS } from 'src/features/instant-trades/dexes/avalanche/joe/constants';
import { AVAX_ABI } from 'src/features/instant-trades/dexes/avalanche/avax-abi';
import { AVALANCHE_SWAP_METHOD } from 'src/features/instant-trades/dexes/avalanche/swap-methods';
import {
    UniswapV2AbstractTrade,
    UniswapV2TradeStruct
} from 'src/features/instant-trades/dexes/common/uniswap-v2-abstract/uniswap-v2-abstract-trade';
import { TRADE_TYPE, TradeType } from 'src/features';

export class JoeTrade extends UniswapV2AbstractTrade {
    public static readonly contractAbi = AVAX_ABI;

    public static readonly swapMethods = AVALANCHE_SWAP_METHOD;

    public static get type(): TradeType {
        return TRADE_TYPE.JOE;
    }

    protected contractAddress = JOE_CONTRACT_ADDRESS;

    constructor(tradeStruct: UniswapV2TradeStruct) {
        super(tradeStruct);
    }
}
