import Hero from "@/components/layout/hero";
import Section from "@/components/layout/section";
import { locales } from "@/lib/i18n";
import { Footer } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface PrivacyPolicyProps {
  data: Footer;
  locale: (typeof locales)[number];
}

const PrivacyPolicyComponent: FC<PrivacyPolicyProps> = ({ data, locale }) => {
  const t = useTranslations("Privacy");
  return (
    <main>
      <Hero title={t("header")} splaskPrivacyPolicy={true} />

      <Section>
        <div className="gap-6 border-x border-washed-100 py-12 lg:py-[84px] xl:grid xl:grid-cols-12">
          <div className="col-span-10 col-start-2 space-y-6 whitespace-pre-line text-pretty text-sm text-black-700">
            <p {...{ "splwpk-privacy-policy": "splwpk-privacy-policy" }}>
              Dasar Privasi: Maklumat yang terkandung dalam laman web ini adalah
              untuk tujuan maklumat sahaja.
            </p>
            {data["privacy-policy_section"]?.statement && (
              <RichText
                className="richTextdiv flex flex-col gap-6"
                data={data["privacy-policy_section"].statement}
              />
            )}
          </div>
        </div>
      </Section>
    </main>
  );
};

export default PrivacyPolicyComponent;
