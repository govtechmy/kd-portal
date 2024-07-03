import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations();

  return (
    <>
      <section className="min-h-screen px-6">
        <div className="w-1/3">
          <h1 className="py-16 text-center font-poppins text-hmd font-semibold">
            {t("Achievements.header")}
          </h1>
        </div>
        <div className="w-2/3"></div>
      </section>
    </>
  );
}
