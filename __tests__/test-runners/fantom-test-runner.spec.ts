import { soulSwapFantomProviderSpec } from '__tests__/unit-tests/features/swap/dexes/fantom/soul-swap/soul-swap';
import { spookySwapFantomProviderSpec } from '__tests__/unit-tests/features/swap/dexes/fantom/spooky-swap/spooky-swap';
import { spiritSwapFantomProviderSpec } from '__tests__/unit-tests/features/swap/dexes/fantom/spirit-swap/spirit-swap';
import { sushiSwapFantomProviderSpec } from '__tests__/unit-tests/features/swap/dexes/fantom/sushi-swap/sushi-swap';

describe('Fantom tests', () => {
    soulSwapFantomProviderSpec();
    spiritSwapFantomProviderSpec();
    spookySwapFantomProviderSpec();
    sushiSwapFantomProviderSpec();
});
