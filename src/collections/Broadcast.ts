import { CollectionConfig, Option } from "payload";

const BroadcastType: Option[] = [
  {
    label: "Announcement",
    value: "announcement",
  },
  {
    label: "Media Broadcast",
    value: "media_broadcast",
  },
];

export const Broadcast: CollectionConfig = {
  slug: "broadcast",
  labels: {
    singular: "Broadcast",
    plural: "Broadcasts",
  },
  fields: [
    {
      name: "title",
      label: "Broadcast Title",
      type: "text",
      required: true,
      localized: true,
      admin: {
        placeholder: "Pelancaran Inisiatif 5G Nasional",
      },
    },
    {
      name: "type",
      label: "Broadcast Type",
      type: "select",
      required: true,
      options: BroadcastType,
    },
    {
      name: "date",
      label: "Broadcast Date",
      type: "date",
      required: true,
    },
    {
      name: "description",
      label: "Short Description",
      type: "textarea",
      required: true,
      localized: true,
      maxLength: 140,
      admin: {
        placeholder: "Brief description about this broadcast",
        rows: 2,
      },
    },
    {
      name: "broadcast_text",
      label: "Broadcast Content",
      type: "richText",
      required: true,
      localized: true,
    },
    // Side-bar
    {
      name: "isPin",
      label: "Pin this broadcast",
      type: "checkbox",
      admin: {
        position: "sidebar",
      },
      defaultValue: false,
    },
    {
      name: "broadcast_file",
      label: "Attachment File",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
