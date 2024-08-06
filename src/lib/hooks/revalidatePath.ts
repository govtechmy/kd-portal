import type {
  BasePayload,
  CollectionAfterChangeHook,
  GlobalAfterChangeHook,
} from "payload";

import { revalidatePath } from "next/cache";
import { routes } from "@/lib/routes";

export const revalidateCollection = (
  route: keyof typeof routes,
): CollectionAfterChangeHook<any> => {
  return async ({ doc, req }) => {
    const { payload, locale = "ms-MY" } = req;
    if (doc._status !== "published") return doc;

    revalidate({ locale, route, params: doc.slug }, payload);
    return doc;
  };
};

export const revalidateGlobal = (
  route: keyof typeof routes,
): GlobalAfterChangeHook => {
  return async ({ doc, req }) => {
    const { payload, locale = "ms-MY" } = req;
    if (doc._status !== "published") return doc;

    revalidate({ locale, route, params: doc.slug }, payload);
    return doc;
  };
};

type RevalidateProps = {
  locale: string;
  route: keyof typeof routes;
  params?: string;
};

const revalidate = (
  { locale, route, params }: RevalidateProps,
  payload: BasePayload,
) => {
  const path = [locale, routes[route], params ? params : ""].join("/");

  payload.logger.info(`Revalidating post at path: ${path}`);

  revalidatePath(path);
};
