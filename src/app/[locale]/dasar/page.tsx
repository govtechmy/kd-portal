import DasarTable from "@/components/dasar/table";
import Hero from "@/components/layout/hero";
import DaterangePicker from "@/components/ui/daterange-picker";
import Search from "@/components/ui/search";
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
  const t = await getTranslations({ locale, namespace: "Header" });

  return {
    title: t("policy"),
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
        title={t("Policy.header")}
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
        <DasarTable />
      </main>
    </>
  );
}
