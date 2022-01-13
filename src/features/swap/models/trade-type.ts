export const TRADE_TYPE = {
    UNISWAP_V2: 'UNISWAP_V2',
    SUSHI_SWAP_ETHEREUM: 'SUSHI_SWAP_ETHEREUM',
    PANCAKE_SWAP: 'PANCAKE_SWAP',
    SUSHI_SWAP_BSC: 'SUSHI_SWAP_BSC',
    QUICK_SWAP: 'QUICK_SWAP',
    SUSHI_SWAP_POLYGON: 'SUSHI_SWAP_POLYGON',
    JOE: 'JOE',
    PANGOLIN: 'PANGOLIN',
    SUSHI_SWAP_AVALANCHE: 'SUSHI_SWAP_AVALANCHE',
    SPIRIT_SWAP: 'SPIRIT_SWAP',
    SPOOKY_SWAP: 'SPOOKY_SWAP',
    SUSHI_SWAP_FANTOM: 'SUSHI_SWAP_FANTOM',
    SUSHI_SWAP_HARMONY: 'SUSHI_SWAP_HARMONY',
    SOLAR_BEAM: 'SOLAR_BEAM',
    SUSHI_SWAP_MOONRIVER: 'SUSHI_SWAP_MOONRIVER',
    UNI_SWAP_V3_ETHEREUM: 'UNI_SWAP_V3_ETHEREUM',
    UNI_SWAP_V3_POLYGON: 'UNI_SWAP_V3_POLYGON',
    ONE_INCH_ETHEREUM: 'ONE_INCH_ETHEREUM',
    ONE_INCH_BSC: 'ONE_INCH_BSC',
    ONE_INCH_POLYGON: 'ONE_INCH_POLYGON',
    ZRX_ETHEREUM: 'ZRX_ETHEREUM',
    ALGEBRA: 'ALGEBRA'
} as const;

export type TradeType = keyof typeof TRADE_TYPE;
