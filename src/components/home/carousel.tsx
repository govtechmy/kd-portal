"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ChevronLeft from "@/icons/chevron-left";
import ChevronRight from "@/icons/chevron-right";

export default function Carousel() {
  const t = useTranslations("Home.Activity");
  const [index, setIndex] = useState(1);
  const images = [
    "japan.jpg",
    "india.png",
    "med4irn.png",
    "china.jpg",
    "wdet.jpg",
  ];

  return (
    <section className="container py-12 lg:border-x lg:border-washed-100 lg:py-[84px] xl:grid xl:grid-cols-12">
      <div className="col-span-10 col-start-2 space-y-6">
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="space-y-4.5 lg:w-1/3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
              {t("overline")}
            </p>
            <h2 className="text-balance font-poppins text-hsm font-semibold">
              {t(`title${index}`)}
            </h2>
            <p className="text-pretty text-black-700">{t(`desc${index}`)}</p>
          </div>
          <div className="lg:w-2/3">
            <Image
              priority
              src={`/images/${images[index - 1]}`}
              width={750}
              height={450}
              alt={t(`title${index}`)}
              className="h-[300px] rounded-[32px] border object-cover shadow-[0_30px_100px_-10px_#4C53614D] sm:h-[450px]"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse items-center gap-6 lg:flex-row lg:justify-between">
          <div className="space-x-3">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              disabled={index === 1}
              onClick={() => setIndex(index - 1)}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              disabled={index === images.length}
              onClick={() => setIndex(index + 1)}
            >
              <ChevronRight />
            </Button>
          </div>

          <div className="flex items-center gap-x-2">
            {Array(images.length)
              .fill(null)
              .map((_, i) =>
                i === index - 1 ? (
                  <svg
                    key={i}
                    viewBox="0 0 15 8"
                    className="h-2 w-[15px] text-brand-700"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0"
                      width="15"
                      height="8"
                      rx="4"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg
                    key={i}
                    viewBox="0 0 8 8"
                    className="size-2 text-outline-300"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0"
                      width="8"
                      height="8"
                      rx="4"
                      fill="currentColor"
                    />
                  </svg>
                ),
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
