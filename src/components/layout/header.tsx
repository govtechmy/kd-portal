"use client";

import Locale from "@/components/layout/locale";
import { buttonVariants } from "@/components/ui/button";
import { Link, usePathname } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Suspense } from "react";

export function Header({ locale }: { locale: string }) {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <header className="bg-background/80 sticky top-0 z-10 flex items-center gap-4 border-b px-4.5 py-2 backdrop-blur-[30px] lg:px-6">
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

      <div className="flex w-full justify-between gap-4">
        <NavigationMenu.Root className="z-10 hidden max-w-max flex-1 items-center justify-center lg:flex">
          <NavigationMenu.List className="group flex flex-1 list-none items-center justify-center space-x-1">
            {[
              { name: "home", href: "/" },
              { name: "corporate_info", href: routes.CORPORATE_INFO },
              { name: "announcements", href: routes.ANNOUNCEMENTS },
              { name: "achievements", href: routes.ACHIEVEMENTS },
              { name: "policy", href: routes.POLICY },
              { name: "directory", href: routes.DIRECTORY },
              { name: "contact_us", href: routes.CONTACT_US },
            ].map(({ name, href }) => (
              <NavigationMenu.Item key={name}>
                <Link
                  href={href}
                  data-state={
                    pathname.startsWith(href) && href !== "/" ? "open" : "close"
                  }
                  className={cn(
                    buttonVariants({ variant: "tertiary", size: "sm" }),
                    "w-max bg-transparent transition-colors data-[state=open]:bg-washed-100",
                  )}
                >
                  {t(`Header.${name}`)}
                </Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <Suspense>
          <Locale locale={locale} />
        </Suspense>
      </div>
    </header>
  );
}
