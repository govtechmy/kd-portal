"use client";

import { locales } from "@/lib/i18n-config";
import { Achievement } from "@/payload-types";
import Section from "@/components/layout/section";
import Search from "@/components/ui/search";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { usePathname, useRouter } from "@/lib/i18n";
import { useSearchParams } from "next/navigation";
import Flag from "@/icons/flag";
import Overline from "@/components/typography/overline";
import Filter from "@/components/pencapaian/filter";
import PencapaianTimeline from "@/components/pencapaian/timeline";

interface AchievementProps {
  data: Record<string, Achievement[]>;
  locale: (typeof locales)[number];
}

// TODO: Handle the date picker selection and filter the list within the selected date (strategy: maybe can set default initial value (?))
// TODO: The filter related to the type of achievement row.
// TODO: Sort the collection by year, where latest one is top
// TODO: Data fetching strategy
const AchievementComponent: FC<AchievementProps> = ({ data, locale }) => {
  const t = useTranslations();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const searchArray = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("search", searchQuery.toLowerCase());
    } else {
      params.delete("search");
    }
    push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <main>
      <Section>
        <div className="relative gap-6 border-washed-100 px-4.5 max-lg:pt-12 md:px-6 lg:grid lg:grid-cols-12 lg:border-x">
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
                onChange={searchArray}
                defaultValue={searchParams.get("search") || ""}
              />
              <Filter />
            </div>
          </div>
          <PencapaianTimeline data={data} locale={locale} />
        </div>
      </Section>
    </main>
  );
};

export default AchievementComponent;
