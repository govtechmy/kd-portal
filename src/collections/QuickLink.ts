// @ts-nocheck
import link from "@/lib/fields/link";
import { revalidateCollection } from "@/lib/hooks/revalidatePath";
import { CollectionConfig, Option } from "payload";

const QuickLinkOptions: Option[] = [
  {
    label: "Social Media",
    value: "social",
  },
  {
    label: "Quick Links",
    value: "quick_links",
  },
];

export const QuickLink: CollectionConfig = {
  slug: "quick-link",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  hooks: {
    afterChange: [revalidateCollection("HOME")],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      options: QuickLinkOptions,
    },
    {
      name: "description",
      type: "text",
      localized: true,
    },
    {
      name: "href",
      fields: [link({ forceCustomUrl: true, disableLabel: true })],
      maxRows: 1,
      type: "array",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
      validate: async (value, { data }) => {
        if (data.type === "quick_links" && !value) {
          return "Upload image for the quick link";
        }
        return true;
      },
    },
  ],
};
