import HeroPattern from "@/components/layout/hero-pattern";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations();

  return (
    <>
      <div className="relative -z-10 border-b">
        <div className="absolute -z-10 flex h-full w-full justify-center overflow-hidden">
          <HeroPattern className="absolute" />
        </div>
        <h1 className="py-16 text-center font-poppins text-hmd font-semibold">
          {t("Policy.header")}
        </h1>
      </div>

      <section className="flex min-h-screen w-full"></section>
    </>
  );
}
