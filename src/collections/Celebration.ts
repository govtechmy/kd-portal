import { CollectionConfig, Option } from "payload";

const HeroBannerType: Option[] = [
  {
    label: "Desktop",
    value: "desktop",
  },
  {
    label: "Mobile",
    value: "mobile",
  },
];

export const Celebration: CollectionConfig = {
  slug: "celebration",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    description:
      "Hero Banner for celebration. This collection meant for celebration in Malaysia designed for use in hero banner in home page.",
  },
  fields: [
    {
      name: "title",
      label: "Celebration Title",
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "top-gradient",
          label: "Top Gradient Color",
          admin: {
            description: "Add the top gradient color. Use #FFFFFF",
          },
          type: "text",
          required: true,
        },
        {
          name: "middle-gradient",
          label: "Middle Gradient Color",
          admin: {
            description: "Add the middle gradient color. Use #FFFFFF",
          },
          type: "text",
          required: true,
        },
        {
          name: "bottom-gradient",
          label: "Bottom Gradient Color",
          admin: {
            description: "Add the bottom gradient color. Use #FFFFFF",
          },
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "group",
      name: "desktop",
      label: "Desktop Version",
      admin: {
        description:
          "This is the desktop design. Fill in the fields accordingly for desktop design",
      },
      fields: [
        {
          name: "file_desktop",
          label: "Desktop Version File",
          type: "upload",
          relationTo: "hero-banner",
          required: true,
          hasMany: false,
        },
        {
          name: "type",
          label: "Screen Type",
          type: "radio",
          required: true,
          options: HeroBannerType,
          defaultValue: "desktop",
          admin: {
            disabled: true,
          },
        },
      ],
    },
    {
      type: "group",
      name: "mobile",
      label: "Mobile Version",
      admin: {
        description:
          "This is the mobile design. Fill in the fields accordingly for mobile design",
      },
      fields: [
        {
          name: "file_mobile",
          label: "Mobile Version File",
          type: "upload",
          relationTo: "hero-banner",
          required: true,
          hasMany: false,
        },
        {
          name: "type",
          label: "Screen Type",
          type: "radio",
          required: true,
          options: HeroBannerType,
          defaultValue: "mobile",
          admin: {
            disabled: true,
          },
        },
      ],
    },
  ],
};
