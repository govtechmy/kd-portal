import type { Access, CollectionConfig } from "payload";

export const isAdmin: Access = ({ req: { user } }) => {
  return user && user.role === "admin" ? true : false;
};

export const isSelfOrAdmin: Access = ({ req: { user }, id }) => {
  return user && (user.id === id || user.role === "admin") ? true : false;
};

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
      access: {
        update: ({ req: { user } }) => {
          return user && user.role === "admin" ? true : false;
        },
        create: () => false,
      },
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
    read: isSelfOrAdmin,
    update: isSelfOrAdmin,
    delete: isAdmin,
    // admin: ({ req: { user } }) =>
    //   user && user.role === "admin" ? true : false,
  },
};
