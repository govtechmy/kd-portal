import Image from "next/image";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "Agency" });
  return new ImageResponse(
    (
      <Image
        priority
        src={`/og/${locale}`}
        {...size}
        alt={t("name")}
        className="h-[1200px] w-[630px] select-none object-cover"
      />
    ),
    {
      ...size,
    },
  );
}
