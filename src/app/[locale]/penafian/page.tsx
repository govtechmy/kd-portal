import Hero from "@/components/layout/hero";
import Section from "@/components/layout/section";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "Disclaimer" });

  return {
    title: t("header"),
  };
}

export default function Page({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Disclaimer");

  return (
    <main className="divide-y divide-washed-100">
      <Hero title={t("header")} />

      <Section>
        <div className="gap-6 border-x border-washed-100 py-12 lg:py-[84px] xl:grid xl:grid-cols-12">
          <div className="col-span-10 col-start-2 space-y-6 whitespace-pre-line text-pretty text-sm text-black-700">
            <p>{t("desc")}</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
