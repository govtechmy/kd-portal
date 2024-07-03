import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { locales } from "@/lib/i18n-config";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Inter, Poppins } from "next/font/google";
import { ReactNode } from "react";
import "@/lib/styles/globals.css";
import Masthead from "@/components/layout/masthead";

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
