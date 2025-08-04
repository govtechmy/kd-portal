import { GlobalConfig } from "payload";

export const Addresses: GlobalConfig = {
  slug: "addresses",
  label: "Addresses",
  admin: {
    description:
      "This is for the e-card address. Please use a single line for the address; the frontend will handle the rendering.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "putrajaya",
      label: "Putrajaya Address",
      type: "textarea",
      required: true,
    },
    {
      name: "sabah",
      label: "Sabah Address",
      type: "textarea",
      required: true,
    },
    {
      name: "sarawak",
      label: "Sarawak Address",
      type: "textarea",
      required: true,
    },
  ],
};
