import type { CollectionAfterChangeHook } from "payload";

import { revalidatePath } from "next/cache";
import { Policy } from "@/payload-types";
import { routes } from "../routes";

export const revalidatePolicy: CollectionAfterChangeHook<Policy> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === "published") {
    const path = routes.POLICY;

    payload.logger.info(`Revalidating post at path: ${path}`);

    revalidatePath(path);
  }

  return doc;
};
