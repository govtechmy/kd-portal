import Section from "@/components/layout/section";
import Overline from "@/components/typography/overline";
import { buttonVariants } from "@/components/ui/button";
import Bolt from "@/icons/bolt";
import CheckmarkShield from "@/icons/checkmark-shield";
import EyeShow from "@/icons/eye-show";
import Flag from "@/icons/flag";
import Globe from "@/icons/globe";
import Gov from "@/icons/gov";
import Money from "@/icons/money";
// import { Icon } from "@/icons/social-media";
import Trophy from "@/icons/trophy";
import UserGroup from "@/icons/user-group";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

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

export default function Page({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  // const getIcon = (type: string) => {
  //   switch (type) {
  //     case "facebook":
  //       return Icon.Facebook;
  //     case "x":
  //       return Icon.X;
  //     case "tiktok":
  //       return Icon.Tiktok;
  //     case "instagram":
  //       return Icon.Instagram;
  //     case "t":
  //       return Icon.Telegram;
  //     case "linkedin":
  //       return Icon.LinkedIn;

  //     default:
  //       return () => <></>;
  //   }
  // };

  return (
    <main className="divide-y divide-washed-100">
      <Section>
        <div className="flex flex-col gap-16 py-[84px] lg:border-x lg:border-x-washed-100">
          <div className="space-y-16">
            <div className="flex flex-col items-center gap-6">
              <Overline>{t("Info.background")}</Overline>
              <div className="flex flex-col items-center gap-4.5 font-poppins text-hxs font-semibold sm:flex-row sm:text-hsm">
                <Image
                  src="/jata-negara.png"
                  width={65}
                  height={50}
                  alt="Jata Negara"
                  className="select-none"
                />
                {t("Agency.name")}
              </div>
            </div>

            <div className="gap-[42px] lg:grid lg:grid-cols-4">
              <div className="col-span-2 col-start-2">
                <div className="mx-auto flex max-w-prose flex-col gap-[42px]">
                  <blockquote>
                    <p className="font-poppins text-[46px] leading-none text-brand-600">
                      “
                    </p>
                    <div className="space-y-6">
                      <p className="text-balance text-xl text-black-700">
                        {t("Info.quote")}
                      </p>
                      <p className="text-dim-500">{t("Info.author")}</p>
                    </div>
                  </blockquote>

                  <p className="whitespace-pre-line">{t("Info.desc1")}</p>
                  <p className="whitespace-pre-line">{t("Info.desc2")}</p>

                  <Link
                    href={routes.DIRECTORY}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "md" }),
                      "mt-3 w-fit rounded-full",
                    )}
                  >
                    <UserGroup />
                    {t("Info.staff_directory")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* <section className="container gap-6 py-12 md:py-[84px] lg:border-x lg:border-washed-100 xl:grid xl:grid-cols-12">
        <div className="col-span-10 col-start-2 space-y-12 md:space-y-[74px]">
          <h2 className="text-center font-poppins text-hsm font-semibold">
            {t("Info.Org.title")}
          </h2>
          <div className="mx-auto grid w-full grid-cols-1 gap-y-8 md:w-fit md:grid-cols-6 md:gap-x-6 md:gap-y-[42px]">
            {[
              {
                pos: "menteri",
                links: [
                  "facebook.com/gobindsinghdeo",
                  "x.com/gobindsinghdeo",
                  "tiktok.com/@gobindsinghdeo",
                  "instagram.com/gobindsinghdeo",
                  "t.me/gobindsinghdeo",
                  "linkedin.com/in/gobindsinghdeo",
                ],
              },
              { pos: "timbalan", links: [] },
              { pos: "ksu", links: [] },
              { pos: "tksu1", links: [] },
              { pos: "tksu2", links: [] },
            ].map(({ pos, links }, i) => (
              <div
                key={i}
                className={cn(
                  i === 0
                    ? "md:col-start-2"
                    : i === 1
                      ? "md:col-start-4 md:mt-[42px]"
                      : i > 2
                        ? "md:mt-[42px]"
                        : "",
                  "flex w-full flex-row items-center gap-x-3 md:col-span-2 md:w-[250px] md:flex-col md:gap-y-5",
                )}
              >
                <Image
                  src={`/org/${pos}.webp`}
                  width={120}
                  height={120}
                  alt={t(`Info.Org.${pos}`)}
                  className="aspect-square size-[84px] rounded-xl border-2 border-background shadow-card md:size-[120px]"
                />
                <div className="space-y-3 md:space-y-5">
                  <div className="space-y-1.5 text-balance md:text-center">
                    <p className="text-lg font-semibold text-foreground">
                      {t(`Info.Org.${pos}_name`)}
                    </p>
                    <p className="text-sm text-black-700">
                      {t(`Info.Org.${pos}`)}
                    </p>
                  </div>
                  {links.length > 0 ? (
                    <div className="flex flex-wrap gap-2.5 text-brand-600 md:justify-center">
                      {links.map((href) => {
                        const Icon = getIcon(href.split(".")[0]);
                        return (
                          <a
                            href={"https://" + href}
                            target="_blank"
                            rel="noopenner noreferrer"
                          >
                            <Icon className="size-4" />
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>
      </Section> */}

      {/* Visi & Misi */}
      <Section>
        <div className="grid grid-cols-1 divide-washed-100 max-md:divide-y md:grid-cols-2 md:divide-x lg:border-x lg:border-x-washed-100">
          {[
            {
              icon: <EyeShow className="size-8" />,
              title: "Info.visi",
              desc: "Info.visi_desc",
            },
            {
              icon: <Flag className="size-8" />,
              title: "Info.misi",
              desc: "Info.misi_desc",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-6 py-12 md:gap-8 md:px-16 md:py-[84px]"
            >
              <div className="size-[54px] rounded-full bg-brand-50 p-[11px] text-foreground-primary">
                {icon}
              </div>
              <div className="space-y-3 lg:space-y-4.5">
                <p className="text-hsm font-semibold text-brand-600">
                  {t(title)}
                </p>
                <p className="text-black-700">{t(desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Fungsi & Peranan */}
      <Section>
        <div className="gap-6 py-12 md:py-[84px] lg:border-x lg:border-washed-100 xl:grid xl:grid-cols-12">
          <div className="col-span-10 col-start-2 space-y-12 md:space-y-[74px]">
            <h2 className="text-center font-poppins text-hsm font-semibold">
              {t("Info.Role.title")}
            </h2>
            <div className="grid grid-cols-1 gap-y-8 sm:gap-x-12 sm:gap-y-[72px] md:grid-cols-2 lg:grid-cols-3">
              {[Gov, Globe, Bolt, CheckmarkShield, Money, Trophy].map(
                (Icon, i) => (
                  <div key={i} className="flex flex-row gap-4.5 md:flex-col">
                    <div className="size-[54px] rounded-xl bg-brand-50 p-[11px] text-foreground-primary">
                      <Icon className="stroke-1.5 size-8" />
                    </div>

                    <p className="text-black-700">
                      {t.rich(`Info.Role.desc${i + 1}`, {
                        b: (chunks) => (
                          <span className="font-semibold text-foreground-primary">
                            {chunks}
                          </span>
                        ),
                      })}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
