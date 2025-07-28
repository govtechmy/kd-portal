import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface SPLaSKSitemapProps {
  className?: string;
  showText?: boolean;
  href?: string;
}

/**
 * SPLaSK Sitemap Component
 *
 * This component adds the required SPLaSK sitemap tag for accessibility compliance.
 * It provides a link to the sitemap as required by SPLaSK standards.
 *
 * Usage:
 * - Add to layout for global compliance
 * - Can be customized with different text or styling
 */
export const SPLaSKSitemap: React.FC<SPLaSKSitemapProps> = ({
  className = "sr-only",
  showText = true,
  href = "/sitemap.xml",
}) => {
  const t = useTranslations("SPLaSK");

  return (
    <>
      {/* Hidden SPLaSK Sitemap tag for crawler detection */}
      <div
        {...{ "splwpk-sitemap": "splwpk-sitemap" }}
        className="sr-only"
        aria-hidden="true"
      >
        {t("site_map_available")}
      </div>

      <Link
        href={href}
        {...{ "splwpk-sitemap": "splwpk-sitemap" }}
        className={className}
        aria-label={t("site_map")}
      >
        {showText && t("site_map")}
      </Link>
    </>
  );
};

export default SPLaSKSitemap;
