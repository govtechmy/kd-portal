import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import Masthead from "@/components/layout/masthead";
import { locales } from "@/lib/i18n-config";
import "@/lib/styles/globals.css";
import { cn } from "@/lib/utils";
import { Inter, Poppins } from "next/font/google";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "Agency" });

  let ogImages = [];
  if (locale === "ms-MY") {
    ogImages.push({
      url: `${process.env.APP_URL}/og/ms-MY.png`,
      width: 1200,
      height: 600,
    });
  } else {
    ogImages.push({
      url: `${process.env.APP_URL}/og/en-GB.png`,
      width: 1200,
      height: 600,
    });
  }

  return {
    title: {
      template: `%s | ${t("name")}`,
      default: t("name"),
    },
    description: t("description"),
    metadataBase: new URL(process.env.APP_URL),
    openGraph: {
      images: ogImages,
    },
    alternates: {
      canonical: `${process.env.APP_URL}`,
      languages: {
        "en-GB": `${process.env.APP_URL}/en-GB`,
      },
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = "force-static";

/* Our app sits here to not cause any conflicts with payload's root layout  */
export default async function Layout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: {
    locale: string;
  };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={cn(
          inter.className,
          poppins.variable,
          "flex min-w-[320px] flex-col",
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Masthead />
            <Header locale={locale} />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
