import Carousel from "@/components/home/carousel";
import Quicklinks from "@/components/home/quicklinks";
import Timeline from "@/components/home/timeline";
import HeroPattern from "@/components/layout/hero-pattern";
import Overline from "@/components/typography/overline";
import { buttonVariants } from "@/components/ui/button";
import Search from "@/components/ui/search";
import Flag from "@/icons/flag";
import { cn } from "@/lib/utils";
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
  const t = await getTranslations({ locale, namespace: "Agency" });

  return {
    title: t("name"),
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
    <>
      <section className="relative w-full gap-6 border-b sm:grid sm:grid-cols-6">
        <div className="absolute -z-10 flex h-full w-full justify-center overflow-hidden bg-gradient-radial from-brand-200 from-0% via-[#F1F5FF] via-[27.57%] to-white to-100%">
          <HeroPattern className="absolute -top-[23.33%] animate-flow motion-reduce:animate-none" />
        </div>
        <div className="col-span-4 col-start-2 flex w-full flex-col items-center gap-y-9 px-4.5 py-[120px] text-center sm:py-[120px] md:px-6">
          <div className="space-y-6">
            <Overline className="text-base font-bold">
              {t("Agency.name")}
            </Overline>
            <h1 className="text-balance font-poppins text-[32px]/10 font-semibold sm:text-hmd">
              {t("Home.title")}
            </h1>
          </div>

          <div className="space-y-4">
            <Search />

            <div className="max-w-[800px] space-y-3 text-black-700">
              <p className="text-sm">{t("Home.popular_links")}:</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {Array(5)
                  .fill(null)
                  .map((e) => (
                    <div
                      key={e}
                      className={cn(
                        buttonVariants({ size: "md" }),
                        "w-[calc(50%-3px)] whitespace-normal rounded-full text-xs/4 sm:w-[250px]",
                      )}
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#E5F4FF]">
                        <Flag className="text-brand-600" />
                      </div>
                      <p className="line-clamp-2">
                        Pencapaian dan Aktiviti yang dijalankan selama 3 bulan
                        pada tahun
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="divide-y divide-washed-100">
        <Carousel />
        <Timeline />
        <Quicklinks />
      </main>
    </>
  );
}
