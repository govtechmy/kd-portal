import React from "react";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import { getTranslations } from "next-intl/server";
import AchievementComponent from "./page-component";
import groupBy from "lodash/groupBy";
import { DateTime } from "luxon";
import orderBy from "lodash/orderBy";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "Header" });

  return {
    title: t("achievements"),
  };
}

const payload = await getPayloadHMR({ config });

export default async function Page({
  params: { locale },
  searchParams: { page, search },
}: {
  params: {
    locale: "ms-MY" | "en-GB";
  };
  searchParams: {
    page: string;
    search: string;
  };
}) {
  const data = await payload.find({
    collection: "achievement",
    locale: locale,
    depth: 3,
    pagination: false,
    where: {
      or: [
        {
          title: { like: search },
        },
        {
          description: { like: search },
        },
      ],
    },
  });

  const groupedCollection = groupBy(data.docs, (item) =>
    DateTime.fromISO(item.date).toFormat("yyyy"),
  );

  const groupedArray = Object.entries(groupedCollection).map(
    ([year, items]) => ({
      year: parseInt(year, 10),
      items: items,
    }),
  );

  const sorted = orderBy(groupedArray, ["year"], ["desc"]);

  console.log(sorted);

  return <AchievementComponent data={sorted} locale={locale} />;
}
