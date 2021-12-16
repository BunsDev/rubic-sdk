"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossChainTrade = void 0;
var web3_pure_1 = require("@core/blockchain/web3-pure/web3-pure");
var CROSS_CHAIN_ROUTING_SWAP_METHOD_1 = require("@features/cross-chain/cross-chain-trade/models/CROSS_CHAIN_ROUTING_SWAP_METHOD");
var injector_1 = require("@core/sdk/injector");
var BLOCKCHAIN_NAME_1 = require("@core/blockchain/models/BLOCKCHAIN_NAME");
var crossChainContractAbi_1 = require("@features/cross-chain/constants/crossChainContractAbi");
var CrossChainIsUnavailableWarning_1 = require("@common/errors/cross-chain/CrossChainIsUnavailableWarning");
var MaxGasPriceOverflowError_1 = require("@common/errors/cross-chain/MaxGasPriceOverflowError");
var FailedToCheckForTransactionReceiptError_1 = require("@common/errors/swap/FailedToCheckForTransactionReceiptError");
var InsufficientFundsGasPriceValueError_1 = require("@common/errors/cross-chain/InsufficientFundsGasPriceValueError");
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var UnnecessaryApprove_1 = require("@common/errors/swap/UnnecessaryApprove");
var pure_decorator_1 = require("@common/decorators/pure.decorator");
var wallet_not_connected_error_1 = require("@common/errors/swap/wallet-not-connected.error");
var wrong_network_error_1 = require("@common/errors/swap/wrong-network.error");
var CrossChainTrade = /** @class */ (function () {
    function CrossChainTrade(crossChainTrade) {
        this.fromTrade = crossChainTrade.fromTrade;
        this.toTrade = crossChainTrade.toTrade;
        this.cryptoFeeToken = crossChainTrade.cryptoFeeToken;
        this.transitFeeToken = crossChainTrade.transitFeeToken;
        this.minMaxAmountsErrors = crossChainTrade.minMaxAmountsErrors;
        this.gasData = crossChainTrade.gasData;
        this.web3Private = injector_1.Injector.web3Private;
        this.fromWeb3Public = injector_1.Injector.web3PublicService.getWeb3Public(this.fromTrade.blockchain);
        this.toWeb3Public = injector_1.Injector.web3PublicService.getWeb3Public(this.toTrade.blockchain);
    }
    CrossChainTrade.getGasData = function (fromTrade, toTrade, cryptoFeeToken) {
        return __awaiter(this, void 0, void 0, function () {
            var fromBlockchain, walletAddress, _a, contractAddress, methodName, methodArguments, value, web3Public, _b, gasLimit, gasPrice, _c, _d, _e, _f, _err_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        fromBlockchain = fromTrade.blockchain;
                        walletAddress = injector_1.Injector.web3Private.address;
                        if (fromBlockchain !== BLOCKCHAIN_NAME_1.BLOCKCHAIN_NAME.ETHEREUM || !walletAddress) {
                            return [2 /*return*/, null];
                        }
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, new CrossChainTrade({
                                fromTrade: fromTrade,
                                toTrade: toTrade,
                                cryptoFeeToken: cryptoFeeToken,
                                transitFeeToken: {},
                                minMaxAmountsErrors: {},
                                gasData: null
                            }).getContractMethodData()];
                    case 2:
                        _a = _g.sent(), contractAddress = _a.contractAddress, methodName = _a.methodName, methodArguments = _a.methodArguments, value = _a.value;
                        web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
                        _d = (_c = Promise).all;
                        _e = [web3Public.getEstimatedGas(crossChainContractAbi_1.crossChainContractAbi, contractAddress, methodName, methodArguments, walletAddress, value)];
                        _f = bignumber_js_1.default.bind;
                        return [4 /*yield*/, injector_1.Injector.gasPriceApi.getGasPrice(fromTrade.blockchain)];
                    case 3: return [4 /*yield*/, _d.apply(_c, [_e.concat([
                                new (_f.apply(bignumber_js_1.default, [void 0, _g.sent()]))()
                            ])])];
                    case 4:
                        _b = _g.sent(), gasLimit = _b[0], gasPrice = _b[1];
                        if (!(gasLimit === null || gasLimit === void 0 ? void 0 : gasLimit.isFinite())) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                gasLimit: gasLimit,
                                gasPrice: gasPrice
                            }];
                    case 5:
                        _err_1 = _g.sent();
                        return [2 /*return*/, null];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(CrossChainTrade.prototype, "walletAddress", {
        get: function () {
            return this.web3Private.address;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CrossChainTrade.prototype, "fromToken", {
        get: function () {
            return this.fromTrade.fromToken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CrossChainTrade.prototype, "toToken", {
        get: function () {
            return this.fromTrade.toToken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CrossChainTrade.prototype, "estimatedGas", {
        get: function () {
            if (!this.gasData) {
                return null;
            }
            return web3_pure_1.Web3Pure.fromWei(this.gasData.gasPrice).multipliedBy(this.gasData.gasLimit);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CrossChainTrade.prototype, "priceImpactData", {
        get: function () {
            var calculatePriceImpact = function (trade) {
                return trade.fromToken.calculatePriceImpact(trade.toToken);
            };
            return {
                priceImpactFrom: calculatePriceImpact(this.fromTrade),
                priceImpactTo: calculatePriceImpact(this.toTrade)
            };
        },
        enumerable: false,
        configurable: true
    });
    CrossChainTrade.prototype.needApprove = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkWalletConnected();
                        if (this.fromTrade.fromToken.isNative) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.fromWeb3Public.getAllowance(this.fromTrade.fromToken.address, this.walletAddress, this.fromTrade.contract.address)];
                    case 1:
                        allowance = _a.sent();
                        return [2 /*return*/, this.fromTrade.fromToken.weiAmount.gt(allowance)];
                }
            });
        });
    };
    CrossChainTrade.prototype.approve = function (tokenAddress, options) {
        if (!this.needApprove()) {
            throw new UnnecessaryApprove_1.UnnecessaryApprove();
        }
        this.checkWalletConnected();
        this.checkBlockchainCorrect();
        return this.web3Private.approveTokens(tokenAddress, this.fromTrade.contract.address, 'infinity', options);
    };
    CrossChainTrade.prototype.checkWalletConnected = function () {
        if (!this.walletAddress) {
            throw new wallet_not_connected_error_1.WalletNotConnectedError();
        }
    };
    CrossChainTrade.prototype.checkBlockchainCorrect = function () {
        if (this.web3Private.blockchainName !== this.fromTrade.blockchain) {
            throw new wrong_network_error_1.WrongNetworkError();
        }
    };
    CrossChainTrade.prototype.checkContractsState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sourceContractPaused, targetContractPaused;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.fromTrade.contract.isContractPaused(),
                            this.toTrade.contract.isContractPaused()
                        ])];
                    case 1:
                        _a = _b.sent(), sourceContractPaused = _a[0], targetContractPaused = _a[1];
                        if (sourceContractPaused || targetContractPaused) {
                            throw new CrossChainIsUnavailableWarning_1.CrossChainIsUnavailableError();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CrossChainTrade.prototype.checkToBlockchainGasPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, maxGasPrice, currentGasPrice;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.toTrade.blockchain !== BLOCKCHAIN_NAME_1.BLOCKCHAIN_NAME.ETHEREUM) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Promise.all([
                                this.toTrade.contract.getMaxGasPrice(),
                                injector_1.Injector.gasPriceApi.getGasPriceInEthUnits(this.toTrade.blockchain)
                            ])];
                    case 1:
                        _a = _b.sent(), maxGasPrice = _a[0], currentGasPrice = _a[1];
                        if (maxGasPrice.lt(currentGasPrice)) {
                            throw new MaxGasPriceOverflowError_1.MaxGasPriceOverflowError();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CrossChainTrade.prototype.checkToContractBalance = function () {
        return this.fromWeb3Public.checkBalance(this.toTrade.fromToken, this.fromTrade.fromToken.tokenAmount, this.toTrade.contract.address);
    };
    CrossChainTrade.prototype.checkUserBalance = function () {
        return this.fromWeb3Public.checkBalance(this.fromTrade.fromToken, this.fromTrade.fromToken.tokenAmount, this.walletAddress);
    };
    CrossChainTrade.prototype.checkTradeErrors = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkWalletConnected();
                        this.checkBlockchainCorrect();
                        return [4 /*yield*/, Promise.all([
                                this.checkContractsState(),
                                this.checkToBlockchainGasPrice(),
                                this.checkToContractBalance(),
                                this.checkUserBalance()
                            ])];
                    case 1:
                        _a.sent();
                        if (this.minMaxAmountsErrors.minAmount) {
                            throw new Error("Minimum amount is " + this.minMaxAmountsErrors.minAmount);
                        }
                        if (this.minMaxAmountsErrors.maxAmount) {
                            throw new Error("Maximum amount is " + this.minMaxAmountsErrors.maxAmount);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CrossChainTrade.prototype.getContractMethodData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, fromTrade, toTrade, contractAddress, methodName, toBlockchainInContract, tokenInAmountAbsolute, tokenOutAmountMin, tokenOutAmountMinAbsolute, fromTransitTokenAmountAbsolute, methodArguments, value;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, fromTrade = _a.fromTrade, toTrade = _a.toTrade;
                        contractAddress = fromTrade.contract.address;
                        methodName = fromTrade.fromToken.isNative
                            ? CROSS_CHAIN_ROUTING_SWAP_METHOD_1.CROSS_CHAIN_ROUTING_SWAP_METHOD.SWAP_CRYPTO
                            : CROSS_CHAIN_ROUTING_SWAP_METHOD_1.CROSS_CHAIN_ROUTING_SWAP_METHOD.SWAP_TOKENS;
                        return [4 /*yield*/, toTrade.contract.getNumOfContract()];
                    case 1:
                        toBlockchainInContract = _b.sent();
                        tokenInAmountAbsolute = fromTrade.fromToken.weiAmount;
                        tokenOutAmountMin = toTrade.toAmountMin;
                        tokenOutAmountMinAbsolute = web3_pure_1.Web3Pure.toWei(tokenOutAmountMin, toTrade.toToken.decimals);
                        fromTransitTokenAmountAbsolute = fromTrade.toAmountWei;
                        methodArguments = [
                            [
                                toBlockchainInContract,
                                tokenInAmountAbsolute,
                                fromTrade.path,
                                toTrade.path,
                                fromTransitTokenAmountAbsolute,
                                tokenOutAmountMinAbsolute,
                                this.walletAddress,
                                toTrade.toToken.isNative,
                                true
                            ]
                        ];
                        value = this.cryptoFeeToken.weiAmount
                            .plus(fromTrade.fromToken.isNative ? tokenInAmountAbsolute : 0)
                            .toFixed(0);
                        return [2 /*return*/, {
                                contractAddress: contractAddress,
                                methodName: methodName,
                                methodArguments: methodArguments,
                                value: value
                            }];
                }
            });
        });
    };
    CrossChainTrade.prototype.swap = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, contractAddress, methodName, methodArguments, value, transactionHash, onTransactionHash, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.checkTradeErrors()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getContractMethodData()];
                    case 2:
                        _a = _b.sent(), contractAddress = _a.contractAddress, methodName = _a.methodName, methodArguments = _a.methodArguments, value = _a.value;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        onTransactionHash = function (hash) {
                            if (options.onTransactionHash) {
                                options.onTransactionHash(hash);
                            }
                            transactionHash = hash;
                        };
                        return [4 /*yield*/, this.web3Private.tryExecuteContractMethod(contractAddress, crossChainContractAbi_1.crossChainContractAbi, methodName, methodArguments, __assign(__assign({}, options), { value: value, onTransactionHash: onTransactionHash }), function (err) {
                                var _a;
                                var includesErrCode = (_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.includes('-32000');
                                var allowedErrors = [
                                    'insufficient funds for transfer',
                                    'insufficient funds for gas * price + value'
                                ];
                                var includesPhrase = allowedErrors.some(function (error) { var _a; return (_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.includes(error); });
                                return includesErrCode && includesPhrase;
                            })];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, transactionHash];
                    case 5:
                        err_1 = _b.sent();
                        if (err_1 instanceof FailedToCheckForTransactionReceiptError_1.FailedToCheckForTransactionReceiptError) {
                            return [2 /*return*/, transactionHash];
                        }
                        return [2 /*return*/, this.parseSwapErrors(err_1)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CrossChainTrade.prototype.parseSwapErrors = function (err) {
        var _a;
        var errMessage = (err === null || err === void 0 ? void 0 : err.message) || ((_a = err === null || err === void 0 ? void 0 : err.toString) === null || _a === void 0 ? void 0 : _a.call(err));
        if (errMessage === null || errMessage === void 0 ? void 0 : errMessage.includes('swapContract: Not enough amount of tokens')) {
            throw new CrossChainIsUnavailableWarning_1.CrossChainIsUnavailableError();
        }
        if (errMessage === null || errMessage === void 0 ? void 0 : errMessage.includes('err: insufficient funds for gas * price + value')) {
            throw new InsufficientFundsGasPriceValueError_1.InsufficientFundsGasPriceValueError();
        }
        throw err;
    };
    __decorate([
        pure_decorator_1.Pure
    ], CrossChainTrade.prototype, "priceImpactData", null);
    return CrossChainTrade;
}());
exports.CrossChainTrade = CrossChainTrade;
//# sourceMappingURL=cross-chain-trade.js.map