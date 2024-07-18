"use client";

import DatePicker from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function DaterangePicker({ className }: { className?: string }) {
  const t = useTranslations("Datepicker");

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <DatePicker label={t("from") + ":"} />
      -
      <DatePicker label={t("to") + ":"} />
    </div>
  );
}
