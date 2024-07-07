"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

interface SearchProps {
  className?: string;
  placeholder?: string;
  onChange?: (query: string) => void;
}

const Search: FunctionComponent<SearchProps> = ({
  placeholder,
  className,
  onChange,
}) => {
  const t = useTranslations();
  const [value, setValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const onSearch = (query: string | number) => {
    if (typeof query === "string") {
      setValue(query);
      if (onChange) onChange(query);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <input
        ref={searchRef}
        value={value}
        placeholder={placeholder || t("Search.default_placeholder")}
        className={cn(
          "flex h-11 w-full rounded-md bg-background py-2.5 text-sm outline-none placeholder:text-dim-500 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        onChange={(event) => onSearch(event.target.value)}
      />
      <span className="hidden lg:flex shrink-0 items-center gap-x-1 text-sm text-dim-500">
        {t("Search.type")}
        <span className="rounded-md border border-outline-300 px-1.5 py-0.5">
          /
        </span>
        {t("Search.search")}
      </span>
      <div className="size-8 rounded-full bg-gradient-to-b from-[#5288FF] to-brand-600 to-100% p-1.5">
        <MagnifyingGlassIcon className="size-5 text-white" />
      </div>
    </>
  );
};

export default Search;
