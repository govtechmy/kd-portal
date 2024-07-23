"use client";

import DatePicker from "@/components/ui/date-picker";
import { usePathname, useRouter } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Button } from "./button";

export default function DaterangePicker({
  className,
  setStartDate,
  setEndDate,
  // initialDates,
}: {
  className?: string;
  setStartDate?: (newDate: Date) => void;
  setEndDate?: (newDate: Date) => void;
  // initialDates?: { start: Date; end: Date };
}) {
  const t = useTranslations("Datepicker");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const start_date = searchParams.get("start");
  const end_date = searchParams.get("end");

  const handleSelection = (type: "start" | "end", date: Date) => {
    const _date = DateTime.fromJSDate(date).toISODate();
    if (type === "start" && _date) {
      if (setStartDate) {
        setStartDate(date);
        return;
      }

      const params = new URLSearchParams(searchParams);
      params.set("start", _date);
      push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    if (type === "end" && _date) {
      if (setEndDate) {
        setEndDate(date);
        return;
      }

      const params = new URLSearchParams(searchParams);
      params.set("end", _date);
      push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <DatePicker
        label={t("from") + ":"}
        onChange={(newDate) => handleSelection("start", newDate)}
        disabled={
          end_date
            ? { after: DateTime.fromISO(end_date).toJSDate() }
            : undefined
        }
        date={start_date ? DateTime.fromISO(start_date).toJSDate() : undefined}
      />
      -
      <DatePicker
        label={t("to") + ":"}
        onChange={(newDate) => handleSelection("end", newDate)}
        disabled={
          start_date
            ? {
                before: DateTime.fromISO(start_date).toJSDate(),
                after: new Date(),
              }
            : undefined
        }
        date={end_date ? DateTime.fromISO(end_date).toJSDate() : undefined}
      />
    </div>
  );
}
