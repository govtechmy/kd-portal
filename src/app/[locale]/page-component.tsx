import Carousel from "@/components/home/carousel";
import Quicklinks from "@/components/home/quicklinks";
import HomeSearchBar from "@/components/home/searchbar";
import HomeSiaran from "@/components/home/siaran";
import Timeline from "@/components/home/timeline";
import HeroPattern from "@/components/layout/hero-pattern";
import Overline from "@/components/typography/overline";
import { locales } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Achievement, Broadcast, Homepage, SiteInfo } from "@/payload-types";
import { useTranslations } from "next-intl";
import React, { FC } from "react";

import TimeSeriesCharts from "@/components/home/timeseriescharts";
interface Props {
  siteInfo: SiteInfo;
  homepage: Homepage;
  achievements: Achievement[];
  broadcast: Broadcast[];
  locale: (typeof locales)[number];
}

async function getVisitorsData() {
  var baseUrl = process.env.NEXT_PUBLIC_TINYBIRD_HOST;
  var token = process.env.TINYBIRD_TOKEN_API;
  const res = await fetch(
    `${baseUrl}/v0/pipes/analytics_events_pipe_4995.json?token=${token}`,
  );
  const json = await res.json();
  // Adjust this according to your Tinybird response structure
  return json.data; // or json if the array is at the root
}

const HomePageComponent = async ({
  siteInfo,
  homepage,
  achievements,
  broadcast,
  locale,
}: Props) => {
  const t = useTranslations();
  const visitorsData = await getVisitorsData();
  return (
    <>
      {/* Hidden SPLaSK Contact Details tag for crawler detection */}
      <div 
        {...{ "splwpk-contact-details": "splwpk-contact-details" }}
        {...{ "splwpk-contact-details-timestamp": new Date().toISOString().slice(0, 19).replace('T', ' ') }}
        className="sr-only"
        aria-hidden="true"
      >
        Contact Details Available
      </div>
      
      <section className="relative w-full gap-6 border-b sm:grid sm:grid-cols-6">
        {homepage.hero_banner && typeof homepage.hero_banner !== "string" ? (
          <div
            style={
              {
                "--top-gradient-color": homepage.hero_banner["top-gradient"],
                "--middle-gradient-color":
                  homepage.hero_banner["middle-gradient"],
                "--bottom-gradient-color":
                  homepage.hero_banner["bottom-gradient"],
              } as React.CSSProperties
            }
            className={cn(
              "absolute -z-10 flex h-full w-full justify-center overflow-hidden bg-gradient-radial from-0% via-[27.57%] to-100%",
              homepage.hero_banner &&
                `from-[var(--middle-gradient-color)] via-[var(--top-gradient-color)] to-[var(--bottom-gradient-color)]`,
            )}
          >
            <div
              className="hidden h-full w-full bg-cover bg-center bg-no-repeat lg:block 2xl:bg-contain"
              style={{
                backgroundImage: `url('${typeof homepage.hero_banner.desktop.file_desktop !== "string" && homepage.hero_banner.desktop.file_desktop.url}')`,
              }}
            />
            <div
              className="bg-fill block h-full w-full bg-center bg-no-repeat sm:bg-contain lg:hidden"
              style={{
                backgroundImage: `url('${typeof homepage.hero_banner.mobile.file_mobile !== "string" && homepage.hero_banner.mobile.file_mobile.url}')`,
              }}
            />
          </div>
        ) : (
          <div className="absolute -z-10 flex h-full w-full justify-center overflow-hidden bg-gradient-radial from-brand-200 from-0% via-[#F1F5FF] via-[27.57%] to-white to-100%">
            <HeroPattern className="absolute -top-[23.33%] animate-flow motion-reduce:animate-none" />
          </div>
        )}

        <div className="col-span-4 col-start-2 flex w-full flex-col items-center gap-y-9 px-4.5 py-[120px] text-center md:px-6">
          <div className="space-y-6">
            <Overline className="text-base font-bold">
              {siteInfo.site_name}
            </Overline>
            <h1 className="text-balance font-poppins text-[32px]/10 font-semibold sm:text-hmd">
              {t("Home.title")}
            </h1>
          </div>

          <div className="w-full space-y-4">
            <HomeSearchBar locale={locale} />

            {/* Disable Pautan Popular for now */}
            {/* <div className="max-w-[800px] space-y-3 text-black-700">
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
            </div> */}
          </div>
        </div>
      </section>

      <main className="divide-y divide-washed-100">
        <Carousel homepage={homepage} />
        <Timeline achievements={achievements} />
        <HomeSiaran broadcast={broadcast} />
        <Quicklinks homepage={homepage} />
        <TimeSeriesCharts data={visitorsData} />
      </main>
    </>
  );
};

export default HomePageComponent;
