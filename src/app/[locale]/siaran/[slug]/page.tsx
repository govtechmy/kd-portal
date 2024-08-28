import React from "react";
import SiaranPage from "./page-component";
import { FSP, inject, metagen, MetagenProps } from "@/lib/decorator";

const SiaranArticle: FSP = async ({ params, payload, locale }) => {
  const { slug } = params!;
  const data = await payload.find({
    collection: "broadcast",
    locale: locale,
    depth: 3,
    where: {
      slug: { equals: decodeURIComponent(slug) },
    },
    limit: 1,
  });

  return <SiaranPage data={data.docs[0]} locale={locale} />;
};

export const generateMetadata = async (params: MetagenProps) => {
  return metagen(params, "Header", { title: "announcements" });
};

export default inject(SiaranArticle);
