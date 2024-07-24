"use client";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandLoading,
  CommandInput,
  CommandEmpty,
} from "cmdk";
import { FC, JSX, RefObject, useEffect, useRef, useState } from "react";
import { Button } from "./button";
import CrossX from "@/icons/cross-x";
import SearchIcon from "@/icons/search";
import { useTranslations } from "next-intl";
import { SearchType } from "../home/searchbar";
import ChevronRight from "@/icons/chevron-right";
import { useRouter } from "@/lib/i18n";
import { useOnClickOutside } from "@/lib/hooks/useOnClickOutside";
import { getGroupData } from "@/collections/Search-Overrides";
import FileDocumentPaper from "@/icons/file-document-paper";
import Flag from "@/icons/flag";
import UserGroup from "@/icons/user-group";
import Megaphone from "@/icons/megaphone";

interface CommandMenuProps {
  options: unknown;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (query: string) => void;
  loading?: boolean;
}

const CommandMenu: FC<CommandMenuProps> = ({
  options,
  className,
  disabled,
  placeholder,
  onChange,
  loading,
}) => {
  const t = useTranslations();

  const _options = options as SearchType;

  const [value, setValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { push } = useRouter();

  const onSearch = (query: string) => {
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
      // Check if 'CMD + K' or 'Ctrl + K' key combination is pressed
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        event.preventDefault();
        searchRef.current?.blur();
        handleClickOutside();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClickOutside = () => {
    setIsInputFocused(false);
  };

  useOnClickOutside<HTMLDivElement | HTMLInputElement>(
    [
      listRef as RefObject<HTMLDivElement>,
      searchRef as RefObject<HTMLInputElement>,
    ],
    handleClickOutside,
  );

  const icon: { [key: string]: JSX.Element } = {
    directory: <UserGroup className="size-4 text-foreground-primary" />,
    policy: <FileDocumentPaper className="size-4 text-foreground-primary" />,
    achievements: <Flag className="size-4 text-foreground-primary" />,
    announcements: <Megaphone className="size-4 text-foreground-primary" />,
  };

  return (
    <Command
      tabIndex={0}
      label="Command Menu"
      shouldFilter={false}
      className={cn(
        "relative mx-auto flex h-11 w-full items-center gap-2.5 rounded-full border border-outline-200 bg-background pl-4.5 pr-1.5 shadow-button outline-none hover:border-outline-300",
        "has-[:focus]:border-brand-300 has-[:focus]:ring has-[:focus]:ring-brand-600/20 has-[:focus]:ring-offset-0 sm:w-[600px]",
        className,
      )}
    >
      <CommandInput
        ref={searchRef}
        onValueChange={(search) => onSearch(search)}
        value={value}
        className="flex h-[42px] w-full rounded-md bg-background py-2.5 text-sm outline-none placeholder:text-dim-500 disabled:cursor-not-allowed disabled:opacity-20"
        onFocus={() => setIsInputFocused(true)}
        placeholder={placeholder || t("Search.default_placeholder")}
      />
      {disabled ? (
        <></>
      ) : value ? (
        <Button
          variant="default"
          size="default"
          className="group rounded-full"
          onClick={() => setValue("")}
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

      <CommandList
        ref={listRef}
        className={cn(
          "absolute left-0 top-11 z-[99999] flex max-h-[400px] w-full flex-col overflow-scroll rounded-[22px] border border-outline-200 bg-white px-1.5 pb-2 pt-3 shadow-lg",
          isInputFocused ? "flex" : "hidden",
        )}
      >
        <CommandEmpty className="text-sm text-dim-500">
          No results found.
        </CommandEmpty>
        {loading && (
          <CommandLoading className="text-sm text-dim-500">
            Fetching…
          </CommandLoading>
        )}
        {_options.map(({ relationTo, priority, items }) => {
          const metadata = getGroupData(relationTo);
          return (
            <CommandGroup
              key={relationTo}
              heading={t(`Header.${metadata?.name}`)}
              className="flex w-full flex-1 flex-col items-start justify-start pb-2 text-sm font-medium text-dim-500"
            >
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  className="flex w-full gap-3 px-3 py-2 text-start hover:cursor-pointer hover:bg-background-50"
                  onSelect={(string) =>
                    metadata && metadata.route && relationTo === "broadcast"
                      ? push(`${metadata.route}/${item.doc.value}`)
                      : metadata &&
                        metadata.route &&
                        push(`${metadata.route}?search=${item.title}`)
                  }
                >
                  <div className="line-clamp-1 flex max-w-full flex-1 items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E5F4FF]">
                      {metadata && metadata.name ? icon[metadata.name] : null}
                    </div>
                    {item.title}
                  </div>
                  <ChevronRight />
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}
      </CommandList>
    </Command>
  );
};

export { CommandMenu };
