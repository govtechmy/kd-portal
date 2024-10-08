import { routes } from "@/lib/routes";
import {
  BeforeSync,
  FieldsOverride,
} from "node_modules/@payloadcms/plugin-search/dist/types";
import { CollectionConfig } from "payload";

export const SearchOverride: {
  fields?: FieldsOverride;
} & Partial<Omit<CollectionConfig, "fields">> = {
  fields: ({ defaultFields }) => [...defaultFields],
};

export const SearchBeforeSync: BeforeSync = ({ originalDoc, searchDoc }) => {
  return {
    ...searchDoc,
    title: originalDoc[getSearchTitle(searchDoc.doc.relationTo)],
  };
};

export const includedSearchCollection = [
  "achievement",
  "broadcast",
  "staff-directory",
  "policy",
];

const getSearchTitle = (slug: string) => {
  switch (slug) {
    case "staff-directory":
      return "nama";
    case "policy":
      return "doc_name";

    default:
      return "title";
  }
};

export const getGroupData = (slug: string) => {
  switch (slug) {
    case "staff-directory":
      return {
        name: "directory",
        route: routes.DIRECTORY,
      };
    case "policy":
      return {
        name: "policy",
        route: routes.POLICY,
      };
    case "achievement":
      return {
        name: "achievements",
        route: routes.ACHIEVEMENTS,
      };
    case "broadcast":
      return {
        name: "announcements",
        route: routes.ANNOUNCEMENTS,
      };

    default:
      undefined;
  }
};
