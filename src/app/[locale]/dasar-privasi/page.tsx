import React from "react";
import PrivacyPolicyComponent from "./page-component";
import { FSP, inject, metagen, MetagenProps } from "@/lib/decorator";

const DasarPrivasi: FSP = async ({ payload, locale }) => {
  const data = await payload.findGlobal({
    slug: "footer",
    locale: locale,
    depth: 3,
  });

  return <PrivacyPolicyComponent data={data} locale={locale} />;
};

export const generateMetadata = async (params: MetagenProps) => {
  return metagen(params, "Privacy", { title: "header" });
};

export default inject(DasarPrivasi);
