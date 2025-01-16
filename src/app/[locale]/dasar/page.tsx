import React, { Suspense } from "react";
import DasarKementerian from "./page-component";
import { FSP, inject, metagen, MetagenProps } from "@/lib/decorator";

const Dasar: FSP = async ({ params, locale, payload }) => {
  const data = await payload.find({
    collection: "policy",
    locale: locale,
    pagination: false,
    depth: 3,
    where: {
      _status: { not_equals: "draft" },
    },
  });

  return (
    <Suspense>
      <DasarKementerian locale={locale} list={data.docs} />
    </Suspense>
  );
};

export const generateMetadata = async (params: MetagenProps) => {
  return metagen(params, "Header", { title: "policy" });
};

export default inject(Dasar);
// export const dynamic = "error";
