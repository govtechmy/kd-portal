// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { searchPlugin } from "@payloadcms/plugin-search";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { en } from "payload/i18n/en";
import StaffDirectory from "@/lib/resources/directory_kd.json";
import groupBy from "lodash/groupBy";
import PayloadCollections, { Users, SearchOverride } from "./collections";
import GlobalCollections from "./globals";
import {
  includedSearchCollection,
  SearchBeforeSync,
} from "./collections/Search-Overrides";
import { s3Storage } from "@payloadcms/storage-s3";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  collections: PayloadCollections,
  globals: GlobalCollections,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  i18n: {
    supportedLanguages: { en },
  },
  localization: {
    locales: [
      {
        label: "Bahasa Melayu",
        code: "ms-MY",
      },
      {
        label: "English",
        code: "en-GB",
      },
    ],
    defaultLocale: "ms-MY",
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  admin: {
    user: Users.slug,
    ...(process.env.APP_ENV !== "production" && {
      autoLogin: {
        email: "dev@payloadcms.com",
        password: "abc123",
        prefillOnly: true,
      },
    }),
  },
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: "users",
      limit: 1,
    });

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: "users",
        data: {
          email: "dev@payloadcms.com",
          password: "abc123",
          role: "admin",
        },
      });
    }

    // To pre-populate staff-directory and kd-departments
    const existingDept = await payload.find({
      collection: "kd-department",
      limit: 1,
    });

    const existingStaff = await payload.find({
      collection: "staff-directory",
      limit: 1,
    });

    if (existingDept.docs.length === 0 && existingStaff.docs.length === 0) {
      const collection = groupBy(StaffDirectory, (item) => item.id_bhg);

      const _kdDept = await Promise.all(
        Object.entries(collection).map(async ([key, value]) => {
          const dept = await payload.create({
            collection: "kd-department",
            data: {
              id_bhg: Number(key),
              bhg: value[0].bhg,
            },
          });
          return dept;
        }),
      );

      const createStaffDirectory = async () => {
        for (const staff of StaffDirectory) {
          const { bhg, id, id_bhg, ...rest } = staff;
          const selectDept = _kdDept.find((dept) => dept.id_bhg === id_bhg);

          if (selectDept) {
            await payload.create({
              collection: "staff-directory",
              data: {
                staff_id: id,
                id_bhg: selectDept.id,
                ...rest,
              },
            });
          }
        }
      };

      await createStaffDirectory();
    }
  },
  sharp,
  plugins: [
    searchPlugin({
      collections: includedSearchCollection,
      searchOverrides: SearchOverride,
      defaultPriorities: {
        achievement: 10,
        broadcast: 20,
        "staff-directory": 30,
        policy: 40,
      },
      beforeSync: SearchBeforeSync,
    }),
    s3Storage({
      collections: {
        ["media"]: true,
        ["file"]: true,
      },
      bucket: process.env.S3_BUCKET,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
        region: process.env.S3_REGION,
      },
    }),
  ],
});
