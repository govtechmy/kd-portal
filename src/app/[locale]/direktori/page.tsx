import { useTranslations } from "next-intl";
import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";

import DirektoriMain from "@/components/direktori/main";

export const dynamic = "force-static";

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
