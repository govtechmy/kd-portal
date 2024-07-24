import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import ProfilKementerianComponent from "./page-component";

export const dynamic = "force-static";
const payload = await getPayloadHMR({ config });

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "Header" });

  return {
    title: t("ministry_profile"),
  };
}

export default async function Page({
  params: { locale },
}: {
  params: {
    locale: "ms-MY" | "en-GB";
  };
}) {
  unstable_setRequestLocale(locale);
  const data = await payload.findGlobal({
    slug: "profil-kementerian",
    locale: locale,
    depth: 3,
  });

  return <ProfilKementerianComponent data={data} locale={locale} />;
}
