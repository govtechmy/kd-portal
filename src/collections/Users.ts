import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "role",
      type: "select",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
      defaultValue: "user",
    },
  ],
  access: {
    read: ({ req: { user } }) => (user && user.role === "admin" ? true : false),
    update: ({ req: { user } }) =>
      user && user.role === "admin" ? true : false,
    delete: ({ req: { user } }) =>
      user && user.role === "admin" ? true : false,
  },
};
