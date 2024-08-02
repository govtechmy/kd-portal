import Hero from "@/components/layout/hero";
import { locales } from "@/lib/i18n-config";
import { Footer } from "@/payload-types";
import { FC } from "react";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Section from "@/components/layout/section";
import RichText from "@/components/rich-text";

interface PenafianProps {
  data: Footer;
  locale: (typeof locales)[number];
}

const PenafianComponent: FC<PenafianProps> = ({ data, locale }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Disclaimer");
  return (
    <main className="divide-y divide-washed-100">
      <Hero title={t("header")} />

      {data.disclaimer_section && (
        <Section>
          <div className="gap-6 border-x border-washed-100 py-12 lg:py-[84px] xl:grid xl:grid-cols-12">
            <div className="article col-span-10 col-start-2 space-y-6 whitespace-pre-line text-pretty text-center text-sm text-black-700">
              <RichText
                className={"richTextdiv"}
                content={data.disclaimer_section.statement}
              />
            </div>
          </div>
        </Section>
      )}
    </main>
  );
};

export default PenafianComponent;
