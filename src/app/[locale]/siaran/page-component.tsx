"use client";
import Hero from "@/components/layout/hero";
import Section from "@/components/layout/section";
import Paginate from "@/components/siaran/paginate";
import DaterangePicker from "@/components/ui/daterange-picker";
import Search from "@/components/ui/search";
import { locales } from "@/lib/i18n-config";
import { Broadcast } from "@/payload-types";
import { useTranslations } from "next-intl";
import { PaginatedDocs } from "payload";
import { FC } from "react";
import ArrowOutgoing from "@/icons/arrow-outgoing";
import ArrowUp from "@/icons/arrow-up";
import Clock from "@/icons/clock";
import { Link, usePathname, useRouter } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { cn, getReadTimeEstimation } from "@/lib/utils";
import Image from "next/image";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";

interface SiaranListProps {
  data: PaginatedDocs<Broadcast>;
  locale: (typeof locales)[number];
}

const SiaranList: FC<SiaranListProps> = ({ data, locale }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();

  const searchArray = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (searchQuery) {
      params.set("search", searchQuery.toLowerCase());
    } else {
      params.delete("search");
    }
    push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <>
      <Hero
        title={t("Announcements.header")}
        search={
          <div className="space-y-4">
            <Search
              onChange={searchArray}
              placeholder={t("Announcements.placeholder")}
              defaultValue={searchParams.get("search") || ""}
            />
            <DaterangePicker />
          </div>
        }
      />

      <main>
        <Section>
          <div className="flex flex-col gap-8 border-washed-100 py-12 lg:border-x lg:px-0">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {data.docs.map((doc, i) => {
                const media =
                  Boolean(doc.broadcast_image) &&
                  typeof doc.broadcast_image !== "string"
                    ? doc.broadcast_image
                    : null;
                return (
                  <Link
                    key={doc.id}
                    href={routes.ANNOUNCEMENTS + `/${doc.id}`}
                    className="group relative flex flex-col gap-4 rounded-xl border border-outline-200 p-6 hover:border-brand-200"
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
                            : "text-foreground-danger",
                        )}
                      >
                        {t(`Announcements.type.${doc.type}`)}
                      </p>
                      {doc.broadcast_text_html && (
                        <div className="invisible flex items-center gap-2 group-hover:visible">
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
                          <p className="font-semibold -tracking-[0.01em] text-foreground group-hover:text-foreground-primary">
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
                        <div className="invisible flex items-center gap-1 text-foreground-primary group-hover:visible">
                          <span className="font-semibold">
                            {t(`Announcements.read`)}
                          </span>
                          <ArrowOutgoing className="size-4 stroke-[1.5]" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            {Boolean(data.docs.length) && (
              <Paginate totalPages={data.totalPages} />
            )}
          </div>
        </Section>
      </main>
    </>
  );
};
export default SiaranList;
