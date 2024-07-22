import React from "react";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import ContactUs from "./page-component";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export const dynamic = "force-static";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "Header" });

  return {
    title: t("contact_us"),
  };
}

const payload = await getPayloadHMR({ config });

export default async function Page({
  params: { locale },
}: {
  params: {
    locale: "ms-MY" | "en-GB";
  };
}) {
  unstable_setRequestLocale(locale);
  const data = await payload.findGlobal({
    slug: "site-info",
    locale: locale,
    depth: 3,
  });

  return <ContactUs data={data} locale={locale} />;
}
