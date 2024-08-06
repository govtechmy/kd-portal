import { GlobalConfig } from "payload";
import link from "@/lib/fields/link";
import { revalidateGlobal } from "@/lib/hooks/revalidatePath";

export const Header: GlobalConfig = {
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal("HOME")],
  },
  fields: [
    {
      name: "items",
      label: "Header Items",
      required: true,
      fields: [link({ labelPlaceholder: "Home", localizedLabel: true })],
      maxRows: 7,
      type: "array",
    },
    {
      name: "dropdown",
      label: "Header Dropdown",
      type: "group",
      fields: [
        {
          name: "name",
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "dept_agency",
          label: "Departments & Agencies",
          fields: [
            link({
              forceCustomUrl: true,
              labelPlaceholder: "MyDigital Corporation",
              localizedLabel: true,
            }),
          ],
          type: "array",
        },
      ],
    },
  ],
  slug: "header",
};
