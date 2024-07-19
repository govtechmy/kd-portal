import { GlobalConfig } from "payload";
import link from "@/lib/fields/link";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "about_us",
      label: "About Us",
      type: "array",
      fields: [link({ labelPlaceholder: "Hubungi Kami" })],
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
      fields: [link({ labelPlaceholder: "Repo GitHub" })],
      type: "array",
    },
    {
      name: "disclaimer_section",
      label: "Disclaimer",
      type: "group",
      fields: [
        {
          name: "statement",
          type: "richText",
        },
      ],
    },
    {
      name: "privacy-policy_section",
      label: "Privacy Policy",
      type: "group",
      fields: [
        {
          name: "statement",
          type: "richText",
        },
      ],
    },
  ],
};
