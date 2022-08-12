import payload from "payload";
import { FieldHook } from "payload/types";
import { hookArgs } from "./backpopulate";

export const backpopulatePolymorphicHookFactory = ({
  targetCollection,
  backpopulatedField,
}: hookArgs) => {
  const hook: FieldHook = async (args) => {
    const { operation, originalDoc, value } = args;

    if (operation === "create" || operation === "update") {
      const allTargetDocuments = await payload.find({
        collection: targetCollection.slug,
        overrideAccess: true,
        depth: 1,
      });

      for (let targetDocument of allTargetDocuments.docs) {
        let updatedReferenceIds;

        for (let polymorphicEntry of value) {
          if (polymorphicEntry.relationTo !== originalDoc.collection.slug)
            continue;
          if (polymorphicEntry.value === targetDocument.id) {
            // this is one of the referenced documents, we want to append ourselves to the field, but only once
            const prevReferencedIds = targetDocument[
              backpopulatedField["name"]
            ].map((doc) => doc.id);
            updatedReferenceIds = Array.from(
              new Set([...prevReferencedIds, originalDoc.id])
            );
          } else {
            // this document is not referenced (any more) make sure the originalDoc is not included in the target field
            const prevReferencedIds = targetDocument[
              backpopulatedField["name"]
            ].map((doc) => doc.id);
            updatedReferenceIds = Array.from(new Set(prevReferencedIds)).filter(
              (id) => id && id !== originalDoc.id
            );
          }
          await payload.update({
            collection: targetCollection.slug,
            id: targetDocument.id,
            overrideAccess: true,
            data: {
              [backpopulatedField["name"]]: updatedReferenceIds,
            },
          });
        }
      }
    }

    return value;
  };

  return hook;
};

export default backpopulatePolymorphicHookFactory;