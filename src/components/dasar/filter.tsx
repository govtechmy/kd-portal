"use client";

import { Header, Table as TTable } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { FC, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import ReadMore from "@/components/ui/read-more";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChevronDown from "@/icons/chevron-down";
import { SelectIcon } from "@radix-ui/react-select";
import { PolicyType } from "@/collections/Policy";

interface DasarFilter {
  table: TTable<any>;
  headers: Header<any, unknown>[];
  column: string;
  subtitle?: string;
}

export const DasarFilter: FC<DasarFilter> = ({
  table,
  headers,
  column,
  subtitle,
}) => {
  const t = useTranslations("Policy.table_header");
  const t2 = useTranslations("Policy");

  const header = headers.find((h) => h.id === column)!;
  const { getFacetedUniqueValues, getFilterValue, setFilterValue } =
    header.column;

  const [selectedFilters, setSelectedFilters] = useState<string>(
    (getFilterValue() as string) || t("all"),
  );

  const sortedUniqueValues = useMemo(() => {
    const uniqueValues = Array.from(getFacetedUniqueValues().keys());
    const filteredValues = uniqueValues.filter((value) => {
      if (!Boolean(value)) return false;
      return value;
    });
    return filteredValues.sort((a, b) => b.type - a.type);
  }, [getFacetedUniqueValues()]);

  const handleValueChange = (selected: string) => {
    setSelectedFilters(selected);

    if (selected === t("all")) {
      table.resetColumnFilters(true);
      return;
    }
    setFilterValue(selected);
  };

  return (
    <div className="pb-4">
      <Select value={selectedFilters} onValueChange={handleValueChange}>
        <SelectTrigger asChild>
          <Button variant="secondary">
            {selectedFilters !== t("all") ? null : (
              <span className="text-sm text-dim-500">{subtitle}:</span>
            )}
            <SelectValue>
              <ReadMore
                className="block whitespace-nowrap lg:hidden"
                max={["char", 30]}
              >
                {selectedFilters === t("all")
                  ? selectedFilters
                  : t2(`type.${selectedFilters}`)}
              </ReadMore>
              <span className="hidden lg:block">
                {" "}
                {selectedFilters === t("all")
                  ? selectedFilters
                  : t2(`type.${selectedFilters}`)}
              </span>
            </SelectValue>
            <SelectIcon>
              <ChevronDown />
            </SelectIcon>
          </Button>
        </SelectTrigger>
        <SelectContent
          avoidCollisions={true}
          side="bottom"
          className="max-h-[250px] w-full py-2"
          align="start"
        >
          <SelectItem
            value={t("all")}
            className={t("all") === selectedFilters ? "font-medium" : ""}
          >
            {t("all")}
          </SelectItem>
          {PolicyType.map(
            (l) =>
              typeof l !== "string" && (
                <SelectItem
                  key={l.value}
                  value={l.value}
                  className={l.value === selectedFilters ? "font-medium" : ""}
                >
                  {t2(`type.${l.value}`)}
                </SelectItem>
              ),
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
