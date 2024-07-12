import { Field, Option } from "payload";
import { deepMerge } from "../utils";
import { routes } from "../routes";

type LinkType = (options?: {
  linkOption?: Option[];
  disableLabel?: boolean;
  overrides?: Record<string, unknown>;
  forceCustomUrl?: boolean;
}) => Field;

const defaultOptions: Option[] = Object.entries(routes).map(([key, value]) => {
  const _key = "".concat(...key.split("_").join(" "));
  return {
    label: _key,
    value: value,
  };
});

const link: LinkType = ({
  linkOption = defaultOptions,
  disableLabel = false,
  overrides = {},
  forceCustomUrl = false,
} = {}) => {
  const linkResult: Field = {
    name: "link",
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        fields: [
          {
            name: "type",
            admin: {
              layout: "horizontal",
              width: "50%",
              disabled: forceCustomUrl,
            },
            defaultValue: forceCustomUrl ? "custom" : "reference",
            options: [
              {
                label: "Internal link",
                value: "reference",
              },
              {
                label: "Custom URL",
                value: "custom",
              },
            ],
            type: "radio",
          },
          {
            name: "newTab",
            admin: {
              style: {
                alignSelf: "flex-end",
              },
              width: "50%",
            },
            label: "Open in new tab",
            type: "checkbox",
          },
        ],
        type: "row",
      },
    ],
    type: "group",
  };

  const linkTypes: Field[] = [
    {
      name: "reference",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "reference",
      },
      label: "Link to",
      required: true,
      type: "select",
      options: linkOption,
    },
    {
      name: "url",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "custom",
      },
      label: "Custom URL",
      required: true,
      type: "text",
    },
  ];

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: "50%",
      },
    }));

    linkResult.fields.push({
      fields: [
        ...linkTypes,
        {
          name: "label",
          label: "Label",
          required: true,
          type: "text",
        },
      ],
      type: "row",
    });
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes];
  }

  return deepMerge(linkResult, overrides);
};

export default link;
