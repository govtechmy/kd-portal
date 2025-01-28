import { CollectionConfig } from "payload";

export const HeroBanner: CollectionConfig = {
  slug: "hero-banner",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "filename",
    description:
      "This is the file upload collection meant for Celebration collection.",
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
    staticDir: "banner",
    mimeTypes: ["image/png", "image/svg+xml"],
  },
};
