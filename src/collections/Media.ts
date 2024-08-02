import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "filename",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "caption",
      label: "Image Caption",
      type: "text",
      localized: true,
    },
  ],
  upload: {
    staticDir: "media",
    mimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    formatOptions: {
      format: "webp",
      options: {
        quality: 40,
      },
    },
  },
};
