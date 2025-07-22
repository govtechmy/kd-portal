// @ts-nocheck
import { socialMediaOptions } from "@/lib/constants/links";
import link from "@/lib/fields/link";
import { revalidateCollection } from "@/lib/hooks/revalidatePath";
import { CollectionConfig } from "payload";
import fs from "fs";
import path from "path";

export const KDDepartment: CollectionConfig = {
  slug: "kd-department",
  labels: {
    singular: "Department",
    plural: "Departments",
  },
  admin: {
    useAsTitle: "bhg",
    listSearchableFields: ["bhg"],
  },
  defaultSort: "id_bhg",
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
    defaultColumns: ["nama", "staff_id", "jawatan", "emel", "ecard"],
    listSearchableFields: ["nama", "jawatan", "emel"],
  },
  defaultSort: "id",
  timestamps: true,
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (!["create", "update"].includes(operation)) return data;
        if (data.staff_id <= 0) return data;

        const safeName = (data.nama || "staff")
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9_-]/g, "");
        const timestamp = Date.now();
        const filename = `${safeName}_${timestamp}.vcf`;

        const [firstName = "", lastName = ""] = (data.nama || "")
          .split(" ")
          .reduce(
            (acc, word, idx, arr) => {
              if (idx === arr.length - 1) acc[1] = word;
              else acc[0] += word + " ";
              return acc;
            },
            ["", ""],
          );

        const vcfContent = `BEGIN:VCARD
VERSION:3.0
N:${lastName.trim()};${firstName.trim()};;;
FN:${data.nama || ""}
ORG:Kementerian Digital
TITLE:${data.jawatan || ""}
TEL;TYPE=CELL:${data.telefon || ""}
EMAIL:${data.emel || ""}
ADR;TYPE=WORK:;;${data.alamat || ""};;;;
URL:${data.laman || ""}
END:VCARD`;

        const outputDir = path.join(process.cwd(), "e-cards");
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

        const vcfPath = path.join(outputDir, filename);
        fs.writeFileSync(vcfPath, vcfContent);

        const uploaded = await req.payload.create({
          collection: "ecards",
          filePath: vcfPath,
          data: {
            description: `vCard for ${data.nama}`,
          },
        });

        return {
          ...data,
          eCard: uploaded.id, // Inject into current mutation
        };
      },
    ],

    afterChange: [
      revalidateCollection("DIRECTORY"),
      async ({ req, operation, previousDoc, doc }) => {
        if (!["create", "update"].includes(operation)) return;

        const oldECardId =
          typeof previousDoc?.eCard === "object"
            ? previousDoc?.eCard?.id
            : previousDoc?.eCard;
        const newECardId =
          typeof doc?.eCard === "object" ? doc?.eCard?.id : doc?.eCard;

        if (oldECardId && oldECardId !== newECardId) {
          await req.payload.delete({
            collection: "ecards",
            id: oldECardId,
          });
        }
      },
    ],
  },
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
        return true;
      },
    },
    {
      name: "laman",
      label: "website",
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
      name: "eCard",
      label: "E-Card",
      type: "upload",
      relationTo: "ecards",
      admin: {
        description: "Auto-generated .vcf card for download",
      },
      access: {
        create: () => false,
        update: () => false,
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
        link({ forceCustomUrl: true, labelPlaceholder: "KemDigitalMsia" }),
      ],
    },
  ],
};
