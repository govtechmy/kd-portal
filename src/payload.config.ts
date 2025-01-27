import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { searchPlugin } from "@payloadcms/plugin-search";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { en } from "payload/i18n/en";
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
  editor: lexicalEditor({}),
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
  },
  sharp,
  plugins: [
    searchPlugin({
      collections: includedSearchCollection,
      searchOverrides: SearchOverride,
      localize: false,
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
