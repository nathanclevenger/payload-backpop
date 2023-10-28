import { FieldHook } from "payload/types";
import { PolymorphicHookArgs } from "../types";
export declare const backpopulatePolymorphicHookFactory: ({ primaryCollection, targetCollection, backpopulatedField, }: PolymorphicHookArgs) => FieldHook<any, any, any>;
export default backpopulatePolymorphicHookFactory;
