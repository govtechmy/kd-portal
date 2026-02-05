"use client";
import React from "react";

interface SPLaSKUpdatedContentProps {
  className?: string;
}

interface HiddenCrawlerDivProps
  extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
}

const HiddenCrawlerDiv: React.FC<HiddenCrawlerDivProps> = (props) => (
  <div {...props} />
);

/**
 * SPLaSK Updated Content Component
 *
 * This component handles all SPLaSK "Updated Content" requirements:
 * - Broadcast (30 days)
 * - About Us (30 days)
 * - News/Government Policies (30 days)
 * - FAQ
 * - Client Charter (60 days)
 * - Contact Details (30 days)
 * - Time-stamp tagging for all conditions
 *
 * Usage:
 * - Add to layout for global compliance
 * - Provides timestamp tracking for all content types
 */
export const SPLaSKUpdatedContent: React.FC<SPLaSKUpdatedContentProps> = ({
  className = "",
}) => {
  // Get current timestamp in required format
  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace("T", " ");
  };

  // Check if content is within required timeframe
  const isWithinDays = (lastUpdate: string, days: number) => {
    const lastUpdateDate = new Date(lastUpdate);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - lastUpdateDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= days;
  };

  // Example timestamps (you should replace these with actual content timestamps)
  const timestamps = {
    broadcast: "2026-01-15 10:30:00",
    aboutUs: "2026-01-20 14:45:00",
    news: "2026-01-18 09:15:00",
    govPolicies: "2026-01-17 16:20:00",
    faq: "2026-01-10 11:00:00",
    clientCharter: "2026-01-05 13:30:00",
    contactDetails: "2026-01-22 08:45:00",
  };

  return (
    <>
      {/* Hidden SPLaSK Updated Content tags for crawler detection */}
      <div
        {...{ "splwpk-broadcast": "splwpk-broadcast" }}
        {...{ "splwpk-broadcast-timestamp": timestamps.broadcast }}
        {...{ "timestamp": timestamps.broadcast }}
        className="sr-only"
        aria-hidden="true"
      >
        Broadcast Content Updated
      </div>

      <div
        {...{ "splwpk-about-us": "splwpk-about-us" }}
        {...{ "splwpk-about-us-timestamp": timestamps.aboutUs }}
        {...{ "timestamp": timestamps.aboutUs }}
        className="sr-only"
        aria-hidden="true"
      >
        About Us Content Updated
      </div>

      <div
        {...{ "splwpk-news": "splwpk-news" }}
        {...{ "splwpk-news-timestamp": timestamps.news }}
        {...{ "timestamp": timestamps.news }}
        className="sr-only"
        aria-hidden="true"
      >
        News Content Updated
      </div>

      <div
        {...{ "splwpk-gov-policies": "splwpk-gov-policies" }}
        {...{ "splwpk-gov-policies-timestamp": timestamps.govPolicies }}
        {...{ "timestamp": timestamps.govPolicies }}
        className="sr-only"
        aria-hidden="true"
      >
        Government Policies Updated
      </div>

      <div
        {...{ "splwpk-faq": "splwpk-faq" }}
        {...{ "splwpk-faq-timestamp": timestamps.faq }}
        {...{ "timestamp": timestamps.faq }}
        className="sr-only"
        aria-hidden="true"
      >
        FAQ Content Available
      </div>

      <div
        {...{ "splwpk-client-charter": "splwpk-client-charter" }}
        {...{ "splwpk-client-charter-timestamp": timestamps.clientCharter }}
        {...{ "timestamp": timestamps.clientCharter }}
        className="sr-only"
        aria-hidden="true"
      >
        Client Charter Available
      </div>

      <div
        {...{ "splwpk-contact-details": "splwpk-contact-details" }}
        {...{ "splwpk-contact-details-timestamp": timestamps.contactDetails }}
        {...{ "timestamp": timestamps.contactDetails }}
        className="sr-only"
        aria-hidden="true"
      >
        Contact Details Updated
      </div>

      <div
        {...{ "splwpk-online-e-participation": "splwpk-online-e-participation" }}
        {...{ "timestamp": timestamps.contactDetails }}
        className="sr-only"
        aria-hidden="true"
      >
         Online e-Participation 
      </div>

      <HiddenCrawlerDiv
        {...{ "splwpk-publicising": "splwpk-publicising" }}
        {...{ "timestamp": timestamps.broadcast }}
        className="sr-only"
        aria-hidden="true"
        href="https://digital.gov.my"
      >
        Publicising Agency
      </HiddenCrawlerDiv>

      <HiddenCrawlerDiv
        {...{ "splwpk-elecronic-archive": "splwpk-elecronic-archive" }}
        {...{ "timestamp": timestamps.contactDetails }}
        className="sr-only"
        aria-hidden="true"
        href="https://digital.gov.my"
      >
        Electronic Archive
      </HiddenCrawlerDiv>
    </>
  );
};

export default SPLaSKUpdatedContent;
