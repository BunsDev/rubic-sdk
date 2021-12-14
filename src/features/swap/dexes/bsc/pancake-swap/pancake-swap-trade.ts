import { PANCAKE_SWAP_CONTRACT_ADDRESS } from '@features/swap/dexes/bsc/pancake-swap/constants';
import {
    UniswapV2AbstractTrade,
    UniswapV2TradeStruct
} from '@features/swap/dexes/common/uniswap-v2-abstract/uniswap-v2-abstract-trade';

export class PancakeSwapTrade extends UniswapV2AbstractTrade {
    protected readonly contractAddress = PANCAKE_SWAP_CONTRACT_ADDRESS;

    constructor(tradeStruct: UniswapV2TradeStruct) {
        super(tradeStruct);
    }
}
