import { CollectionConfig, Option } from "payload";

export const AchievementType: Option[] = [
  {
    label: "Product Launch",
    value: "product_launch",
  },
  {
    label: "Policy",
    value: "policy",
  },
  {
    label: "Collaboration",
    value: "collaboration",
  },
  {
    label: "Miscellaneous",
    value: "miscellaneous",
  },
];

export const Achievement: CollectionConfig = {
  slug: "achievement",
  labels: {
    singular: "Achievement",
    plural: "Achievements",
  },
  admin: {
    useAsTitle: "title",
    listSearchableFields: ["title", "description", "type"],
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
      admin: {
        date: {
          maxDate: new Date(),
          displayFormat: "d MMM yyy",
        },
      },
      required: true,
    },
    {
      name: "description",
      label: "Short Description",
      type: "textarea",
      required: true,
      localized: true,
      maxLength: 240,
      admin: {
        placeholder: "Brief description about this achievement",
        rows: 3,
      },
    },
    {
      name: "content_text",
      label: "Content",
      type: "richText",
      // required: true,
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
