import { RubicSdkError } from '@common/errors/rubic-sdk.error';
import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';
import { TokenBaseStruct } from '@core/blockchain/models/token-base-struct';
import { Web3Pure } from '@core/blockchain/web3-pure/web3-pure';
import { Injector } from '@core/sdk/injector';
import { compareAddresses } from '@common/utils/blockchain';

export type TokenStruct = {
    blockchain: BLOCKCHAIN_NAME;
    address: string;
    name: string;
    symbol: string;
    decimals: number;
};

export class Token {
    public static async createToken(tokenBaseStruct: TokenBaseStruct): Promise<Token> {
        const web3Public = Injector.web3PublicService.getWeb3Public(tokenBaseStruct.blockchain);
        const tokenInfo = await web3Public.callForTokenInfo(tokenBaseStruct.address);

        if (tokenInfo.decimals == null || tokenInfo.name == null || tokenInfo.symbol == null) {
            throw new RubicSdkError('Error while loading token');
        }

        return new Token({
            ...tokenBaseStruct,
            name: tokenInfo.name,
            symbol: tokenInfo.symbol,
            decimals: parseInt(tokenInfo.decimals)
        });
    }

    public static async createTokens(
        tokensAddresses: string[] | ReadonlyArray<string>,
        blockchain: BLOCKCHAIN_NAME
    ): Promise<Token[]> {
        const web3Public = Injector.web3PublicService.getWeb3Public(blockchain);
        const tokenInfo = await web3Public.callForTokensInfo(tokensAddresses);

        return tokenInfo.map((tokenInfo, index) => {
            if (
                tokenInfo.decimals === undefined ||
                tokenInfo.name === undefined ||
                tokenInfo.symbol === undefined
            ) {
                throw new RubicSdkError('Error while loading token');
            }

            return new Token({
                address: tokensAddresses[index],
                blockchain,
                name: tokenInfo.name,
                symbol: tokenInfo.symbol,
                decimals: parseInt(tokenInfo.decimals)
            });
        });
    }

    public static tokensToAddresses(tokens: Token[]): string[] {
        return tokens.map(token => token.address);
    }

    public readonly blockchain: BLOCKCHAIN_NAME;

    public readonly address: string;

    public readonly name: string;

    public readonly symbol: string;

    public readonly decimals: number;

    public get isNative(): boolean {
        return Web3Pure.isNativeAddress(this.address);
    }

    constructor(tokenStruct: TokenStruct) {
        this.blockchain = tokenStruct.blockchain;
        this.address = tokenStruct.address;
        this.name = tokenStruct.name;
        this.symbol = tokenStruct.symbol;
        this.decimals = tokenStruct.decimals;
    }

    public isEqualTo(token: TokenBaseStruct): boolean {
        return (
            token.blockchain === this.blockchain && compareAddresses(token.address, this.address)
        );
    }

    public isEqualToTokens(tokens: TokenBaseStruct[]): boolean {
        return tokens.some(token => this.isEqualTo(token));
    }

    public clone(tokenStruct?: Partial<TokenStruct>): Token {
        return new Token({ ...this, ...tokenStruct });
    }
}
