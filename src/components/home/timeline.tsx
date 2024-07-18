import Section from "@/components/layout/section";
import TimelineLayout from "@/components/layout/timeline";
import Overline from "@/components/typography/overline";
import Flag from "@/icons/flag";
import { useFormatter, useTranslations } from "next-intl";

export default function Timeline() {
  const format = useFormatter();
  const t = useTranslations("Home.Achievement");

  return (
    <Section>
      <div className="grid-cols-12 gap-6 border-washed-100 px-4.5 py-12 lg:px-6 lg:py-[84px] xl:grid xl:border-x">
        <div className="col-span-10 col-start-2 flex flex-col gap-6 max-lg:pt-12 lg:flex-row">
          <div className="sticky top-16 h-fit space-y-4.5 lg:w-1/3 lg:py-[84px]">
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
              items={Array.from({ length: 7 }).map((_, i) => {
                const date = new Date(t(`date${i + 1}`));
                return {
                  date: `${format.dateTime(date, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}, 
              ${format.dateTime(date, {
                weekday: "long",
              })}`,
                  title: t(`title${i + 1}`),
                  desc: t(`desc${i + 1}`),
                  star: [3, 5].includes(i) ? true : false,
                };
              })}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
