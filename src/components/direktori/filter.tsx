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

interface DirektoriFilter {
  table: TTable<any>;
  headers: Header<any, unknown>[];
  column: string;
  subtitle?: string;
}

export const DirektoriFilter: FC<DirektoriFilter> = ({
  table,
  headers,
  column,
  subtitle,
}) => {
  const t = useTranslations("Directory.table_header");
  
  const header = headers.find((h) => h.id === column)!;
  const { getFacetedUniqueValues, getFilterValue, setFilterValue } =
    header.column;

  const [selectedFilters, setSelectedFilters] = useState<string>(
    (getFilterValue() as string) || t("semua"),
  );

  const sortedUniqueValues = useMemo(() => {
    const uniqueValues = Array.from(getFacetedUniqueValues().keys());
    const filteredValues = uniqueValues.filter((value) => {
      if (!Boolean(value)) return false;
      return value;
    });
    return filteredValues.sort((a, b) => b.bhg - a.bhg);
  }, [getFacetedUniqueValues()]);

  const handleValueChange = (selected: string) => {
    setSelectedFilters(selected);

    if (selected === t("semua")) {
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
            {selectedFilters !== t("semua") ? null : (
              <span className="text-sm text-dim-500">{subtitle}:</span>
            )}
            <SelectValue>
              <ReadMore
                className="block whitespace-nowrap lg:hidden"
                max={["char", 30]}
              >
                {selectedFilters}
              </ReadMore>
              <span className="hidden lg:block">{selectedFilters}</span>
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
            value={t("semua")}
            className={t("semua") === selectedFilters ? "font-medium" : ""}
          >
            {t("semua")}
          </SelectItem>
          {sortedUniqueValues.map((l) => (
            <SelectItem
              key={l}
              value={l}
              className={l === selectedFilters ? "font-medium" : ""}
            >
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
