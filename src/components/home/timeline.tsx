import Section from "@/components/layout/section";
import TimelineLayout from "@/components/layout/timeline";
import Overline from "@/components/typography/overline";
import Flag from "@/icons/flag";
import { Achievement } from "@/payload-types";
import { DateTime } from "luxon";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function Timeline({
  achievements,
}: {
  achievements: Achievement[];
}) {
  const t = await getTranslations("Home.Achievement");
  const locale = await getLocale();

  return (
    <Section>
      <div className="grid-cols-12 gap-6 border-washed-100 xl:grid xl:border-x">
        <div className="col-span-10 col-start-2 flex flex-col gap-6 max-lg:pt-12 lg:flex-row">
          <div className="top-16 h-fit space-y-4.5 lg:sticky lg:w-1/3 lg:py-[84px]">
            <div className="flex gap-x-3">
              <Flag className="text-foreground-primary" />
              <Overline>{t("overline")}</Overline>
            </div>
            <h2 className="text-balance font-poppins text-hsm font-semibold">
              {t("title")}
            </h2>
            <p className="text-pretty text-black-700">{t("desc")}</p>
          </div>

          <div className="relative flex h-full flex-col items-start sm:items-center lg:w-2/3">
            <div className="absolute -z-10 h-full w-px bg-outline-200 max-sm:left-[3.5px]" />
            <TimelineLayout
              className="py-8 lg:py-[84px]"
              items={achievements.map((item) => ({
                date: DateTime.fromISO(item.date).toFormat("dd MMMM yyyy", {
                  locale: locale,
                }),
                title: item.title,
                desc: item.description,
                star: item.isFlagged || false,
              }))}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
