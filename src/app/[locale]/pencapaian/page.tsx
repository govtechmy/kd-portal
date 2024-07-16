import { cn } from "@/lib/utils";
import { useFormatter, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "Header" });

  return {
    title: t("achievements"),
  };
}

export default function Page() {
  const t = useTranslations();
  const format = useFormatter();

  const pencapaian = Array(9).fill(null);

  notFound();

  return (
    <main>
      <section className="container flex flex-col gap-6 border-washed-100 max-lg:pt-12 lg:flex-row lg:border-x">
        <div className="lg:w-1/3 lg:py-[84px]">
          <h1 className="text-center font-poppins text-hmd font-semibold">
            {t("Achievements.header")}
          </h1>
        </div>
        <div className="relative flex h-full justify-start sm:justify-center lg:w-2/3">
          <div className="absolute -z-10 h-full w-px bg-outline-200 max-sm:left-[3.5px]" />
          {/* <div className="absolute max-sm:space-y-3 pt-8 sm:pt-[84px]">
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
          </div> */}

          <div className="grid grid-cols-1 gap-x-14 gap-y-3 py-8 max-sm:ml-8 sm:grid-cols-2 lg:py-[84px]">
            {pencapaian.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "relative flex h-[136px] flex-col gap-1 rounded-xl border border-outline-200 px-4 py-3",
                  "group hover:border-[1.5px] hover:border-brand-300 even:sm:translate-y-[76px]",
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
                <div
                  className={cn(
                    i % 2 === 0 ? "max-sm:-left-7 sm:-right-7" : "-left-7",
                    // : "right-full",
                    "absolute top-1/2 h-px w-[26px] -translate-y-1/2 transform border border-dashed border-outline-400",
                    "group-hover:border-y-2 group-hover:border-brand-300",
                  )}
                >
                  <div
                    className={cn(
                      i % 2 === 0
                        ? "group-hover:-right-[6.5px] max-sm:-left-1.5 group-hover:max-sm:-left-[6.5px] sm:-right-1.5"
                        : "-left-1.5 group-hover:-left-[6.5px]",
                      // ? "max-sm:right-full sm:left-full"
                      // : "right-full",
                      "absolute top-1/2 size-2 -translate-y-1/2 transform rounded-full bg-brand-600",
                      "ring-brand-300 ring-offset-[3px] group-hover:ring",
                    )}
                  >
                    <div
                      className={cn(
                        // i % 2 === 0
                        //   ? "max-sm:right-full sm:left-full"
                        //   : "right-full",
                        "left-[3px] top-2",
                        "absolute h-[60px] w-0.5 bg-gradient-to-b from-brand-600 from-0% to-transparent to-100%",
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
