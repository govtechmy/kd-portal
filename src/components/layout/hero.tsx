"use client";
import HeroPattern from "@/components/layout/hero-pattern";
import { usePathname } from "next/navigation";

export default function Hero({
  title,
  search,
}: {
  title: string;
  search?: React.ReactNode;
}) {
  const pathname = usePathname();

  // Force SPLaSK-compliant keywords if needed
  // Determine forced titles based on SPLaSK-required pages
  let forcedTitle: string | null = null;

  if (pathname?.includes("dasar-privasi")) {
    forcedTitle = pathname.includes("/en") ? "Privacy Policy" : "Dasar Privasi";
  } else if (pathname?.includes("penafian")) {
    forcedTitle = pathname.includes("/en") ? "Disclaimer" : "Penafian";
  }

  return (
    <section className="relative border-b border-outline-200">
      <div className="absolute -z-10 flex h-full w-full justify-center overflow-hidden">
        <HeroPattern className="absolute -top-[83.33%]" />
      </div>

      <div className="container flex flex-col gap-6 py-16">
        {forcedTitle === "Privacy Policy" || forcedTitle === "Dasar Privasi" ? (
          <h1
            splwpk-privacy-policy="splwpk-privacy-policy"
            className="text-center font-poppins text-[2rem]/10 sm:text-hmd font-semibold"
          >
            {forcedTitle}
          </h1>
        ) : forcedTitle === "Disclaimer" || forcedTitle === "Penafian" ? (
          <h1
            splwpk-disclaimer="splwpk-disclaimer"
            className="text-center font-poppins text-[2rem]/10 sm:text-hmd font-semibold"
          >
            {forcedTitle}
          </h1>
        ) : (
          <h1 className="text-center font-poppins text-[2rem]/10 sm:text-hmd font-semibold">
            {title}
          </h1>
        )}
        {search}
      </div>
    </section>
  );
}
