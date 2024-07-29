import React from "react";
import { getTranslations } from "next-intl/server";
import HomePageComponent from "./page-component";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "Agency" });

  return {
    title: t("name"),
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
  const siteInfo = await payload.findGlobal({
    slug: "site-info",
    locale: locale,
    depth: 3,
  });
  const homepage = await payload.findGlobal({
    slug: "homepage",
    locale: locale,
    depth: 3,
  });
  const achievement = await payload.find({
    collection: "achievement",
    locale: locale,
    depth: 3,
    pagination: false,
    sort: "-date",
    limit: 7,
    where: {
      type: { not_equals: "not_achievement" },
    },
  });
  const broadcast = await payload.find({
    collection: "broadcast",
    locale: locale,
    depth: 3,
    pagination: false,
    sort: "-date",
    limit: 7,
    where: {
      _status: { not_equals: "draft" },
    },
  });

  return (
    <HomePageComponent
      siteInfo={siteInfo}
      homepage={homepage}
      achievements={achievement ? achievement.docs : []}
      broadcast={broadcast ? broadcast.docs : []}
      locale={locale}
    />
  );
}
