"use client";

import { FC, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ArrowUp from "@/icons/arrow-up";
import ArrowDown from "@/icons/arrow-down";
import Minus from "@/icons/minus";
import { getCountryFlag } from "@/lib/constants/flags";
import GoogleIcon from "@/icons/google";
import GlobeIcon from "@/icons/globe";
import LinkIcon from "@/icons/link";
import RefreshIcon from "@/icons/refresh";
import BingIcon from "@/icons/bing";
import FacebookIcon from "@/icons/facebook";
import LinkedInIcon from "@/icons/linkedin";
import ChromeIcon from "@/icons/chrome";
import SafariIcon from "@/icons/safari";
import FirefoxIcon from "@/icons/firefox";
import EdgeIcon from "@/icons/edge";
import OperaIcon from "@/icons/opera";
import InternetExplorerIcon from "@/icons/bing copy";

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

interface StatisticsChartsProps {
  visitorData: TinybirdVisitorData[];
  countryData: TinybirdCountryData[];
  referrerData: TinybirdReferrerData[];
  deviceData: TinybirdDeviceData[];
  browserData: TinybirdBrowserData[];
  pageData: TinybirdPageData[];
  newsData: TinybirdNewsData[];
  locale: string;
  aggregatedData: TinybirdAggregatedData[];
}

const StatisticsCharts: FC<StatisticsChartsProps> = ({
  visitorData,
  countryData,
  referrerData,
  deviceData,
  browserData,
  pageData,
  newsData,
  locale,
  aggregatedData,
}) => {
  const t = useTranslations();
  const [selectedRange, setSelectedRange] = useState<
    "7d" | "30d" | "90d" | "1y"
  >("30d");
  const [selectedDataType, setSelectedDataType] = useState<
    "referrers" | "locations" | "browsers" | "devices"
  >("referrers");
  const [hoveredReferrer, setHoveredReferrer] = useState<string | null>(null);
  const [hoveredDevice, setHoveredDevice] = useState<string | null>(null);
  const [hoveredBrowser, setHoveredBrowser] = useState<string | null>(null);

  // Process visitor data for chart
  const processedVisitorData = useMemo(() => {
    if (!visitorData.length) return [];

    return visitorData.map((item, index) => ({
      date: new Date(item.day).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      fullDate: item.day,
      visitors: item.total_visitors,
      cumulative: visitorData
        .slice(0, index + 1)
        .reduce((sum, d) => sum + d.total_visitors, 0),
    }));
  }, [visitorData]);

  // Filter data based on selected range
  const filteredData = useMemo(() => {
    if (!processedVisitorData.length) return [];

    const now = new Date();
    const rangeDays = {
      "7d": 7,
      "30d": 30,
      "90d": 90,
      "1y": 365,
    };

    const cutoffDate = new Date(
      now.getTime() - rangeDays[selectedRange] * 24 * 60 * 60 * 1000,
    );

    return processedVisitorData.filter((item) => {
      const itemDate = new Date(item.fullDate);
      return itemDate >= cutoffDate;
    });
  }, [processedVisitorData, selectedRange]);

  // Calculate comparison metrics
  const comparisonMetrics = useMemo(() => {
    if (filteredData.length < 2) return { change: 0, trend: "neutral" };

    const currentPeriod = filteredData.slice(-7); // Last 7 days
    const previousPeriod = filteredData.slice(-14, -7); // 7 days before that

    const currentAvg =
      currentPeriod.reduce((sum, item) => sum + item.visitors, 0) /
      currentPeriod.length;
    const previousAvg =
      previousPeriod.reduce((sum, item) => sum + item.visitors, 0) /
      previousPeriod.length;

    const change =
      previousAvg > 0 ? ((currentAvg - previousAvg) / previousAvg) * 100 : 0;

    return {
      change: Math.round(change * 10) / 10, // Round to 1 decimal
      trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
    };
  }, [filteredData]);

  // Get latest data for summary
  const latestData = filteredData[filteredData.length - 1];
  const totalVisitors = latestData?.visitors || 0;
  const totalUnique = latestData?.visitors || 0;
  const cumulativeVisitors = latestData?.cumulative || 0;

  // Process real country data
  const processedCountryData = useMemo(() => {
    if (!countryData.length) return [];

    const processed = countryData
      .slice(0, 10) // Take top 10 countries
      .map((item, index) => {
        return {
          name: item.country_name,
          code: item.country_code,
          visits: Number(item.visits), // Ensure it's a number
          percentage: Number(item.percentage), // Ensure it's a number
          color: "#3B82F6", // Single blue color for all bars
          flag: getCountryFlag(item.country_code),
        };
      })
      .sort((a, b) => b.visits - a.visits); // Sort by visits descending

    return processed;
  }, [countryData]);

  // Process real referrer data with icons
  const processedReferrerData = useMemo(() => {
    if (!referrerData.length) return [];

    // Traffic source icons and colors
    const sourceConfig: Record<
      string,
      { icon: React.ReactNode; color: string }
    > = {
      "Google Search": {
        icon: <GoogleIcon size={16} className="text-gray-700" />,
        color: "#4285F4",
      },
      Direct: {
        icon: <GlobeIcon size={16} className="text-gray-700" />,
        color: "#10B981",
      },
      "Other Referrals": {
        icon: <LinkIcon size={16} className="text-gray-700" />,
        color: "#F59E0B",
      },
      Internal: {
        icon: <RefreshIcon size={16} className="text-gray-700" />,
        color: "#8B5CF6",
      },
      "Bing Search": {
        icon: <BingIcon size={16} className="text-gray-700" />,
        color: "#00A1F1",
      },
      Facebook: {
        icon: <FacebookIcon size={16} className="text-gray-700" />,
        color: "#1877F2",
      },
      LinkedIn: {
        icon: <LinkedInIcon size={16} className="text-gray-700" />,
        color: "#0A66C2",
      },
    };

    return referrerData
      .slice(0, 8) // Take top 8 sources
      .map((item) => {
        const config = sourceConfig[item.referrer_category] || {
          icon: <GlobeIcon size={16} className="text-gray-700" />,
          color: "#6B7280",
        };

        return {
          name: item.referrer_category,
          visits: Number(item.visits),
          percentage: Number(item.percentage),
          icon: config.icon,
          color: config.color,
        };
      })
      .sort((a, b) => b.visits - a.visits); // Sort by visits descending
  }, [referrerData]);

  // Process real device data with icons
  const processedDeviceData = useMemo(() => {
    if (!deviceData.length) return [];

    // Device type icons and colors
    const deviceConfig: Record<string, { icon: string; color: string }> = {
      Desktop: { icon: "🖥️", color: "#3B82F6" },
      Mobile: { icon: "📱", color: "#10B981" },
      Tablet: { icon: "📱", color: "#F59E0B" },
      Other: { icon: "💻", color: "#6B7280" },
    };

    return deviceData
      .map((item) => {
        const config = deviceConfig[item.device_type] || {
          icon: "💻",
          color: "#6B7280",
        };

        return {
          name: item.device_type,
          users: Number(item.users),
          percentage: Number(item.percentage),
          icon: config.icon,
          color: config.color,
        };
      })
      .sort((a, b) => b.users - a.users); // Sort by users descending
  }, [deviceData]);

  // Process real browser data with icons
  const processedBrowserData = useMemo(() => {
    if (!browserData.length) return [];

    // Browser icons and colors
    const browserConfig: Record<
      string,
      { icon: React.ReactNode; color: string }
    > = {
      Chrome: {
        icon: <ChromeIcon size={16} className="text-gray-700" />,
        color: "#4285F4",
      },
      Safari: {
        icon: <SafariIcon size={16} className="text-gray-700" />,
        color: "#ad2117",
      },
      Edge: {
        icon: <EdgeIcon size={16} className="text-gray-700" />,
        color: "#fcb205",
      },
      Firefox: {
        icon: <FirefoxIcon size={16} className="text-gray-700" />,
        color: "#FF7139",
      },
      Other: {
        icon: <GlobeIcon size={16} className="text-gray-700" />,
        color: "#6B7280",
      },
    };

    return browserData
      .map((item) => {
        const config = browserConfig[item.browser_name] || {
          icon: <GlobeIcon size={16} className="text-gray-700" />,
          color: "#6B7280",
        };

        return {
          name: item.browser_name,
          users: Number(item.users),
          percentage: Number(item.percentage),
          icon: config.icon,
          color: config.color,
        };
      })
      .sort((a, b) => b.users - a.users); // Sort by users descending
  }, [browserData]);

  // Process page data
  const processedPageData = useMemo(() => {
    if (!pageData.length) return [];

    return pageData
      .slice(0, 8) // Take top 8 pages
      .map((item) => ({
        name:
          item.page_path.length > 15
            ? item.page_path.substring(0, 15) + "..."
            : item.page_path,
        fullName: item.page_path,
        hits: Number(item.hits),
        color: "#3B82F6",
      }))
      .sort((a, b) => b.hits - a.hits); // Sort by hits descending
  }, [pageData]);

  // Process news data
  const processedNewsData = useMemo(() => {
    if (!newsData.length) return [];

    return newsData
      .slice(0, 8) // Take top 8 news
      .map((item) => ({
        name:
          item.news_slug.length > 25
            ? item.news_slug.substring(0, 25) + "..."
            : item.news_slug,
        fullName: item.news_slug,
        hits: Number(item.hits),
        color: "#10B981",
      }))
      .sort((a, b) => b.hits - a.hits); // Sort by hits descending
  }, [newsData]);

  const getTrendIcon = (trend: string) => {
    if (trend === "up") {
      return <ArrowUp className="h-4 w-4 text-green-600" />;
    } else if (trend === "down") {
      return <ArrowDown className="h-4 w-4 text-red-600" />;
    }
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === "up") {
      return "text-green-600";
    } else if (trend === "down") {
      return "text-red-600";
    }
    return "text-gray-600";
  };

  // Custom tooltip for referrer pie chart
  const CustomReferrerTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            {data.visits.toLocaleString()} {t("Statistics.chart.visitors")} (
            {data.percentage.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // Get host URL for news links - SSR compatible
  const getHostUrl = () => {
    // Use environment variable for production, fallback for development
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    // Server-side fallback
    return process.env.NEXT_PUBLIC_SITE_URL || "https://www.digital.gov.my";
  };

  // Process aggregated data with filtering and data type selection
  const processedAggregatedData = useMemo(() => {
    if (!aggregatedData.length) return [];

    const getDaysAgo = (days: number) => {
      const date = new Date();
      date.setDate(date.getDate() - days);
      return date;
    };

    let filteredData = aggregatedData;

    switch (selectedRange) {
      case "7d":
        filteredData = aggregatedData.filter(
          (item) => new Date(item.day) >= getDaysAgo(7),
        );
        break;
      case "30d":
        filteredData = aggregatedData.filter(
          (item) => new Date(item.day) >= getDaysAgo(30),
        );
        break;
      case "90d":
        filteredData = aggregatedData.filter(
          (item) => new Date(item.day) >= getDaysAgo(90),
        );
        break;
      case "1y":
        filteredData = aggregatedData.filter(
          (item) => new Date(item.day) >= getDaysAgo(365),
        );
        break;
    }

    return filteredData;
  }, [aggregatedData, selectedRange]);

  // Get chart data based on selected data type
  const getChartData = () => {
    if (!processedAggregatedData.length) return [];

    switch (selectedDataType) {
      case "referrers":
        return processedAggregatedData.map((item) => ({
          day: item.day,
          direct_visits: item.direct_visits,
          google_visits: item.google_visits,
          bing_visits: item.bing_visits,
          facebook_visits: item.facebook_visits,
          linkedin_visits: item.linkedin_visits,
          internal_visits: item.internal_visits,
          other_referrals: item.other_referrals,
        }));
      case "locations":
        return processedAggregatedData.map((item) => ({
          day: item.day,
          malaysia_visits: item.malaysia_visits,
          singapore_visits: item.singapore_visits,
          us_visits: item.us_visits,
          india_visits: item.india_visits,
          china_visits: item.china_visits,
          other_country_visits: item.other_country_visits,
        }));
      case "browsers":
        return processedAggregatedData.map((item) => ({
          day: item.day,
          chrome_visits: item.chrome_visits,
          safari_visits: item.safari_visits,
          firefox_visits: item.firefox_visits,
          edge_visits: item.edge_visits,
          other_browser_visits: item.other_browser_visits,
        }));
      case "devices":
        return processedAggregatedData.map((item) => ({
          day: item.day,
          mobile_visits: item.mobile_visits,
          tablet_visits: item.tablet_visits,
          desktop_visits: item.desktop_visits,
        }));
      default:
        return processedAggregatedData;
    }
  };

  // Get chart colors and labels based on data type
  const getChartConfig = () => {
    switch (selectedDataType) {
      case "referrers":
        return {
          title: t("Statistics.aggregated.referrers_title"),
          areas: [
            {
              key: "direct_visits",
              color: "#10B981",
              label: t("Statistics.traffic_sources.direct"),
            },
            {
              key: "google_visits",
              color: "#4285F4",
              label: t("Statistics.traffic_sources.google"),
            },
            {
              key: "bing_visits",
              color: "#00A1F1",
              label: t("Statistics.traffic_sources.bing"),
            },
            {
              key: "facebook_visits",
              color: "#1877F2",
              label: t("Statistics.traffic_sources.facebook"),
            },
            {
              key: "linkedin_visits",
              color: "#0A66C2",
              label: t("Statistics.traffic_sources.linkedin"),
            },
            {
              key: "internal_visits",
              color: "#8B5CF6",
              label: t("Statistics.traffic_sources.internal"),
            },
            {
              key: "other_referrals",
              color: "#F59E0B",
              label: t("Statistics.traffic_sources.other"),
            },
          ],
        };
      case "locations":
        return {
          title: t("Statistics.aggregated.locations_title"),
          areas: [
            { key: "malaysia_visits", color: "#3B82F6", label: "Malaysia" },
            { key: "singapore_visits", color: "#EF4444", label: "Singapore" },
            { key: "us_visits", color: "#10B981", label: "United States" },
            { key: "india_visits", color: "#F59E0B", label: "India" },
            { key: "china_visits", color: "#EF4444", label: "China" },
            {
              key: "other_country_visits",
              color: "#6B7280",
              label: t("Statistics.locations.other"),
            },
          ],
        };
      case "browsers":
        return {
          title: t("Statistics.aggregated.browsers_title"),
          areas: [
            { key: "chrome_visits", color: "#4285F4", label: "Chrome" },
            { key: "safari_visits", color: "#ad2117", label: "Safari" },
            { key: "firefox_visits", color: "#FF7139", label: "Firefox" },
            { key: "edge_visits", color: "#fcb205", label: "Edge" },
            {
              key: "other_browser_visits",
              color: "#6B7280",
              label: t("Statistics.browsers.others"),
            },
          ],
        };
      case "devices":
        return {
          title: t("Statistics.aggregated.devices_title"),
          areas: [
            {
              key: "mobile_visits",
              color: "#10B981",
              label: t("Statistics.devices.mobile"),
            },
            {
              key: "tablet_visits",
              color: "#F59E0B",
              label: t("Statistics.devices.tablet"),
            },
            {
              key: "desktop_visits",
              color: "#3B82F6",
              label: t("Statistics.devices.desktop"),
            },
          ],
        };
      default:
        return { title: "", areas: [] };
    }
  };

  const chartConfig = getChartConfig();
  const chartData = getChartData();

  return (
    <div className="space-y-8">
      {/* Full-width Stacked Area Chart */}
      {aggregatedData.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 sm:mb-6">
            <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {chartConfig.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("Statistics.visitor_chart.subtitle")}
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                {/* Data Type Dropdown */}
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                  <span className="text-sm font-medium text-gray-500">
                    {t("Statistics.aggregated.data_type")}:
                  </span>
                  <select
                    value={selectedDataType}
                    onChange={(e) => setSelectedDataType(e.target.value as any)}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="referrers">
                      {t("Statistics.aggregated.referrers")}
                    </option>
                    <option value="locations">
                      {t("Statistics.aggregated.locations")}
                    </option>
                    <option value="browsers">
                      {t("Statistics.aggregated.browsers")}
                    </option>
                    <option value="devices">
                      {t("Statistics.aggregated.devices")}
                    </option>
                  </select>
                </div>
                {/* Time Range Filter */}
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                  <span className="text-sm font-medium text-gray-500">
                    {t("Statistics.time_range.label")}:
                  </span>
                  <div className="flex rounded-lg bg-gray-100 p-1">
                    {(["7d", "30d", "90d", "1y"] as const).map((range) => (
                      <button
                        key={range}
                        onClick={() => setSelectedRange(range)}
                        className={`rounded-md px-2 py-1 text-xs font-medium transition-colors sm:px-3 ${
                          selectedRange === range
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {range === "7d"
                          ? t("Statistics.time_range.7d")
                          : range === "30d"
                            ? t("Statistics.time_range.30d")
                            : range === "90d"
                              ? t("Statistics.time_range.90d")
                              : t("Statistics.time_range.1y")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats for Aggregated Data */}
          <div className="mb-4 grid grid-cols-2 gap-3 sm:mb-6 sm:gap-4 lg:grid-cols-4">
            <div className="rounded-lg bg-gray-50 p-3 text-center sm:p-4">
              <div className="text-lg font-bold text-gray-900 sm:text-2xl">
                {chartData
                  .reduce((sum, item) => {
                    const total = Object.keys(item)
                      .filter((key) => key !== "day")
                      .reduce((itemSum, key) => {
                        const value = item[key as keyof typeof item];
                        return (
                          itemSum + (typeof value === "number" ? value : 0)
                        );
                      }, 0);
                    return sum + total;
                  }, 0)
                  .toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 sm:text-sm">
                {t("Statistics.aggregated.total_visits")}
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center sm:p-4">
              <div className="text-lg font-bold text-gray-900 sm:text-2xl">
                {chartData.length > 0
                  ? Math.max(
                      ...chartData.map((item) => {
                        const total = Object.keys(item)
                          .filter((key) => key !== "day")
                          .reduce((sum, key) => {
                            const value = item[key as keyof typeof item];
                            return (
                              sum + (typeof value === "number" ? value : 0)
                            );
                          }, 0);
                        return total;
                      }),
                    ).toLocaleString()
                  : "0"}
              </div>
              <div className="text-xs text-gray-600 sm:text-sm">
                {t("Statistics.aggregated.peak_day")}
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center sm:p-4">
              <div className="text-lg font-bold text-gray-900 sm:text-2xl">
                {chartData.length > 0
                  ? Math.round(
                      chartData.reduce((sum, item) => {
                        const total = Object.keys(item)
                          .filter((key) => key !== "day")
                          .reduce((itemSum, key) => {
                            const value = item[key as keyof typeof item];
                            return (
                              itemSum + (typeof value === "number" ? value : 0)
                            );
                          }, 0);
                        return sum + total;
                      }, 0) / chartData.length,
                    ).toLocaleString()
                  : "0"}
              </div>
              <div className="text-xs text-gray-600 sm:text-sm">
                {t("Statistics.aggregated.avg_daily")}
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center sm:p-4">
              <div className="text-lg font-bold text-gray-900 sm:text-2xl">
                {chartData.length}
              </div>
              <div className="text-xs text-gray-600 sm:text-sm">
                {t("Statistics.aggregated.days_tracked")}
              </div>
            </div>
          </div>

          <ResponsiveContainer
            width="100%"
            height={300}
            className="sm:h-[400px]"
          >
            <AreaChart data={chartData}>
              <defs>
                {chartConfig.areas.map((area) => (
                  <linearGradient
                    key={area.key}
                    id={`color${area.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={area.color}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={area.color}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="day"
                stroke="#6B7280"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString(
                    locale === "ms-MY" ? "ms-MY" : "en-GB",
                    {
                      month: "short",
                      day: "numeric",
                    },
                  )
                }
              />
              <YAxis
                stroke="#6B7280"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number, name: string) => {
                  const area = chartConfig.areas.find((a) => a.key === name);
                  return [
                    <span
                      style={{
                        color: area?.color || "#3B82F6",
                        fontWeight: "bold",
                      }}
                    >
                      {area?.label || name}: {value.toLocaleString()}
                    </span>,
                  ];
                }}
                labelFormatter={(label) => (
                  <span style={{ color: "#1F2937", fontWeight: "600" }}>
                    {t("Statistics.chart.date")}:{" "}
                    {new Date(label).toLocaleDateString(
                      locale === "ms-MY" ? "ms-MY" : "en-GB",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                )}
              />
              {chartConfig.areas.map((area) => (
                <Area
                  key={area.key}
                  type="monotone"
                  dataKey={area.key}
                  stackId="1"
                  stroke={area.color}
                  fill={`url(#color${area.key})`}
                  strokeWidth={0}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {chartConfig.areas.map((area) => (
              <div key={area.key} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: area.color }}
                ></div>
                <span className="truncate text-xs text-gray-600 sm:text-sm">
                  {area.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Number of Website Visitors Chart */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4 sm:mb-6">
          <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t("Statistics.visitor_chart.title")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("Statistics.visitor_chart.subtitle")}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
              <span className="text-sm font-medium text-gray-500">
                {t("Statistics.time_range.label")}:
              </span>
              <div className="flex rounded-lg bg-gray-100 p-1">
                {(["7d", "30d", "90d", "1y"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedRange(range)}
                    className={`rounded-md px-2 py-1 text-xs font-medium transition-colors sm:px-3 ${
                      selectedRange === range
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {range === "7d"
                      ? t("Statistics.time_range.7d")
                      : range === "30d"
                        ? t("Statistics.time_range.30d")
                        : range === "90d"
                          ? t("Statistics.time_range.90d")
                          : t("Statistics.time_range.1y")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats with Trend Indicators */}
        <div className="mb-4 grid grid-cols-2 gap-3 sm:mb-6 sm:gap-4 lg:grid-cols-4">
          <div className="rounded-lg bg-gray-50 p-3 text-center sm:p-4">
            <div className="text-lg font-bold text-gray-900 sm:text-2xl">
              {totalVisitors.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 sm:text-sm">
              {t("Statistics.metrics.current_visitors")}
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 text-center sm:p-4">
            <div className="text-lg font-bold text-gray-900 sm:text-2xl">
              {totalUnique.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 sm:text-sm">
              {t("Statistics.metrics.unique_visitors")}
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 text-center sm:p-4">
            <div className="text-lg font-bold text-gray-900 sm:text-2xl">
              {cumulativeVisitors.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 sm:text-sm">
              {t("Statistics.metrics.cumulative")}
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 text-center sm:p-4">
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              {getTrendIcon(comparisonMetrics.trend)}
              <span
                className={`text-base font-bold sm:text-lg ${getTrendColor(comparisonMetrics.trend)}`}
              >
                {comparisonMetrics.change > 0 ? "+" : ""}
                {comparisonMetrics.change}%
              </span>
            </div>
            <div className="text-xs text-gray-600 sm:text-sm">
              {t("Statistics.metrics.vs_previous_week")}
            </div>
          </div>
        </div>

        {filteredData.length > 0 ? (
          <ResponsiveContainer
            width="100%"
            height={300}
            className="sm:h-[400px]"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                stroke="#6B7280"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number, name: string) => [
                  <span style={{ color: "#3B82F6", fontWeight: "bold" }}>
                    {t("Statistics.chart.daily_visitors")}:{" "}
                    {value.toLocaleString()}
                  </span>,
                ]}
                labelFormatter={(label) => (
                  <span style={{ color: "#1F2937", fontWeight: "600" }}>
                    {t("Statistics.chart.date")}:{" "}
                    {new Date(label).toLocaleDateString(
                      locale === "ms-MY" ? "ms-MY" : "en-GB",
                      {
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </span>
                )}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorVisitors)"
                strokeWidth={2}
                dot={{ r: 3, fill: "#3B82F6", strokeWidth: 2, stroke: "white" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-48 items-center justify-center text-gray-500 sm:h-64">
            <div className="text-center">
              <p className="text-sm">
                {t("Statistics.visitor_chart.no_data_range")}
              </p>
              <p className="mt-1 text-xs">
                {t("Statistics.chart.data_source")}:{" "}
                <a
                  href="https://www.tinybird.co/docs/api-reference"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {t("Statistics.chart.tinybird_api")}
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Chart Footer */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>
            {t("Statistics.chart.data_source")}:{" "}
            {visitorData.length > 0 ? (
              <a
                href="https://www.tinybird.co/docs/api-reference"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {t("Statistics.chart.tinybird_api")}
              </a>
            ) : (
              t("Statistics.chart.no_data")
            )}
          </span>
          <span>
            {t("Statistics.chart.showing_points", {
              count: filteredData.length,
            })}
          </span>
        </div>
      </div>

      {/* Most Visited Pages and News */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Most Visited Pages */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("Statistics.pages.title")}
            </h3>
            <span className="text-sm font-medium text-gray-500">
              {t("Statistics.chart.visitors").toUpperCase()}
            </span>
          </div>
          {processedPageData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={300}
              className="sm:h-[350px]"
            >
              <BarChart data={processedPageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  fontSize={10}
                  stroke="#6B7280"
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  fontSize={10}
                  stroke="#6B7280"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    padding: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number, name: string) => [
                    <span style={{ color: "#3B82F6", fontWeight: "bold" }}>
                      {t("Statistics.chart.visitors")}: {value.toLocaleString()}
                    </span>,
                    <span style={{ color: "#6B7280" }}>
                      {name === "hits" ? t("Statistics.chart.visitors") : name}
                    </span>,
                  ]}
                  labelFormatter={(label) => {
                    const fullName =
                      processedPageData.find((item) => item.name === label)
                        ?.fullName || label;
                    return (
                      <span style={{ color: "#1F2937", fontWeight: "600" }}>
                        {fullName}
                      </span>
                    );
                  }}
                />
                <Bar
                  dataKey="hits"
                  fill="#EBF4FF"
                  stroke="#3B82F6"
                  strokeWidth={1}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={30}
                >
                  {processedPageData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="#EBF4FF"
                      stroke="#3B82F6"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-48 items-center justify-center text-gray-500 sm:h-64">
              <p className="text-sm">{t("Statistics.pages.no_data")}</p>
            </div>
          )}
          <div className="mt-4 space-y-2">
            {processedPageData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-gray-900">{item.name}</span>
                </div>
                <span className="text-gray-600">
                  {item.hits.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Most Visited News */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("Statistics.news.title")}
            </h3>
            <span className="text-sm font-medium text-gray-500">
              {t("Statistics.news.hits").toUpperCase()}
            </span>
          </div>
          {processedNewsData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={300}
              className="sm:h-[350px]"
            >
              <BarChart data={processedNewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  fontSize={10}
                  stroke="#6B7280"
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  fontSize={10}
                  stroke="#6B7280"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    padding: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number, name: string) => [
                    <span style={{ color: "#10B981", fontWeight: "bold" }}>
                      {t("Statistics.news.hits")}: {value.toLocaleString()}
                    </span>,
                  ]}
                  labelFormatter={(label) => {
                    const fullName =
                      processedNewsData.find((item) => item.name === label)
                        ?.fullName || label;
                    return (
                      <span style={{ color: "#1F2937", fontWeight: "600" }}>
                        {fullName}
                      </span>
                    );
                  }}
                />
                <Bar
                  dataKey="hits"
                  fill="#D1FAE5"
                  stroke="#10B981"
                  strokeWidth={1}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={30}
                >
                  {processedNewsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="#D1FAE5"
                      stroke="#10B981"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-48 items-center justify-center text-gray-500 sm:h-64">
              <p className="text-sm">{t("Statistics.news.no_data")}</p>
            </div>
          )}
          {/* News Legend with Links */}
          {processedNewsData.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium text-gray-700">
                {t("Statistics.news.legend_title")}:
              </h4>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {processedNewsData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <a
                        href={`/${locale === "ms-MY" ? "" : "en-GB/"}siaran/${item.fullName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer font-medium text-gray-900 hover:text-blue-600 hover:underline"
                        title={item.fullName}
                      >
                        {item.name}
                      </a>
                    </div>
                    <span className="text-gray-600">
                      {item.hits.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Analytics Dashboard Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Traffic Sources */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("Statistics.traffic_sources.title")}
            </h3>
            <span className="text-sm font-medium text-gray-500">
              {t("Statistics.chart.visitors").toUpperCase()}
            </span>
          </div>
          {processedReferrerData.length > 0 ? (
            <div className="relative">
              <ResponsiveContainer
                width="100%"
                height={250}
                className="sm:h-[300px]"
              >
                <PieChart>
                  <Pie
                    data={processedReferrerData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="percentage"
                    onMouseEnter={(data) => setHoveredReferrer(data.name)}
                    onMouseLeave={() => setHoveredReferrer(null)}
                  >
                    {processedReferrerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center text overlay */}
              {hoveredReferrer && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="max-w-[80px] text-center">
                    <p className="mb-1 text-sm font-semibold leading-tight text-gray-900">
                      {
                        processedReferrerData.find(
                          (item) => item.name === hoveredReferrer,
                        )?.name
                      }
                    </p>
                    <p className="text-xs text-gray-600">
                      {processedReferrerData
                        .find((item) => item.name === hoveredReferrer)
                        ?.percentage.toFixed(1)}
                      %
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center text-gray-500 sm:h-64">
              <p className="text-sm">
                {t("Statistics.traffic_sources.no_data")}
              </p>
            </div>
          )}
          <div className="mt-4 space-y-2">
            {processedReferrerData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-4 w-4 items-center justify-center">
                    {item.icon}
                  </div>
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-gray-900">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600">
                    {item.visits.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visitor Locations */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("Statistics.locations.title")}
            </h3>
            <span className="text-sm font-medium text-gray-500">
              {t("Statistics.chart.visitors").toUpperCase()}
            </span>
          </div>
          {processedCountryData.length > 0 ? (
            <>
              <ResponsiveContainer
                width="100%"
                height={300}
                className="sm:h-[350px]"
              >
                <BarChart
                  data={processedCountryData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={10}
                    stroke="#6B7280"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                    fontSize={10}
                    stroke="#6B7280"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #3B82F6",
                      borderRadius: "8px",
                      padding: "12px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value: number, name: string) => [
                      <span style={{ color: "#3B82F6", fontWeight: "bold" }}>
                        {t("Statistics.chart.total")}: {value.toLocaleString()}
                      </span>,
                    ]}
                    labelFormatter={(label) => (
                      <span style={{ color: "#1F2937", fontWeight: "600" }}>
                        {label}
                      </span>
                    )}
                  />
                  <Bar
                    dataKey="visits"
                    fill="#EBF4FF"
                    stroke="#3B82F6"
                    strokeWidth={1}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={30}
                  >
                    {processedCountryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill="#EBF4FF"
                        stroke="#3B82F6"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {processedCountryData.slice(0, 8).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.flag}</span>
                      <span className="font-medium text-gray-900">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-600">
                        {item.visits.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({item.percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-48 items-center justify-center text-gray-500 sm:h-64">
              <p className="text-sm">{t("Statistics.locations.no_data")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Browser Usage and Device Types */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Browser Usage */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("Statistics.browsers.title")}
            </h3>
            <span className="text-sm font-medium text-gray-500">
              {t("Statistics.chart.users").toUpperCase()}
            </span>
          </div>
          {processedBrowserData.length > 0 ? (
            <div className="relative">
              <ResponsiveContainer
                width="100%"
                height={250}
                className="sm:h-[300px]"
              >
                <PieChart>
                  <Pie
                    data={processedBrowserData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="percentage"
                    onMouseEnter={(data) => setHoveredBrowser(data.name)}
                    onMouseLeave={() => setHoveredBrowser(null)}
                  >
                    {processedBrowserData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center text overlay */}
              {hoveredBrowser && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="max-w-[80px] text-center">
                    <p className="mb-1 text-sm font-semibold leading-tight text-gray-900">
                      {
                        processedBrowserData.find(
                          (item) => item.name === hoveredBrowser,
                        )?.name
                      }
                    </p>
                    <p className="text-xs text-gray-600">
                      {processedBrowserData
                        .find((item) => item.name === hoveredBrowser)
                        ?.percentage.toFixed(1)}
                      %
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center text-gray-500 sm:h-64">
              <p className="text-sm">{t("Statistics.browsers.no_data")}</p>
            </div>
          )}
          <div className="mt-4 space-y-2">
            {processedBrowserData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-4 w-4 items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-900">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600">
                    {item.users.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Types */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("Statistics.devices.title")}
            </h3>
            <span className="text-sm font-medium text-gray-500">
              {t("Statistics.chart.users").toUpperCase()}
            </span>
          </div>
          {processedDeviceData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={300}
              className="sm:h-[350px]"
            >
              <BarChart data={processedDeviceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  fontSize={10}
                  stroke="#6B7280"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  fontSize={10}
                  stroke="#6B7280"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    padding: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number, name: string) => [
                    <span style={{ color: "#3B82F6", fontWeight: "bold" }}>
                      {t("Statistics.chart.users")}: {value.toLocaleString()}
                    </span>,
                  ]}
                  labelFormatter={(label) => (
                    <span style={{ color: "#1F2937", fontWeight: "600" }}>
                      {label}
                    </span>
                  )}
                />
                <Bar
                  dataKey="users"
                  fill="#EBF4FF"
                  stroke="#3B82F6"
                  strokeWidth={1}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={30}
                >
                  {processedDeviceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="#EBF4FF"
                      stroke="#3B82F6"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-48 items-center justify-center text-gray-500 sm:h-64">
              <p className="text-sm">{t("Statistics.devices.no_data")}</p>
            </div>
          )}
          <div className="mt-4 space-y-2">
            {processedDeviceData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-4 w-4 items-center justify-center">
                    {item.icon}
                  </div>
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-gray-900">{item.name}</span>
                </div>
                <span className="text-gray-600">
                  {item.users.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCharts;
