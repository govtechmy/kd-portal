import type { CollectionConfig } from "payload";

export const File: CollectionConfig = {
  slug: "file",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "filename",
  },
  fields: [
    {
      name: "filename",
      label: "File Name",
      type: "text",
      required: true,
    },
  ],
  upload: {
    staticDir: "file",
    mimeTypes: [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.ms-excel",
      "application/vnd.ms-powerpoint",
    ],
  },
};
