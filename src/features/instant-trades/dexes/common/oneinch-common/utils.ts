import { BlockchainsInfo } from '@core/blockchain/blockchains-info';
import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';
import { oneinchApiParams } from '@features/instant-trades/dexes/common/oneinch-common/constants';

export function getOneinchApiBaseUrl(blockchain: BLOCKCHAIN_NAME): string {
    const blockchainId = BlockchainsInfo.getBlockchainByName(blockchain).id;
    return `${oneinchApiParams.apiBaseUrl}/${blockchainId}`;
}
