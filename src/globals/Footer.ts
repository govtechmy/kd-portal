import { GlobalConfig } from "payload";
import link from "@/lib/fields/link";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "about-us",
      fields: [link()],
      type: "array",
    },
    {
      name: "quick-links",
      fields: [
        {
          name: "quick-links",
          type: "relationship",
          relationTo: "quick-link",
          filterOptions: () => {
            return { type: { equals: "social" } };
          },
        },
      ],
      type: "array",
    },
    {
      name: "open-source",
      fields: [link()],
      type: "array",
    },
  ],
};
