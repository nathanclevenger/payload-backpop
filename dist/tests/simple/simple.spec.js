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
var express_1 = __importDefault(require("express"));
var mongodb_memory_server_1 = require("mongodb-memory-server");
var payload_1 = __importDefault(require("payload"));
var payload_config_1 = require("./payload-config");
var handle;
describe("Simple Config Tests", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var mongod, uri, app;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    process.env["PAYLOAD_CONFIG_PATH"] = "src/tests/simple/payload-config.ts";
                    return [4 /*yield*/, mongodb_memory_server_1.MongoMemoryServer.create()];
                case 1:
                    mongod = _a.sent();
                    uri = mongod.getUri();
                    app = (0, express_1.default)();
                    handle = app.listen(3000);
                    return [4 /*yield*/, payload_1.default.init({
                            secret: "SECRET",
                            express: app,
                            mongoURL: uri,
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () {
        handle.close();
    });
    it("Should backpopulate a simple relationship [single add, single remove]", function () { return __awaiter(void 0, void 0, void 0, function () {
        var foo, bar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, payload_1.default.create({
                        collection: payload_config_1.fooSlug,
                        data: {
                            name: "foo",
                            bars: [],
                        },
                    })];
                case 1:
                    foo = _a.sent();
                    return [4 /*yield*/, payload_1.default.create({
                            collection: payload_config_1.barSlug,
                            data: {
                                name: "bar",
                            },
                        })];
                case 2:
                    bar = _a.sent();
                    return [4 /*yield*/, payload_1.default.update({
                            collection: payload_config_1.fooSlug,
                            id: foo.id,
                            data: {
                                bars: [bar.id],
                            },
                        })];
                case 3:
                    // Now connect foo and bar, bar should backpopulate the relationship
                    foo = _a.sent();
                    return [4 /*yield*/, payload_1.default.findByID({
                            collection: payload_config_1.barSlug,
                            id: bar.id,
                        })];
                case 4:
                    bar = _a.sent();
                    expect(bar).toMatchObject({
                        name: bar.name,
                        foo_bars_backpopulated: [foo],
                    });
                    return [4 /*yield*/, payload_1.default.update({
                            collection: payload_config_1.fooSlug,
                            id: foo.id,
                            data: {
                                bars: [],
                            },
                        })];
                case 5:
                    // Remove the bar and check again
                    foo = _a.sent();
                    return [4 /*yield*/, payload_1.default.findByID({
                            collection: payload_config_1.barSlug,
                            id: bar.id,
                        })];
                case 6:
                    bar = _a.sent();
                    expect(bar).toMatchObject({
                        name: bar.name,
                        foo_bars_backpopulated: [],
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should handle multiple active relationships [many add, many remove]", function () { return __awaiter(void 0, void 0, void 0, function () {
        var bar1, bar2, foo1, foo2, foo3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, payload_1.default.create({
                        collection: payload_config_1.barSlug,
                        data: { name: "bar1" },
                    })];
                case 1:
                    bar1 = _a.sent();
                    return [4 /*yield*/, payload_1.default.create({
                            collection: payload_config_1.barSlug,
                            data: { name: "bar2" },
                        })];
                case 2:
                    bar2 = _a.sent();
                    return [4 /*yield*/, payload_1.default.create({
                            collection: payload_config_1.fooSlug,
                            data: {
                                name: "foo1",
                            },
                        })];
                case 3:
                    foo1 = _a.sent();
                    return [4 /*yield*/, payload_1.default.create({
                            collection: payload_config_1.fooSlug,
                            data: {
                                name: "foo2",
                                bars: [bar1.id, bar2.id],
                            },
                        })];
                case 4:
                    foo2 = _a.sent();
                    return [4 /*yield*/, payload_1.default.create({
                            collection: payload_config_1.fooSlug,
                            data: {
                                name: "foo3",
                                bars: [],
                            },
                        })];
                case 5:
                    foo3 = _a.sent();
                    return [4 /*yield*/, payload_1.default.findByID({ collection: payload_config_1.barSlug, id: bar1.id })];
                case 6:
                    // Assert that backpopulation are what we expect
                    bar1 = _a.sent();
                    return [4 /*yield*/, payload_1.default.findByID({ collection: payload_config_1.barSlug, id: bar2.id })];
                case 7:
                    bar2 = _a.sent();
                    expect(bar1.foo_bars_backpopulated).toMatchObject([foo2]);
                    expect(bar2.foo_bars_backpopulated).toMatchObject([foo2]);
                    return [4 /*yield*/, payload_1.default.update({
                            collection: payload_config_1.fooSlug,
                            id: foo2.id,
                            data: { bars: [] },
                        })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, payload_1.default.findByID({ collection: payload_config_1.barSlug, id: bar1.id })];
                case 9:
                    // Assert that backpopulation are what we expect
                    bar1 = _a.sent();
                    return [4 /*yield*/, payload_1.default.findByID({ collection: payload_config_1.barSlug, id: bar2.id })];
                case 10:
                    bar2 = _a.sent();
                    expect(bar1.foo_bars_backpopulated).toMatchObject([]);
                    expect(bar2.foo_bars_backpopulated).toMatchObject([]);
                    return [4 /*yield*/, payload_1.default.update({
                            collection: payload_config_1.fooSlug,
                            id: foo3.id,
                            data: { bars: [bar1.id, bar2.id] },
                        })];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, payload_1.default.update({
                            collection: payload_config_1.fooSlug,
                            id: foo1.id,
                            data: { bars: [bar1.id] },
                        })];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, payload_1.default.findByID({ collection: payload_config_1.barSlug, id: bar1.id })];
                case 13:
                    // Assert that backpopulation are what we expect
                    bar1 = _a.sent();
                    return [4 /*yield*/, payload_1.default.findByID({ collection: payload_config_1.barSlug, id: bar2.id })];
                case 14:
                    bar2 = _a.sent();
                    return [4 /*yield*/, payload_1.default.findByID({ collection: payload_config_1.fooSlug, id: foo1.id })];
                case 15:
                    foo1 = _a.sent();
                    return [4 /*yield*/, payload_1.default.findByID({ collection: payload_config_1.fooSlug, id: foo3.id })];
                case 16:
                    foo3 = _a.sent();
                    expect(bar1.foo_bars_backpopulated).toMatchObject([foo3, foo1]);
                    expect(bar2.foo_bars_backpopulated).toMatchObject([foo3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should handle deletion of target elements [single add, single delete]", function () { return __awaiter(void 0, void 0, void 0, function () {
        var foo, bar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, payload_1.default.create({
                        collection: payload_config_1.fooSlug,
                        data: {
                            name: "foo",
                            bars: [],
                        },
                    })];
                case 1:
                    foo = _a.sent();
                    return [4 /*yield*/, payload_1.default.create({
                            collection: payload_config_1.barSlug,
                            data: {
                                name: "bar",
                            },
                        })];
                case 2:
                    bar = _a.sent();
                    return [4 /*yield*/, payload_1.default.update({
                            collection: payload_config_1.fooSlug,
                            id: foo.id,
                            data: {
                                bars: [bar.id],
                            },
                        })];
                case 3:
                    // Now connect foo and bar, bar should backpopulate the relationship
                    foo = _a.sent();
                    return [4 /*yield*/, payload_1.default.findByID({
                            collection: payload_config_1.barSlug,
                            id: bar.id,
                        })];
                case 4:
                    bar = _a.sent();
                    expect(bar).toMatchObject({
                        name: bar.name,
                        foo_bars_backpopulated: [foo],
                    });
                    // Delete the foo and check again
                    return [4 /*yield*/, payload_1.default.delete({
                            collection: payload_config_1.fooSlug,
                            id: foo.id,
                        })];
                case 5:
                    // Delete the foo and check again
                    _a.sent();
                    return [4 /*yield*/, payload_1.default.findByID({
                            collection: payload_config_1.barSlug,
                            id: bar.id,
                        })];
                case 6:
                    bar = _a.sent();
                    expect(bar).toMatchObject({
                        name: bar.name,
                        foo_bars_backpopulated: [],
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=simple.spec.js.map