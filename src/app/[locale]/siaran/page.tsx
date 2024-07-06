import HeroPattern from "@/components/layout/hero-pattern";
import Pagination from "@/components/ui/pagination";
import Search from "@/icons/search";
import { routes } from "@/lib/routes";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations();

  return (
    <main className="divide-y-washed-100 divide-y">
      <section className="relative">
        <div className="absolute -z-10 flex h-full w-full justify-center overflow-hidden">
          <HeroPattern className="absolute -top-[83.33%]" />
        </div>
        <h1 className="py-16 text-center font-poppins text-hmd font-semibold">
          {t("Announcements.header")}
        </h1>
        <div className="space-y-4">
          <div className="mx-auto flex items-center gap-2.5 rounded-full border bg-background pl-4.5 pr-1.5 shadow-card sm:w-[600px]">
            <input
              placeholder={t("Announcements.placeholder")}
              className="flex h-11 w-full rounded-md bg-background py-3 text-sm outline-none placeholder:text-dim-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <span className="flex shrink-0 items-center gap-x-1 text-sm text-dim-500">
              {t("Search.type")}
              <span className="rounded-md border border-outline-300 px-1.5 py-0.5">
                /
              </span>
              {t("Search.search")}
            </span>
            <div className="rounded-full bg-gradient-to-b from-[#5288FF] to-brand-600 to-100% p-1.5">
              <Search className="text-white" />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span>-</span>
          </div>
        </div>
      </section>
      
      <section className="flex min-h-screen w-full">
        <Pagination
          curr={0}
          totalPages={10}
          setPage={(page) => `${routes.ANNOUNCEMENTS}?page=${page + 1}`}
        />
      </section>
    </main>
  );
}
