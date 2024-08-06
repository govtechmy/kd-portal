import React, { Suspense } from "react";
import DirektoriMain from "@/components/direktori/main";
import { FSP, inject, metagen, MetagenProps } from "@/lib/decorator";

const Direktori: FSP = async ({ locale, payload }) => {
  const data = await payload.find({
    collection: "staff-directory",
    locale: locale,
    pagination: false,
    depth: 3,
  });

  return (
    <Suspense>
      <DirektoriMain locale={locale} list={data.docs} />
    </Suspense>
  );
};

export const generateMetadata = async (params: MetagenProps) => {
  return metagen(params, "Header", { title: "directory" });
};

export default inject(Direktori);
export const dynamic = "error";
