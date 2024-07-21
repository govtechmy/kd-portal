import RichText from "@/components/rich-text";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Clock from "@/icons/clock";
import Envelope from "@/icons/envelope";
import Link from "@/icons/link";
import Printer from "@/icons/printer";
import { Icon } from "@/icons/social-media";
import { routes } from "@/lib/routes";
import { useFormatter, useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import React from "react";
import { dummy } from "./dummy";

export async function generateMetadata({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const t = await getTranslations({ locale, namespace: "Header" });

  return {
    title: t("announcements"),
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
  const format = useFormatter();
  const t = useTranslations();

  const share_links = [
    {
      icon: Link,
      name: "Instagram",
      href: "https://www.instagram.com/kementeriandigitalmalaysia/",
    },
    {
      icon: Envelope,
      name: "Tiktok",
      href: "https://www.tiktok.com/@kementeriandigital",
    },
    {
      icon: Icon.Facebook,
      name: "Facebook",
      href: "https://www.facebook.com/KementerianDigitalMalaysia/",
    },
    { icon: Icon.X, name: "X", href: "https://x.com/KemDigitalMsia" },
  ];

  return (
    <main className="container grid auto-rows-auto grid-cols-1 py-12 md:grid-cols-12 lg:grid-cols-6 xl:grid-cols-4">
      <section className="space-y-6 md:col-span-10 md:col-start-2 lg:col-span-4 lg:col-start-2 xl:col-span-2 xl:col-start-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={routes.ANNOUNCEMENTS}>
                {t("Header.announcements")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-y-3">
          <p className="text-sm font-semibold text-foreground-success">
            Siaran Media
          </p>
          <p className="text-2xl font-semibold text-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </p>
          <div className="flex items-center gap-2 text-sm text-dim-500">
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              Bacaan 5 min
            </div>
            ·
            <time>
              {format.dateTime(new Date(), {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour12: true,
                hour: "numeric",
                minute: "2-digit",
                timeZone: "Asia/Kuala_Lumpur",
              })}
            </time>
          </div>
        </div>
        <div className="flex flex-col gap-y-4.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              {share_links.map(({ icon, name, href }) => {
                const Icon = icon;
                return (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopenner noreferrer"
                    className="p-2"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
            <Button>
              <Printer className="size-4 text-black-700" />
              {t("Announcements.print")}
            </Button>
          </div>
          <hr className="w-full bg-outline-200" />
        </div>
      </section>
      <figure className="col-span-full flex flex-col items-center gap-y-3 py-6">
        <Image
          priority
          src={"/images/china.webp"}
          width={750}
          height={450}
          alt=""
          className="h-[300px] select-none rounded-lg object-cover sm:h-[450px]"
        />
        <figcaption className="text-center text-sm text-dim-500">
          Image caption
        </figcaption>
      </figure>
      <section className="space-y-6 md:col-span-10 md:col-start-2 lg:col-span-4 lg:col-start-2 xl:col-span-2 xl:col-start-2">
        <div className="flex w-full justify-center">
          <article className="article max-w-prose">
            <RichText content={dummy} />
          </article>
        </div>
      </section>
    </main>
  );
}
