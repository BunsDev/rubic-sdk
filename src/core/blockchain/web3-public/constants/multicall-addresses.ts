import { BLOCKCHAIN_NAME, BlockchainName } from '@rsdk-core/blockchain/models/blockchain-name';

export const MULTICALL_ADDRESSES: Record<BlockchainName, string> = {
    [BLOCKCHAIN_NAME.ETHEREUM]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
    [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: '0x15dc8b5ed578AA7a019dd0139B330cfD625cA795',
    [BLOCKCHAIN_NAME.POLYGON]: '0x176730799C812d70C6608F51aEa6C7e5cdA7eA50',
    [BLOCKCHAIN_NAME.AVALANCHE]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
    [BLOCKCHAIN_NAME.MOONRIVER]: '0x270f2F35bED92B7A59eA5F08F6B3fd34c8D9D9b5',
    [BLOCKCHAIN_NAME.FANTOM]: '0x22D4cF72C45F8198CfbF4B568dBdB5A85e8DC0B5',
    [BLOCKCHAIN_NAME.HARMONY]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
    [BLOCKCHAIN_NAME.ARBITRUM]: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
    [BLOCKCHAIN_NAME.AURORA]: '0xe0e3887b158F7F9c80c835a61ED809389BC08d1b',
    [BLOCKCHAIN_NAME.TELOS]: '0x53dC7535028e2fcaCa0d847AD108b9240C0801b1',
    [BLOCKCHAIN_NAME.SOLANA]: '@TODO',
    [BLOCKCHAIN_NAME.NEAR]: '@TODO',
    [BLOCKCHAIN_NAME.OPTIMISM]: '0xeAa6877139d436Dc6d1f75F3aF15B74662617B2C',
    [BLOCKCHAIN_NAME.CRONOS]: '0x5e954f5972EC6BFc7dECd75779F10d848230345F',
    [BLOCKCHAIN_NAME.OKE_X_CHAIN]: '0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3',
    [BLOCKCHAIN_NAME.GNOSIS]: '0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287',
    [BLOCKCHAIN_NAME.FUSE]: '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F',
    [BLOCKCHAIN_NAME.MOONBEAM]: '0x6477204E12A7236b9619385ea453F370aD897bb2',
    [BLOCKCHAIN_NAME.CELO]: '0x9aac9048fC8139667D6a2597B902865bfdc225d3'
};
