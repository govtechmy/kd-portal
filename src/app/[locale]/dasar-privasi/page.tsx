import Hero from "@/components/layout/hero";
import Section from "@/components/layout/section";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import React from "react";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return {
    title: t("header"),
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
  const t = useTranslations("Privacy");

  return (
    <main>
      <Hero title={t("header")} />

      <Section>
        <div className="gap-6 border-x border-washed-100 py-12 lg:py-[84px] xl:grid xl:grid-cols-12">
          <div className="col-span-10 col-start-2 space-y-6 whitespace-pre-line text-pretty text-sm text-black-700">
            <p className="text-base font-semibold">{t("your_privacy")}</p>
            <p>{t("your_privacy_desc")}</p>
            <p className="text-base font-semibold">{t("collected_info")}</p>
            <p>{t("collected_info_desc")}</p>
            <p className="text-base font-semibold">{t("policy_change")}</p>
            <p>{t("policy_change_desc")}</p>
            <p className="pt-6 text-lg font-bold">{t("personal_data")}</p>
            <p className="text-base font-semibold">{t("personal_data_act")}</p>
            <p>
              {t.rich("personal_data_act_desc", {
                a: (chunks) => (
                  <a
                    className="underline-font text-foreground-primary hover:underline"
                    target="_blank"
                    rel="noopenner noreferrer"
                    href="http://www.pdp.gov.my"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <p>{t("last_updated")}</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
