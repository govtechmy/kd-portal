import { useFormatter, useTranslations } from "next-intl";
import Star from "@/icons/star";
import { cn } from "@/lib/utils";
import Flag from "@/icons/flag";

export default function Timeline() {
  const format = useFormatter();
  const t = useTranslations("Home.Achievement");

  return (
    <section className="container lg:grid lg:grid-cols-12 lg:border-x lg:border-washed-100">
      <div className="col-span-10 col-start-2 flex flex-col gap-6 max-lg:pt-12 lg:flex-row">
        <div className="space-y-4.5 lg:w-1/3 lg:py-[84px]">
          <div className="flex gap-x-3 text-foreground">
            <Flag />
            <p className="text-sm font-semibold uppercase tracking-[0.2em]">
              {t("overline")}
            </p>
          </div>
          <h2 className="text-balance font-poppins text-hsm font-semibold">
            {t("title")}
          </h2>
          <p className="text-pretty text-black-700">{t("desc")}</p>
        </div>

        <div className="relative flex h-full justify-start sm:justify-center lg:w-2/3">
          <div className="absolute -z-10 h-full w-px bg-outline-200 max-sm:left-[3.5px]" />
          <div className="grid grid-cols-1 gap-x-14 gap-y-3 py-8 max-sm:ml-8 sm:grid-cols-2 lg:py-[84px]">
            {Array(7)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative flex h-[136px] flex-col gap-1 rounded-xl border border-outline-200 px-4 py-3 even:sm:translate-y-[76px]",
                    // "hover:border-brand-300 group hover:border-[1.5px]",
                  )}
                >
                  <p className="line-clamp-1 text-xs font-medium uppercase tracking-widest text-dim-500">
                    {t(`date${i + 1}`)}
                  </p>
                  <p className="line-clamp-1 font-medium text-black-900">
                    {t(`title${i + 1}`)}
                  </p>
                  <p className="line-clamp-3 text-sm text-black-700">
                    {t(`desc${i + 1}`)}
                  </p>
                  <div
                    className={cn(
                      i % 2 === 0 ? "max-sm:-left-7 sm:-right-7" : "-left-7",
                      "absolute top-1/2 h-px w-[26px] -translate-y-1/2 transform border border-dashed border-outline-400",
                      // "group-hover:border-brand-300 group-hover:border-y-2",
                    )}
                  >
                    <div
                      className={cn(
                        i % 2 === 0
                          ? "group-hover:-right-[6.5px] max-sm:-left-1.5 group-hover:max-sm:-left-[6.5px] sm:-right-1.5"
                          : "-left-1.5 group-hover:-left-[6.5px]",
                        "absolute top-1/2 size-2 -translate-y-1/2 transform rounded-full bg-brand-600",
                        // "ring-brand-300 ring-offset-[3px] group-hover:ring",
                      )}
                    >
                      <div className="absolute left-[3px] top-2 h-[60px] w-0.5 bg-gradient-to-b from-brand-600 from-0% to-transparent to-100%" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
