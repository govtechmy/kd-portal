import { FC } from "react";
import { getTranslations } from "next-intl/server";
import Section from "../layout/section";
import AggregatedChartClient from "./aggregated-chart-client";

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

interface AggregatedChartsProps {
  aggregatedData: TinybirdAggregatedData[];
  locale: string;
}

const AggregatedCharts: FC<AggregatedChartsProps> = async ({
  aggregatedData,
  locale,
}) => {
  const t = await getTranslations();

  if (!aggregatedData || aggregatedData.length === 0) {
    return (
      <Section>
        <div className="border-washed-100 py-8 sm:py-12 lg:py-[84px] xl:grid xl:grid-cols-12 xl:gap-6 xl:border-x">
          <div className="space-y-10 px-4 sm:space-y-12 sm:px-6 lg:px-0 xl:col-span-10 xl:col-start-2">
            <h2 className="text-balance font-poppins text-hsm font-semibold">
              {t("Statistics.aggregated.title")}
            </h2>
            <div className="py-8 text-center">
              <p className="text-gray-500">{t("Statistics.chart.no_data")}</p>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="border-washed-100 py-8 sm:py-12 lg:py-[84px] xl:grid xl:grid-cols-12 xl:gap-6 xl:border-x">
        <div className="space-y-10 px-4 sm:space-y-12 sm:px-6 lg:px-0 xl:col-span-10 xl:col-start-2">
          <h2 className="text-balance font-poppins text-hsm font-semibold">
            {t("Statistics.aggregated.title")}
          </h2>
          
          <AggregatedChartClient 
            aggregatedData={aggregatedData} 
            locale={locale}
            translations={{
              referrers_title: t("Statistics.aggregated.referrers_title"),
              subtitle: t("Statistics.visitor_chart.subtitle"),
              direct: t("Statistics.traffic_sources.direct"),
              google: t("Statistics.traffic_sources.google"),
              bing: t("Statistics.traffic_sources.bing"),
              facebook: t("Statistics.traffic_sources.facebook"),
              linkedin: t("Statistics.traffic_sources.linkedin"),
              internal: t("Statistics.traffic_sources.internal"),
              other: t("Statistics.traffic_sources.other"),
              total_visits: t("Statistics.aggregated.total_visits"),
              peak_day: t("Statistics.aggregated.peak_day"),
              avg_daily: t("Statistics.aggregated.avg_daily"),
              days_tracked: t("Statistics.aggregated.days_tracked"),
              date: t("Statistics.chart.date"),
              view_more: "View More Statistics"
            }}
          />
        </div>
      </div>
    </Section>
  );
};

export default AggregatedCharts;
