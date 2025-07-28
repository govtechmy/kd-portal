import { locales } from "@/lib/i18n";
import Section from "@/components/layout/section";
import Hero from "@/components/layout/hero";
import { getTranslations } from "next-intl/server";
import { FC } from "react";
import { cn } from "@/lib/utils";
import ArrowUp from "@/icons/arrow-up";
import ArrowDown from "@/icons/arrow-down";
import Minus from "@/icons/minus";
import Globe from "@/icons/globe";
import CheckCircle from "@/icons/check-circle";
import StatisticsCharts from "./statistics-charts";
import DownloadButtons from "./download-buttons";

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

interface StatistikData {
  digitalAdoption: {
    title: string;
    metrics: Array<{
      label: string;
      value: string;
      change: string;
      status: "pass" | "fail" | "neutral";
    }>;
  };
  infrastructure: {
    title: string;
    metrics: Array<{
      label: string;
      value: string;
      change: string;
      status: "pass" | "fail" | "neutral";
    }>;
  };
  cybersecurity: {
    title: string;
    metrics: Array<{
      label: string;
      value: string;
      change: string;
      status: "pass" | "fail" | "neutral";
    }>;
  };
  digitalEconomy: {
    title: string;
    metrics: Array<{
      label: string;
      value: string;
      change: string;
      status: "pass" | "fail" | "neutral";
    }>;
  };
}

interface StatisticsPageProps {
  data: StatistikData;
  locale: (typeof locales)[number];
  visitorData: TinybirdVisitorData[];
  countryData: TinybirdCountryData[];
  referrerData: TinybirdReferrerData[];
  deviceData: TinybirdDeviceData[];
  browserData: TinybirdBrowserData[];
  pageData: TinybirdPageData[];
  newsData: TinybirdNewsData[];
  aggregatedData: TinybirdAggregatedData[];
}

const StatisticsPage: FC<StatisticsPageProps> = async ({ data, locale, visitorData, countryData, referrerData, deviceData, browserData, pageData, newsData, aggregatedData }) => {
  const t = await getTranslations();

  const getChangeIcon = (change: string) => {
    if (change.startsWith("+")) {
      return <ArrowUp className="h-4 w-4 text-green-600" />;
    } else if (change.startsWith("-")) {
      return <ArrowDown className="h-4 w-4 text-red-600" />;
    }
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith("+")) {
      return "text-green-600";
    } else if (change.startsWith("-")) {
      return "text-red-600";
    }
    return "text-gray-600";
  };

  const getStatusIcon = (status: string) => {
    if (status === "pass") {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const StatCard = ({ title, metrics, showStatus = false }: { 
    title: string; 
    metrics: Array<{ label: string; value: string; change: string; status?: string }>;
    showStatus?: boolean;
  }) => (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{metric.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{metric.value}</span>
              <div className="flex items-center gap-1">
                {showStatus ? getStatusIcon(metric.status || "") : getChangeIcon(metric.change)}
                <span className={cn("text-xs font-medium", getChangeColor(metric.change))}>
                  {metric.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main>
      <Hero 
        title={t("Statistics.header")} 
        subtitle={t("Statistics.description")}
      />
      {/* COMING SOON */}
      {/* <Section>
        <div className="relative gap-6 border-washed-100 max-lg:pt-12 lg:grid lg:grid-cols-12 lg:border-x lg:px-6">
          <div className="left-0 top-16 col-span-5 flex max-w-full flex-col items-start gap-y-4.5 lg:sticky lg:h-fit lg:py-[84px] xl:col-span-4">
            <h2 className="font-poppins text-[1.5rem]/8 font-semibold sm:text-2xl">
              {t("Statistics.digital_stats_title")}
            </h2>
            <p className="text-sm text-black-700">
              {t("Statistics.digital_stats_description")}
            </p>
          </div>
          
          <div className="col-span-7 xl:col-span-8 my-12">
            <div className="grid gap-8 md:grid-cols-2">
              <StatCard title={data.digitalAdoption.title} metrics={data.digitalAdoption.metrics} />
              <StatCard title={data.infrastructure.title} metrics={data.infrastructure.metrics} />
              <StatCard title={data.cybersecurity.title} metrics={data.cybersecurity.metrics} />
              <StatCard title={data.digitalEconomy.title} metrics={data.digitalEconomy.metrics} />
            </div>
          </div>
        </div>
      </Section> */}

      {/* Page Statistics Section - now renders the client component */}
      <Section>
        <div className="py-12">
          <DownloadButtons 
            aggregatedData={aggregatedData}
            locale={locale}
          />
          <StatisticsCharts 
            visitorData={visitorData} 
            countryData={countryData} 
            referrerData={referrerData} 
            deviceData={deviceData} 
            browserData={browserData} 
            pageData={pageData} 
            newsData={newsData} 
            locale={locale} 
            aggregatedData={aggregatedData}
          />
        </div>
      </Section>
    </main>
  );
};

export default StatisticsPage; 