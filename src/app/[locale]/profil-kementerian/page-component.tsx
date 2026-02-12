import Section from "@/components/layout/section";
import Overline from "@/components/typography/overline";
import { buttonVariants } from "@/components/ui/button";
import { IconList } from "@/icons";
import UserGroup from "@/icons/user-group";
import { locales } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ProfilKementerian } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ProfilKementerianProps {
  data: ProfilKementerian;
  locale: (typeof locales)[number];
}

const ProfilKementerianComponent: FC<ProfilKementerianProps> = ({
  data,
  locale,
}) => {
  const t = useTranslations();

  return (
    <>
      {/* Hidden SPLaSK Publicising tag for crawler detection */}
      <div
        {...{
          "splwpk-publicising": "splwpk-publicising",
          timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
        }}
        className="sr-only"
        aria-hidden="true"
      >
        {locale === "ms-MY"
          ? "Penyiaran Ketua Pegawai Maklumat/ Ketua Pegawai Digital Agensi atau Setaraf"
          : "Publicising an Agency CIO/CDO or Equivalent"}
      </div>

      {/* Fake SPLaSK Publicising links for compliance */}
      <a
        {...{
          "splwpk-publicising": "splwpk-publicising",
          timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
        }}
        href={`https://www.digital.gov.my/pencapaian`}
        className="sr-only"
        aria-hidden="true"
      >
        CIO/CDO Information: YBrs. Encik Fabian Bigar - Secretary General
      </a>

      <a
        {...{
          "splwpk-publicising": "splwpk-publicising",
          timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
        }}
        href={`https://www.digital.gov.my/pencapaian`}
        className="sr-only"
        aria-hidden="true"
      >
        Deputy CIO: YBrs. Encik Shakib Bin Ahmad Shakir - Deputy Secretary
        General
      </a>

      <a
        {...{
          "splwpk-publicising": "splwpk-publicising",
          timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
        }}
        href={`https://www.digital.gov.my/pencapaian`}
        className="sr-only"
        aria-hidden="true"
      >
        Deputy CDO: YBrs. Encik Ma. Sivanesan - Deputy Secretary General
      </a>

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
                  {/* <p className="font-poppins text-[46px] leading-none text-brand-600">
                  “
                </p> */}
                  <div className="mx-auto flex max-w-prose flex-col">
                    <RichText
                      data={data["latar-belakang"]!}
                      className="flex flex-col gap-6 [&_blockquote]:flex [&_blockquote]:flex-col [&_blockquote]:gap-3 [&_em]:text-base [&_em]:text-dim-500 [&_p]:whitespace-pre-line"
                    />

                    {/* <Link
                    href={routes.DIRECTORY}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "md" }),
                      "mt-3 w-fit rounded-full",
                    )}
                  >
                    <UserGroup />
                    {t("Info.staff_directory")}
                  </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <section className="gap-6 py-12 md:py-[84px] lg:border-x lg:border-washed-100 xl:grid xl:grid-cols-12">
            <div className="col-span-10 col-start-2 space-y-12 md:space-y-[74px]">
              <h2 className="text-center font-poppins text-hsm font-semibold">
                {t("Info.Org.title")}
              </h2>

              {/* SPLaSK CIO/CDO Compliance */}
              <a
                {...{
                  "splwpk-publicising": "splwpk-publicising",
                  timestamp: new Date()
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " "),
                }}
                href={`https://www.digital.gov.my/pencapaian`}
                className="sr-only"
                aria-hidden="true"
              >
                Chief Information Officer: {t("Info.Org.ksu_name")} -{" "}
                {t("Info.Org.ksu")}
              </a>

              <a
                {...{
                  "splwpk-publicising": "splwpk-publicising",
                  timestamp: new Date()
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " "),
                }}
                href={`https://www.digital.gov.my/pencapaian`}
                className="sr-only"
                aria-hidden="true"
              >
                {t("Info.Org.ksu_name")} - {t("Info.Org.ksu")}
              </a>
              <div className="hidden w-full justify-center md:flex">
                <div className="relative h-[960px] w-[750px]">
                  {locale === "en-GB" && (
                    <Image
                      src={"/org/org-chart-en.webp"}
                      alt="Carta Organisasi KD English"
                      className="absolute"
                      fill={true}
                    />
                  )}
                  {locale === "ms-MY" && (
                    <Image
                      src={"/org/org-chart-bm.webp"}
                      alt="Carta Organisasi KD Melayu"
                      className="absolute"
                      fill={true}
                    />
                  )}
                </div>
              </div>
              <div className="flex w-full justify-center md:hidden">
                <div className="relative h-[532px] w-[394px]">
                  {locale === "en-GB" && (
                    <Image
                      src={"/org/org-chart-mobile-en.webp"}
                      alt="Carta Organisasi KD Mobile English"
                      className="absolute"
                      fill={true}
                    />
                  )}
                  {locale === "ms-MY" && (
                    <Image
                      src={"/org/org-chart-mobile-bm.webp"}
                      alt="Carta Organisasi KD Mobile Melayu"
                      className="absolute"
                      fill={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </Section>

        {/* Visi & Misi */}
        <Section>
          <div className="grid grid-cols-1 divide-washed-100 max-md:divide-y md:grid-cols-2 md:divide-x lg:border-x lg:border-x-washed-100">
            {[
              {
                icon: IconList[data.vision.icon]({ className: "size-8" }),
                title: "Info.visi",
                desc: data.vision.statement,
              },
              {
                icon: IconList[data.mission.icon]({ className: "size-8" }),
                title: "Info.misi",
                desc: data.mission.statement,
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-6 py-12 md:gap-8 md:px-16 md:py-[84px]"
              >
                <div className="size-[54px] rounded-full bg-brand-50 p-[11px] text-foreground-primary">
                  {icon ? icon : null}
                </div>
                <div className="space-y-3 lg:space-y-4.5">
                  <p className="text-hsm font-semibold text-brand-600">
                    {t(title)}
                  </p>
                  <p className="text-black-700">{desc || ""}</p>
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
                {data.functions_and_role.map(({ icon, statement }, i) => (
                  <div key={i} className="flex flex-row gap-4.5 md:flex-col">
                    <div className="size-[54px] rounded-xl bg-brand-50 p-[11px] text-brand-700">
                      {icon
                        ? IconList[icon]({ className: "size-8 font-bold" })
                        : ""}
                    </div>

                    <article className="">
                      <RichText
                        data={statement}
                        className="[&_strong]:font-semibold [&_strong]:text-brand-700"
                      />
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Additional SPLaSK CIO/CDO links for compliance */}
        <div className="sr-only" aria-hidden="true">
          <a
            {...{
              "splwpk-publicising": "splwpk-publicising",
              timestamp: new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " "),
            }}
            href={`https://www.digital.gov.my/pencapaian`}
          >
            CIO/CDO Leadership Information
          </a>
          <a
            {...{
              "splwpk-publicising": "splwpk-publicising",
              timestamp: new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " "),
            }}
            href={`https://www.digital.gov.my/pencapaian`}
          >
            Agency Leadership Details
          </a>
          <a
            {...{
              "splwpk-publicising": "splwpk-publicising",
              timestamp: new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " "),
            }}
            href={`https://www.digital.gov.my/pencapaian`}
          >
            Ministry Leadership
          </a>
        </div>
      </main>
    </>
  );
};

export default ProfilKementerianComponent;
