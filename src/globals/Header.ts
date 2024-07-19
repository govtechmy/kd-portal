import { GlobalConfig } from "payload";
import link from "@/lib/fields/link";

export const Header: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "items",
      label: "Header Items",
      required: true,
      fields: [link({ labelPlaceholder: "Home" })],
      maxRows: 6,
      type: "array",
    },
  ],
  slug: "header",
};
