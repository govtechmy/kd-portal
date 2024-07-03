import HeroPattern from "@/components/layout/hero-pattern";
import Flag from "@/icons/flag";
import Search from "@/icons/search";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations();

  return (
    <main className="flex flex-col">
      <div className="relative w-full grid-cols-6 gap-6 border-b sm:grid">
        <div className="absolute -z-10 flex h-full w-full justify-center overflow-hidden bg-gradient-radial from-[#C2D5FF] from-0% via-[#F1F5FF] via-[27.57%] to-white to-100%">
          <HeroPattern className="absolute" />
        </div>
        <div className="col-span-4 col-start-2 flex w-full flex-col items-center gap-y-9 px-4.5 py-[84px] text-center sm:py-[120px] md:px-6">
          <div className="space-y-6">
            <p className="font-bold uppercase tracking-[0.2em] text-brand-700">
              {t("Agency.name")}
            </p>
            <h1 className="text-balance font-poppins text-[32px] font-semibold leading-[40px] sm:text-hmd">
              Menginovasi Sektor Awam & Memperkasa
              <span className="text-brand-700">
                {" "}
                Negara <i>Digital-First</i>
              </span>
            </h1>
          </div>

          <div className="space-y-4">
            <div className="mx-auto flex items-center gap-2.5 rounded-full border bg-background pl-4.5 pr-1.5 shadow-card sm:w-[600px]">
              <input
                placeholder={t("Home.placeholder")}
                className="flex h-11 w-full rounded-md bg-background py-3 text-sm outline-none placeholder:text-dim-500 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <span className="flex shrink-0 items-center gap-x-1 text-sm text-dim-500">
                {t("Home.type")}
                <span className="rounded-md border border-outline-300 px-1.5 py-0.5">/</span>
                {t("Home.search")}
              </span>
              <div className="rounded-full bg-gradient-to-b from-[#5288FF] to-brand-600 to-100% p-1.5">
                <Search className="text-white" />
              </div>
            </div>

            <div className="space-y-3 text-black-700">
              <p className="text-sm">{t("Home.popular_links")}:</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {Array(5).fill(null).map((e) => (
                  <div
                    key={e}
                    className="flex w-[calc(50%-3px)] items-center gap-x-1.5 rounded-full border bg-background px-3 py-2 text-xs leading-4 shadow-button sm:w-[250px]"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#E5F4FF]">
                      <Flag className="text-brand-600" />
                    </div>
                    <p className="line-clamp-2 text-left">
                      Pencapaian dan Aktiviti yang dijalankan selama 3 bulan pada tahun
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="flex min-h-screen w-full"></section>
    </main>
  );
};
