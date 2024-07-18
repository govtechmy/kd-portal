import Section from "@/components/layout/section";
import Filter from "@/components/pencapaian/filter";
import PencapaianTimeline from "@/components/pencapaian/timeline";
import Overline from "@/components/typography/overline";
import Search from "@/components/ui/search";
import Flag from "@/icons/flag";
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
  const t = await getTranslations({ locale, namespace: "Header" });

  return {
    title: t("achievements"),
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
  const t = useTranslations();

  return (
    <main>
      <Section>
        <div className="md:px-6 relative gap-6 border-washed-100 px-4.5 max-lg:pt-12 lg:grid lg:grid-cols-12 lg:border-x">
          <div className="left-0 top-16 col-span-5 flex max-w-full flex-col items-start gap-y-4.5 lg:sticky lg:h-fit lg:py-[84px] xl:col-span-4">
            <div className="flex gap-x-3">
              <Flag className="text-foreground-primary" />
              <Overline>{t("Home.Achievement.overline")}</Overline>
            </div>
            <h1 className="font-poppins text-[2rem]/10 font-semibold sm:text-hmd">
              {t("Achievements.header")}
            </h1>
            <div className="w-full space-y-4.5 pt-3">
              <Search
                className="mx-0 w-full max-w-full"
                placeholder={t("Achievements.placeholder")}
              />
              <Filter />
            </div>
          </div>
          <PencapaianTimeline />
        </div>
      </Section>
    </main>
  );
}
