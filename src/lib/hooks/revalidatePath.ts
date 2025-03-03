import path from "path";
import type {
  BasePayload,
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";
import { routes } from "@/lib/routes";
import { purgeCache } from "@/lib/cache";

export const revalidateCollection = (
  route: keyof typeof routes,
): CollectionAfterChangeHook<any> => {
  return async ({ doc, req }) => {
    const { payload, locale = "ms-MY" } = req;
    if (route === "ANNOUNCEMENTS") {
      await revalidate({ locale, route, params: doc.slug }, payload);
      return doc;
    }
    await revalidate({ locale, route }, payload);
    return doc;
  };
};
export const revalidateDeleteCollection = (
  route: keyof typeof routes,
): CollectionAfterDeleteHook<any> => {
  return async ({ doc, req }) => {
    const { payload, locale = "ms-MY" } = req;
    if (route === "ANNOUNCEMENTS") {
      await revalidate({ locale, route, params: doc.slug }, payload);
      return doc;
    }
    await revalidate({ locale, route }, payload);
    return doc;
  };
};

export const revalidateGlobal = (
  route: keyof typeof routes,
): GlobalAfterChangeHook => {
  return async ({ doc, req }) => {
    const { payload, locale = "ms-MY" } = req;
    if (route === "ANNOUNCEMENTS") {
      await revalidate({ locale, route, params: doc.slug }, payload);
      return doc;
    }
    await revalidate({ locale, route }, payload);
    return doc;
  };
};

type RevalidateProps = {
  locale: string;
  route: keyof typeof routes;
  params?: string;
};

const revalidate = async (
  { locale, route, params }: RevalidateProps,
  payload: BasePayload,
) => {
  const target =
    route === "HOME"
      ? path.join("/", "ms-MY", params ? params : "")
      : path.join("/", "ms-MY", routes[route], params ? params : "");
  const targetEn =
    route === "HOME"
      ? path.join("/", "en-GB", params ? params : "")
      : path.join("/", "en-GB", routes[route], params ? params : "");

  payload.logger.info(`Revalidating post at path: ${target}, ${targetEn}`);

  // Purge cache for both locales
  await purgeCache([target, targetEn]);
};
