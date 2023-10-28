import { Config } from "payload/config";
import { CollectionConfig, Field, RelationshipField } from "payload/types";
export type locale = string;
export type BackpopPluginConfig = {};
export type SimpleRelationshipArgs = {
    incomingConfig: Partial<Config>;
    relationTo: string;
    collection: CollectionConfig;
    field: RelationshipField;
};
export type PolymorphicRelationshipArgs = {
    incomingConfig: Partial<Config>;
    relationTo: string;
    collection: CollectionConfig;
    field: RelationshipField;
};
export type SimpleHookArgs = {
    targetCollection: CollectionConfig;
    backpopulatedField: Field & {
        name: string;
    };
    originalField: Field & {
        name: string;
    };
};
export type PolymorphicHookArgs = {
    primaryCollection: CollectionConfig;
    targetCollection: CollectionConfig;
    backpopulatedField: Field & {
        name: string;
    };
};
export declare const traversableFieldTypes: string[];
