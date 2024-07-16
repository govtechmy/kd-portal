// @ts-nocheck
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "Agency" });

  const imageData = await fetch(
    new URL(`${process.env.APP_URL}/og/${locale}.png`, import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          ...size,
        }}
        className="relative bg-white"
      >
        <img
          src={imageData}
          alt={t("name")}
          className="absolute"
          width={1200}
          height={600}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
