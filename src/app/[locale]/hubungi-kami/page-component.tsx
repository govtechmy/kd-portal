import { buttonVariants } from "@/components/ui/button";
import Direction from "@/icons/direction";
import Envelope from "@/icons/envelope";
import Phone from "@/icons/phone";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import React, { FC } from "react";
import { SiteInfo } from "@/payload-types";
import { locales } from "@/lib/i18n";
import { _social_media } from "@/lib/constants/links";
import Hero from "@/components/layout/hero";
import Section from "@/components/layout/section";
import Overline from "@/components/typography/overline";
import FeedbackDialog from "@/components/ui/FeedbackDialog";

interface ContactUsProps {
  data: SiteInfo;
  locale: (typeof locales)[number];
}

const ContactUs: FC<ContactUsProps> = async ({ data, locale }) => {
  const t = await getTranslations();

  // Generate timestamp on server side to avoid hydration mismatch
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");

  return (
    <>
      <Hero title={t("Contact.header")} />
      <main className="divide-y divide-washed-100">
        <Section>
          <div className="gap-6 border-washed-100 py-12 lg:py-[84px] xl:grid xl:grid-cols-12 xl:border-x">
            <div className="col-span-10 col-start-2">
              <div className="flex flex-col gap-12 sm:flex-row">
                <div className="space-y-4.5 sm:w-1/3 lg:py-16">
                  <Overline>{t("Contact.office")}</Overline>

                  <div className="space-y-2">
                    <p className="text-xl font-semibold">{data.site_name}</p>
                    <p className="text-sm text-black-700">
                      {data && data.address
                        ? data.address.split("\n").map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))
                        : ""}
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
                        href: `https://www.waze.com/en/live-map/directions/menara-usahawan-persiaran-perdana-18-putrajaya?place=w.66650141.666435876.410674`,
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
                  <form
                    {...{ "splwpk-feedback-form": "splwpk-feedback-form" }}
                  ></form>
                  {/* Hide ftm until further notice, do not remove, for splask scoring! */}
                   <FeedbackDialog className ="hidden" /> 
                </div>
                <iframe
                  className="rounded-[32px] border border-outline-200 shadow-[0_30px_100px_-10px_#4C53614D] max-sm:aspect-square sm:w-2/3"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_API_KEY}&q=${data.encoded_address}`}
                />
              </div>
            </div>
          </div>
        </Section>

        <Section className="xl:container">
          <div className="flex w-full flex-col divide-washed-100 border-washed-100 max-xl:divide-y xl:flex-row xl:divide-x xl:border-x">
            <div className="grid w-full flex-auto grid-cols-2 divide-washed-100 px-0 max-md:divide-y md:divide-x">
              {[
                {
                  icon: <Phone className="size-6" />,
                  title: "telephone",
                  desc: data.no_tel,
                },
                {
                  icon: <Envelope className="size-6" />,
                  title: "email",
                  desc: data.email,
                },
              ].map(({ icon, title, desc }) => (
                <a
                  key={title}
                  href={`${title === "email" ? "mailto" : "tel"}:${desc}`}
                  {...{ "splwpk-contact-details": "splwpk-contact-details" }}
                  {...{ "splwpk-contact-details-timestamp": timestamp }}
                  className="group flex gap-4.5 border-washed-100 px-6 py-8 max-md:col-span-2 md:py-[34px]"
                >
                  <div className="size-[42px] rounded-full bg-brand-50 p-[9px] text-foreground-primary">
                    {icon}
                  </div>
                  <div className="space-y-1 font-semibold">
                    <Overline>{t(`Contact.${title}`)}</Overline>
                    <p className="underline-font text-lg text-foreground group-hover:underline">
                      {desc}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="grid flex-none grid-flow-row grid-cols-4 divide-x divide-washed-100 px-0 max-md:divide-y">
              {Boolean(data.social_media.length)
                ? data.social_media.map(
                    ({ social, link, id }) =>
                      link.url && (
                        <a
                          key={id}
                          href={link.url}
                          target="_blank"
                          rel="noopenner noreferrer"
                          className="underline-font text-sm text-black-700 hover:text-foreground hover:underline max-md:col-span-2"
                        >
                          <div className="col-span-1 flex flex-none flex-col items-center gap-2 py-6 md:gap-3 xl:w-[100px]">
                            <div className="flex size-[42px] items-center justify-center rounded-full bg-brand-50 text-foreground-primary">
                              {_social_media[social].icon}
                            </div>
                            {social}
                          </div>
                        </a>
                      ),
                  )
                : null}
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};

export default ContactUs;
