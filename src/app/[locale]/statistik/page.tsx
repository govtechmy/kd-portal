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

  try {
    const baseUrl = process.env.NEXT_PUBLIC_TINYBIRD_HOST;
    const token = process.env.TINYBIRD_TOKEN_API; // Server-side only - SECURE

    if (baseUrl && token) {
      // Fetch aggregated data for stacked area chart
      const aggregatedResponse = await fetch(
        `${baseUrl}/v0/pipes/KD_PORTAL_AGGREGATED.json?token=${token}`,
        {
          next: { revalidate: 300 }, // Cache for 5 minutes
        },
      );
      const aggregatedResult = await aggregatedResponse.json();
      aggregatedData = aggregatedResult.data || [];

      // Fetch visitor trend data
      const visitorResponse = await fetch(
        `${baseUrl}/v0/pipes/KD_PORTAL_VISITORS.json?token=${token}`,
        {
          next: { revalidate: 300 }, // Cache for 5 minutes
        },
      );
      const visitorResult = await visitorResponse.json();
      visitorData = visitorResult.data || [];

      // Fetch country data
      const countryUrl = `${baseUrl}/v0/pipes/KD_PORTAL_VISITORS_COUNTRY.json?token=${token}`;

      const countryResponse = await fetch(countryUrl, {
        next: { revalidate: 300 }, // Cache for 5 minutes
      });
      const countryResult = await countryResponse.json();
      countryData = countryResult.data || [];

      // Fetch referrer data
      const referrerUrl = `${baseUrl}/v0/pipes/KD_PORTAL_REFERRERS.json?token=${token}`;

      const referrerResponse = await fetch(referrerUrl, {
        next: { revalidate: 300 }, // Cache for 5 minutes
      });
      const referrerResult = await referrerResponse.json();
      referrerData = referrerResult.data || [];

      // Fetch device data
      const deviceUrl = `${baseUrl}/v0/pipes/KD_PORTAL_TYPE_OF_DEVICE.json?token=${token}`;

      const deviceResponse = await fetch(deviceUrl, {
        next: { revalidate: 300 }, // Cache for 5 minutes
      });
      const deviceResult = await deviceResponse.json();
      deviceData = deviceResult.data || [];

      // Fetch browser data
      const browserUrl = `${baseUrl}/v0/pipes/KD_PORTAL_TYPE_BROWSER.json?token=${token}`;

      const browserResponse = await fetch(browserUrl, {
        next: { revalidate: 300 }, // Cache for 5 minutes
      });
      const browserResult = await browserResponse.json();
      browserData = browserResult.data || [];

      // Fetch page data
      const pageUrl = `${baseUrl}/v0/pipes/KD_PORTAL_VISITED_PAGE.json?token=${token}`;

      const pageResponse = await fetch(pageUrl, {
        next: { revalidate: 300 }, // Cache for 5 minutes
      });
      const pageResult = await pageResponse.json();
      pageData = pageResult.data || [];

      // Fetch news data
      const newsUrl = `${baseUrl}/v0/pipes/KD_PORTAL_MOST_VISIT_NEWS.json?token=${token}`;

      const newsResponse = await fetch(newsUrl, {
        next: { revalidate: 300 }, // Cache for 5 minutes
      });
      const newsResult = await newsResponse.json();
      newsData = newsResult.data || [];
    } else {
      console.log("Missing Tinybird configuration");
    }
  } catch (error) {
    console.error("Error fetching analytics data:", error);
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
