"use client";

import ChevronDown from "@/icons/chevron-down";
import GovMY from "@/icons/govmy";
import EncryptedLock from "@/icons/encrypted-lock";
import SolidLock from "@/icons/solid-lock";
import { useTranslations } from "next-intl";
import MalaysiaFlag from "@/icons/malaysia-flag";
import { useEffect } from "react";

export default function Masthead() {
  const t = useTranslations("Masthead");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const details = document.getElementById("Masthead") as HTMLDetailsElement;
      if (
        event.altKey &&
        (event.metaKey || event.ctrlKey) &&
        event.key === "Enter"
      ) {
        event.preventDefault();
        details.open = !details.open;
      }
      // Check if 'CMD + K' or 'Ctrl + K' key combination is pressed
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        // searchRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="z-[60] bg-gradient-to-b from-washed-100 from-[84.74%] to-outline-200 to-100% print:hidden">
      <details
        id="Masthead"
        className="group peer max-w-full overflow-hidden bg-washed-100"
      >
        <summary className="block cursor-pointer list-none py-2.5 outline-none sm:py-1">
          <div className="mx-auto flex max-w-[1280px] items-center gap-1.5 px-4.5 text-sm/4 text-foreground-primary max-sm:justify-between md:px-6">
            <div className="flex select-none items-center gap-2">
              <MalaysiaFlag />
              <span className="text-black-700">
                {t("official_gov_website")}
              </span>
            </div>
            <div className="flex items-center gap-0.5 max-sm:rounded-md max-sm:bg-outline-200 max-sm:px-1">
              <span className="hidden select-none tracking-[-0.01em] sm:block">
                {t("how_to_identify")}
              </span>
              <ChevronDown className="size-4 transition group-open:rotate-180" />
            </div>
          </div>
        </summary>
      </details>
      <div className="max-h-0 max-w-full transform-gpu overflow-hidden opacity-0 transition-[max-height,opacity] duration-300 ease-in-out peer-open:max-h-96 peer-open:opacity-100 peer-open:duration-200 motion-reduce:transition-none">
        <div className="container grid grid-cols-1 gap-4.5 pb-6 pt-4.5 sm:grid-cols-2 sm:gap-6 sm:pb-8 sm:pt-6">
          <span className="static text-sm text-foreground-primary sm:hidden">
            {t("how_to_identify")}
          </span>

          <div className="flex gap-3">
            <GovMY className="shrink-0 text-dim-500" />
            <div className="space-y-1.5">
              <p className="font-medium max-sm:text-sm">{t("official")}</p>
              <p className="max-w-prose text-balance text-sm text-black-700">
                {t("not_govmy")}
                <span className="font-semibold">.gov.my</span>
                {t("close_site")}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <EncryptedLock className="shrink-0 text-dim-500" />
            <div className="space-y-1.5">
              <p className="font-medium max-sm:text-sm">{t("secure")}</p>
              <div className="max-w-prose text-balance text-sm text-black-700">
                {t("find_lock")}{" "}
                <SolidLock className="-ml-[3px] mb-0.5 mr-px inline size-3.5" />
                {t("or")}
                <span className="font-semibold">https://</span>
                {t("precaution")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
