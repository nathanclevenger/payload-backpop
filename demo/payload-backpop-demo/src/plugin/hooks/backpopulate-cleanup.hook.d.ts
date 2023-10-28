import { AfterDeleteHook } from "payload/dist/collections/config/types";
export interface BackpopulateCleanupHookArgs {
    source_field: string;
    target_slug: string;
    target_field: string;
}
export declare const backpopulateCleanupHookFactory: ({ source_field, target_field, target_slug, }: BackpopulateCleanupHookArgs) => AfterDeleteHook;
export declare const parentCleanupHookFactory: ({ source_field, target_field, target_slug, }: BackpopulateCleanupHookArgs) => AfterDeleteHook;
