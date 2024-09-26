import { findDocumentByName } from "./findDocumentByName.utility";
import { sanityClient } from "@/api";
import { v4 as uuidv4 } from "uuid";

export const createReferences = async (items, referenceArray, type, key) => {
  let itemsArr = Array.isArray(items) ? items : items.trim().split(",");

  const references = await Promise.all(
    itemsArr.map(async (item) => {
      let doc = findDocumentByName(referenceArray, item);
      if (!doc) {
        doc = await sanityClient.create({
          _type: type,
          [key]: item,
        });
        console.log(`Created new ${type} document: ${item}`);
      }
      if (doc._id) {
        return {
          _key: uuidv4(),
          _type: "reference",
          _ref: doc._id,
        };
      }
    })
  );
  return references.filter(Boolean);
};
