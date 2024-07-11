import HeroPattern from "@/components/layout/hero-pattern";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import React from "react";

export default function Page() {
  const t = useTranslations();
  notFound();

  return (
    <main className="divide-washed-100 divide-y">
      <section className="relative">
        <div className="absolute -z-10 flex h-full w-full justify-center overflow-hidden">
          <HeroPattern className="absolute -top-[83.33%]" />
        </div>
        <h1 className="py-16 text-center font-poppins text-hmd font-semibold">
          {t("Policy.header")}
        </h1>
      </section>

      <section className="flex min-h-screen w-full"></section>
    </main>
  );
}
