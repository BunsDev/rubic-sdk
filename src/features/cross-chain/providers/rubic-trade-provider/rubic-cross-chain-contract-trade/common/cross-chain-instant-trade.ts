import { DestinationCelerSwapInfo } from 'src/features/cross-chain/providers/celer-trade-provider/celer-cross-chain-contract-trade/models/destination-celer-swap-info';
import { SourceCelerSwapInfo } from 'src/features/cross-chain/providers/celer-trade-provider/celer-cross-chain-contract-trade/models/source-celer-swap-info';

export interface CrossChainInstantTrade {
    readonly defaultDeadline: number;

    getFirstPath(): string[] | string;

    getSecondPath(): string[];

    modifyArgumentsForProvider(
        methodArguments: unknown[][],
        walletAddress: string,
        swapTokenWithFee?: boolean
    ): Promise<void>;

    getCelerSourceObject(): SourceCelerSwapInfo;

    getCelerDestinationObject(
        integratorAddress: string,
        receiverAddress: string
    ): DestinationCelerSwapInfo;
}
