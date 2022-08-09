import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';

export interface TokenBaseStruct {
    address: string;
    blockchain: BLOCKCHAIN_NAME;
}
