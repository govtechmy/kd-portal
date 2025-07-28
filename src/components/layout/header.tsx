"use client";

import Locale from "@/components/layout/locale";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetOverlay,
  SheetPortal,
} from "@/components/ui/sheet";
import ChevronDown from "@/icons/chevron-down";
import CrossX from "@/icons/cross-x";
import HamburgerMenu from "@/icons/hamburger-menu";
import { Link, usePathname } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function Header({
  locale,
  nav_items,
}: {
  locale: string;
  nav_items: (
    | {
        name: string;
        href: string;
      }
    | {
        name: string;
        href: {
          name: string;
          href: string;
        }[];
      }
  )[];
}) {
  const t = useTranslations();
  const pathname = usePathname();
  const active = (href: string) => pathname.startsWith(href) && href !== "/";

  const [showMenu, setMenu] = useState<boolean>(false);
  const [timestamp, setTimestamp] = useState<string>("");

  // Set timestamp only on client side to avoid hydration mismatch
  useEffect(() => {
    setTimestamp(new Date().toISOString().slice(0, 19).replace("T", " "));
  }, []);

  return (
    <header className="sticky top-0 z-50 border-outline-200 bg-background lg:border-b lg:bg-background/80 lg:backdrop-blur-[30px] print:hidden">
      <div
        className={cn(
          "container flex h-16 items-center justify-between gap-3 border-outline-200 bg-background py-3 max-xl:pr-3 max-lg:border-b lg:gap-4",
          showMenu ? "" : "xl:bg-transparent",
        )}
        data-nosnippet
      >
        <div className="flex min-w-[56%] items-center justify-between gap-3 lg:gap-4">
          <Link href="/" className="flex h-full w-full items-center gap-2.5">
            <Image
              src="/jata-negara.png"
              width={40}
              height={32}
              style={{
                width: "auto",
              }}
              className="h-8 w-fit select-none"
              alt="Jata Negara"
            />

            <span className="line-clamp-2 max-w-[50%] font-poppins text-xs font-semibold leading-[14px] sm:line-clamp-none sm:whitespace-nowrap sm:text-lg sm:leading-normal">
              {t("Agency.name")}
            </span>
          </Link>

          <Sheet open={showMenu} onOpenChange={setMenu}>
            <SheetContent
              side="top"
              className="absolute top-full -z-10 flex flex-col gap-1 rounded-b-xl p-3 xl:hidden"
            >
              {nav_items.map(({ name, href }) =>
                Array.isArray(href) ? (
                  <Accordion
                    key={name}
                    className="bg-background"
                    type="single"
                    defaultValue="item-1"
                    collapsible
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger
                        className={cn(
                          buttonVariants({ variant: "tertiary", size: "md" }),
                          "justify-start bg-background text-base hover:bg-none focus:ring-0",
                        )}
                      >
                        {name}
                      </AccordionTrigger>
                      <AccordionContent>
                        {href.map((item) => (
                          <SheetClose asChild key={name}>
                            <Link
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                buttonVariants({
                                  variant: "tertiary",
                                  size: "md",
                                }),
                                "w-full justify-start text-sm data-[state=open]:bg-washed-100",
                              )}
                            >
                              {item.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <SheetClose asChild key={name}>
                    <Link
                      href={href}
                      data-state={active(href) ? "open" : "close"}
                      {...(name.toLowerCase().includes("policy") ||
                      (name.toLowerCase().includes("polisi") && timestamp)
                        ? {
                            "splwpk-gov-policies": "splwpk-gov-policies",
                            "splwpk-gov-policies-timestamp": timestamp,
                          }
                        : {})}
                      className={cn(
                        buttonVariants({ variant: "tertiary", size: "md" }),
                        "w-full justify-start text-base data-[state=open]:bg-washed-100",
                      )}
                    >
                      {name}
                    </Link>
                  </SheetClose>
                ),
              )}
            </SheetContent>
            <SheetPortal>
              <SheetOverlay className="z-40" />
            </SheetPortal>
          </Sheet>

          <NavigationMenu.Root className="relative z-10 hidden w-max justify-center xl:flex">
            <NavigationMenu.List className="group flex list-none justify-center space-x-1">
              {nav_items.map(({ name, href }) =>
                Array.isArray(href) ? (
                  <NavigationMenu.Item key={name}>
                    <NavigationMenu.Trigger
                      className={cn(
                        buttonVariants({ variant: "tertiary" }),
                        "group w-max select-none bg-transparent transition-colors data-[state=open]:bg-washed-100",
                      )}
                    >
                      {name}
                      <ChevronDown
                        className="relative top-px ml-1 transition duration-200 group-data-[state=open]:rotate-180"
                        aria-hidden="true"
                      />
                    </NavigationMenu.Trigger>

                    <NavigationMenu.Content className="left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto">
                      <ul className="rounded-lg border bg-background p-3 shadow-card sm:w-[400px]">
                        {href.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              buttonVariants({ variant: "tertiary" }),
                              "w-full justify-start bg-transparent transition-colors data-[state=open]:bg-washed-100",
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </ul>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                ) : (
                  <NavigationMenu.Item key={name}>
                    <Link
                      href={href}
                      data-state={active(href) ? "open" : "close"}
                      {...(name.toLowerCase().includes("policy") ||
                      (name.toLowerCase().includes("polisi") && timestamp)
                        ? {
                            "splwpk-gov-policies": "splwpk-gov-policies",
                            "splwpk-gov-policies-timestamp": timestamp,
                          }
                        : {})}
                      className={cn(
                        buttonVariants({ variant: "tertiary" }),
                        "w-max bg-transparent transition-colors data-[state=open]:bg-washed-100",
                      )}
                    >
                      {name}
                    </Link>
                  </NavigationMenu.Item>
                ),
              )}
            </NavigationMenu.List>
            <div className="absolute right-0 top-full">
              <NavigationMenu.Viewport className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-lg shadow-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]" />
            </div>
          </NavigationMenu.Root>
        </div>
        <div className="flex items-center gap-2">
          <Suspense>
            <Locale locale={locale} />
          </Suspense>

          <Button
            variant="tertiary"
            className={cn("block p-2.5 xl:hidden", showMenu && "bg-washed-100")}
            onClick={() => setMenu(!showMenu)}
          >
            {showMenu ? <CrossX /> : <HamburgerMenu />}
          </Button>
        </div>
      </div>
    </header>
  );
}
