"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import SearchIcon from "@/icons/search";
import { useTranslations } from "next-intl";
import CrossX from "@/icons/cross-x";
import { Button } from "./button";

interface SearchProps {
  className?: string;
  placeholder?: string;
  onChange?: (query: string) => void;
  disabled?: boolean;
}

const Search: FunctionComponent<SearchProps> = ({
  placeholder,
  className,
  onChange,
  disabled,
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
    <div
      className={cn(
        "mx-auto flex h-11 w-full items-center gap-2.5 rounded-full border border-outline-200 bg-background pl-4.5 pr-1.5 shadow-button hover:border-outline-300",
        "has-[:focus]:border-brand-300 has-[:focus]:ring has-[:focus]:ring-brand-600/20 has-[:focus]:ring-offset-0 sm:w-[600px]",
        disabled ? "cursor-not-allowed border-outline-300 bg-washed-100" : "",
        className,
      )}
    >
      <input
        ref={searchRef}
        value={value}
        spellCheck={false}
        disabled={disabled}
        placeholder={placeholder || t("Search.default_placeholder")}
        className="flex h-[42px] w-full rounded-md bg-background py-2.5 text-sm outline-none placeholder:text-dim-500 disabled:cursor-not-allowed disabled:opacity-20"
        onChange={(event) => onSearch(event.target.value)}
      />
      {disabled ? (
        <></>
      ) : value ? (
        <Button
          variant="default"
          size="default"
          className="group rounded-full"
          onClick={() => onSearch("")}
        >
          <CrossX className="size-4.5 text-dim-500 group-hover:text-foreground" />
        </Button>
      ) : (
        <span
          className="hidden shrink-0 select-none items-center gap-x-1 text-sm text-dim-500 hover:cursor-text lg:flex"
          onClick={() => searchRef.current?.focus()}
        >
          {t("Search.type")}
          <span className="rounded-md border border-outline-300 px-1.5 py-0.5">
            /
          </span>
          {t("Search.search")}
        </span>
      )}
      <Button
        variant="default"
        size="default"
        className={cn(
          "size-8 rounded-full bg-gradient-to-b from-[#5288FF] to-brand-600 to-100% p-1.5",
          disabled ? "cursor-not-allowed opacity-20" : "",
        )}
      >
        <SearchIcon className="size-5 text-white" />
      </Button>
    </div>
  );
};

export default Search;
