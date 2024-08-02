import Hero from "@/components/layout/hero";
import Section from "@/components/layout/section";
import RichText from "@/components/rich-text";
import { locales } from "@/lib/i18n-config";
import { Footer } from "@/payload-types";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { FC } from "react";

interface PrivacyPolicyProps {
  data: Footer;
  locale: (typeof locales)[number];
}

const PrivacyPolicyComponent: FC<PrivacyPolicyProps> = ({ data, locale }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Privacy");
  return (
    <main>
      <Hero title={t("header")} />

      {data["privacy-policy_section"] && (
        <Section>
          <div className="gap-6 border-x border-washed-100 py-12 lg:py-[84px] xl:grid xl:grid-cols-12">
            <div className="article col-span-10 col-start-2 space-y-6 whitespace-pre-line text-pretty text-sm text-black-700">
              <RichText
                className="richTextdiv flex flex-col gap-6"
                content={data["privacy-policy_section"].statement}
              />
            </div>
          </div>
        </Section>
      )}
    </main>
  );
};

export default PrivacyPolicyComponent;
