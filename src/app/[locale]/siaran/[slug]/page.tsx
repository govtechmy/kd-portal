import React from "react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import SiaranPage from "./page-component";

// export const dynamic = "force-static";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "Header" });

  return {
    title: t("announcements"),
  };
}

const payload = await getPayloadHMR({ config });

export default async function Page({
  params: { locale, slug },
}: {
  params: {
    slug: string;
    locale: "ms-MY" | "en-GB";
  };
}) {
  // unstable_setRequestLocale(locale);
  const data = await payload.find({
    collection: "broadcast",
    locale: locale,
    depth: 3,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  });

  return <SiaranPage data={data.docs[0]} locale={locale} />;
}
