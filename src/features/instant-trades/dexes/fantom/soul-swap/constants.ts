import { UniswapV2ProviderConfiguration } from 'src/features/instant-trades/dexes/common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration';
import { defaultFantomProviderConfiguration } from 'src/features/instant-trades/dexes/fantom/default-constants';

export const SOUL_SWAP_CONTRACT_ADDRESS = '0x6b3d631B87FE27aF29efeC61d2ab8CE4d621cCBF'; // SoulSwapRouter

const routingProvidersAddresses = [
    '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // wFTM
    '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e', // DAI
    '0x04068da6c83afcfa0e13ba15a6696662335d5b75', // USDC
    '0x049d68029688eAbF473097a2fC38ef61633A3C7A', // fUSDT
    '0x321162Cd933E2Be498Cd2267a90534A804051b11', // wBTC
    '0x74b23882a30290451a17c44f4f05243b6b58c76d', // wETH
    '0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07', // SOUL
    '0x6671E20b83Ba463F270c8c75dAe57e3Cc246cB2b', // LUX
    '0xEFFd4874AcA3Acd19a24dF3281b5cdAdD823801A' // SOR
];

export const SOUL_SWAP_PROVIDER_CONFIGURATION: UniswapV2ProviderConfiguration = {
    ...defaultFantomProviderConfiguration,
    routingProvidersAddresses
};
