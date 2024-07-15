import { GlobalConfig } from "payload";

export const InfoKorporat: GlobalConfig = {
  slug: "info-korporat",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "vision",
      type: "group",
      admin: {
        hideGutter: true,
      },
      fields: [
        {
          type: "row",
          admin: {
            className: "w-1/2",
          },
          fields: [
            {
              name: "statement",
              label: "Vision Statement",
              type: "textarea",
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "mission",
      type: "group",
      admin: {
        hideGutter: true,
      },
      fields: [
        {
          type: "row",
          admin: {
            className: "w-1/2",
          },
          fields: [
            {
              name: "statement",
              label: "Mission Statement",
              type: "textarea",
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "functions_and_role",
      label: "Functions And Role",
      type: "array",
      maxRows: 6,
      required: true,
      fields: [
        {
          type: "row",
          admin: {
            className: "w-1/2",
          },
          fields: [
            {
              name: "statement",
              label: "Statement",
              type: "textarea",
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "leaders",
      type: "array",
      maxRows: 5,
      required: true,
      fields: [
        {
          name: "staff",
          type: "relationship",
          relationTo: "staff-directory",
          required: true,
        },
      ],
    },
    {
      name: "latar-belakang",
      type: "richText",
      required: true,
      localized: true,
    },
  ],
};
