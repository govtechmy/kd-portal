/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { SerializedListItemNode, SerializedListNode } from "@lexical/list";
import type {
  SerializedHeadingNode,
  SerializedQuoteNode,
} from "@lexical/rich-text";
import type {
  LinkFields,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import type {
  SerializedElementNode,
  SerializedLexicalNode,
  SerializedTextNode,
} from "lexical";

import Link from "next/link";
import React, { FC, Fragment, JSX } from "react";

// import { Label } from "../../Label"
// import { LargeBody } from "../../LargeBody"
import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from "@/components/rich-text/node-format";
import { escapeHTML } from "@/lib/utils";
import { List } from "@radix-ui/react-navigation-menu";

export type TagMap = {
  [tag in keyof Partial<JSX.IntrinsicElements>]:
    | JSX.IntrinsicElements[tag]
    | null;
};

interface Props {
  nodes: SerializedLexicalNode[];
  tagMap?: TagMap;
}

export function serializeLexical({ nodes, tagMap }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((_node, index): JSX.Element | null => {
        if (_node.type === "text") {
          const node = _node as SerializedTextNode;
          let text = (
            <span
              dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }}
              key={index}
            />
          );
          if (node.format & IS_BOLD) {
            text = (
              <strong key={index} {...tagMap?.strong}>
                {text}
              </strong>
            );
          }
          if (node.format & IS_ITALIC) {
            text = (
              <em key={index} {...tagMap?.em}>
                {text}
              </em>
            );
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: "line-through" }}>
                {text}
              </span>
            );
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: "underline" }}>
                {text}
              </span>
            );
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{text}</code>;
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>;
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>;
          }

          return text;
        }

        if (_node == null) {
          return null;
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (
          node: SerializedElementNode,
          tagMap?: TagMap,
        ): JSX.Element | null => {
          if (node.children == null) {
            return null;
          } else {
            if (
              node?.type === "list" &&
              (node as SerializedListNode)?.listType === "check"
            ) {
              for (const item of node.children) {
                if ("checked" in item) {
                  if (!item?.checked) {
                    item.checked = false;
                  }
                }
              }
              return serializeLexical({ nodes: node.children, tagMap });
            } else {
              return serializeLexical({ nodes: node.children, tagMap });
            }
          }
        };

        const serializedChildren =
          "children" in _node
            ? serializedChildrenFn(_node as SerializedElementNode, tagMap)
            : "";

        switch (_node.type) {
          case "linebreak": {
            return <br key={index} />;
          }
          case "paragraph": {
            return (
              <p key={index} {...tagMap?.p}>
                {serializedChildren}
              </p>
            );
          }
          case "heading": {
            const node = _node as SerializedHeadingNode;

            type Heading = Extract<
              keyof JSX.IntrinsicElements,
              "h1" | "h2" | "h3" | "h4" | "h5"
            >;
            const Tag = node?.tag as Heading;
            return (
              <Tag key={index} {...tagMap?.[Tag]}>
                {serializedChildren}
              </Tag>
            );
          }
          // case "label":
          //   return <Label key={index}>{serializedChildren}</Label>

          // case "largeBody": {
          //   return <LargeBody key={index}>{serializedChildren}</LargeBody>
          // }
          case "list": {
            const node = _node as SerializedListNode;

            type List = Extract<keyof JSX.IntrinsicElements, "ol" | "ul">;
            const Tag = node?.tag as List;

            if (Tag === "ul") {
              return (
                <Tag className={node?.listType} key={index} {...tagMap?.[Tag]}>
                  {serializedChildren}
                </Tag>
              );
            }
            if (Tag === "ol") {
              return (
                <Tag className={node?.listType} key={index} {...tagMap?.[Tag]}>
                  {serializedChildren}
                </Tag>
              );
            }
          }
          case "listitem": {
            const node = _node as SerializedListItemNode;

            if (node?.checked != null) {
              return (
                <li
                  aria-checked={node.checked ? "true" : "false"}
                  className={`component--list-item-checkbox ${
                    node.checked
                      ? "component--list-item-checkbox-checked"
                      : "component--list-item-checked-unchecked"
                  }`}
                  key={index}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="checkbox"
                  tabIndex={-1}
                  value={node?.value}
                >
                  <input
                    value={node.value}
                    type="checkbox"
                    checked={node.checked}
                    className="accent-primary dark:accent-secondary rounded border-2 border-slate-200 focus:ring-0 focus:ring-transparent"
                  />
                  {serializedChildren}
                </li>
              );
            } else {
              return (
                <li key={index} value={node?.value}>
                  {serializedChildren}
                </li>
              );
            }
          }
          case "quote": {
            const node = _node as SerializedQuoteNode;

            return (
              <blockquote key={index} {...tagMap?.blockquote}>
                {serializedChildren}
              </blockquote>
            );
          }
          case "link": {
            const node = _node as SerializedLinkNode;

            const fields: LinkFields = node.fields;

            if (fields.linkType === "custom") {
              const rel = fields.newTab ? "noopener noreferrer" : undefined;

              return (
                <Link
                  href={escapeHTML(fields.url)}
                  key={index}
                  {...(fields?.newTab
                    ? {
                        rel: "noopener noreferrer",
                        target: "_blank",
                      }
                    : {})}
                >
                  {serializedChildren}
                </Link>
              );
            } else {
              return <span key={index}>Internal link coming soon</span>;
            }
          }

          default:
            return null;
        }
      })}
    </Fragment>
  );
}
