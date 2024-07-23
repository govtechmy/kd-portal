import React from "react";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import DasarKementerian from "./page-component";

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
    title: t("policy"),
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
  const data = await payload.find({
    collection: "policy",
    locale: locale,
    pagination: false,
    depth: 3,
    where: {
      _status: { not_equals: "draft" },
    },
  });

  return <DasarKementerian locale={locale} list={data.docs} />;
}
