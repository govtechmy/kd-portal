"use client";

import Checkmark14PointStar from "@/icons/checkmark-14-point-star";
import GovMY from "@/icons/govmy";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ChevronDown from "@/icons/chevron-down";
import { cn } from "@/lib/utils";
import Lock from "@/icons/lock";
import SolidLock from "@/icons/solid-lock";

export default function Masthead() {
  const t = useTranslations("Masthead");
  const [open, setOpen] = useState(false);

  return (
    <div
      className={
        open
          ? "bg-gradient-to-b from-washed-100 from-[84.74%] to-outline-200 to-100%"
          : "bg-washed-100"
      }
    >
      <div className="container">
        <div className="flex flex-wrap items-center gap-1.5 py-1 text-sm leading-4 text-brand-700">
          <Checkmark14PointStar className="size-4 sm:size-5" />
          <span className="text-black-700">{t("official_gov_website")}</span>
          <button
            className="flex items-center gap-0.5"
            onClick={() => setOpen(!open)}
          >
            {t("how_to_identify")}
            <ChevronDown
              className={cn(
                "size-4 transition duration-200",
                open ? "rotate-180" : "",
              )}
            />
          </button>
        </div>
        {open && (
          <div className="grid grid-cols-1 gap-6 pb-8 pt-6 sm:grid-cols-2">
            <div className="flex gap-3">
              <GovMY className="text-foreground-success shrink-0" />
              <div className="space-y-1.5">
                <p className="font-medium">{t("official")}</p>
                <p className="max-w-prose text-balance text-sm text-black-700">
                  {t("not_govmy")}
                  <span className="font-semibold">.gov.my</span>
                  {t("close_site")}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Lock className="text-foreground-success shrink-0" />
              <div className="space-y-1.5">
                <p className="font-medium">{t("secure")}</p>
                <div className="max-w-prose text-balance text-sm text-black-700">
                  {t("find_lock")} <SolidLock className="inline size-4" />{" "}
                  {t("or")}
                  <span className="font-semibold">https://</span>
                  {t("precaution")}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
