import { RubicCrossChainContractData } from 'src/features/cross-chain/providers/rubic-trade-provider/rubic-cross-chain-contract-trade/common/rubic-cross-chain-contract-data';
import {
    RubicCrossChainSupportedBlockchain,
    rubicCrossChainSupportedBlockchains
} from 'src/features/cross-chain/providers/rubic-trade-provider/constants/rubic-cross-chain-supported-blockchains';
import { crossChainTradeProvidersData } from 'src/features/cross-chain/constants/cross-chain-trade-providers-data';
import { rubicCrossChainContractsAddresses } from 'src/features/cross-chain/providers/rubic-trade-provider/constants/rubic-cross-chain-contracts-addresses';
import { RubicSdkError } from 'src/common';

const rubicCrossChainContracts: Record<
    RubicCrossChainSupportedBlockchain,
    RubicCrossChainContractData | null
> = rubicCrossChainSupportedBlockchains.reduce(
    (acc, blockchain) => ({ ...acc, [blockchain]: null }),
    {} as Record<RubicCrossChainSupportedBlockchain, RubicCrossChainContractData | null>
);

export function getRubicCrossChainContract(
    blockchain: RubicCrossChainSupportedBlockchain
): RubicCrossChainContractData {
    const storedContract = rubicCrossChainContracts[blockchain];
    if (storedContract) {
        return storedContract;
    }

    const pureProvidersData = crossChainTradeProvidersData[blockchain];
    if (!pureProvidersData) {
        throw new RubicSdkError('Providers data has to be defined');
    }
    const contractAddress = rubicCrossChainContractsAddresses[blockchain];
    const providersData = pureProvidersData.map(providerData => ({
        // @ts-ignore Can't create instance of abstract class.
        provider: new providerData.ProviderClass(),
        methodSuffix: providerData.methodSuffix
    }));

    rubicCrossChainContracts[blockchain] = new RubicCrossChainContractData(
        blockchain,
        contractAddress,
        providersData
    );

    return rubicCrossChainContracts[blockchain]!;
}
