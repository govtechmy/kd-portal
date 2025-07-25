"use client";

import Section from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import ArrowOutgoing from "@/icons/arrow-outgoing";
import ArrowUp from "@/icons/arrow-up";
import ChevronRight from "@/icons/chevron-right";
import Clock from "@/icons/clock";
import { Link, useRouter } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { cn, getReadTimeEstimation } from "@/lib/utils";
import { Broadcast } from "@/payload-types";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HomeSiaran({ broadcast }: { broadcast: Broadcast[] }) {
  const t = useTranslations();
  const { push } = useRouter();

  return (
    <>
      {/* Hidden SPLaSK Publication tag for crawler detection */}
      <div 
        {...{ "splwpk-publication": "splwpk-publication" }}
        className="sr-only"
        aria-hidden="true"
      >
        News Publications Available
      </div>
      
      <Section>
        <div className="grid-cols-12 gap-6 border-washed-100 py-12 lg:py-[84px] xl:grid xl:border-x">
        <div className="col-span-10 col-start-2 space-y-12">
          <h2 className="text-balance font-poppins text-hsm font-semibold">
            {t("Home.Broadcast.title")}
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {broadcast.map((doc, i) => {
              const media =
                Boolean(doc.broadcast_image) &&
                typeof doc.broadcast_image !== "string"
                  ? doc.broadcast_image
                  : null;

              return (
                <Link
                  key={doc.id}
                  href={routes.ANNOUNCEMENTS + `/${doc.slug}`}
                  {...{ "splwpk-publication": "splwpk-publication" }}
                  {...{ "splwpk-broadcast": "splwpk-broadcast" }}
                  {...{ "splwpk-broadcast-timestamp": doc.date + " 00:00:00" }}
                  {...{ "splwpk-news": "splwpk-news" }}
                  {...{ "splwpk-news-timestamp": doc.date + " 00:00:00" }}
                  className="group relative flex flex-col gap-4 rounded-xl border border-outline-200 p-6 hover:border-brand-200"
                  title={doc.title}
                >
                  <div
                    className={cn(
                      doc.isPin
                        ? "absolute right-6 top-5 flex items-center justify-center rounded-full border border-[#DD420A]/10 bg-[#DD420A]/5 px-2 py-0.5"
                        : "hidden",
                    )}
                  >
                    <ArrowUp className="size-3.5 stroke-2 text-[#DD420A]" />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <p
                      className={cn(
                        "font-semibold",
                        doc.type === "media_release"
                          ? "text-foreground-success"
                          : doc.type === "announcement"
                            ? "text-foreground-danger"
                            : "text-foreground-warning",
                      )}
                    >
                      {t(`Announcements.type.${doc.type}`)}
                    </p>
                    {doc.broadcast_text_html && (
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-px bg-outline-300" />
                        <div className="flex items-center gap-1 text-dim-500">
                          <Clock className="size-4" />
                          {t("Announcements.estimated_read", {
                            time: getReadTimeEstimation(
                              doc.broadcast_text_html,
                            ),
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-auto flex-col gap-y-5">
                    <div className="flex grow gap-x-4.5">
                      <div className="flex flex-1 flex-col gap-y-2">
                        <p className="line-clamp-2 font-semibold -tracking-[0.01em] text-foreground group-hover:text-foreground-primary">
                          {doc.title}
                        </p>
                        <p className="line-clamp-3 text-sm text-black-700">
                          {doc.description}
                        </p>
                      </div>
                      {media && media.url && (
                        <Image
                          src={`${media.url}`}
                          height={80}
                          width={80}
                          className={cn(
                            "size-20 select-none rounded-lg border-4 border-white object-contain shadow-card",
                          )}
                          alt=""
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <time className="text-dim-500">
                        {DateTime.fromISO(doc.date).toFormat("dd MMM yyyy")}
                      </time>
                      <div className="flex items-center gap-1 text-foreground-primary">
                        <span className="font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                          {t(`Announcements.read`)}
                        </span>
                        <ArrowOutgoing className="size-4 stroke-[1.5] opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div>
            <Button
              size="icon"
              className="rounded-full pl-2.5"
              variant={"secondary"}
              onClick={() => push(routes.ANNOUNCEMENTS)}
            >
              {t("Home.Broadcast.view_all")} <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </Section>
    </>
  );
}
