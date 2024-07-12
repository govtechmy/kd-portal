// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { en } from "payload/i18n/en";

import PayloadCollections, { Users } from "./collections";
import GlobalCollections from "./globals";

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
    autoLogin: {
      email: "dev@payloadcms.com",
      password: "abc123",
      prefillOnly: true,
    },
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
        },
      });
    }
  },
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
});
