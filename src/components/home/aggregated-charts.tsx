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
} from "recharts";
import Section from "../layout/section";
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

interface AggregatedChartsProps {
  aggregatedData: TinybirdAggregatedData[];
  locale: string;
}

const AggregatedCharts: FC<AggregatedChartsProps> = ({ aggregatedData, locale }) => {
  const t = useTranslations();
  const [selectedDataType, setSelectedDataType] = useState<'referrers' | 'locations' | 'browsers' | 'devices'>('referrers');
  const [selectedRange, setSelectedRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const getDaysAgo = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  };

  const getChartData = () => {
    const daysAgo = getDaysAgo(
      selectedRange === '7d' ? 7 : 
      selectedRange === '30d' ? 30 : 
      selectedRange === '90d' ? 90 : 365
    );

    return aggregatedData
      .filter(item => item.day >= daysAgo)
      .map(item => ({
        day: item.day,
        ...(selectedDataType === 'referrers' ? {
          direct_visits: item.direct_visits,
          google_visits: item.google_visits,
          bing_visits: item.bing_visits,
          facebook_visits: item.facebook_visits,
          linkedin_visits: item.linkedin_visits,
          internal_visits: item.internal_visits,
          other_referrals: item.other_referrals,
        } : selectedDataType === 'locations' ? {
          malaysia_visits: item.malaysia_visits,
          singapore_visits: item.singapore_visits,
          us_visits: item.us_visits,
          india_visits: item.india_visits,
          china_visits: item.china_visits,
          other_country_visits: item.other_country_visits,
        } : selectedDataType === 'browsers' ? {
          chrome_visits: item.chrome_visits,
          safari_visits: item.safari_visits,
          firefox_visits: item.firefox_visits,
          edge_visits: item.edge_visits,
          other_browser_visits: item.other_browser_visits,
        } : {
          mobile_visits: item.mobile_visits,
          tablet_visits: item.tablet_visits,
          desktop_visits: item.desktop_visits,
        })
      }));
  };

  const getChartConfig = () => {
    switch (selectedDataType) {
      case 'referrers':
        return {
          title: t("Statistics.aggregated.referrers_title"),
          areas: [
            { key: 'direct_visits', color: '#3B82F6', label: t("Statistics.traffic_sources.direct") },
            { key: 'google_visits', color: '#10B981', label: t("Statistics.traffic_sources.google") },
            { key: 'bing_visits', color: '#F59E0B', label: t("Statistics.traffic_sources.bing") },
            { key: 'facebook_visits', color: '#EF4444', label: t("Statistics.traffic_sources.facebook") },
            { key: 'linkedin_visits', color: '#8B5CF6', label: t("Statistics.traffic_sources.linkedin") },
            { key: 'internal_visits', color: '#6B7280', label: t("Statistics.traffic_sources.internal") },
            { key: 'other_referrals', color: '#9CA3AF', label: t("Statistics.traffic_sources.other") },
          ]
        };
      case 'locations':
        return {
          title: t("Statistics.aggregated.locations_title"),
          areas: [
            { key: 'malaysia_visits', color: '#3B82F6', label: 'Malaysia' },
            { key: 'singapore_visits', color: '#EF4444', label: 'Singapore' },
            { key: 'us_visits', color: '#10B981', label: 'United States' },
            { key: 'india_visits', color: '#F59E0B', label: 'India' },
            { key: 'china_visits', color: '#EF4444', label: 'China' },
            { key: 'other_country_visits', color: '#6B7280', label: t("Statistics.locations.other") },
          ]
        };
      case 'browsers':
        return {
          title: t("Statistics.aggregated.browsers_title"),
          areas: [
            { key: 'chrome_visits', color: '#4285F4', label: 'Chrome' },
            { key: 'safari_visits', color: '#ad2117', label: 'Safari' },
            { key: 'firefox_visits', color: '#FF7139', label: 'Firefox' },
            { key: 'edge_visits', color: '#fcb205', label: 'Edge' },
            { key: 'other_browser_visits', color: '#6B7280', label: t("Statistics.browsers.others") },
          ]
        };
      case 'devices':
        return {
          title: t("Statistics.aggregated.devices_title"),
          areas: [
            { key: 'mobile_visits', color: '#10B981', label: t("Statistics.devices.mobile") },
            { key: 'tablet_visits', color: '#F59E0B', label: t("Statistics.devices.tablet") },
            { key: 'desktop_visits', color: '#3B82F6', label: t("Statistics.devices.desktop") },
          ]
        };
      default:
        return { title: '', areas: [] };
    }
  };

  const chartConfig = getChartConfig();
  const chartData = getChartData();

  if (aggregatedData.length === 0) {
    return (
      <Section>
        <div className="py-8 sm:py-12 lg:py-[84px] border-washed-100 xl:grid xl:grid-cols-12 xl:gap-6 xl:border-x">
          <div className="xl:col-span-10 xl:col-start-2 space-y-10 sm:space-y-12 px-4 sm:px-6 lg:px-0">
            <h2 className="text-balance font-poppins text-hsm font-semibold">
              Page Statistics
            </h2>
            <div className="text-center py-8">
              <p className="text-gray-500">{t("Statistics.chart.no_data")}</p>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="py-8 sm:py-12 lg:py-[84px] border-washed-100 xl:grid xl:grid-cols-12 xl:gap-6 xl:border-x">
        <div className="xl:col-span-10 xl:col-start-2 space-y-10 sm:space-y-12 px-4 sm:px-6 lg:px-0">
          <h2 className="text-balance font-poppins text-hsm font-semibold">
            Page Statistics
          </h2>

          <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{chartConfig.title}</h3>
                  <p className="text-sm text-gray-600">{t("Statistics.visitor_chart.subtitle")}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  {/* Data Type Dropdown */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">{t("Statistics.aggregated.data_type")}:</span>
                    <select
                      value={selectedDataType}
                      onChange={(e) => setSelectedDataType(e.target.value as any)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="referrers">{t("Statistics.aggregated.referrers")}</option>
                      <option value="locations">{t("Statistics.aggregated.locations")}</option>
                      <option value="browsers">{t("Statistics.aggregated.browsers")}</option>
                      <option value="devices">{t("Statistics.aggregated.devices")}</option>
                    </select>
                  </div>
                  {/* Time Range Filter */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">{t("Statistics.time_range.label")}:</span>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      {(['7d', '30d', '90d', '1y'] as const).map((range) => (
                        <button
                          key={range}
                          onClick={() => setSelectedRange(range)}
                          className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                            selectedRange === range
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {range === '7d' ? t("Statistics.time_range.7d") : 
                           range === '30d' ? t("Statistics.time_range.30d") : 
                           range === '90d' ? t("Statistics.time_range.90d") : t("Statistics.time_range.1y")}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Stats for Aggregated Data */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-gray-900">
                  {chartData.reduce((sum, item) => {
                    const total = Object.keys(item).filter(key => key !== 'day').reduce((itemSum, key) => {
                      const value = item[key as keyof typeof item];
                      return itemSum + (typeof value === 'number' ? value : 0);
                    }, 0);
                    return sum + total;
                  }, 0).toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{t("Statistics.aggregated.total_visits")}</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-gray-900">
                  {chartData.length > 0 ? Math.max(...chartData.map(item => {
                    const total = Object.keys(item).filter(key => key !== 'day').reduce((sum, key) => {
                      const value = item[key as keyof typeof item];
                      return sum + (typeof value === 'number' ? value : 0);
                    }, 0);
                    return total;
                  })).toLocaleString() : '0'}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{t("Statistics.aggregated.peak_day")}</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-gray-900">
                  {chartData.length > 0 ? Math.round(chartData.reduce((sum, item) => {
                    const total = Object.keys(item).filter(key => key !== 'day').reduce((itemSum, key) => {
                      const value = item[key as keyof typeof item];
                      return itemSum + (typeof value === 'number' ? value : 0);
                    }, 0);
                    return sum + total;
                  }, 0) / chartData.length).toLocaleString() : '0'}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{t("Statistics.aggregated.avg_daily")}</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-gray-900">{chartData.length}</div>
                <div className="text-xs sm:text-sm text-gray-600">{t("Statistics.aggregated.days_tracked")}</div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
              <AreaChart data={chartData}>
                <defs>
                  {chartConfig.areas.map((area) => (
                    <linearGradient key={area.key} id={`color${area.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={area.color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={area.color} stopOpacity={0.1} />
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
                  tickFormatter={(value) => new Date(value).toLocaleDateString(locale === 'ms-MY' ? 'ms-MY' : 'en-GB', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
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
                    const area = chartConfig.areas.find(a => a.key === name);
                    return [
                      <span style={{ color: area?.color || "#3B82F6", fontWeight: "bold" }}>
                        {area?.label || name}: {value.toLocaleString()}
                      </span>
                    ];
                  }}
                  labelFormatter={(label) => (
                    <span style={{ color: "#1F2937", fontWeight: "600" }}>
                      {t("Statistics.chart.date")}: {new Date(label).toLocaleDateString(locale === 'ms-MY' ? 'ms-MY' : 'en-GB', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
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
              View More Statistics
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AggregatedCharts; 