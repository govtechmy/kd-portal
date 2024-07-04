import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import Masthead from "@/components/layout/masthead";
import { locales } from "@/lib/i18n-config";
import "@/lib/styles/globals.css";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Kementerian Digital",
  description: "",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = "force-dynamic";

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
      <body className={cn(inter.className, poppins.variable)}>
        <NextIntlClientProvider messages={messages}>
          <Masthead />
          <Header locale={locale} />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
