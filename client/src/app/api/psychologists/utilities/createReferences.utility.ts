import { findDocumentByName } from "./findDocumentByName.utility";
import { sanityClient } from "@/api";

export const createReferences = async (items, referenceArray, type, key) => {
  let itemsArr = [];

  if (!Array.isArray(items)) itemsArr = items.trim().split(",");

  const references = await Promise.all(
    itemsArr.map(async (item) => {
      let doc = findDocumentByName(referenceArray, item);
      if (!doc) {
        doc = await sanityClient.create({
          _type: type,
          [key]: item,
        });
        console.log(`Created new ${type} document: ${item}`);
        if (doc._id) return { _type: "reference", _ref: doc._id };
      }
      if (doc._id) return { _type: "reference", _ref: doc._id };
    })
  );
  return references;
};
