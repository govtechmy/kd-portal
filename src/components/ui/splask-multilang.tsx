import React from "react";

interface SPLaSKMultiLangProps {
  className?: string;
  showText?: boolean;
}

/**
 * SPLaSK Multi-Language Component
 *
 * This component adds the required SPLaSK multi-language tag for accessibility compliance.
 * It indicates that the application supports multiple languages (Malay and English).
 *
 * Usage:
 * - Add to layout for global compliance
 * - Add to specific pages that need explicit multi-language indication
 */
export const SPLaSKMultiLang: React.FC<SPLaSKMultiLangProps> = ({
  className = "sr-only",
  showText = true,
}) => {
  return (
    <div
      splwpk-multilang="splwpk-multilang"
      className={className}
      aria-label="Multi-language content available"
    >
      {showText && "Multi Language [EN] | [MY]"}
    </div>
  );
};

export default SPLaSKMultiLang;
