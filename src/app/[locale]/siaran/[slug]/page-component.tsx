"use client";
import { locales } from "@/lib/i18n-config";
import { Broadcast } from "@/payload-types";
import { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { routes } from "@/lib/routes";
import { useFormatter, useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Clock from "@/icons/clock";
import { Icon } from "@/icons/social-media";
import Envelope from "@/icons/envelope";
import Link from "@/icons/link";
import { Button } from "@/components/ui/button";
import Printer from "@/icons/printer";
import Image from "next/image";
import RichText from "@/components/rich-text";
import { cn, getReadTimeEstimation } from "@/lib/utils";
import { DateTime } from "luxon";
import FilePDF from "@/icons/file-pdf";

interface SiaranPageProps {
  data: Broadcast;
  locale: (typeof locales)[number];
}

const SiaranPage: FC<SiaranPageProps> = ({ data, locale }) => {
  const format = useFormatter();
  const t = useTranslations();

  const media =
    Boolean(data.broadcast_image) && typeof data.broadcast_image !== "string"
      ? data.broadcast_image
      : null;

  const file =
    Boolean(data.broadcast_file) && typeof data.broadcast_file !== "string"
      ? data.broadcast_file
      : null;

  const downloadFile = () => {
    if (file) {
      const link = document.createElement("a");
      link.href = file?.url || "";
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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
              <BreadcrumbPage>{data.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col gap-y-3">
          <p
            className={cn(
              "font-semibold",
              data.type === "media_release"
                ? "text-foreground-success"
                : "text-foreground-danger",
            )}
          >
            {t(`Announcements.type.${data.type}`)}
          </p>
          <p className="text-2xl font-semibold text-foreground">{data.title}</p>
          <div className="flex items-center gap-2 text-sm text-dim-500">
            {data.broadcast_text_html && (
              <>
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  {getReadTimeEstimation(data.broadcast_text_html)} mins
                </div>
                ·
              </>
            )}
            <time>
              {format.dateTime(DateTime.fromISO(data.date).toJSDate(), {
                year: "numeric",
                month: "short",
                day: "numeric",
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
      {media && media.url ? (
        <figure className="col-span-full flex flex-col items-center gap-y-3 py-6">
          <Image
            priority
            src={media.url}
            width={750}
            height={450}
            alt=""
            className="h-[300px] select-none rounded-lg object-cover sm:h-[450px]"
          />
          <figcaption className="text-center text-sm text-dim-500">
            {media.caption ? media.caption : media.alt}
          </figcaption>
        </figure>
      ) : null}

      <section className="space-y-6 md:col-span-10 md:col-start-2 lg:col-span-4 lg:col-start-2 xl:col-span-2 xl:col-start-2">
        <div className="flex w-full justify-center">
          <article className="article max-w-prose">
            <RichText
              content={data.broadcast_text}
              tagMap={{
                ol: { className: "space-y-3" },
              }}
            />
          </article>
        </div>
        <hr className="w-full bg-outline-200" />
        {file && file.url && (
          <div
            className="flex max-w-[200px] items-center gap-1.5 rounded-lg border border-outline-200 p-2 hover:cursor-pointer"
            onClick={downloadFile}
          >
            <FilePDF />
            <div className="flex flex-col">
              <p className="line-clamp-1 text-sm">{file?.filename}</p>
              <p className="text-xs text-dim-500">
                {file?.filesize
                  ? `${(file.filesize / 1000000).toFixed(2)}MB`
                  : ""}
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default SiaranPage;
