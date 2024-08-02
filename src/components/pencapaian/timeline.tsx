"use client";
import Timeline from "@/components/layout/timeline";
import { Button } from "@/components/ui/button";
import ArrowDown from "@/icons/arrow-down";
import { usePathname, useRouter } from "@/lib/i18n";
import { locales } from "@/lib/i18n-config";
import { Achievement } from "@/payload-types";
import { DateTime } from "luxon";
import { useFormatter, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React from "react";

export const NUM_PER_PAGE = 7;

interface Props {
  data: { year: number; items: Achievement[] }[];
  locale: (typeof locales)[number];
  totalDocs: number;
}

export default function PencapaianTimeline({ data, locale, totalDocs }: Props) {
  const t = useTranslations();
  const format = useFormatter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const { replace } = useRouter();
  const pathname = usePathname();

  return (
    <div className="relative col-span-7 flex h-full flex-col items-start sm:items-center lg:col-start-6">
      <div className="absolute -z-10 h-full w-px bg-outline-200 max-sm:left-[3.5px]" />
      <div className="py-8 lg:pb-[120px] lg:pt-[84px]">
        {data.map(({ year, items }, i) => (
          <div key={year} className="flex flex-col items-start sm:items-center">
            <div className="my-3 w-fit rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium tracking-widest text-foreground-primary max-sm:my-[26px] max-sm:ml-8">
              {year}
            </div>
            <Timeline
              items={items.map((item) => ({
                date: DateTime.fromISO(item.date).toFormat("dd MMMM yyyy", {
                  locale: locale,
                }),
                title: item.title,
                desc: item.description,
                star: item.isFlagged || false,
              }))}
              startRight={
                i === 0
                  ? false
                  : data[i - 1].items.length % 2 === 0
                    ? false
                    : true
              }
            />
          </div>
        ))}
      </div>
      {page * NUM_PER_PAGE <= totalDocs && (
        <>
          <div className="absolute bottom-0 z-10 h-[250px] w-full bg-gradient-to-b from-transparent from-0% to-background to-[69.54%]" />
          <Button
            variant="secondary-colour"
            className="absolute bottom-16 z-20 rounded-full text-foreground-primary"
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("page", (page + 1).toString());
              replace(`${pathname}?${params.toString()}`, { scroll: false });
            }}
          >
            <ArrowDown className="size-4" />
            {t("Achievements.past_achievements")}
          </Button>
        </>
      )}
    </div>
  );
}
