import React from "react";
import SiaranList from "./page-component";
import orderBy from "lodash/orderBy";
import { FSP, inject, metagen, MetagenProps } from "@/lib/decorator";

export const generateMetadata = async (params: MetagenProps) => {
  return metagen(params, "Header", { title: "announcements" });
};

const Siaran: FSP = async ({ searchParams, payload, locale }) => {
  const { page, search, start, end } = searchParams || {
    page: 1,
    search: "",
    start: undefined,
    end: undefined,
  };
  const data = await payload.find({
    collection: "broadcast",
    locale,
    depth: 3,
    pagination: true,
    page: Number(page) ?? 1,
    limit: 12,
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
        {
          _status: { not_equals: "draft" },
        },
      ],
    },
  });

  const sorted = orderBy(data.docs, ["isPin", "date"], ["desc", "desc"]);

  return <SiaranList data={{ ...data, docs: sorted }} locale={locale} />;
};

export default inject(Siaran);
