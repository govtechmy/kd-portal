import { CollectionConfig } from "payload";

export const Feedback: CollectionConfig = {
  slug: "feedback",
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: () => true,
    read: () => true, // TODO: restrict to admin
    update: () => true, // TODO: restrict to admin
    delete: () => true, // TODO: restrict to admin
  },
  fields: [
    {
      name: "type",
      type: "select",
      options: [
        { label: "Aduan", value: "aduan" },
        { label: "Pertanyaan", value: "pertanyaan" },
        { label: "Cadangan", value: "cadangan" },
      ],
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "ic_number",
      type: "text",
      required: true,
    },
    {
      name: "address",
      type: "textarea",
      required: true,
    },
    {
      name: "phone_country_code",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "agency",
      type: "text",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
  ],
}; 