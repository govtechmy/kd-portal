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

export const KDPolicy: CollectionConfig = {
  slug: "policy",
  labels: {
    singular: "Policy",
    plural: "Policies",
  },
  defaultSort: "doc_date",
  timestamps: true,
  fields: [
    {
      name: "doc_name",
      label: "Document Name",
      type: "text",
      required: true,
    },
    {
      name: "doc_type",
      label: "Document Type",
      type: "select",
      options: QuickLinkOptions,
      required: true,
    },
    {
      name: "doc_description",
      label: "Document Description",
      type: "textarea",
      admin: {
        rows: 3,
      },
    },
    {
      name: "doc_date",
      label: "Document Date",
      type: "date",
    },
    {
      name: "file",
      label: "File",
      type: "upload",
      relationTo: "file",
    },
  ],
};
