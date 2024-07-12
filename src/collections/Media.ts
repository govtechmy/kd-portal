import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },

  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      label: "Image Caption",
      type: "text",
    },
  ],
  upload: {
    staticDir: "media",
    formatOptions: {
      format: "webp",
      options: {
        quality: 40,
      },
    },
  },
};
