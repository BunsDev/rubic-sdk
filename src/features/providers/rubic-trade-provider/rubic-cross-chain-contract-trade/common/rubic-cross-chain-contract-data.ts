import { BlockchainName } from 'src/core/blockchain/models/blockchain-name';
import { Cache } from 'src/common/decorators/cache.decorator';
import { Token } from 'src/core/blockchain/tokens/token';
import { PriceTokenAmount } from 'src/core/blockchain/tokens/price-token-amount';
import BigNumber from 'bignumber.js';
import { BlockchainsInfo } from 'src/core/blockchain/blockchains-info';
import { rubicCrossChainContractAbi } from 'src/features/cross-chain/providers/rubic-trade-provider/constants/rubic-cross-chain-contract-abi';
import { ProviderData } from 'src/features/cross-chain/models/provider-data';
import { CrossChainContractData } from 'src/features/cross-chain/providers/common/celer-rubic/cross-chain-contract-data';

/**
 * Class to work with readable methods of cross-chain contract.
 */
export class RubicCrossChainContractData extends CrossChainContractData {
    constructor(
        public readonly blockchain: BlockchainName,
        public readonly address: string,
        public readonly providersData: ProviderData[]
    ) {
        super(providersData, blockchain, address);
    }

    @Cache
    public async getNumOfBlockchain(): Promise<number> {
        const numOfBlockchain = await this.web3Public.callContractMethod(
            this.address,
            rubicCrossChainContractAbi,
            'numOfThisBlockchain'
        );
        return parseInt(numOfBlockchain);
    }

    @Cache
    public async getTransitToken(): Promise<Token> {
        const numOfBlockchain = await this.getNumOfBlockchain();
        const transitTokenAddress = await this.web3Public.callContractMethod(
            this.address,
            rubicCrossChainContractAbi,
            'RubicAddresses',
            {
                methodArguments: [numOfBlockchain]
            }
        );
        return Token.createToken({
            address: transitTokenAddress,
            blockchain: this.blockchain
        });
    }

    public async getFeeInPercents(fromContract: CrossChainContractData): Promise<number> {
        const numOfFromBlockchain = await fromContract.getNumOfBlockchain();
        const feeAbsolute = await this.web3Public.callContractMethod(
            this.address,
            rubicCrossChainContractAbi,
            'feeAmountOfBlockchain',
            {
                methodArguments: [numOfFromBlockchain]
            }
        );
        return parseInt(feeAbsolute) / 10000;
    }

    public async getCryptoFeeToken(
        toContract: RubicCrossChainContractData
    ): Promise<PriceTokenAmount> {
        const numOfToBlockchain = await toContract.getNumOfBlockchain();
        const feeAmount = new BigNumber(
            await this.web3Public.callContractMethod(
                this.address,
                rubicCrossChainContractAbi,
                'blockchainCryptoFee',
                {
                    methodArguments: [numOfToBlockchain]
                }
            )
        );
        const nativeToken = BlockchainsInfo.getBlockchainByName(this.blockchain).nativeCoin;
        return PriceTokenAmount.createFromToken({
            ...nativeToken,
            weiAmount: feeAmount
        });
    }

    public async getMinMaxTransitTokenAmounts(): Promise<[string, string]> {
        return (
            await this.web3Public.multicallContractMethods<[string]>(
                this.address,
                rubicCrossChainContractAbi,
                [
                    {
                        methodName: 'minTokenAmount',
                        methodArguments: []
                    },
                    {
                        methodName: 'maxTokenAmount',
                        methodArguments: []
                    }
                ]
            )
        ).map(result => result.output![0] as string) as [string, string];
    }

    public isPaused(): Promise<boolean> {
        return this.web3Public.callContractMethod<boolean>(
            this.address,
            rubicCrossChainContractAbi,
            'paused'
        );
    }

    public async getMaxGasPrice(): Promise<BigNumber> {
        return new BigNumber(
            await this.web3Public.callContractMethod(
                this.address,
                rubicCrossChainContractAbi,
                'maxGasPrice'
            )
        );
    }
}
