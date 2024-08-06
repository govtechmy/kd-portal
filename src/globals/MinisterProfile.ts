import IconListOptions from "@/icons";
import { revalidateGlobal } from "@/lib/hooks/revalidatePath";
import { GlobalConfig } from "payload";

export const MinisterProfile: GlobalConfig = {
  slug: "profil-kementerian",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal("MINISTRY_PROFILE")],
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
          fields: [
            {
              name: "statement",
              label: "Vision Statement",
              type: "textarea",
              localized: true,
              required: true,
              admin: {
                className: "w-1/2",
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "icon",
                  label: "Icon",
                  type: "select",
                  required: true,
                  options: IconListOptions,
                  admin: {
                    className: "w-1/2",
                  },
                },
              ],
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
          fields: [
            {
              name: "statement",
              label: "Mission Statement",
              type: "textarea",
              localized: true,
              required: true,
              admin: {
                className: "w-1/2",
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "icon",
                  label: "Icon",
                  type: "select",
                  required: true,
                  options: IconListOptions,
                  admin: {
                    className: "w-1/2",
                  },
                },
              ],
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
          fields: [
            {
              name: "statement",
              label: "Statement",
              type: "richText",
              localized: true,
              required: true,
              admin: {
                className: "w-1/2",
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "icon",
                  label: "Icon",
                  type: "select",
                  required: true,
                  options: IconListOptions,
                  admin: {
                    className: "w-1/2",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "leaders",
      type: "array",
      maxRows: 5,
      // required: true,
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
      // required: true,
      localized: true,
    },
  ],
};
