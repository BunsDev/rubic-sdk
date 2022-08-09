import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';
import { SUSHI_SWAP_BSC_PROVIDER_CONFIGURATION } from '@features/instant-trades/dexes/bsc/sushi-swap-bsc/constants';
import { UniswapV2AbstractProvider } from '@features/instant-trades/dexes/common/uniswap-v2-abstract/uniswap-v2-abstract-provider';
import { SushiSwapBscTrade } from '@features/instant-trades/dexes/bsc/sushi-swap-bsc/sushi-swap-bsc-trade';

export class SushiSwapBscProvider extends UniswapV2AbstractProvider<SushiSwapBscTrade> {
    public readonly blockchain = BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN;

    public readonly InstantTradeClass = SushiSwapBscTrade;

    public readonly providerSettings = SUSHI_SWAP_BSC_PROVIDER_CONFIGURATION;
}
