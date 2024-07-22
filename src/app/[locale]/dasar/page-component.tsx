"use client";
import { locales } from "@/lib/i18n-config";
import { Policy } from "@/payload-types";
import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import Hero from "@/components/layout/hero";
import DasarTable from "@/components/dasar/table";
import DaterangePicker from "@/components/ui/daterange-picker";
import Search from "@/components/ui/search";

interface DasarKementerianProps {
  list: Policy[];
  locale: (typeof locales)[number];
}

// TODO: Handle the date picker selection and filter the list within the selected date
const DasarKementerian: FC<DasarKementerianProps> = ({ list, locale }) => {
  const [data, setData] = useState(list);
  const t = useTranslations();

  function searchArray(array: typeof data, searchQuery: string) {
    const query = searchQuery.toLowerCase();
    return setData(
      array.filter((item) => {
        return (
          (item.doc_name && item.doc_name.toLowerCase().includes(query)) ||
          (item.doc_description &&
            item.doc_description.toLowerCase().includes(query))
        );
      }),
    );
  }

  return (
    <>
      <Hero
        title={t("Policy.header")}
        search={
          <div className="space-y-4">
            <Search
              onChange={(query) => searchArray(list, query)}
              placeholder={t("Policy.search_placeholder")}
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
