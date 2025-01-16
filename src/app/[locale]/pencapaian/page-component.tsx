"use client";

import { locales } from "@/lib/i18n";
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
  data: { year: number; items: Achievement[] }[];
  locale: (typeof locales)[number];
  totalDocs: number;
}
const AchievementComponent: FC<AchievementProps> = ({
  data,
  locale,
  totalDocs,
}) => {
  const t = useTranslations();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const searchArray = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (searchQuery) {
      params.set("search", searchQuery.toLowerCase());
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <main>
      <Section>
        <div className="relative gap-6 border-washed-100 max-lg:pt-12 lg:grid lg:grid-cols-12 lg:border-x lg:px-6">
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
          <PencapaianTimeline
            data={data}
            locale={locale}
            totalDocs={totalDocs}
          />
        </div>
      </Section>
    </main>
  );
};

export default AchievementComponent;
