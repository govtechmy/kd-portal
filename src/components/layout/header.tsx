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
import { Suspense, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export function Header({ locale }: { locale: string }) {
  const t = useTranslations();
  const pathname = usePathname();
  const active = (href: string) => pathname.startsWith(href) && href !== "/";
  const nav_items = [
    { name: "home", href: "/" },
    { name: "ministry_profile", href: routes.MINISTRY_PROFILE },
    // { name: "announcements", href: routes.ANNOUNCEMENTS },
    // { name: "achievements", href: routes.ACHIEVEMENTS },
    // { name: "policy", href: routes.POLICY },
    { name: "directory", href: routes.DIRECTORY },
    { name: "contact_us", href: routes.CONTACT_US },
    {
      name: "dept_agency",
      href: [
        {
          name: "JDN",
          href: "https://www.jdn.gov.my/",
        },
        {
          name: "JPDP",
          href: "https://www.pdp.gov.my/jpdpv2/",
        },
        {
          name: "MDEC",
          href: "https://mdec.my/",
        },
        {
          name: "MyDigital",
          href: "https://www.mydigital.gov.my/",
        },
        {
          name: "CSM",
          href: "https://www.cybersecurity.my/en/index.html",
        },
        {
          name: "DNB",
          href: "https://www.digital-nasional.com.my/",
        },
        {
          name: "MyNIC",
          href: "https://mynic.my/",
        },
      ],
    },
  ];

  const [showMenu, setMenu] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 border-outline-200 bg-background lg:border-b lg:bg-background/80 lg:backdrop-blur-[30px]">
      <div className="container flex w-full items-center justify-between gap-3 border-outline-200 bg-background py-3 max-lg:border-b lg:gap-4 lg:bg-transparent">
        <div className="flex items-center justify-between gap-3 lg:gap-4">
          <Link href="/" className="flex h-full w-full items-center gap-2.5">
            <Image
              src="/jata-negara.png"
              width={40}
              height={32}
              style={{
                width: "auto",
              }}
              className="h-8 w-fit"
              alt="Jata Negara"
            />

            <span className="line-clamp-2 max-w-[50%] font-poppins text-xs font-semibold leading-[14px] sm:line-clamp-none sm:whitespace-nowrap sm:text-lg sm:leading-normal">
              {t("Agency.name")}
            </span>
          </Link>

          <Sheet open={showMenu} onOpenChange={setMenu}>
            <SheetContent
              side="top"
              className="absolute top-full -z-10 flex flex-col gap-1 rounded-b-xl p-3 lg:hidden"
            >
              {nav_items.map(({ name, href }) =>
                Array.isArray(href) ? (
                  <Accordion
                    className="bg-white"
                    type="single"
                    defaultValue="item-1"
                    collapsible
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger
                        className={cn(
                          buttonVariants({ variant: "tertiary", size: "md" }),
                          "justify-start bg-white text-base hover:bg-none focus:ring-0",
                        )}
                      >
                        {t(`Header.${name}`)}{" "}
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
                              {`${t(`Agency.${item.name}.name`)}${t(`Agency.${item.name}.abbr`) ? ` (${t(`Agency.${item.name}.abbr`)})` : ""} `}
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
                      className={cn(
                        buttonVariants({ variant: "tertiary", size: "md" }),
                        "w-full justify-start text-base data-[state=open]:bg-washed-100",
                      )}
                    >
                      {t(`Header.${name}`)}
                    </Link>
                  </SheetClose>
                ),
              )}
            </SheetContent>
            <SheetPortal>
              <SheetOverlay className="z-40" />
            </SheetPortal>
          </Sheet>

          <NavigationMenu.Root className="z-10 hidden w-full items-center lg:flex">
            <NavigationMenu.List className="group flex list-none items-center justify-center space-x-1">
              {nav_items.map(({ name, href }) =>
                Array.isArray(href) ? (
                  <NavigationMenu.Item key={name}>
                    <NavigationMenu.Trigger
                      className={cn(
                        buttonVariants({ variant: "tertiary" }),
                        "w-max bg-transparent",
                        "group flex select-none items-center",
                      )}
                    >
                      {t(`Header.${name}`)}{" "}
                      <ChevronDown
                        className="duration-[150] relative transition-transform ease-in group-data-[state=open]:-rotate-180"
                        aria-hidden
                      />
                    </NavigationMenu.Trigger>

                    <NavigationMenu.Content className="absolute left-0 top-0">
                      <ul className="m-0 grid h-fit list-none rounded-sm border bg-background p-3 shadow-lg sm:w-[400px] sm:grid-flow-col sm:grid-rows-12">
                        {href.map((item) => (
                          <Link
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              buttonVariants({ variant: "tertiary" }),
                              "w-full justify-start bg-transparent transition-colors data-[state=open]:bg-washed-100",
                            )}
                          >
                            {`${t(`Agency.${item.name}.name`)}${t(`Agency.${item.name}.abbr`) ? ` (${t(`Agency.${item.name}.abbr`)})` : ""} `}
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
                      className={cn(
                        buttonVariants({ variant: "tertiary" }),
                        "w-max bg-transparent transition-colors data-[state=open]:bg-washed-100",
                      )}
                    >
                      {t(`Header.${name}`)}
                    </Link>
                  </NavigationMenu.Item>
                ),
              )}
            </NavigationMenu.List>
            <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
              <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-2 h-[250px] w-full origin-[top_center] overflow-hidden rounded-[6px] transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
            </div>
          </NavigationMenu.Root>
        </div>
        <div className="flex items-center gap-2">
          <Suspense>
            <Locale locale={locale} />
          </Suspense>

          <Button
            variant="tertiary"
            size="icon"
            className={cn("block lg:hidden", showMenu && "bg-washed-100")}
            onClick={() => setMenu(!showMenu)}
          >
            {showMenu ? <CrossX /> : <HamburgerMenu />}
          </Button>
        </div>
      </div>
    </header>
  );
}
