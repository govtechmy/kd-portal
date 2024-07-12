import HeroPattern from "@/components/layout/hero-pattern";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

export default function Page({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Disclaimer");

  return (
    <main className="divide-washed-100 divide-y">
      <section className="relative">
        <div className="absolute -z-10 flex h-full w-full justify-center overflow-hidden">
          <HeroPattern className="absolute -top-[83.33%]" />
        </div>
        <h1 className="py-16 text-center font-poppins text-hmd font-semibold">
          {t("header")}
        </h1>
      </section>

      <section className="container border-x border-washed-100 py-12 lg:py-[84px] xl:grid xl:grid-cols-12">
        <div className="col-span-10 col-start-2 space-y-6 text-pretty text-sm text-black-700 whitespace-pre-line">
          <p>{t("desc")}</p>
        </div>
      </section>
    </main>
  );
}
