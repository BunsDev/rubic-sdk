import { Token } from 'src/core/blockchain/tokens/token';

export function createTokenNativeAddressProxy<T extends Token>(
    token: T,
    wrappedNativeAddress: string
): T {
    const wethAbleAddress = token.isNative ? wrappedNativeAddress : token.address;
    return new Proxy<T>(token, {
        get: (target, key) => {
            if (!(key in target)) {
                return undefined;
            }
            if (key === 'address') {
                return wethAbleAddress;
            }
            return target[key as keyof T];
        }
    });
}

export function createTokenNativeAddressProxyInPathStartAndEnd<T extends Token>(
    path: T[] | ReadonlyArray<T>,
    wrappedNativeAddress: string
): ReadonlyArray<T> {
    return [createTokenNativeAddressProxy(path[0], wrappedNativeAddress)]
        .concat(path.slice(1, path.length - 1))
        .concat(createTokenNativeAddressProxy(path[path.length - 1], wrappedNativeAddress));
}
