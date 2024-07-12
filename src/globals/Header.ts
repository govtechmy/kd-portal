import { GlobalConfig } from "payload";
import link from "@/lib/fields/link";

export const Header: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "headerItems",
      fields: [link()],
      maxRows: 6,
      localized: true,
      type: "array",
    },
  ],
  slug: "header",
};
