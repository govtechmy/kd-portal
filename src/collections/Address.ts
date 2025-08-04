import { CollectionConfig } from "payload";

export const KDAddresses: CollectionConfig = {
  slug: "kd-addresses",
  labels: {
    singular: "Address",
    plural: "Addresses",
  },
  admin: {
    useAsTitle: "region",
    defaultColumns: ["region"],
  },
  fields: [
    {
      name: "region",
      label: "Region",
      type: "select",
      required: true,
      unique: true,
      options: [
        { label: "Putrajaya", value: "putrajaya" },
        { label: "Sabah", value: "sabah" },
        { label: "Sarawak", value: "sarawak" },
      ],
    },
    {
      name: "address",
      label: "Full Address",
      type: "textarea",
      required: true,
    },
  ],
};
