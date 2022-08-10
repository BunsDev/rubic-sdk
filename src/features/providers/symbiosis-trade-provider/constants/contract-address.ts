import { SymbiosisCrossChainSupportedBlockchain } from 'src/features/cross-chain/providers/symbiosis-trade-provider/constants/symbiosis-cross-chain-supported-blockchain';
import { BLOCKCHAIN_NAME } from 'src/core';
import { UniversalContract } from '../../common/models/universal-contract';

export const SYMBIOSIS_CONTRACT_ADDRESS: Record<
    SymbiosisCrossChainSupportedBlockchain,
    UniversalContract
> = {
    [BLOCKCHAIN_NAME.ETHEREUM]: {
        providerRouter: '0xB9E13785127BFfCc3dc970A55F6c7bF0844a3C15',
        providerGateway: '0x03B7551EB0162c838a10c2437b60D1f5455b9554',
        rubicRouter: '0x3332241a5a4eCb4c28239A9731ad45De7f000333'
    },
    [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
        providerRouter: '0x8D602356c7A6220CDE24BDfB4AB63EBFcb0a9b5d',
        providerGateway: '0xe2faC824615538C3A9ae704c75582cD1AbdD7cdf',
        rubicRouter: '0x3332241a5a4eCb4c28239A9731ad45De7f000333'
    },
    [BLOCKCHAIN_NAME.POLYGON]: {
        providerRouter: '0x733D33FA01424F83E9C095af3Ece80Ed6fa565F1',
        providerGateway: '0xF3273BD35e4Ad4fcd49DabDee33582b41Cbb9d77',
        rubicRouter: '0x3332241a5a4eCb4c28239A9731ad45De7f000333'
    },
    [BLOCKCHAIN_NAME.AVALANCHE]: {
        providerRouter: '0xE5E68630B5B759e6C701B70892AA8324b71e6e20',
        providerGateway: '0x25821A21C2E3455967229cADCA9b6fdd4A80a40b',
        rubicRouter: '0x3332241a5a4eCb4c28239A9731ad45De7f000333'
    }
};
