import { GlobalConfig } from "payload";
import link from "@/lib/fields/link";

export const InfoKorporat: GlobalConfig = {
  slug: "info-korporat",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "latar-belakang",
      type: "richText",
      required: true,
      localized: true,
    },
  ],
};
