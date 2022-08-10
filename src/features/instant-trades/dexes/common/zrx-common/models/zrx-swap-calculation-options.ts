import { SwapCalculationOptions } from 'src/features/instant-trades/models/swap-calculation-options';

export interface ZrxSwapCalculationOptions
    extends Omit<SwapCalculationOptions, 'disableMultihops' | 'deadlineMinutes'> {
    readonly affiliateAddress?: string | null;
}
