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
import CrossX from "@/icons/cross-x";
import HamburgerMenu from "@/icons/hamburger-menu";
import { Link, usePathname } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Suspense, useState } from "react";

export function Header({ locale }: { locale: string }) {
  const t = useTranslations();
  const pathname = usePathname();
  const active = (href: string) => pathname.startsWith(href) && href !== "/";
  const nav_items = [
    { name: "home", href: "/" },
    { name: "corporate_info", href: routes.CORPORATE_INFO },
    { name: "announcements", href: routes.ANNOUNCEMENTS },
    { name: "achievements", href: routes.ACHIEVEMENTS },
    { name: "policy", href: routes.POLICY },
    { name: "directory", href: routes.DIRECTORY },
    { name: "contact_us", href: routes.CONTACT_US },
  ];

  const [showMenu, setMenu] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 bg-background lg:border-b lg:bg-background/80 lg:backdrop-blur-[30px]">
      <div className="container flex w-full items-center justify-between gap-3 bg-background py-3 max-lg:border-b lg:gap-4 lg:bg-transparent">
        <Link href="/" className="flex h-full flex-none items-center gap-2.5">
          <Image
            src="/jata-negara.png"
            width={48}
            height={36}
            className="w-9 sm:w-12"
            alt="Jata Negara"
          />
          <span className="font-poppins text-lg font-semibold max-sm:line-clamp-2 max-sm:w-min max-sm:text-xs max-sm:leading-[14px] sm:whitespace-nowrap">
            {t("Agency.name")}
          </span>
        </Link>

        <Sheet open={showMenu} onOpenChange={setMenu}>
          <SheetContent
            side="top"
            className="absolute top-full -z-10 flex flex-col gap-0 rounded-b-xl p-3 lg:hidden"
          >
            {nav_items.map(({ name, href }) => (
              <SheetClose asChild key={name}>
                <Link
                  href={href}
                  data-state={active(href) ? "open" : "close"}
                  className={cn(
                    buttonVariants({ variant: "tertiary", size: "md" }),
                    "w-full justify-start data-[state=open]:bg-washed-100",
                  )}
                >
                  {t(`Header.${name}`)}
                </Link>
              </SheetClose>
            ))}
          </SheetContent>
          <SheetPortal>
            <SheetOverlay className="z-40" />
          </SheetPortal>
        </Sheet>

        <NavigationMenu.Root className="z-10 hidden w-full items-center lg:flex">
          <NavigationMenu.List className="group flex list-none items-center justify-center space-x-1">
            {nav_items.map(({ name, href }) => (
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
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

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
