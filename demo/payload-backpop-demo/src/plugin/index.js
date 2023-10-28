"use strict";
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
var backpopulate_hook_1 = require("./hooks/backpopulate.hook");
var backpopulate_cleanup_hook_1 = require("./hooks/backpopulate-cleanup.hook");
var backpopulate_1 = __importDefault(require("./hooks/backpopulate"));
var backpopulate_polymorphic_hook_1 = __importDefault(require("./hooks/backpopulate-polymorphic.hook"));
var backpopulate_cleanup_polymorphic_hook_1 = require("./hooks/backpopulate-cleanup-polymorphic.hook");
var BackpopulatedRelationshipsPlugin = function (incomingConfig) {
    var _a, _b, _c;
    for (var _i = 0, _d = (_a = incomingConfig.collections) !== null && _a !== void 0 ? _a : []; _i < _d.length; _i++) {
        var collection = _d[_i];
        for (var _e = 0, _f = collection.fields; _e < _f.length; _e++) {
            var field = _f[_e];
            if (field.type === "relationship" && field.relationTo) {
                if (field.hasOwnProperty("hooks")) {
                    var hasMarker = (_c = (_b = field.hooks) === null || _b === void 0 ? void 0 : _b.afterChange) === null || _c === void 0 ? void 0 : _c.find(function (hook) { return hook === backpopulate_1.default; });
                    if (hasMarker) {
                        // get the target collection
                        // @ts-ignore es-lint-disable-line
                        if (Array.isArray(field.relationTo)) {
                            for (var _g = 0, _h = field.relationTo; _g < _h.length; _g++) {
                                var relationTo = _h[_g];
                                handlePolymorphicRelationship({
                                    incomingConfig: incomingConfig,
                                    relationTo: relationTo,
                                    collection: collection,
                                    field: field,
                                });
                            }
                        }
                        else {
                            handleSimpleRelationship({
                                incomingConfig: incomingConfig,
                                relationTo: field["relationTo"],
                                collection: collection,
                                field: field,
                            });
                        }
                    }
                }
            }
        }
    }
    return incomingConfig;
};
var handleSimpleRelationship = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j;
    var _k, _l;
    var incomingConfig = _a.incomingConfig, relationTo = _a.relationTo, collection = _a.collection, field = _a.field;
    var targetCollection = (_b = incomingConfig.collections) === null || _b === void 0 ? void 0 : _b.find(function (collection) { return collection.slug === relationTo; });
    var targetFieldName = "".concat(collection.slug, "_").concat(field.name, "_backpopulated");
    // create a readonly hasMany relationship field on the target collection
    var backpopulatedField = backpopulateCollectionField({
        targetFieldName: targetFieldName,
        sourceCollectionSlug: collection.slug,
    });
    // prepare the target (backpopulated) collections by adding relationship fields to marked collections.
    targetCollection === null || targetCollection === void 0 ? void 0 : targetCollection.fields.push(backpopulatedField);
    // replace the marker hook with the actual backpopulation hook
    // remove the marker
    if (!field.hooks)
        field.hooks = { afterChange: [] };
    field.hooks.afterChange =
        (_d = (_c = field.hooks.afterChange) === null || _c === void 0 ? void 0 : _c.filter(function (hook) { return hook !== backpopulate_1.default; })) !== null && _d !== void 0 ? _d : [];
    // add the backpopulate hook
    if (targetCollection) {
        field.hooks.afterChange.push((0, backpopulate_hook_1.backpopulateAfterChangeHookFactory)({
            targetCollection: targetCollection,
            backpopulatedField: backpopulatedField,
            originalField: field,
        }));
        // the source collection also needs an afterDeleteHook to remove itself from the backpopulated fields on the target collection
        (_e = collection.hooks) !== null && _e !== void 0 ? _e : (collection.hooks = {});
        (_f = (_k = collection.hooks).afterDelete) !== null && _f !== void 0 ? _f : (_k.afterDelete = []);
        var collectionAfterDeleteHooks = ((_g = collection.hooks) === null || _g === void 0 ? void 0 : _g.afterDelete) || [];
        collection.hooks.afterDelete = __spreadArray(__spreadArray([], collectionAfterDeleteHooks, true), [
            (0, backpopulate_cleanup_hook_1.backpopulateCleanupHookFactory)({
                source_field: field.name,
                target_field: backpopulatedField.name,
                target_slug: targetCollection.slug,
            }),
        ], false);
        (_h = targetCollection.hooks) !== null && _h !== void 0 ? _h : (targetCollection.hooks = {});
        (_j = (_l = targetCollection.hooks).afterDelete) !== null && _j !== void 0 ? _j : (_l.afterDelete = []);
        targetCollection.hooks.afterDelete = __spreadArray(__spreadArray([], targetCollection.hooks.afterDelete, true), [
            (0, backpopulate_cleanup_hook_1.parentCleanupHookFactory)({
                source_field: targetFieldName,
                target_field: field.name,
                target_slug: collection.slug,
            }),
        ], false);
    }
};
var handlePolymorphicRelationship = function (_a) {
    var _b, _c, _d, _e, _f;
    var _g, _h;
    var incomingConfig = _a.incomingConfig, relationTo = _a.relationTo, collection = _a.collection, field = _a.field;
    var targetCollection = (_b = incomingConfig.collections) === null || _b === void 0 ? void 0 : _b.find(function (collection) { return collection.slug === relationTo; });
    var targetFieldName = "".concat(collection.slug, "_").concat(field.name, "_backpopulated");
    // create a readonly hasMany relationship field on the target collection
    if (targetCollection) {
        var backpopulatedField = backpopulateCollectionField({
            targetFieldName: targetFieldName,
            sourceCollectionSlug: collection.slug,
        });
        // prepare the target (backpopulated) collections by adding relationship fields to marked collections.
        targetCollection.fields.push(backpopulatedField);
        (_c = field.hooks) !== null && _c !== void 0 ? _c : (field.hooks = {});
        (_d = (_g = field.hooks).afterChange) !== null && _d !== void 0 ? _d : (_g.afterChange = []);
        // replace the marker hook with the actual backpopulation hook
        // remove the marker
        field.hooks.afterChange = field.hooks.afterChange.filter(function (hook) { return hook !== backpopulate_1.default; });
        // add the backpopulate hook
        field.hooks.afterChange.push((0, backpopulate_polymorphic_hook_1.default)({
            primaryCollection: collection,
            targetCollection: targetCollection,
            backpopulatedField: backpopulatedField,
        }));
        // the source collection also needs an afterDeleteHook to remove itself from the backpopulated fields on the target collection
        (_e = collection.hooks) !== null && _e !== void 0 ? _e : (collection.hooks = {});
        (_f = (_h = collection.hooks).afterDelete) !== null && _f !== void 0 ? _f : (_h.afterDelete = []);
        collection.hooks.afterDelete = __spreadArray(__spreadArray([], collection.hooks.afterDelete, true), [
            (0, backpopulate_cleanup_polymorphic_hook_1.backpopulatePolymorphicCleanupHookFactory)({
                source_field: field.name,
                target_field: backpopulatedField.name,
                target_slug: targetCollection.slug,
            }),
        ], false);
    }
};
var backpopulateCollectionField = function (_a) {
    /**
     * Backpopulate a single relationship field on a collection (not global).
     * This method is executed for each (polymorphic) relation.
     */
    var targetFieldName = _a.targetFieldName, sourceCollectionSlug = _a.sourceCollectionSlug;
    // create a readonly hasMany relationship field on the target collection
    var backpopulatedField = {
        name: targetFieldName,
        type: "relationship",
        relationTo: sourceCollectionSlug,
        hasMany: true,
        access: {
            create: function () { return false; },
            read: function () { return true; },
            update: function () { return false; },
        },
    };
    // prepare the target (backpopulated) collections by adding relationship fields to marked collections.
    return backpopulatedField;
};
exports.default = BackpopulatedRelationshipsPlugin;
//# sourceMappingURL=index.js.map