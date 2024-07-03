import { Icon } from "@/icons/social-media";
import { Link } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";

type FooterLinks = "about_us" | "quick_links" | "open_source";

export default function Footer() {
  const t = useTranslations();
  const format = useFormatter();

  const links: Record<FooterLinks, Array<{ name: string; href: string }>> = {
    about_us: [
      { name: "corporate_info", href: routes.CORPORATE_INFO },
      { name: "announcements", href: routes.ANNOUNCEMENTS },
      { name: "achievements", href: routes.ACHIEVEMENTS },
      { name: "policy", href: routes.POLICY },
      { name: "directory", href: routes.DIRECTORY },
      { name: "contact_us", href: routes.CONTACT_US },
    ],
    quick_links: [
      { name: "SpotMe", href: "#" },
      { name: "MyGovUC", href: "#" },
      { name: "DDMS", href: "#" },
      { name: "MyMesyuarat", href: "#" },
      { name: "ePenyata Gaji", href: "#" },
      { name: "HRMIS", href: "#" },
      { name: "ePerolehan", href: "#" },
    ],
    open_source: [
      { name: "repo", href: "https://github.com/" },
      { name: "ui_ux", href: "https://www.figma.com/file/" },
    ],
  };

  const className = {
    link: "text-sm text-black-700 [text-underline-position:from-font] hover:text-black-900 hover:underline",
  };

  return (
    <div className="divide-y-outline-200 z-10 divide-y border-t bg-background-50 px-0 py-8 lg:px-6 lg:py-16">
      <div className="flex flex-col gap-6 pb-8 max-lg:px-6 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 lg:gap-4.5">
          <div className="flex items-center gap-x-2.5">
            <Image
              src="/jata-negara.png"
              width={28}
              height={28}
              alt="Jata Negara"
            />
            <div>
              <p className="whitespace-nowrap font-poppins font-semibold">
                {t("Agency.name")}
              </p>
            </div>
          </div>
          <p className="text-sm text-black-700">
            Aras 13, 14 dan 15, Blok Menara, <br />
            Menara Usahawan <br />
            No. 18, Persiaran Perdana, Presint 2, <br />
            Pusat Pentadbiran Kerajaan Persekutuan, <br />
            62000 Putrajaya, Malaysia.
          </p>
          <div className="space-y-2 lg:space-y-3">
            <p className="text-sm font-semibold">{t("Footer.follow_us")}</p>
            <div className="flex gap-3">
              <Icon.Facebook />
              <Icon.Instagram />
              <Icon.X />
              <Icon.Youtube />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 text-sm lg:flex-row">
          {(Object.keys(links) as FooterLinks[]).map((category) => (
            <div className="space-y-2">
              <p className="font-semibold">
                {t("Footer." + category)}
              </p>
              <div
                key={category}
                className="grid grid-cols-2 flex-col gap-y-2 sm:grid-cols-4 sm:gap-x-6 lg:flex lg:w-[200px] lg:gap-2"
              >
                {links[category].map(({ name, href }) =>
                  category === "about_us" ? (
                    <Link className={className.link} href={href} scroll={false}>
                      {t("Header." + name)}
                    </Link>
                  ) : (
                    <a
                      key={name}
                      className={className.link}
                      target="_blank"
                      rel="noopenner noreferrer"
                      href={href}
                    >
                      {category === "quick_links" ? name : t("Footer." + name)}
                    </a>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 px-6 pt-8 text-sm text-dim-500 lg:flex-row lg:px-0">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <p>
            {t("Footer.all_rights_reserved")} © {new Date().getFullYear()}
          </p>
          <span className="hidden h-3 w-px bg-outline-300 lg:block"></span>
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-black-700">
            {["disclaimer", "privacy", "safety", "personal_data"].map(
              (link) => (
                <a
                  key={link}
                  className="text-sm text-black-700 [text-underline-position:from-font] hover:text-black-900 hover:underline"
                  target="_blank"
                  rel="noopenner noreferrer"
                  href={link}
                >
                  {t("Footer." + link)}
                </a>
              ),
            )}
          </div>
        </div>

        <span>
          {t("Footer.last_update") +
            ": " +
            format.dateTime(new Date(), {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
        </span>
      </div>
    </div>
  );
}
