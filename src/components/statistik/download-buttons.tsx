"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import CSV from "@/icons/csv";
import JSONIcon from "@/icons/json";

interface TinybirdAggregatedData {
  day: string;
  direct_visits: number;
  google_visits: number;
  bing_visits: number;
  facebook_visits: number;
  linkedin_visits: number;
  internal_visits: number;
  other_referrals: number;
  mobile_visits: number;
  tablet_visits: number;
  desktop_visits: number;
  chrome_visits: number;
  safari_visits: number;
  firefox_visits: number;
  edge_visits: number;
  other_browser_visits: number;
  malaysia_visits: number;
  singapore_visits: number;
  us_visits: number;
  india_visits: number;
  china_visits: number;
  other_country_visits: number;
  total_visits: number;
}

interface DownloadButtonsProps {
  aggregatedData: TinybirdAggregatedData[];
  locale: string;
}

const DownloadButtons: FC<DownloadButtonsProps> = ({ aggregatedData, locale }) => {
  const t = useTranslations();

  const handleDownloadCSV = () => {
    if (aggregatedData.length === 0) return;

    // Create CSV content
    const headers = [
      'Date',
      'Direct Visits',
      'Google Visits', 
      'Bing Visits',
      'Facebook Visits',
      'LinkedIn Visits',
      'Internal Visits',
      'Other Referrals',
      'Mobile Visits',
      'Tablet Visits',
      'Desktop Visits',
      'Chrome Visits',
      'Safari Visits',
      'Firefox Visits',
      'Edge Visits',
      'Other Browser Visits',
      'Malaysia Visits',
      'Singapore Visits',
      'US Visits',
      'India Visits',
      'China Visits',
      'Other Country Visits',
      'Total Visits'
    ];

    const csvContent = [
      headers.join(','),
      ...aggregatedData.map(row => [
        row.day,
        row.direct_visits,
        row.google_visits,
        row.bing_visits,
        row.facebook_visits,
        row.linkedin_visits,
        row.internal_visits,
        row.other_referrals,
        row.mobile_visits,
        row.tablet_visits,
        row.desktop_visits,
        row.chrome_visits,
        row.safari_visits,
        row.firefox_visits,
        row.edge_visits,
        row.other_browser_visits,
        row.malaysia_visits,
        row.singapore_visits,
        row.us_visits,
        row.india_visits,
        row.china_visits,
        row.other_country_visits,
        row.total_visits
      ].join(','))
    ].join('\n');

    downloadFile(csvContent, `digital-statistics-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
  };

  const handleDownloadJSON = () => {
    if (aggregatedData.length === 0) return;

    const jsonContent = JSON.stringify(aggregatedData, null, 2);
    downloadFile(jsonContent, `digital-statistics-${new Date().toISOString().split('T')[0]}.json`, 'application/json');
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-end gap-3 mb-6">
      <button
        onClick={handleDownloadCSV}
        disabled={aggregatedData.length === 0}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <CSV className="h-3.5 w-3.5" />
        {t("Statistics.download_csv")}
      </button>
      <button
        onClick={handleDownloadJSON}
        disabled={aggregatedData.length === 0}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <JSONIcon className="h-3.5 w-3.5" />
        {t("Statistics.download_json")}
      </button>
    </div>
  );
};

export default DownloadButtons; 