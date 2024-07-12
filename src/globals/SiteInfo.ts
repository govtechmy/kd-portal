import { GlobalConfig } from "payload";
import link from "@/lib/fields/link";
import { socialMediaOptions } from "@/lib/constants/links";

export const SiteInfo: GlobalConfig = {
  slug: "site-info",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "site_name",
      label: "Site Name",
      type: "text",
      required: true,
      localized: true,
      admin: {
        width: "50%",
      },
    },
    {
      name: "address",
      type: "textarea",
      required: true,
      admin: {
        rows: 5,
        width: "50%",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "no_tel",
          label: "Phone Number",
          type: "text",
          required: true,
          admin: {
            width: "50%",
          },
        },
        {
          name: "email",
          type: "text",
          required: true,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "social_media",
      label: "Social Media",
      fields: [
        {
          name: "social",
          type: "select",
          required: true,
          admin: {
            width: "50%",
          },
          options: socialMediaOptions,
        },
        link({ forceCustomUrl: true }),
      ],
      maxRows: 4,
      type: "array",
    },
  ],
};
