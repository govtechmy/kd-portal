"use client";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import Input from "./input";
import { cn } from "@/lib/utils";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
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
    <Input
      ref={searchRef}
      suffix={
        <div className="flex items-center gap-2.5 text-sm text-dim-500">
          <span className="hidden lg:block">
            {t("Search.type")}{" "}
            <span className="rounded-md border border-outline-300 bg-white px-1.5 py-0.5">
              /
            </span>{" "}
            {t("Search.search")}
          </span>
          <MagnifyingGlassCircleIcon className="h-8 w-8 text-brand-600" />
        </div>
      }
      value={value}
      placeholder={placeholder || t("Search.default_placeholder")}
      className={cn("min-w-[300px] rounded-full py-2.5", className)}
      onChange={onSearch}
    />
  );
};

export default Search;
