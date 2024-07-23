import React from "react";
import { getTranslations } from "next-intl/server";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import SiaranList from "./page-component";
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
    title: t("announcements"),
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
    collection: "broadcast",
    locale: locale,
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
        {
          _status: { not_equals: "draft" },
        },
      ],
    },
  });

  const sorted = orderBy(data.docs, ["isPin", "date"], ["desc", "desc"]);

  return <SiaranList data={{ ...data, docs: sorted }} locale={locale} />;
}
