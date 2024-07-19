import HeroPattern from "@/components/layout/hero-pattern";
import { buttonVariants } from "@/components/ui/button";
import Direction from "@/icons/direction";
import Envelope from "@/icons/envelope";
import Phone from "@/icons/phone";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import React, { FC } from "react";
import { SiteInfo } from "@/payload-types";
import { locales } from "@/lib/i18n-config";
import { _social_media } from "@/lib/constants/links";

interface ContactUsProps {
  data: SiteInfo;
  locale: (typeof locales)[number];
}

const ContactUs: FC<ContactUsProps> = ({ data, locale }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <main className="divide-y-washed-100 divide-y">
      <div className="relative">
        <div className="absolute -z-10 flex h-full w-full justify-center overflow-hidden">
          <HeroPattern className="absolute -top-[83.33%]" />
        </div>
        <h1 className="py-16 text-center font-poppins text-hmd font-semibold">
          {t("Contact.header")}
        </h1>
      </div>

      <section className="container border-x border-washed-100 py-12 lg:py-[84px] xl:grid xl:grid-cols-12">
        <div className="divide-y-washed-100 col-span-10 col-start-2 divide-y">
          <div className="flex flex-col gap-12 sm:flex-row">
            <div className="space-y-4.5 sm:w-1/3 lg:py-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                {t("Contact.office")}
              </p>

              <div className="space-y-2">
                <p className="text-xl font-semibold">{data.site_name}</p>
                <p className="text-sm text-black-700">
                  {data.address.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>

              <div className="flex gap-2 pt-3">
                {[
                  {
                    name: "Google Maps",
                    href: `https://www.google.com/maps/dir//${data.encoded_address}`,
                  },
                  {
                    name: "Waze",
                    href: `https://www.waze.com/live-map/directions/${data.encoded_address}`,
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
              className="rounded-[32px] border shadow-[0_30px_100px_-10px_#4C53614D] max-sm:aspect-square sm:w-2/3"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_API_KEY}&q=${data.encoded_address}`}
            />
          </div>
        </div>
      </section>

      <section className="container grid grid-cols-2 divide-x divide-y divide-outline-200 px-0 sm:grid-cols-4 lg:flex lg:border-x lg:border-x-washed-100">
        {[
          {
            icon: <Phone className="size-6" />,
            title: "Contact.telephone",
            desc: data.no_tel,
          },
          {
            icon: <Envelope className="size-6" />,
            title: "Contact.email",
            desc: data.email,
          },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            className="col-span-2 flex flex-auto gap-4.5 px-6 py-8 md:py-[34px]"
          >
            <div className="size-[42px] rounded-full bg-brand-50 p-[9px] text-brand-700">
              {icon}
            </div>
            <div className="space-y-1 font-semibold">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-600">
                {t(title)}
              </p>
              <p className="text-lg text-black-900">{desc}</p>
            </div>
          </div>
        ))}
        {data.social_media.map(
          ({ social, link, id }) =>
            link.url && (
              <a
                key={id}
                href={link.url}
                target="_blank"
                rel="noopenner noreferrer"
                className="text-sm text-black-700 [text-underline-position:from-font] hover:text-black-900 hover:underline"
              >
                <div className="col-span-1 flex flex-none flex-col items-center gap-2 py-6 md:gap-3 lg:w-[100px]">
                  <div className="flex size-[42px] items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    {_social_media[social].icon}
                  </div>
                  {social}
                </div>
              </a>
            ),
        )}
      </section>
    </main>
  );
};

export default ContactUs;
