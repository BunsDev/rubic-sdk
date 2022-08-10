import { PriceToken } from 'src/core';
import { UniswapV3AlgebraRoute } from 'src/features/instant-trades/dexes/common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-route';
import { Exact } from 'src/features/instant-trades/models/exact';

export interface UniswapV3AlgebraQuoterController {
    /**
     * Returns all routes between given tokens with output amount.
     * @param from From token.
     * @param to To token.
     * @param exact Is exact input or output trade.
     * @param weiAmount Amount of tokens to trade.
     * @param routeMaxTransitTokens Max amount of transit tokens.
     */
    getAllRoutes(
        from: PriceToken,
        to: PriceToken,
        exact: Exact,
        weiAmount: string,
        routeMaxTransitTokens: number
    ): Promise<UniswapV3AlgebraRoute[]>;
}
