"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bazSlug = exports.barSlug = exports.fooSlug = void 0;
var config_1 = require("payload/config");
var BackpopulatePlugin = __importStar(require("../../index"));
var backpopulate_1 = __importDefault(require("../../hooks/backpopulate"));
exports.fooSlug = "foo";
exports.barSlug = "bar";
exports.bazSlug = "baz";
/**
 * A simple collection where all translatable fields are top-level.
 * For this reason it is considered `simple` (no field unrolling required)
 */
exports.default = (0, config_1.buildConfig)({
    admin: {
        disable: true,
    },
    debug: true,
    telemetry: false,
    collections: [
        {
            slug: exports.fooSlug,
            timestamps: false,
            fields: [
                {
                    name: "name",
                    type: "text",
                },
                {
                    name: "bars",
                    type: "relationship",
                    relationTo: exports.barSlug,
                    hooks: {
                        afterChange: [backpopulate_1.default],
                    },
                },
            ],
        },
        {
            slug: exports.barSlug,
            timestamps: false,
            fields: [
                {
                    name: "name",
                    type: "text",
                },
            ],
        },
    ],
    plugins: [BackpopulatePlugin.default],
});
//# sourceMappingURL=payload-config.js.map