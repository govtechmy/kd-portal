import React from "react";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import { getTranslations } from "next-intl/server";
import DirektoriMain from "@/components/direktori/main";

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
    title: t("directory"),
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
  const data = await payload.find({
    collection: "staff-directory",
    locale: locale,
    pagination: false,
    depth: 3,
  });

  return <DirektoriMain locale={locale} list={data.docs} />;
}
