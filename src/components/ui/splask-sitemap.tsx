import React from 'react';
import Link from 'next/link';

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
  href = "/sitemap.xml"
}) => {
  return (
    <Link 
      href={href}
      splwpk-sitemap="splwpk-sitemap" 
      className={className}
      aria-label="Site map"
    >
      {showText && "Site Map"}
    </Link>
  );
};

export default SPLaSKSitemap; 