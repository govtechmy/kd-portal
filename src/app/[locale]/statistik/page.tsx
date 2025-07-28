import React, { Suspense } from "react";
import { FSP, inject, metagen, MetagenProps } from "@/lib/decorator";
import { getStatisticsData } from "@/lib/utils/statistics";
import StatisticsPage from "@/components/statistik/statistics-page";

interface TinybirdVisitorData {
  day: string;
  total_visitors: number;
}

interface TinybirdCountryData {
  country_name: string;
  country_code: string;
  visits: number;
  percentage: number;
}

interface TinybirdReferrerData {
  referrer_category: string;
  visits: number;
  percentage: number;
}

interface TinybirdDeviceData {
  device_type: string;
  users: number;
  percentage: number;
}

interface TinybirdBrowserData {
  browser_name: string;
  users: number;
  percentage: number;
}

interface TinybirdPageData {
  page_path: string;
  hits: number;
}

interface TinybirdNewsData {
  news_slug: string;
  hits: number;
}

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

const Statistik: FSP = async ({ locale }) => {
  // Fetch statistics data from external source
  const data = await getStatisticsData("api");

  // Fetch visitor data from Tinybird server-side
  let visitorData: TinybirdVisitorData[] = [];
  let countryData: TinybirdCountryData[] = [];
  let referrerData: TinybirdReferrerData[] = [];
  let deviceData: TinybirdDeviceData[] = [];
  let browserData: TinybirdBrowserData[] = [];
  let pageData: TinybirdPageData[] = [];
  let newsData: TinybirdNewsData[] = [];
  let aggregatedData: TinybirdAggregatedData[] = [];

  // Helper function to safely fetch Tinybird data
  const fetchTinybirdData = async (pipeName: string, baseUrl: string, token: string) => {
    try {
      const response = await fetch(`${baseUrl}/v0/pipes/${pipeName}.json`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 },
      });
      
      if (!response.ok) {
        return [];
      }
      
      const result = await response.json();
      return result.data || [];
    } catch {
      return [];
    }
  };

  try {
    const baseUrl = process.env.NEXT_PUBLIC_TINYBIRD_HOST;
    const token = process.env.TINYBIRD_TOKEN_API;

    if (baseUrl && token) {
      // Fetch all data in parallel for better performance
      const [
        aggregatedResult,
        visitorResult,
        countryResult,
        referrerResult,
        deviceResult,
        browserResult,
        pageResult,
        newsResult
      ] = await Promise.allSettled([
        fetchTinybirdData("KD_PORTAL_AGGREGATED", baseUrl, token),
        fetchTinybirdData("KD_PORTAL_VISITORS", baseUrl, token),
        fetchTinybirdData("KD_PORTAL_VISITORS_COUNTRY", baseUrl, token),
        fetchTinybirdData("KD_PORTAL_REFERRERS", baseUrl, token),
        fetchTinybirdData("KD_PORTAL_TYPE_OF_DEVICE", baseUrl, token),
        fetchTinybirdData("KD_PORTAL_TYPE_BROWSER", baseUrl, token),
        fetchTinybirdData("KD_PORTAL_VISITED_PAGE", baseUrl, token),
        fetchTinybirdData("KD_PORTAL_MOST_VISIT_NEWS", baseUrl, token)
      ]);

      // Extract data from results, handling both fulfilled and rejected promises
      aggregatedData = aggregatedResult.status === 'fulfilled' ? aggregatedResult.value : [];
      visitorData = visitorResult.status === 'fulfilled' ? visitorResult.value : [];
      countryData = countryResult.status === 'fulfilled' ? countryResult.value : [];
      referrerData = referrerResult.status === 'fulfilled' ? referrerResult.value : [];
      deviceData = deviceResult.status === 'fulfilled' ? deviceResult.value : [];
      browserData = browserResult.status === 'fulfilled' ? browserResult.value : [];
      pageData = pageResult.status === 'fulfilled' ? pageResult.value : [];
      newsData = newsResult.status === 'fulfilled' ? newsResult.value : [];
    }
  } catch {
    // Silent fallback - all data arrays remain empty
  }

  return (
    <Suspense>
      <StatisticsPage
        data={data}
        locale={locale}
        visitorData={visitorData}
        countryData={countryData}
        referrerData={referrerData}
        deviceData={deviceData}
        browserData={browserData}
        pageData={pageData}
        newsData={newsData}
        aggregatedData={aggregatedData}
      />
    </Suspense>
  );
};

export const generateMetadata = async (params: MetagenProps) => {
  return metagen(params, "Header", { title: "statistics" });
};

export default inject(Statistik);
