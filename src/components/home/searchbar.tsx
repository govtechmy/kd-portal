"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { PaginatedDocs } from "payload";
import { Search } from "@/payload-types";
import { CommandMenu } from "../ui/cmdk-combobox";
import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";
import debounce from "lodash/debounce";

export type SearchType = Array<{
  relationTo: string;
  priority: number;
  items: Search[];
}>;

const HomeSearchBar: FC<{ locale: string }> = ({ locale }) => {
  const [options, setOptions] = useState<SearchType>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSearchList = useCallback(
    debounce(async (searchQuery) => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search-site?search=${searchQuery}&locale=${locale}`,
        );

        if (response.ok) {
          const resp = (await response.json()) as PaginatedDocs<Search>;
          const groupedCollection = groupBy(
            resp.docs,
            (item) => item.doc.relationTo,
          );

          const groupedArray = Object.entries(groupedCollection).map(
            ([relationTo, items]) => ({
              relationTo: relationTo,
              priority: items[0].priority || 0,
              items: items,
            }),
          );

          const sorted = orderBy(groupedArray, ["priority"], ["desc"]);
          setOptions(sorted);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300), // 300ms debounce delay
    [],
  );

  useEffect(() => {
    if (query && query.length > 2) {
      fetchSearchList(query);
    } else {
      setOptions([]);
    }
  }, [query, fetchSearchList]);

  return (
    <>
      {/* HSPLaSK Search and Advanced Search tag for crawler detection */}
      <form
        {...{
          "splwpk-search-function": "splwpk-search-function",
          "splwpk-advanced-search-function": "splwpk-advanced-search-function",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          // Handle form submission if needed
          if (query.trim()) {
            // You can add custom search logic here
            console.log("Search submitted:", query);
          }
        }}
      >
        <CommandMenu
          loading={loading}
          options={options}
          onChange={(query) => setQuery(query)}
        />
      </form>
    </>
  );
};

export default HomeSearchBar;
