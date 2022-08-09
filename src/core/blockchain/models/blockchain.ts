import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';
import { Token } from '@core/blockchain/tokens/token';

export interface Blockchain {
    id: number;
    name: BLOCKCHAIN_NAME;
    nativeCoin: Token;
}
