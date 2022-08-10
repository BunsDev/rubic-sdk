import {
    UniswapV2AbstractTrade,
    UniswapV2TradeStruct
} from 'src/features/instant-trades/dexes/common/uniswap-v2-abstract/uniswap-v2-abstract-trade';
import { SOUL_SWAP_CONTRACT_ADDRESS } from 'src/features/instant-trades/dexes/fantom/soul-swap/constants';
import { TRADE_TYPE, TradeType } from 'src/features';

export class SoulSwapTrade extends UniswapV2AbstractTrade {
    public static get type(): TradeType {
        return TRADE_TYPE.SOUL_SWAP;
    }

    protected readonly contractAddress = SOUL_SWAP_CONTRACT_ADDRESS;

    constructor(tradeStruct: UniswapV2TradeStruct) {
        super(tradeStruct);
    }
}
