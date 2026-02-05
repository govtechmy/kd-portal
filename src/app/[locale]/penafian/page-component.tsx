import Hero from "@/components/layout/hero";
import { locales } from "@/lib/i18n";
import { Footer } from "@/payload-types";
import { FC } from "react";
import { useTranslations } from "next-intl";
import Section from "@/components/layout/section";
import { RichText } from "@payloadcms/richtext-lexical/react";

interface PenafianProps {
  data: Footer;
  locale: (typeof locales)[number];
}

const PenafianComponent: FC<PenafianProps> = ({ data, locale }) => {
  const t = useTranslations("Disclaimer");
  return (
    <main className="divide-y divide-washed-100">
      <Hero title={t("header")}/>

      <Section>
        <div className="gap-6 border-x border-washed-100 py-12 lg:py-[84px] xl:grid xl:grid-cols-12">
          <div className="col-span-10 col-start-2 space-y-6 whitespace-pre-line text-pretty text-center text-sm text-black-700">
            <p {...{ "": "" }}>
              Penafian: Maklumat yang terkandung dalam laman web ini adalah
              untuk tujuan maklumat sahaja.
            </p>
            {data.disclaimer_section?.statement && (
              <RichText
                className={"richTextdiv"}
                data={data.disclaimer_section.statement}
              />
            )}
          </div>
        </div>
      </Section>
    </main>
  );
};

export default PenafianComponent;
