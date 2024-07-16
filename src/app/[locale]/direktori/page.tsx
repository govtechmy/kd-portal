import { useTranslations } from "next-intl";
import React from "react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import DirektoriMain from "@/components/direktori/main";

export const dynamic = "force-static";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "Header" });

  return {
    title: t("directory"),
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

  return <DirektoriMain />;
}
