import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import InfoKorporatComponent from "./page-component";

export const dynamic = "force-static";
const payload = await getPayloadHMR({ config });

export default async function Page({
  params: { locale },
}: {
  params: {
    locale: "ms-MY" | "en-GB";
  };
}) {
  const data = await payload.findGlobal({
    slug: "info-korporat",
    locale: locale,
    depth: 3,
  });

  return <InfoKorporatComponent data={data} locale={locale} />;
}
