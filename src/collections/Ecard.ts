// collections/e-cards.ts
import { CollectionConfig } from "payload";

const ECards: CollectionConfig = {
  slug: "ecards",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "filename",
  },
  upload: {
    staticDir: "e-cards",
    mimeTypes: ["text/vcard", "text/x-vcard", "application/vcard"],
  },
  fields: [
    {
      name: "description",
      label: "Description",
      type: "text",
    },
  ],
};

export default ECards; // ✅ This is the key fix
