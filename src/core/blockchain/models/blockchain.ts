import { BlockchainName } from 'src/core/blockchain/models/blockchain-name';
import { Token } from 'src/core/blockchain/tokens/token';

/**
 * Stores information about blockchain.
 */
export interface Blockchain {
    id: number;
    name: BlockchainName;
    nativeCoin: Token;
}
