import { socialMediaOptions } from "@/lib/constants/links";
import link from "@/lib/fields/link";
import { CollectionConfig } from "payload";

export const KDDepartment: CollectionConfig = {
  slug: "kd-department",
  labels: {
    singular: "Department",
    plural: "Departments",
  },
  admin: {
    useAsTitle: "bhg",
  },
  fields: [
    {
      name: "id_bhg",
      label: "Department ID",
      type: "number",
      unique: true,
      required: true,
    },
    {
      name: "bhg",
      label: "Department Name",
      type: "text",
      required: true,
    },
  ],
};

export const KDDirectory: CollectionConfig = {
  slug: "staff-directory",
  labels: {
    singular: "Directory",
    plural: "Directories",
  },
  admin: {
    defaultColumns: ["id_bhg", "staff_id", "nama", "gred", "jawatan"],
  },
  defaultSort: "id_bhg",
  timestamps: true,
  fields: [
    {
      name: "id_bhg",
      label: "Department ID",
      type: "relationship",
      relationTo: "kd-department",
      required: true,
      admin: {
        allowCreate: false,
      },
    },
    {
      name: "staff_id",
      label: "ID Staff",
      type: "number",
      required: true,
      admin: {
        description: "Use 0 for vacant position and -1 for department section",
      },
    },
    {
      name: "nama",
      label: "Name",
      type: "text",
      validate: async (value, { data, ...rest }) => {
        if (!value) {
          return "Insert a value";
        }
        if (data.staff_id === 0 && value !== "-") {
          return "Use '-' when ID is 0";
        }
        if (data.staff_id === -1 && (!value || value === "-")) {
          return "Insert section name";
        }
        return true;
      },
    },
    {
      name: "gred",
      label: "Grade",
      type: "text",
      validate: async (value, { data, ...rest }) => {
        if (data.staff_id === -1 && value) {
          return "Leave blank when ID is -1";
        }
        return true;
      },
    },
    {
      name: "jawatan",
      label: "Position",
      type: "text",
      validate: async (value, { data, ...rest }) => {
        if (data.staff_id === -1 && value) {
          return "Leave blank when ID is -1";
        }
        return true;
      },
    },
    {
      name: "telefon",
      label: "Phone Number",
      type: "text",
      validate: async (value, { data, ...rest }) => {
        if (data.staff_id === 0 && value !== "-") {
          return "Use '-' when ID is 0";
        }
        if (data.staff_id === -1 && value) {
          return "Leave blank when ID is -1";
        }
        return true;
      },
    },
    {
      name: "emel",
      label: "Email",
      type: "text",
      validate: async (value, { data, ...rest }) => {
        if (data.staff_id === 0 && value !== "-") {
          return "Use '-' when ID is 0";
        }
        if (data.staff_id === -1 && value) {
          return "Leave blank when ID is -1";
        }
        return true;
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "social_media",
      label: "Social Media",
      type: "array",
      maxRows: 4,
      fields: [
        {
          name: "social",
          type: "select",
          required: true,
          admin: {
            width: "50%",
          },
          options: socialMediaOptions,
        },
        link({ forceCustomUrl: true }),
      ],
    },
  ],
};
