"use client";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import Input from "./input";
import { cn } from "@/lib/utils";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";

interface SearchProps {
  className?: string;
  placeholder?: string;
  onChange?: (query: string) => void;
}

const Search: FunctionComponent<SearchProps> = ({
  placeholder = "Cari kata kunci: “nama”, “jawatan”, “emel”",
  className,
  onChange,
}) => {
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
          <span>
            Tekan{" "}
            <span className="rounded-md border border-outline-300 bg-white px-1.5 py-0.5">
              /
            </span>{" "}
            untuk cari
          </span>
          <MagnifyingGlassCircleIcon className="h-8 w-8 text-brand-600" />
        </div>
      }
      value={value}
      placeholder={placeholder}
      className={cn("min-w-[300px] rounded-full py-2.5", className)}
      onChange={onSearch}
    />
  );
};

export default Search;
