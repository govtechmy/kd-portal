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
  searchParams: { page, search, start, end, type },
}: {
  params: {
    locale: "ms-MY" | "en-GB";
  };
  searchParams: {
    page: string;
    search: string;
    start: string;
    end: string;
    type: string;
  };
}) {
  const limit = page ? Number(page) * 7 : 7;

  const data = await payload.find({
    collection: "achievement",
    locale: locale,
    depth: 3,
    pagination: false,
    limit: limit,
    where: {
      and: [
        {
          or: [
            {
              title: { like: search },
            },
            {
              description: { like: search },
            },
          ],
        },
        ...(start && end
          ? [
              {
                and: [
                  {
                    date: { greater_than_equal: start },
                  },
                  {
                    date: { less_than_equal: end },
                  },
                ],
              },
            ]
          : []),
        ...(type !== "all" && type !== undefined
          ? [
              {
                type: { equals: type },
              },
            ]
          : []),
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

  return (
    <AchievementComponent
      data={sorted}
      locale={locale}
      totalDocs={data.totalDocs}
    />
  );
}
