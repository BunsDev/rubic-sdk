import { BlockchainsInfo } from 'src/core/blockchain/blockchains-info';
import { BlockchainName } from 'src/core/blockchain/models/blockchain-name';
import { oneinchApiParams } from 'src/features/instant-trades/dexes/common/oneinch-common/constants';

export function getOneinchApiBaseUrl(blockchain: BlockchainName): string {
    const blockchainId = BlockchainsInfo.getBlockchainByName(blockchain).id;
    return `${oneinchApiParams.apiBaseUrl}/${blockchainId}`;
}
