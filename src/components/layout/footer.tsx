import { Icon } from "@/icons/social-media";
import { _social_media } from "@/lib/constants/links";
import { Link } from "@/lib/i18n";
import { SiteInfo } from "@/payload-types";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

type FooterLinks = "about_us" | "quick_links" | "open_source";

export const quick_links = [
  { name: "SpotMe", href: "https://www.spotme.gov.my/" },
  { name: "MyGovUC", href: "https://www.mygovuc.gov.my/" },
  { name: "DDMS", href: "https://portalddms.malaysia.gov.my/" },
  { name: "MyMesyuarat", href: "https://www.mymesyuarat.gov.my/" },
  { name: "ePenyata Gaji", href: "https://epenyatagaji-laporan.anm.gov.my/" },
  { name: "HRMIS", href: "https://hrmis2.eghrmis.gov.my/" },
  { name: "ePerolehan", href: "https://www.eperolehan.gov.my/" },
];

export const social_media = [
  {
    icon: <Icon.Facebook />,
    name: "Facebook",
    href: "https://www.facebook.com/KementerianDigitalMalaysia/",
  },
  { icon: <Icon.X />, name: "X", href: "https://x.com/KemDigitalMsia" },
  {
    icon: <Icon.Instagram />,
    name: "Instagram",
    href: "https://www.instagram.com/kementeriandigitalmalaysia/",
  },
  {
    icon: <Icon.Tiktok />,
    name: "Tiktok",
    href: "https://www.tiktok.com/@kementeriandigital",
  },
];

export default function Footer({
  links,
  siteInfo,
}: {
  links: Record<FooterLinks, Array<{ name: string; href: string }>>;
  siteInfo: SiteInfo;
}) {
  const t = useTranslations();
  const format = useFormatter();

  const className = {
    link: "text-sm text-black-700 underline-font hover:text-foreground hover:underline",
  };

  return (
    <div className="border-t border-outline-200 bg-background-50 py-8 lg:py-16 print:hidden">
      <div className="container divide-y divide-outline-200 max-sm:px-0">
        <div className="flex flex-col gap-6 pb-8 max-sm:px-4.5 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-4 lg:gap-4.5">
            <div className="flex items-center gap-x-2.5">
              <Image
                src="/jata-negara.png"
                width={28}
                height={28}
                alt="Jata Negara"
                className="select-none"
              />
              <div>
                <p className="whitespace-nowrap font-poppins font-semibold">
                  {siteInfo.site_name}
                </p>
              </div>
            </div>
            <p className="text-sm text-black-700">
              {siteInfo && siteInfo.address
                ? siteInfo.address.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))
                : ""}
            </p>
            <div className="space-y-2 lg:space-y-3">
              <p className="text-sm font-semibold">{t("Footer.follow_us")}</p>
              <div className="flex gap-3">
                {Boolean(siteInfo.social_media.length)
                  ? siteInfo.social_media.map(
                      ({ social, link, id }) =>
                        link.url && (
                          <a
                            key={id}
                            href={link.url}
                            target="_blank"
                            rel="noopenner noreferrer"
                          >
                            {_social_media[social].icon}
                          </a>
                        ),
                    )
                  : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-sm lg:flex-row">
            {(Object.keys(links) as FooterLinks[]).map((category) => (
              <div className="space-y-2" key={category}>
                <p className="font-semibold">{t(`Footer.${category}`)}</p>
                <div className="grid grid-cols-2 flex-col gap-y-2 sm:grid-cols-4 sm:gap-x-6 lg:flex lg:w-[200px] lg:gap-2">
                  {links[category].map(({ name, href }) =>
                    category === "about_us" ? (
                      <Link
                        key={name}
                        className={className.link}
                        href={href}
                        scroll={true}
                      >
                        {name}
                      </Link>
                    ) : (
                      <a
                        key={name}
                        className={className.link}
                        target="_blank"
                        rel="noopenner noreferrer"
                        href={href}
                      >
                        {name}
                      </a>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 pt-8 text-sm text-dim-500 max-sm:px-4.5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <p>
              {t("Footer.all_rights_reserved")} © {new Date().getFullYear()}
            </p>
            <span className="hidden h-3 w-px bg-outline-300 lg:block"></span>
            <div className="flex flex-wrap gap-x-3 gap-y-2 text-black-700">
              {["penafian", "dasar-privasi"].map((link) => (
                <Link
                  key={link}
                  className="underline-font text-sm text-black-700 hover:text-foreground hover:underline"
                  href={`/${link}`}
                >
                  {t(`Footer.${link}`)}
                </Link>
              ))}
            </div>
          </div>

          <time dateTime={process.env.LAST_UPDATED}>
            {t("Footer.last_update") +
              ": " +
              format.dateTime(new Date(process.env.LAST_UPDATED), {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Kuala_Lumpur",
              })}
          </time>
        </div>
      </div>
    </div>
  );
}
