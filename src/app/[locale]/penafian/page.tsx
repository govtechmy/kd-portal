import React from "react";
import PenafianComponent from "./page-component";
import { FSP, inject, metagen, MetagenProps } from "@/lib/decorator";

const Penafian: FSP = async ({ locale, payload }) => {
  const data = await payload.findGlobal({
    slug: "footer",
    locale: locale,
    depth: 3,
  });

  return <PenafianComponent locale={locale} data={data} />;
};

export const generateMetadata = async (params: MetagenProps) => {
  return metagen(params, "Disclaimer", { title: "header" });
};

export default inject(Penafian);
// export const dynamic = "error";
