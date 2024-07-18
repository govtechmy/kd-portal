import Hero from "@/components/layout/hero";
import Section from "@/components/layout/section";
import Paginate from "@/components/siaran/paginate";
import DaterangePicker from "@/components/ui/daterange-picker";
import Search from "@/components/ui/search";
import ArrowOutgoing from "@/icons/arrow-outgoing";
import ArrowUp from "@/icons/arrow-up";
import Clock from "@/icons/clock";
import { Link } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
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
    title: t("announcements"),
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
      <Hero
        title={t("Announcements.header")}
        search={
          <div className="space-y-4">
            <Search
              // onChange={}
              placeholder={t("Directory.search_placeholder")}
            />
            <DaterangePicker />
          </div>
        }
      />

      <main>
        <Section>
          <div className="flex flex-col gap-8 border-washed-100 py-12 lg:border-x lg:px-0">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <Link
                  href={routes.ANNOUNCEMENTS + `/${i}`}
                  className="group relative flex flex-col gap-4 rounded-xl border border-outline-200 p-6 hover:border-brand-200"
                >
                  <div
                    className={cn(
                      i === 0
                        ? "absolute right-6 top-5 flex items-center justify-center rounded-full border border-[#DD420A]/10 bg-[#DD420A]/5 px-2 py-0.5"
                        : "hidden",
                    )}
                  >
                    <ArrowUp className="size-3.5 stroke-2 text-[#DD420A]" />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <p
                      className={cn(
                        "font-semibold",
                        i % 2 === 0
                          ? "text-foreground-success"
                          : "text-foreground-danger",
                      )}
                    >
                      {i % 2 === 0 ? "Siaran Media" : "Pengumuman"}
                    </p>
                    <div className="invisible flex items-center gap-2 group-hover:visible">
                      <div className="h-3 w-px bg-outline-300" />
                      <div className="flex items-center gap-1 text-dim-500">
                        <Clock className="size-4" />
                        Bacaan 5 min
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-auto flex-col gap-y-5">
                    <div className="flex grow gap-x-4.5">
                      <div className="flex flex-col gap-y-2">
                        <p className="font-semibold -tracking-[0.01em] text-foreground group-hover:text-foreground-primary">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do
                        </p>
                        <p className="line-clamp-3 text-sm text-black-700">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                      <Image
                        src="/jata-negara.png"
                        height={80}
                        width={80}
                        className="size-20 select-none rounded-lg border-4 border-white object-contain shadow-card"
                        alt=""
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <time className="text-dim-500">11 Feb 2024</time>
                      <div className="invisible flex items-center gap-1 text-foreground-primary group-hover:visible">
                        <span className="font-semibold">Baca</span>
                        <ArrowOutgoing className="size-4 stroke-[1.5]" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Paginate
              totalPages={10}
              href={routes.ANNOUNCEMENTS + "?page="}
            />
          </div>
        </Section>
      </main>
    </>
  );
}
