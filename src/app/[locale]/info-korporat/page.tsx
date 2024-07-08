import { buttonVariants } from "@/components/ui/button";
import Bolt from "@/icons/bolt";
import CheckmarkShield from "@/icons/checkmark-shield";
import EyeShow from "@/icons/eye-show";
import Flag from "@/icons/flag";
import Globe from "@/icons/globe";
import Gov from "@/icons/gov";
import Money from "@/icons/money";
import Trophy from "@/icons/trophy";
import UserGroup from "@/icons/user-group";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

export default function Page({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <main className="divide-y-washed-100 divide-y">
      <section className="container flex flex-col gap-16 py-[84px] lg:border-x lg:border-x-washed-100">
        <div className="space-y-16">
          <div className="flex flex-col items-center gap-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              {t("Info.background")}
            </p>
            <div className="flex flex-col items-center gap-4.5 font-poppins text-hxs font-semibold sm:flex-row sm:text-hsm">
              <Image
                src="/jata-negara.png"
                width={65}
                height={50}
                alt="Jata Negara"
              />
              {t("Agency.name")}
            </div>
          </div>

          <div className="gap-[42px] lg:grid lg:grid-cols-4">
            <div className="col-span-2 col-start-2">
              <div className="mx-auto flex max-w-prose flex-col gap-[42px]">
                <div>
                  <p className="font-poppins text-[46px] leading-none text-brand-600">
                    “
                  </p>
                  <div className="space-y-6">
                    <p className="text-balance text-xl text-black-700">
                      {t("Info.quote")}
                    </p>
                    <p className="text-dim-500">{t("Info.author")}</p>
                  </div>
                </div>

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
      </section>

      <section className="container grid grid-cols-1 divide-y divide-washed-100 md:grid-cols-2 md:divide-x lg:border-x lg:border-x-washed-100">
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
            <div className="size-[54px] rounded-full bg-brand-50 p-[11px] text-brand-700">
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
      </section>

      <section className="container py-12 md:py-[84px] lg:border-x lg:border-washed-100 xl:grid xl:grid-cols-12">
        <div className="col-span-10 col-start-2 space-y-12 md:space-y-[74px]">
          <h2 className="text-center font-poppins text-hsm font-semibold">
            {t("Info.Role.title")}
          </h2>
          <div className="grid grid-cols-1 gap-y-8 sm:gap-x-12 sm:gap-y-[72px] md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Gov className="size-8" /> },
              { icon: <Globe className="size-8" /> },
              { icon: <Bolt className="size-8" /> },
              { icon: <CheckmarkShield className="size-8" /> },
              { icon: <Money className="size-8" /> },
              { icon: <Trophy className="size-8" /> },
            ].map(({ icon }, i) => (
              <div key={i} className="flex flex-row gap-4.5 md:flex-col">
                <div className="size-[54px] rounded-xl bg-brand-50 p-[11px] text-brand-700">
                  {icon}
                </div>

                <p className="text-black-700">
                  {t.rich(`Info.Role.desc${i + 1}`, {
                    b: (chunks) => (
                      <span className="font-semibold text-foreground">
                        {chunks}
                      </span>
                    ),
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
