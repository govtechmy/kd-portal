import { cn } from "@/lib/utils";
import { useFormatter, useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations();
  const format = useFormatter();

  const pencapaian = Array(9).fill(null);

  return (
    <>
      <section className="container flex flex-col gap-6 border-washed-100 max-lg:pt-12 lg:flex-row lg:border-x">
        <div className="lg:w-1/3 lg:py-[84px]">
          <h1 className="text-center font-poppins text-hmd font-semibold">
            {t("Achievements.header")}
          </h1>
        </div>
        <div className="relative flex h-full justify-start sm:justify-center lg:w-2/3">
          <div className="absolute -z-10 h-full w-px bg-outline-200 max-sm:left-[3.5px]" />
          <div className="absolute max-sm:space-y-3 pt-8 sm:pt-[84px]">
            {pencapaian.map((_, i) => (
              <div key={i} className="flex max-sm:h-[136px] sm:first:mt-16 flex-col items-center">
                <div className="relative max-sm:mt-16 size-2 rounded-full bg-brand-600 ">
                  <div
                    className={cn(
                      i % 2 === 0 ? "max-sm:left-2 sm:right-2" : "left-2",
                      "absolute top-1/2 -z-10 h-px w-6 -translate-y-1/2 transform border border-dashed border-outline-400",
                    )}
                  />
                </div>
                <div className="h-[60px] w-0.5 bg-gradient-to-b from-brand-600 from-0% to-transparent to-100% sm:mb-2" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-x-14 gap-y-3 max-sm:ml-8 sm:grid-cols-2 py-8 lg:py-[84px]">
            {pencapaian.map((_, i) => (
              <div
                key={i}
                className={cn(
                  i % 2 === 1 ? "lg:translate-y-[76px]" : "",
                  "flex h-[136px] flex-col gap-1 rounded-xl border border-outline-200 px-4 py-3",
                )}
              >
                <p className="line-clamp-1 text-xs font-medium uppercase tracking-widest text-dim-500">
                  {format.dateTime(new Date(), {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    weekday: "long",
                  })}
                </p>
                <p className="line-clamp-1 font-medium text-black-900">
                  Lorem Ipsum Dolor Sit Amet
                </p>
                <p className="line-clamp-3 text-sm text-black-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
