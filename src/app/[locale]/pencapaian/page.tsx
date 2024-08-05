import React, { Suspense } from "react";
import AchievementComponent from "./page-component";
import groupBy from "lodash/groupBy";
import { DateTime } from "luxon";
import orderBy from "lodash/orderBy";
import { FSP, inject, metagen, MetagenProps } from "@/lib/decorator";

const Pencapaian: FSP = async ({ searchParams, payload, locale }) => {
  const { page, search, start, end, type } = searchParams || {
    page: 1,
    search: "",
    start: 0,
    end: 7,
    type: "all",
  };
  const limit = page ? Number(page) * 7 : 7;

  const data = await payload.find({
    collection: "achievement",
    locale,
    depth: 3,
    pagination: false,
    limit,
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
        ...(start
          ? [
              {
                date: { greater_than_equal: start },
              },
            ]
          : []),
        ...(end
          ? [
              {
                date: { less_than_equal: end },
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
        {
          type: { not_equals: "not_achievement" },
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

  return (
    <Suspense>
      <AchievementComponent
        data={sorted}
        locale={locale}
        totalDocs={data.totalDocs}
      />
    </Suspense>
  );
};

export const generateMetadata = async (params: MetagenProps) => {
  return metagen(params, "Header", { title: "achievements" });
};

export default inject(Pencapaian);
export const dynamic = "error";
