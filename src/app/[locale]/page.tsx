import React from "react";
import HomePageComponent from "./page-component";
import { FSP, inject, metagen, MetagenProps } from "@/lib/decorator";

const HomePage: FSP = async ({ payload, locale }) => {
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
    limit: 6,
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
};

export const generateMetadata = async (params: MetagenProps) => {
  return metagen(params, "Agency", { title: "name" });
};

export default inject(HomePage);

export const dynamic = "error";
