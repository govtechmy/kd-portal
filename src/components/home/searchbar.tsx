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

const HomeSearchBar: FC = () => {
  const [options, setOptions] = useState<SearchType>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSearchList = useCallback(
    debounce(async (searchQuery) => {
      setLoading(true);
      try {
        const response = await fetch(`/my-route?search=${searchQuery}`);

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
    fetchSearchList(query);
  }, [query, fetchSearchList]);

  return (
    <div>
      <CommandMenu
        loading={loading}
        options={options}
        onChange={(query) => setQuery(query)}
      />
    </div>
  );
};

export default HomeSearchBar;
