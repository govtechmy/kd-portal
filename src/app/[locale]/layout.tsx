import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import Masthead from "@/components/layout/masthead";
import "@/lib/styles/globals.css";
import { cn } from "@/lib/utils";
import { Inter, Poppins } from "next/font/google";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import SiteScript from "./site-script";

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

// export function generateStaticParams() {
//   return locales.map((locale) => ({ locale }));
// }

// export const dynamic = "force-static";

const payload = await getPayloadHMR({ config });

/* Our app sits here to not cause any conflicts with payload's root layout  */
export default async function Layout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: {
    locale: "ms-MY" | "en-GB";
  };
}) {
  const messages = await getMessages();

  const headerData = await payload.findGlobal({
    slug: "header",
    locale: locale,
    depth: 3,
  });

  const footerData = await payload.findGlobal({
    slug: "footer",
    locale: locale,
    depth: 3,
  });

  const siteInfo = await payload.findGlobal({
    slug: "site-info",
    locale: locale,
    depth: 3,
  });

  return (
    <html lang={locale}>
      <head>
        <script
          defer
          src="https://unpkg.com/@tinybirdco/flock.js"
          data-token={`${process.env.NEXT_PUBLIC_TINYBIRD_TOKEN}`}
        ></script>
      </head>
      <SiteScript />

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
            <Header
              locale={locale}
              nav_items={[
                ...headerData.items.map((item) => ({
                  name: item.link.label,
                  href: item.link.reference || "",
                })),
                ...(headerData.dropdown.dept_agency?.length
                  ? [
                      {
                        name: headerData.dropdown.name,
                        href: headerData.dropdown.dept_agency.map((dept) => ({
                          name: dept.link.label,
                          href: dept.link.url ? dept.link.url : "",
                        })),
                      },
                    ]
                  : []),
              ]}
            />
            <div className="flex-1">{children}</div>
            <Footer
              siteInfo={siteInfo}
              links={{
                about_us: footerData.about_us?.length
                  ? footerData.about_us.map((item) => ({
                      name: item.link.label,
                      href: item.link.reference || "",
                    }))
                  : [],
                quick_links: footerData["quick-links"]?.length
                  ? footerData["quick-links"].map((item) => ({
                      name:
                        (item["quick-links"] &&
                          typeof item["quick-links"] !== "string" &&
                          item["quick-links"].name) ||
                        "",
                      href:
                        ((item["quick-links"] &&
                          typeof item["quick-links"] !== "string" &&
                          item["quick-links"].href[0].link?.url) as string) ||
                        "",
                    }))
                  : [],
                open_source: footerData["open-source"]?.length
                  ? footerData["open-source"].map((item) => ({
                      name: item.link.label,
                      href: item.link.reference || "",
                    }))
                  : [],
              }}
            />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
