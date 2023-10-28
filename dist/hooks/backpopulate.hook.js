"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backpopulateAfterChangeHookFactory = void 0;
var payload_1 = __importDefault(require("payload"));
var backpopulateAfterChangeHookFactory = function (_a) {
    var 
    //If value is added or updated from relationship?
    targetCollection = _a.targetCollection, backpopulatedField = _a.backpopulatedField, originalField = _a.originalField;
    var hook = function (args) { return __awaiter(void 0, void 0, void 0, function () {
        var operation, originalDoc, value, previousValue, removedTargetIds, addedTargetIds, documentsToRemoveBackPop, _a, documentsToAddBackPop, _b, _i, documentsToRemoveBackPop_1, documentToRemoveBackPop, prevReferencedIds, updatedReferenceIds, _c, documentsToAddBackPop_1, documentToAddBackPop, prevReferencedIds, updatedReferenceIds;
        var _d, _e;
        var _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    operation = args.operation, originalDoc = args.originalDoc, value = args.value, previousValue = args.previousValue;
                    if (!(operation === "create" || operation === "update")) return [3 /*break*/, 14];
                    if (value === undefined || value === null) {
                        // This should never happen, but better safe than sorry.
                        return [2 /*return*/];
                    }
                    removedTargetIds = previousValue
                        ? __spreadArray([], previousValue, true).filter(function (x) { return !value.includes(x); })
                        : [];
                    addedTargetIds = value.filter(function (x) { return !(previousValue !== null && previousValue !== void 0 ? previousValue : []).includes(x); });
                    if (!(removedTargetIds.length == 0)) return [3 /*break*/, 1];
                    _a = [];
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, payload_1.default.find({
                        collection: targetCollection.slug,
                        overrideAccess: true,
                        depth: 1,
                        pagination: false,
                        where: {
                            id: {
                                in: removedTargetIds,
                            },
                        },
                    })];
                case 2:
                    _a = (_g.sent()).docs;
                    _g.label = 3;
                case 3:
                    documentsToRemoveBackPop = _a;
                    if (!(addedTargetIds.length == 0)) return [3 /*break*/, 4];
                    _b = [];
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, payload_1.default.find({
                        collection: targetCollection.slug,
                        overrideAccess: true,
                        depth: 1,
                        pagination: false,
                        where: {
                            id: {
                                in: addedTargetIds,
                            },
                        },
                    })];
                case 5:
                    _b = (_g.sent()).docs;
                    _g.label = 6;
                case 6:
                    documentsToAddBackPop = _b;
                    _i = 0, documentsToRemoveBackPop_1 = documentsToRemoveBackPop;
                    _g.label = 7;
                case 7:
                    if (!(_i < documentsToRemoveBackPop_1.length)) return [3 /*break*/, 10];
                    documentToRemoveBackPop = documentsToRemoveBackPop_1[_i];
                    prevReferencedIds = documentToRemoveBackPop[backpopulatedField["name"]].map(function (doc) { return doc.id; });
                    updatedReferenceIds = prevReferencedIds.filter(function (doc) {
                        return (doc.id ? doc.id : doc) !== originalDoc.id; //Sometimes doc is the id, sometimes doc.id is the id
                    });
                    return [4 /*yield*/, payload_1.default.update({
                            collection: targetCollection.slug,
                            id: documentToRemoveBackPop.id,
                            overrideAccess: true,
                            data: (_d = {},
                                _d[backpopulatedField["name"]] = updatedReferenceIds,
                                _d),
                        })];
                case 8:
                    _g.sent();
                    _g.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 7];
                case 10:
                    _c = 0, documentsToAddBackPop_1 = documentsToAddBackPop;
                    _g.label = 11;
                case 11:
                    if (!(_c < documentsToAddBackPop_1.length)) return [3 /*break*/, 14];
                    documentToAddBackPop = documentsToAddBackPop_1[_c];
                    prevReferencedIds = ((_f = documentToAddBackPop[backpopulatedField["name"]]) !== null && _f !== void 0 ? _f : []).map(function (doc) { return doc.id; });
                    updatedReferenceIds = Array.from(new Set(__spreadArray(__spreadArray([], prevReferencedIds, true), [originalDoc.id], false)));
                    return [4 /*yield*/, payload_1.default.update({
                            collection: targetCollection.slug,
                            id: documentToAddBackPop.id,
                            overrideAccess: true,
                            data: (_e = {},
                                _e[backpopulatedField["name"]] = updatedReferenceIds,
                                _e),
                        })];
                case 12:
                    _g.sent();
                    _g.label = 13;
                case 13:
                    _c++;
                    return [3 /*break*/, 11];
                case 14: return [2 /*return*/]; //NOT return value; as the new value of that field doesn't change because of this hook anyways!!! Returning value works usually,
            }
        });
    }); };
    return hook;
};
exports.backpopulateAfterChangeHookFactory = backpopulateAfterChangeHookFactory;
//# sourceMappingURL=backpopulate.hook.js.map