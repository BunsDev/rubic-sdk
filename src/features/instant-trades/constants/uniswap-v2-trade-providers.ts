import { UniSwapV2EthereumProvider } from 'src/features/instant-trades/dexes/ethereum/uni-swap-v2-ethereum/uni-swap-v2-ethereum-provider';
import { SushiSwapEthereumProvider } from 'src/features/instant-trades/dexes/ethereum/sushi-swap-ethereum/sushi-swap-ethereum-provider';
import { PancakeSwapProvider } from 'src/features/instant-trades/dexes/bsc/pancake-swap/pancake-swap-provider';
import { SushiSwapBscProvider } from 'src/features/instant-trades/dexes/bsc/sushi-swap-bsc/sushi-swap-bsc-provider';
import { QuickSwapProvider } from 'src/features/instant-trades/dexes/polygon/quick-swap/quick-swap-provider';
import { SushiSwapPolygonProvider } from 'src/features/instant-trades/dexes/polygon/sushi-swap-polygon/sushi-swap-polygon-provider';
import { JoeProvider } from 'src/features/instant-trades/dexes/avalanche/joe/joe-provider';
import { PangolinProvider } from 'src/features/instant-trades/dexes/avalanche/pangolin/pangolin-provider';
import { SushiSwapAvalancheProvider } from 'src/features/instant-trades/dexes/avalanche/sushi-swap-avalanche/sushi-swap-avalanche-provider';
import { SolarbeamProvider } from 'src/features/instant-trades/dexes/moonriver/solarbeam/solarbeam-provider';
import { SushiSwapMoonriverProvider } from 'src/features/instant-trades/dexes/moonriver/sushi-swap-moonriver/sushi-swap-moonriver-provider';
import { SpiritSwapProvider } from 'src/features/instant-trades/dexes/fantom/spirit-swap/spirit-swap-provider';
import { SpookySwapProvider } from 'src/features/instant-trades/dexes/fantom/spooky-swap/spooky-swap-provider';
import { SushiSwapFantomProvider } from 'src/features/instant-trades/dexes/fantom/sushi-swap-fantom/sushi-swap-fantom-provider';
import { SushiSwapHarmonyProvider } from 'src/features/instant-trades/dexes/harmony/sushi-swap-harmony/sushi-swap-harmony-provider';
import { ViperSwapHarmonyProvider } from 'src/features/instant-trades/dexes/harmony/viper-swap-harmony/viper-swap-harmony-provider';
import { SushiSwapArbitrumProvider } from 'src/features/instant-trades/dexes/arbitrum/sushi-swap-arbitrum/sushi-swap-arbitrum-provider';
import { UniSwapV3ArbitrumProvider } from 'src/features/instant-trades/dexes/arbitrum/uni-swap-v3-arbitrum/uni-swap-v3-arbitrum-provider';
import { TrisolarisAuroraProvider } from 'src/features/instant-trades/dexes/aurora/trisolaris-aurora/trisolaris-aurora-provider';
import { WannaSwapAuroraProvider } from 'src/features/instant-trades/dexes/aurora/wanna-swap-aurora/wanna-swap-aurora-provider';
import { SushiSwapTelosProvider } from 'src/features/instant-trades/dexes/telos/sushi-swap-telos/sushi-swap-telos-provider';
import { ZappyProvider } from 'src/features/instant-trades/dexes/telos/zappy/trisolaris-aurora-provider';

export const UniswapV2TradeProviders = [
    // ethereum
    UniSwapV2EthereumProvider,
    SushiSwapEthereumProvider,
    // bsc
    PancakeSwapProvider,
    SushiSwapBscProvider,
    // polygon
    QuickSwapProvider,
    SushiSwapPolygonProvider,
    // avalanche
    JoeProvider,
    PangolinProvider,
    SushiSwapAvalancheProvider,
    // moonriver
    SolarbeamProvider,
    SushiSwapMoonriverProvider,
    // fantom
    SpiritSwapProvider,
    SpookySwapProvider,
    SushiSwapFantomProvider,
    // harmony
    SushiSwapHarmonyProvider,
    ViperSwapHarmonyProvider,
    // arbitrum
    SushiSwapArbitrumProvider,
    UniSwapV3ArbitrumProvider,
    // aurora
    TrisolarisAuroraProvider,
    WannaSwapAuroraProvider,
    // telos
    SushiSwapTelosProvider,
    ZappyProvider
] as const;
