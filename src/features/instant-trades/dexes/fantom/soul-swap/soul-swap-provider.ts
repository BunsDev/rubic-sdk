import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';
import { UniswapV2AbstractProvider } from '@features/instant-trades/dexes/common/uniswap-v2-abstract/uniswap-v2-abstract-provider';
import { SOUL_SWAP_PROVIDER_CONFIGURATION } from '@features/instant-trades/dexes/fantom/soul-swap/constants';
import { SoulSwapTrade } from '@features/instant-trades/dexes/fantom/soul-swap/soul-swap-trade';

export class SoulSwapProvider extends UniswapV2AbstractProvider<SoulSwapTrade> {
    public readonly blockchain = BLOCKCHAIN_NAME.FANTOM;

    public readonly InstantTradeClass = SoulSwapTrade;

    public readonly providerSettings = SOUL_SWAP_PROVIDER_CONFIGURATION;
}
