"use client";

import Section from "@/components/layout/section";
import Overline from "@/components/typography/overline";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Homepage } from "@/payload-types";

export default function ActivityCarousel({
  homepage,
}: {
  homepage: Pick<Homepage, "featured_achievements">;
}) {
  const { featured_achievements: items } = homepage;

  const t = useTranslations("Home.Activity");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const images = [
    "japan.webp",
    "india.webp",
    "med4irn.webp",
    "china.webp",
    "wdet.webp",
  ];

  return (
    <Section>
      <div className="grid-cols-12 gap-6 border-washed-100 px-4.5 py-12 lg:px-0 lg:py-[84px] xl:grid xl:border-x">
        {Boolean(items.length) && (
          <Carousel
            setApi={setApi}
            className="col-span-10 col-start-2 space-y-6"
          >
            <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-12">
              <div className="space-y-3 sm:space-y-4.5 lg:w-1/3">
                <Overline>{t("overline")}</Overline>
                <h2 className="text-balance font-poppins text-2xl font-semibold lg:text-hsm">
                  {typeof items[current].achievements !== "string" &&
                    items[current].achievements.title}
                </h2>
                <p className="text-pretty text-black-700">
                  {typeof items[current].achievements !== "string" &&
                    items[current].achievements.description}
                </p>
              </div>

              <CarouselContent className="rounded-[32px] border border-outline-200 bg-outline-200 shadow-card sm:shadow-[0_30px_100px_-10px_#4C53614D] lg:w-2/3">
                {items.map((item, index) => {
                  const media =
                    typeof item.achievements !== "string"
                      ? typeof item.achievements.achievement_file !== "string"
                        ? item.achievements.achievement_file
                        : ""
                      : "";
                  return (
                    <CarouselItem key={index}>
                      <Image
                        priority
                        src={media && media.url ? media.url : ""}
                        width={750}
                        height={450}
                        alt={
                          media && media.url ? media.caption || media.alt : ""
                        }
                        className="h-[300px] w-full select-none object-cover sm:h-[450px]"
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </div>

            <div className="flex flex-col-reverse items-center gap-6 lg:flex-row lg:justify-between">
              <div className="space-x-3">
                <CarouselPrevious className="static size-[42px] transform-none" />
                <CarouselNext className="static size-[42px] transform-none" />
              </div>

              <div className="flex items-center gap-x-2">
                {items.map((_, i) => (
                  <svg
                    key={i}
                    viewBox={i === current ? "0 0 15 8" : "0 0 8 8"}
                    className={cn(
                      "transition-[colors,_width] duration-300 ease-in-out",
                      i === current
                        ? "h-2 w-[15px] text-foreground-primary"
                        : "size-2 text-outline-300",
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0"
                      width={i === current ? 15 : 8}
                      height="8"
                      rx="4"
                      fill="currentColor"
                    />
                  </svg>
                ))}
              </div>
            </div>
          </Carousel>
        )}
      </div>
    </Section>
  );
}
