import { FieldHook } from "payload/types";
import { SimpleHookArgs } from "../types";
export declare const backpopulateAfterChangeHookFactory: ({ targetCollection, backpopulatedField, originalField, }: SimpleHookArgs) => FieldHook<any, any, any>;
