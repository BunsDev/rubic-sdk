import { TRADE_TYPE, TradeType } from 'src/features';
import { BLOCKCHAIN_NAME } from 'src/core';
import { AlgebraQuoterController } from 'src/features/instant-trades/dexes/polygon/algebra/utils/quoter-controller/algebra-quoter-controller';
import { UniswapV3AlgebraAbstractProvider } from 'src/features/instant-trades/dexes/common/uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-provider';
import { AlgebraTrade } from 'src/features/instant-trades/dexes/polygon/algebra/algebra-trade';
import { ALGEBRA_V3_PROVIDER_CONFIGURATION } from 'src/features/instant-trades/dexes/polygon/algebra/constants/provider-configuration';
import { UniswapV3AlgebraTradeStruct } from 'src/features/instant-trades/dexes/common/uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-trade';
import { AlgebraRoute } from 'src/features/instant-trades/dexes/polygon/algebra/models/algebra-route';
import {
    ALGEBRA_SWAP_ROUTER_CONTRACT_ABI,
    ALGEBRA_SWAP_ROUTER_CONTRACT_ADDRESS
} from 'src/features/instant-trades/dexes/polygon/algebra/constants/swap-router-contract-data';

export class AlgebraProvider extends UniswapV3AlgebraAbstractProvider<AlgebraTrade> {
    protected readonly contractAddress = ALGEBRA_SWAP_ROUTER_CONTRACT_ADDRESS;

    protected readonly contractAbi = ALGEBRA_SWAP_ROUTER_CONTRACT_ABI;

    public readonly blockchain = BLOCKCHAIN_NAME.POLYGON;

    protected readonly InstantTradeClass = AlgebraTrade;

    protected readonly quoterController = new AlgebraQuoterController();

    public readonly providerConfiguration = ALGEBRA_V3_PROVIDER_CONFIGURATION;

    public get type(): TradeType {
        return TRADE_TYPE.ALGEBRA;
    }

    protected createTradeInstance(
        tradeStruct: UniswapV3AlgebraTradeStruct,
        route: AlgebraRoute
    ): AlgebraTrade {
        return new AlgebraTrade({
            ...tradeStruct,
            route
        });
    }
}
