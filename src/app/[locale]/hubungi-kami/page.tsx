import HeroPattern from "@/components/layout/hero-pattern";
import { buttonVariants } from "@/components/ui/button";
import Direction from "@/icons/direction";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations();

  return (
    <>
      <div className="relative -z-10 border-b">
        <div className="absolute -z-10 flex h-full w-full justify-center overflow-hidden">
          <HeroPattern className="absolute -top-[83.33%]" />
        </div>
        <h1 className="py-16 text-center font-poppins text-hmd font-semibold">
          {t("Contact.header")}
        </h1>
      </div>

      <section className="grid grid-cols-12 py-[84px]">
        <div className="col-span-10 col-start-2">
          <div className="flex gap-16">
            <div className="w-1/3 space-y-4.5 py-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                {t("Contact.office")}
              </p>

              <div className="space-y-2">
                <p className="text-xl font-semibold">{t("Agency.name")}</p>
                <p className="text-sm text-black-700">
                  Aras 13, 14 dan 15, Blok Menara, <br />
                  Menara Usahawan <br />
                  No. 18, Persiaran Perdana, Presint 2 <br />
                  Pusat Pentadbiran Kerajaan Persekutuan <br />
                  62000 Putrajaya, Malaysia
                </p>
              </div>

              <div className="flex gap-2 pt-3">
                {[
                  {
                    name: "Google Maps",
                    href: "https://www.google.com/maps/dir//Menara+Usahawan+MENARA+USAHAWAN+Presint+2+62000+Putrajaya,+Wilayah+Persekutuan+Putrajaya/@2.9214159,101.6858804,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x31cdb63673ef9f13:0xba22b7b8fe0c52f4",
                  },
                  {
                    name: "Waze",
                    href: "https://www.waze.com/live-map/directions/menara-usahawan-persiaran-perdana-18-putrajaya?place=w.66650141.666435876.410674",
                  },
                ].map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopenner noreferrer"
                    className={cn(
                      buttonVariants({ variant: "secondary-colour" }),
                      "rounded-full",
                    )}
                  >
                    <Direction />
                    <span className="font-medium">{name}</span>
                  </a>
                ))}
              </div>
            </div>
            <iframe
              className="w-2/3 rounded-[32px] border shadow-[0_30px_100px_-10px_#4C53614D]"
              height="450"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_API_KEY}&q=Menara+Usahawan`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
