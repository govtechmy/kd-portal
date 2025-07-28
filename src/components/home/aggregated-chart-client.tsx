"use client";

import { FC } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Button } from "../ui/button";

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

interface AggregatedChartClientProps {
  aggregatedData: TinybirdAggregatedData[];
  locale: string;
  translations: {
    referrers_title: string;
    subtitle: string;
    direct: string;
    google: string;
    bing: string;
    facebook: string;
    linkedin: string;
    internal: string;
    other: string;
    total_visits: string;
    peak_day: string;
    avg_daily: string;
    days_tracked: string;
    date: string;
    view_more: string;
  };
}

const AggregatedChartClient: FC<AggregatedChartClientProps> = ({
  aggregatedData,
  locale,
  translations,
}) => {
  const getDaysAgo = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split("T")[0];
  };

  const getChartData = () => {
    if (!aggregatedData || aggregatedData.length === 0) {
      return [];
    }

    // Default to 30 days for server component
    const daysAgo = getDaysAgo(30);

    return aggregatedData
      .filter((item) => item.day >= daysAgo)
      .map((item) => ({
        day: item.day,
        // Default to referrers data for server component
        direct_visits: item.direct_visits,
        google_visits: item.google_visits,
        bing_visits: item.bing_visits,
        facebook_visits: item.facebook_visits,
        linkedin_visits: item.linkedin_visits,
        internal_visits: item.internal_visits,
        other_referrals: item.other_referrals,
      }));
  };

  const getChartConfig = () => {
    return {
      title: translations.referrers_title,
      areas: [
        {
          key: "direct_visits",
          color: "#3B82F6",
          label: translations.direct,
        },
        {
          key: "google_visits",
          color: "#10B981",
          label: translations.google,
        },
        {
          key: "bing_visits",
          color: "#F59E0B",
          label: translations.bing,
        },
        {
          key: "facebook_visits",
          color: "#EF4444",
          label: translations.facebook,
        },
        {
          key: "linkedin_visits",
          color: "#8B5CF6",
          label: translations.linkedin,
        },
        {
          key: "internal_visits",
          color: "#6B7280",
          label: translations.internal,
        },
        {
          key: "other_referrals",
          color: "#9CA3AF",
          label: translations.other,
        },
      ],
    };
  };

  const chartConfig = getChartConfig();
  const chartData = getChartData();

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4 sm:mb-6">
          <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {chartConfig.title}
              </h3>
              <p className="text-sm text-gray-600">
                {translations.subtitle}
              </p>
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
              {translations.total_visits}
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
              {translations.peak_day}
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
                            itemSum +
                            (typeof value === "number" ? value : 0)
                          );
                        }, 0);
                      return sum + total;
                    }, 0) / chartData.length,
                  ).toLocaleString()
                : "0"}
            </div>
            <div className="text-xs text-gray-600 sm:text-sm">
              {translations.avg_daily}
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 text-center sm:p-4">
            <div className="text-lg font-bold text-gray-900 sm:text-2xl">
              {chartData.length}
            </div>
            <div className="text-xs text-gray-600 sm:text-sm">
              {translations.days_tracked}
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
                  {translations.date}:{" "}
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
      </div>

      <div className="flex justify-center">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            window.location.href = `/${locale}/statistik`;
          }}
        >
          {translations.view_more}
        </Button>
      </div>
    </>
  );
};

export default AggregatedChartClient; 