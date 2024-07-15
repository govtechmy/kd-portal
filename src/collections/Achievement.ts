import { CollectionConfig, Option } from "payload";

// TODO: Update this
const AchievementType: Option[] = [
  {
    label: "Announcement",
    value: "announcement",
  },
  {
    label: "Media Broadcast",
    value: "media_broadcast",
  },
];

export const Achievement: CollectionConfig = {
  slug: "achievement",
  labels: {
    singular: "Achievement",
    plural: "Achievements",
  },
  fields: [
    {
      name: "title",
      label: "Achievement Title",
      type: "text",
      required: true,
      localized: true,
      admin: {
        placeholder: "Kempen Kesedaran Keselamatan",
      },
    },
    {
      name: "type",
      label: "Achievement Type",
      type: "select",
      required: true,
      options: AchievementType,
    },
    {
      name: "date",
      label: "Achievement Date",
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
        placeholder: "Brief description about this achievement",
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
      name: "isFlagged",
      label: "Flag this achievement",
      type: "checkbox",
      admin: {
        position: "sidebar",
      },
      defaultValue: false,
    },
    {
      name: "achievement_file",
      label: "Attachment File",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
