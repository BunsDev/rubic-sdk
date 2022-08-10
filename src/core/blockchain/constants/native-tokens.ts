import { NATIVE_TOKEN_ADDRESS } from 'src/core/blockchain/constants/native-token-address';
import { BLOCKCHAIN_NAME, BlockchainName } from 'src/core/blockchain/models/blockchain-name';
import { TokenStruct } from 'src/core/blockchain/tokens/token';

export type NativeTokensList = Record<BlockchainName, Omit<TokenStruct, 'blockchain'>>;

export const nativeTokensList: NativeTokensList = {
    [BLOCKCHAIN_NAME.ETHEREUM]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.POLYGON]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'Matic Network',
        symbol: 'MATIC',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.AVALANCHE]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'AVAX',
        symbol: 'AVAX',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.MOONRIVER]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'MOVR',
        symbol: 'MOVR',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.FANTOM]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'FTM',
        symbol: 'FTM',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.HARMONY]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'ONE',
        symbol: 'ONE',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.ARBITRUM]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'AETH',
        symbol: 'AETH',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.AURORA]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'aETH',
        symbol: 'aETH',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.TELOS]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'TLOS',
        symbol: 'TLOS',
        decimals: 24
    },
    [BLOCKCHAIN_NAME.SOLANA]: {
        address: '@TODO SOLANA',
        name: 'Solana',
        symbol: 'SOL',
        decimals: 24
    },
    [BLOCKCHAIN_NAME.NEAR]: {
        address: '@TODO NEAR',
        name: 'NEAR',
        symbol: 'NEAR',
        decimals: 24
    },
    [BLOCKCHAIN_NAME.OPTIMISM]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.CRONOS]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'CRO',
        symbol: 'CRO',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.OKE_X_CHAIN]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'OKT',
        symbol: 'OKT',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.GNOSIS]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'xDAI',
        symbol: 'xDAI',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.FUSE]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'FUSE',
        symbol: 'FUSE',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.MOONBEAM]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'GLMR',
        symbol: 'GLMR',
        decimals: 18
    },
    [BLOCKCHAIN_NAME.CELO]: {
        address: NATIVE_TOKEN_ADDRESS,
        name: 'CELO',
        symbol: 'CELO',
        decimals: 18
    }
};