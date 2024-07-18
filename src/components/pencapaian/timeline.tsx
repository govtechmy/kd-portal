"use client";

import Timeline from "@/components/layout/timeline";
import { Button } from "@/components/ui/button";
import ArrowDown from "@/icons/arrow-down";
import { useFormatter, useTranslations } from "next-intl";
import React, { useState } from "react";

export default function PencapaianTimeline() {
  const t = useTranslations();
  const format = useFormatter();

  const dummy = Array.from({ length: 7 }).map((_, i) => ({
    date: t(`Home.Achievement.date${i + 1}`),
    title: t(`Home.Achievement.title${i + 1}`),
    desc: t(`Home.Achievement.desc${i + 1}`),
    star: [3, 5].includes(i) ? true : false,
  }));

  const [data, setData] = useState([
    { year: 2024, data: dummy, startRight: false },
  ]);

  return (
    <div className="relative col-span-7 flex h-full flex-col items-start sm:items-center lg:col-start-6">
      <div className="absolute -z-10 h-full w-px bg-outline-200 max-sm:left-[3.5px]" />
      <div className="py-8 lg:pb-[120px] lg:pt-[84px]">
        {data.map(({ year, data, startRight }) => (
          <div key={year} className="flex flex-col items-start sm:items-center">
            <Timeline items={data} startRight={startRight} />
            <div className="my-3 w-fit rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium tracking-widest text-foreground-primary max-sm:my-[26px] max-sm:ml-8">
              {year}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 z-10 h-[250px] w-full bg-gradient-to-b from-transparent from-0% to-background to-[69.54%]" />
      <Button
        variant="secondary-colour"
        className="absolute bottom-16 z-20 rounded-full text-foreground-primary"
        onClick={() =>
          setData((data) => [
            ...data,
            { year:  data.at(-1)?.year! - 1, data: dummy, startRight: !data.at(-1)?.startRight },
          ])
        }
      >
        <ArrowDown className="size-4" />
        {t("Achievements.past_achievements")}
      </Button>
    </div>
  );
}
