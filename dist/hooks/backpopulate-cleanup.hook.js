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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentCleanupHookFactory = exports.backpopulateCleanupHookFactory = void 0;
var payload_1 = __importDefault(require("payload"));
//When the parent field is deleted
var backpopulateCleanupHookFactory = function (_a) {
    var source_field = _a.source_field, target_field = _a.target_field, target_slug = _a.target_slug;
    var cleanupHook = function (_a) {
        var doc = _a.doc;
        return __awaiter(void 0, void 0, void 0, function () {
            var value, newValue, _i, value_1, valueEntry, _b, value_2, targetId, targetDocument, prevReferences;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        value = doc[source_field] ? doc[source_field] : [];
                        if (!Array.isArray(value)) {
                            value = [value];
                        }
                        if (value && value.length >= 1 && value[0].value) {
                            newValue = [];
                            for (_i = 0, value_1 = value; _i < value_1.length; _i++) {
                                valueEntry = value_1[_i];
                                newValue.push(valueEntry.value);
                            }
                            value = newValue;
                        }
                        _b = 0, value_2 = value;
                        _d.label = 1;
                    case 1:
                        if (!(_b < value_2.length)) return [3 /*break*/, 5];
                        targetId = value_2[_b];
                        return [4 /*yield*/, payload_1.default.findByID({
                                collection: target_slug,
                                id: targetId,
                            })];
                    case 2:
                        targetDocument = _d.sent();
                        if (!targetDocument) {
                            return [3 /*break*/, 4];
                        }
                        prevReferences = targetDocument[target_field].map(function (ref) { return ref.id; });
                        // remove self from backrefs
                        return [4 /*yield*/, payload_1.default.update({
                                collection: target_slug,
                                id: targetId,
                                overrideAccess: true,
                                data: (_c = {},
                                    _c[target_field] = prevReferences.filter(function (id) { return id && id !== doc.id; }),
                                    _c),
                            })];
                    case 3:
                        // remove self from backrefs
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _b++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return cleanupHook;
};
exports.backpopulateCleanupHookFactory = backpopulateCleanupHookFactory;
//When the backpopulated field is deleted
var parentCleanupHookFactory = function (_a) {
    var source_field = _a.source_field, target_field = _a.target_field, target_slug = _a.target_slug;
    var cleanupHook = function (_a) {
        var id = _a.req, doc = _a.doc;
        return __awaiter(void 0, void 0, void 0, function () {
            var value, newValue, _i, value_3, valueEntry, _b, value_4, targetId, targetDocument, prevReferences, updatedReferenceIds;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        value = doc[source_field] ? doc[source_field] : [];
                        if (value && value.length >= 1 && value[0].value) {
                            newValue = [];
                            for (_i = 0, value_3 = value; _i < value_3.length; _i++) {
                                valueEntry = value_3[_i];
                                newValue.push(valueEntry.value);
                            }
                            value = newValue;
                        }
                        _b = 0, value_4 = value;
                        _d.label = 1;
                    case 1:
                        if (!(_b < value_4.length)) return [3 /*break*/, 5];
                        targetId = value_4[_b];
                        return [4 /*yield*/, payload_1.default.findByID({
                                collection: target_slug,
                                id: targetId,
                            })];
                    case 2:
                        targetDocument = _d.sent();
                        if (!targetDocument) {
                            return [3 /*break*/, 4];
                        }
                        prevReferences = targetDocument[target_field].map(function (ref) {
                            return ref.id ? ref.id : ref.value.id ? ref.value.id : ref.value;
                        });
                        updatedReferenceIds = [];
                        updatedReferenceIds = prevReferences.filter(function (ref) {
                            return (ref.id ? ref.id : ref) !== id; //Sometimes doc is the id, sometimes doc.id is the id
                        });
                        // remove self from backrefs
                        return [4 /*yield*/, payload_1.default.update({
                                collection: target_slug,
                                id: targetId,
                                overrideAccess: true,
                                data: (_c = {},
                                    _c[target_field] = updatedReferenceIds,
                                    _c),
                            })];
                    case 3:
                        // remove self from backrefs
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _b++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return cleanupHook;
};
exports.parentCleanupHookFactory = parentCleanupHookFactory;
//# sourceMappingURL=backpopulate-cleanup.hook.js.map