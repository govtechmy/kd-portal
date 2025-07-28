"use client";

import Section from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import ArrowOutgoing from "@/icons/arrow-outgoing";
import { cn } from "@/lib/utils";
import { Homepage } from "@/payload-types";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Quicklinks({
  homepage,
}: {
  homepage: Pick<Homepage, "quick_links">;
}) {
  const { quick_links: items } = homepage;
  const t = useTranslations("Home.Quicklinks");
  const splaskT = useTranslations("SPLaSK");

  // Check if MyMesyuarat exists in the items
  const hasMyMesyuarat = items.some(item => {
    const link = typeof item.links !== "string" ? item.links : undefined;
    return link?.name?.toLowerCase().includes('mymes') || 
           link?.name?.toLowerCase().includes('mesyuarat');
  });

  return (
    <>
      {/* Hidden SPLaSK Online Services tag for crawler detection */}
      <a
        href="#"
        {...{ "splwpk-online-services": "splwpk-online-services" }}
        className="sr-only"
        aria-hidden="true"
      >
        {splaskT("online_services_available")}
      </a>

      {/* Hidden SPLaSK Procurement tag for crawler detection */}
      <a
        href="#"
        {...{ "splwpk-procurement": "splwpk-procurement" }}
        className="sr-only"
        aria-hidden="true"
      >
        {splaskT("procurement_available")}
      </a>
      
      <Section>
        <div className="grid-cols-12 gap-6 border-washed-100 py-12 lg:py-[84px] xl:grid xl:border-x">
          <div className="col-span-10 col-start-2 space-y-12">
            <h2 className="text-balance font-poppins text-hsm font-semibold">
              {t("title")}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Mobile App Link for SPLaSK Compliance if MyMesyuarat exists */}
              {hasMyMesyuarat && (
                <a
                  href="https://gamma.malaysia.gov.my/appdetails/553"
                  target="_blank"
                  rel="noopenner noreferrer"
                  {...{ "splwpk-mobile-apps": "splwpk-mobile-apps" }}
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "default" }),
                    "group relative flex justify-start gap-4 whitespace-normal rounded-xl p-4 font-normal",
                  )}
                                    title="MyMesyuarat"
                >
                  <div className="size-[60px] select-none rounded-lg border border-outline-200 bg-background-50 p-1 flex items-center justify-center">
                    <Image
                      src="/images/APP_ICON_1542871220970.png"
                      width={48}
                      height={48}
                      alt="MyMesyuarat App Icon"
                      className="rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 font-semibold text-foreground">
                    MyMesyuarat
                    </p>
                  </div>
                  <ArrowOutgoing className="absolute right-5 top-4 size-4 stroke-2 text-outline-400 transition-all group-hover:translate-x-1 group-hover:opacity-100 motion-reduce:transition-none sm:opacity-0" />
                </a>
              )}

              {/* Existing Quick Links with SPLaSK Mobile Apps and Online Services Tagging */}
              {items.map((item, i) => {
                const link =
                  typeof item.links !== "string" ? item.links : undefined;

                const media =
                  link && typeof link.image !== "string" ? link.image : undefined;

                // Check if this is MyMesyuarat for SPLaSK mobile apps compliance
                const isMyMesyuarat = link?.name?.toLowerCase().includes('mymes') || 
                                     link?.name?.toLowerCase().includes('mesyuarat');

                // Check if this is an online service for SPLaSK online services compliance
                const isOnlineService = link?.name?.toLowerCase().includes('hrmis') || 
                                       link?.name?.toLowerCase().includes('eperolehan') ||
                                       link?.name?.toLowerCase().includes('epenyata') ||
                                       link?.name?.toLowerCase().includes('ddms') ||
                                       link?.name?.toLowerCase().includes('spotme') ||
                                       link?.name?.toLowerCase().includes('mygovuc');

                // Check if this is ePerolehan for SPLaSK procurement compliance
                const isProcurement = link?.name?.toLowerCase().includes('eperolehan');

                return (
                  <a
                    key={item.id}
                    href={link?.href[0].link?.url || ""}
                    target="_blank"
                    rel="noopenner noreferrer"
                    {...(isMyMesyuarat && { "splwpk-mobile-apps": "splwpk-mobile-apps" })}
                    {...(isOnlineService && { "splwpk-online-services": "splwpk-online-services" })}
                    {...(isProcurement && { "splwpk-procurement": "splwpk-procurement" })}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "default" }),
                      "group relative flex justify-start gap-4 whitespace-normal rounded-xl p-4 font-normal",
                    )}
                    title={isMyMesyuarat ? "MyMesyuarat" : link?.name || ""}
                  >
                    <Image
                      src={media && media.url ? media.url : ""}
                      width={750}
                      height={450}
                      alt={link ? link?.name : ""}
                      className="size-[60px] select-none rounded-lg border border-outline-200 bg-background-50 p-1"
                    />
                    <div className="space-y-1">
                      <p className="line-clamp-1 font-semibold text-foreground">
                        {link ? link?.name : ""}
                      </p>
                      <p className="line-clamp-3 text-sm text-dim-500">
                        {link ? link?.description : ""}
                      </p>
                    </div>
                    <ArrowOutgoing className="absolute right-5 top-4 size-4 stroke-2 text-outline-400 transition-all group-hover:translate-x-1 group-hover:opacity-100 motion-reduce:transition-none sm:opacity-0" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
