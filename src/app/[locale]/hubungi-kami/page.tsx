import React from "react";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import ContactUs from "./page-component";

const payload = await getPayloadHMR({ config });

export default async function Page({
  params: { locale },
}: {
  params: {
    locale: "ms-MY" | "en-GB";
  };
}) {
  const data = await payload.findGlobal({
    slug: "site-info",
    locale: locale,
    depth: 3,
  });

  return <ContactUs data={data} locale={locale} />;
}
