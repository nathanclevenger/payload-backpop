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
exports.backpopulatePolymorphicCleanupHookFactory = void 0;
var payload_1 = __importDefault(require("payload"));
//When the parent field is deleted
var backpopulatePolymorphicCleanupHookFactory = function (_a) {
    var source_field = _a.source_field, target_field = _a.target_field, target_slug = _a.target_slug;
    var cleanupHook = function (_a) {
        var req = _a.req, id = _a.id, doc = _a.doc;
        return __awaiter(void 0, void 0, void 0, function () {
            var value, affected_slugs, _loop_1, _i, affected_slugs_1, slug;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        value = (_b = doc[source_field]) !== null && _b !== void 0 ? _b : [];
                        affected_slugs = Array.from(new Set(value.map(function (el) { return el.relationTo; })));
                        _loop_1 = function (slug) {
                            var _d, _e, affected_document_id, affected_doc, prev_references;
                            var _f;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        _d = 0, _e = value
                                            .filter(function (el) { return el.relationTo === slug; })
                                            .map(function (el) { return el.value; });
                                        _g.label = 1;
                                    case 1:
                                        if (!(_d < _e.length)) return [3 /*break*/, 5];
                                        affected_document_id = _e[_d];
                                        return [4 /*yield*/, payload_1.default.findByID({
                                                collection: slug,
                                                id: affected_document_id,
                                                overrideAccess: true,
                                                depth: 0,
                                            })];
                                    case 2:
                                        affected_doc = _g.sent();
                                        prev_references = affected_doc[target_field];
                                        return [4 /*yield*/, payload_1.default.update({
                                                collection: slug,
                                                id: affected_document_id,
                                                data: (_f = {},
                                                    _f[target_field] = prev_references.filter(function (el) { return el !== doc.id; }),
                                                    _f),
                                                overrideAccess: true,
                                                depth: 0,
                                            })];
                                    case 3:
                                        _g.sent();
                                        _g.label = 4;
                                    case 4:
                                        _d++;
                                        return [3 /*break*/, 1];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, affected_slugs_1 = affected_slugs;
                        _c.label = 1;
                    case 1:
                        if (!(_i < affected_slugs_1.length)) return [3 /*break*/, 4];
                        slug = affected_slugs_1[_i];
                        return [5 /*yield**/, _loop_1(slug)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return cleanupHook;
};
exports.backpopulatePolymorphicCleanupHookFactory = backpopulatePolymorphicCleanupHookFactory;
//# sourceMappingURL=backpopulate-cleanup-polymorphic.hook.js.map