import HeroPattern from "@/components/layout/hero-pattern";
import { useTranslations } from "next-intl";
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
    title: t("policy"),
  };
}

export default function Page() {
  const t = useTranslations();
  notFound();

  return (
    <main className="divide-y divide-washed-100">
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
