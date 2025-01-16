"use client";
import { locales } from "@/lib/i18n";
import { Policy } from "@/payload-types";
import { FC, useMemo } from "react";
import { useTranslations } from "next-intl";
import Hero from "@/components/layout/hero";
import DasarTable from "@/components/dasar/table";
import DaterangePicker from "@/components/ui/daterange-picker";
import Search from "@/components/ui/search";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/lib/i18n";

interface DasarKementerianProps {
  list: Policy[];
  locale: (typeof locales)[number];
}

const DasarKementerian: FC<DasarKementerianProps> = ({ list, locale }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const searchQuery = searchParams.get("search");

  const data = useMemo(() => {
    const query = searchQuery ? searchQuery.toLowerCase() : "";

    return list.filter((item) => {
      const matchesQuery =
        item.doc_name.toLowerCase().includes(query) ||
        item.doc_description.toLowerCase().includes(query);

      let matchesDate = true;
      const itemDate = DateTime.fromISO(item.doc_date).startOf("day");

      if (start) {
        matchesDate = itemDate >= DateTime.fromISO(start);
      }

      if (end) {
        matchesDate = itemDate <= DateTime.fromISO(end);
      }

      return matchesQuery && matchesDate;
    });
  }, [list, searchQuery, start, end]);

  const searchArray = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("search", searchQuery.toLowerCase());
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <Hero
        title={t("Policy.header")}
        search={
          <div className="space-y-4">
            <Search
              onChange={searchArray}
              placeholder={t("Policy.search_placeholder")}
              defaultValue={searchQuery || ""}
            />
            <DaterangePicker />
          </div>
        }
      />
      <main>
        <DasarTable data={data} />
      </main>
    </>
  );
};

export default DasarKementerian;
