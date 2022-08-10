import { CrossChainTradeType } from 'src/features';
import { CrossChainOptions } from 'src/features/cross-chain/models/cross-chain-options';

export interface SwapManagerCrossChainCalculationOptions extends CrossChainOptions {
    /**
     * Timeout for each cross chain provider. Calculation for provider is cancelled, after timeout is passed.
     */
    readonly timeout?: number;

    /**
     * An array of disabled cross chain providers.
     */
    readonly disabledProviders?: CrossChainTradeType[];
}
