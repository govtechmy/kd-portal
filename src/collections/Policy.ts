import { revalidatePolicy } from "@/lib/hooks/revalidatePath";
import { CollectionConfig, Option } from "payload";

export const PolicyType: Option[] = [
  {
    label: "Act",
    value: "act",
  },
  {
    label: "Policy Document",
    value: "document",
  },
  {
    label: "Guideline",
    value: "guideline",
  },
  {
    label: "Circular",
    value: "circular",
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
  versions: {
    drafts: true,
  },
  admin: {
    defaultColumns: ["id", "doc_name", "doc_type", "doc_date", "_status"],
    listSearchableFields: ["doc_name", "doc_type", "doc_description"],
  },
  hooks: {
    afterChange: [revalidatePolicy],
  },
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
      options: PolicyType,
      required: true,
    },
    {
      name: "doc_description",
      label: "Document Description",
      type: "textarea",
      required: true,
      admin: {
        rows: 3,
      },
    },
    {
      name: "doc_date",
      label: "Document Date",
      type: "date",
      required: true,
    },
    {
      name: "file_upload",
      label: "File",
      type: "upload",
      relationTo: "file",
      required: true,
    },
  ],
};
