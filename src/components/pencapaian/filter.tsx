"use client";

import { AchievementType } from "@/collections/Achievement";
import { Button } from "@/components/ui/button";
import DaterangePicker from "@/components/ui/daterange-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InfoIcon from "@/icons/info";
import { usePathname, useRouter } from "@/lib/i18n";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const t = useTranslations("Achievements");
  const selectedType = searchParams.get("type") || "all";

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", value);
    push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <Select value={selectedType} onValueChange={handleValueChange}>
        <SelectTrigger asChild>
          <Button variant="secondary">
            <SelectValue>{t(`type.${selectedType}`)}</SelectValue>
          </Button>
        </SelectTrigger>
        <SelectContent
          className="max-h-[250px] w-full py-2"
          align="start"
          side="bottom"
        >
          <SelectItem
            value={"all"}
            className={"all" === selectedType ? "font-medium" : ""}
          >
            {t(`type.all`)}
          </SelectItem>
          {AchievementType.map(
            (type) =>
              typeof type !== "string" && (
                <SelectItem
                  key={type.value}
                  value={type.value}
                  className={type.value === selectedType ? "font-medium" : ""}
                >
                  {t(`type.${type.value}`)}
                </SelectItem>
              ),
          )}
        </SelectContent>
      </Select>
      <DaterangePicker className="w-fit" />
      <div className="flex items-center gap-1.5 text-sm text-dim-500">
        <InfoIcon />
        {t("filter_by")}
      </div>
    </>
  );
}
