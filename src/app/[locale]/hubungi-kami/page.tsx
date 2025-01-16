import React from "react";
import ContactUs from "./page-component";
import { FSP, inject, metagen, MetagenProps } from "@/lib/decorator";

export const generateMetadata = async (params: MetagenProps) => {
  return metagen(params, "Header", { title: "contact_us" });
};

const HubungiKami: FSP = async ({ payload, locale }) => {
  const data = await payload.findGlobal({
    slug: "site-info",
    locale: locale,
    depth: 3,
  });

  return <ContactUs data={data} locale={locale} />;
};

export default inject(HubungiKami);
// export const dynamic = "error";
