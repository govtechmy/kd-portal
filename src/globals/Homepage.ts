import { revalidateGlobal } from "@/lib/hooks/revalidatePath";
import { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal("HOME")],
  },
  fields: [
    {
      name: "featured_achievements",
      label: "Featured Achievements",
      type: "array",
      maxRows: 7,
      required: true,
      fields: [
        {
          name: "achievements",
          type: "relationship",
          relationTo: "achievement",
          required: true,
          filterOptions: () => {
            return { type: { equals: "not_achievement" } };
          },
        },
      ],
    },
    {
      name: "quick_links",
      label: "Quick Links",
      type: "array",
      required: true,
      fields: [
        {
          name: "links",
          type: "relationship",
          relationTo: "quick-link",
          required: true,
          // filterOptions: () => {
          //   return { type: { equals: "quick_links" } };
          // },
        },
      ],
    },
  ],
};
