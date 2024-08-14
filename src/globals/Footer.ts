import { GlobalConfig } from "payload";
import link from "@/lib/fields/link";
import {
  revalidateCollection,
  revalidateGlobal,
} from "@/lib/hooks/revalidatePath";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      revalidateGlobal("HOME"),
      revalidateGlobal("POLICY"),
      revalidateGlobal("DISCLAIMER"),
    ],
  },
  fields: [
    {
      name: "about_us",
      label: "About Us",
      type: "array",
      fields: [
        link({ labelPlaceholder: "Hubungi Kami", localizedLabel: true }),
      ],
    },
    {
      name: "quick-links",
      fields: [
        {
          name: "quick-links",
          type: "relationship",
          relationTo: "quick-link",
          // filterOptions: () => {
          //   return { type: { equals: "quick_links" } };
          // },
        },
      ],
      type: "array",
    },
    {
      name: "open-source",
      fields: [link({ labelPlaceholder: "Repo GitHub", localizedLabel: true })],
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
          localized: true,
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
          localized: true,
        },
      ],
    },
  ],
};
