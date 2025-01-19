import {
  revalidateCollection,
  revalidateDeleteCollection,
} from "@/lib/hooks/revalidatePath";
import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";
import { CollectionConfig, Option } from "payload";

const BroadcastType: Option[] = [
  {
    label: "Announcement",
    value: "announcement",
  },
  {
    label: "Media Release",
    value: "media_release",
  },
  {
    label: "Speech Collection",
    value: "speech",
  },
];

export const Broadcast: CollectionConfig = {
  slug: "broadcast",
  labels: {
    singular: "Broadcast",
    plural: "Broadcasts",
  },
  admin: {
    listSearchableFields: ["title", "description", "type"],
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [
      revalidateCollection("HOME"),
      revalidateCollection("ANNOUNCEMENTS"),
    ],
    afterDelete: [revalidateDeleteCollection("HOME")],
  },
  fields: [
    {
      name: "title",
      label: "Broadcast Title",
      maxLength: 200,
      type: "text",
      required: true,
      localized: true,
      admin: {
        placeholder: "Pelancaran Inisiatif 5G Nasional",
      },
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        placeholder: "pelancaran-inisiatif-5G-nasional",
        description: "Use as the URL link for broadcast page",
      },
      validate: async (value: any, { ...rest }) => {
        if (!value) {
          return "This field is required";
        }
        if (value.split(" ").length > 1) {
          return "Follow this format eg: 'inisiatif-digital-5g' ";
        }
        return true;
      },
    },
    {
      name: "type",
      label: "Broadcast Type",
      type: "select",
      required: true,
      options: BroadcastType,
    },
    {
      name: "date",
      label: "Broadcast Date",
      type: "date",
      required: true,
    },
    {
      name: "description",
      label: "Short Description",
      type: "textarea",
      required: true,
      localized: true,
      maxLength: 150,
      admin: {
        placeholder: "Brief description about this broadcast",
        rows: 2,
      },
    },
    {
      name: "broadcast_text",
      label: "Broadcast Content",
      type: "richText",
      required: true,
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // The HTMLConverter Feature is the feature which manages the HTML serializers.
          // If you do not pass any arguments to it, it will use the default serializers.
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML("broadcast_text", {
      name: "broadcast_text_html",
      hidden: true,
    }),
    // Side-bar
    {
      name: "isPin",
      label: "Pin this broadcast",
      type: "checkbox",
      admin: {
        position: "sidebar",
      },
      defaultValue: false,
    },
    {
      name: "broadcast_image",
      label: "Broadcast Image",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "broadcast_file_eng",
      label: "Attachment File (ENG)",
      type: "upload",
      relationTo: "file",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "broadcast_file_bm",
      label: "Attachment File (BM)",
      type: "upload",
      relationTo: "file",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
