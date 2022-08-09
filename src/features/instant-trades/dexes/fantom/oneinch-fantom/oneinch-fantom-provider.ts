import { OneinchAbstractProvider } from 'src/features/instant-trades/dexes/common/oneinch-common/oneinch-abstract-provider';
import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';

export class OneinchFantomProvider extends OneinchAbstractProvider {
    public readonly blockchain = BLOCKCHAIN_NAME.FANTOM;
}
