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
exports.backpopulatePolymorphicHookFactory = void 0;
var payload_1 = __importDefault(require("payload"));
var backpopulatePolymorphicHookFactory = function (_a) {
    var primaryCollection = _a.primaryCollection, targetCollection = _a.targetCollection, backpopulatedField = _a.backpopulatedField;
    var hook = function (args) { return __awaiter(void 0, void 0, void 0, function () {
        var operation, originalDoc, value, previousValue, str_value_1, str_value_prev_1, removed_targets, added_targets, affected_slugs, _loop_1, _i, _a, slug;
        var _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    operation = args.operation, originalDoc = args.originalDoc, value = args.value, previousValue = args.previousValue;
                    if (!(operation === "create" || operation === "update")) return [3 /*break*/, 4];
                    if (value === undefined || value === null) {
                        return [2 /*return*/];
                    }
                    str_value_1 = value.map(JSON.stringify);
                    str_value_prev_1 = previousValue
                        ? previousValue.map(JSON.stringify)
                        : [];
                    removed_targets = __spreadArray([], str_value_prev_1, true).filter(function (x) { return !str_value_1.includes(x); })
                        .map(function (str) { return JSON.parse(str); });
                    added_targets = str_value_1
                        .filter(function (x) { return !str_value_prev_1.includes(x); })
                        .map(function (str) { return JSON.parse(str); });
                    affected_slugs = new Set(__spreadArray(__spreadArray([], added_targets, true), removed_targets, true).map(function (el) { return el.relationTo; }));
                    _loop_1 = function (slug) {
                        var affected_documents, added_target_ids, _e, affected_documents_1, affected_document, references, updated_references;
                        var _f;
                        return __generator(this, function (_g) {
                            switch (_g.label) {
                                case 0: return [4 /*yield*/, payload_1.default.find({
                                        collection: slug,
                                        overrideAccess: true,
                                        depth: 0,
                                        limit: 100000,
                                        pagination: false,
                                        where: {
                                            id: {
                                                in: __spreadArray(__spreadArray([], added_targets, true), removed_targets, true).filter(function (el) { return el.relationTo === slug; })
                                                    .map(function (el) { return el.value; }),
                                            },
                                        },
                                    })];
                                case 1:
                                    affected_documents = (_g.sent()).docs;
                                    added_target_ids = added_targets
                                        .filter(function (el) { return el.relationTo === slug; })
                                        .map(function (el) { return el.value; });
                                    _e = 0, affected_documents_1 = affected_documents;
                                    _g.label = 2;
                                case 2:
                                    if (!(_e < affected_documents_1.length)) return [3 /*break*/, 5];
                                    affected_document = affected_documents_1[_e];
                                    (_b = affected_document[_c = backpopulatedField["name"]]) !== null && _b !== void 0 ? _b : (affected_document[_c] = []);
                                    references = affected_document[backpopulatedField["name"]];
                                    updated_references = [];
                                    if (added_target_ids.includes(affected_document.id)) {
                                        updated_references = Array.from(new Set(__spreadArray(__spreadArray([], references, true), [originalDoc.id], false)));
                                    }
                                    else {
                                        updated_references = references.filter(function (el) { return el !== originalDoc.id; });
                                    }
                                    // finally, update the affected document
                                    return [4 /*yield*/, payload_1.default.update({
                                            collection: slug,
                                            id: affected_document.id,
                                            overrideAccess: true,
                                            data: (_f = {},
                                                _f[backpopulatedField["name"]] = updated_references,
                                                _f),
                                            depth: 0,
                                        })];
                                case 3:
                                    // finally, update the affected document
                                    _g.sent();
                                    _g.label = 4;
                                case 4:
                                    _e++;
                                    return [3 /*break*/, 2];
                                case 5: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, _a = Array.from(affected_slugs);
                    _d.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    slug = _a[_i];
                    return [5 /*yield**/, _loop_1(slug)];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return hook;
};
exports.backpopulatePolymorphicHookFactory = backpopulatePolymorphicHookFactory;
exports.default = exports.backpopulatePolymorphicHookFactory;
//# sourceMappingURL=backpopulate-polymorphic.hook.js.map