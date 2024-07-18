"use client";

import { quick_links } from "@/components/layout/footer";
import Section from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import ArrowOutgoing from "@/icons/arrow-outgoing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Quicklinks() {
  const t = useTranslations("Home.Quicklinks");

  const images = [
    "spotme.png",
    "mygovuc.png",
    "ddms.png",
    "mymesyuarat.png",
    "epenyata-gaji.png",
    "hrmis.png",
    "eperolehan.png",
  ];

  return (
    <Section>
      <div className="grid-cols-12 gap-6 border-washed-100 px-4.5 py-12 lg:px-6 lg:py-[84px] xl:grid xl:border-x">
        <div className="col-span-10 col-start-2 space-y-12">
          <h2 className="text-balance font-poppins text-hsm font-semibold">
            {t("title")}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quick_links.map(({ name, href }, i) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopenner noreferrer"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "default" }),
                  "group relative flex justify-start gap-4 whitespace-normal rounded-xl p-4 font-normal",
                )}
              >
                <Image
                  src={`/links/${images[i]}`}
                  width={750}
                  height={450}
                  alt={name}
                  className="size-[60px] select-none rounded-lg border border-outline-200 bg-background-50 p-1"
                />
                <div className="space-y-1">
                  <p className="line-clamp-1 font-semibold text-foreground">
                    {name}
                  </p>
                  <p className="line-clamp-3 text-sm text-dim-500">
                    {t(`desc${i + 1}`)}
                  </p>
                </div>
                <ArrowOutgoing className="absolute right-5 top-4 size-4 stroke-2 text-outline-400 transition-all group-hover:translate-x-1 group-hover:opacity-100 motion-reduce:transition-none sm:opacity-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
