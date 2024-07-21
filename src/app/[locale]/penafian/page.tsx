import { getTranslations } from "next-intl/server";
import React from "react";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import PenafianComponent from "./page-component";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "Disclaimer" });

  return {
    title: t("header"),
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
  const data = await payload.findGlobal({
    slug: "footer",
    locale: locale,
    depth: 3,
  });

  return <PenafianComponent locale={locale} data={data} />;
}
