"use client";

import { FC, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import ArrowUp from "@/icons/arrow-up";
import ArrowDown from "@/icons/arrow-down";
import Minus from "@/icons/minus";
import Globe from "@/icons/globe";
import UserGroup from "@/icons/user-group";
import CheckCircle from "@/icons/check-circle";
import Download from "@/icons/download";
import {
  LineChart,
  Line,
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

interface PageStatisticsCardProps {}

const PageStatisticsCard: FC<PageStatisticsCardProps> = () => {
  const t = useTranslations();
  const [viewType, setViewType] = useState<'monthly' | 'cumulative'>('monthly');
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '1y'>('1y');

  // Mock data for page statistics - replace with real data from your analytics
  const pageStats = {
    visitors: {
      title: "Page Visitors",
      metrics: [
        { label: "Total Visitors", value: "45,234", change: "+12%" },
        { label: "Unique Visitors", value: "32,156", change: "+8%" },
        { label: "Page Views", value: "67,891", change: "+15%" },
        { label: "Avg. Session Duration", value: "4m 32s", change: "+5%" },
      ]
    },
    referrers: {
      title: "Top Referrers",
      metrics: [
        { label: "Direct Traffic", value: "45%", change: "+3%" },
        { label: "Google Search", value: "32%", change: "+8%" },
        { label: "Social Media", value: "15%", change: "+12%" },
        { label: "Other Sources", value: "8%", change: "-2%" },
      ]
    },
    locations: {
      title: "Visitor Locations",
      metrics: [
        { label: "Kuala Lumpur", value: "28%", change: "+5%" },
        { label: "Selangor", value: "22%", change: "+3%" },
        { label: "Johor", value: "15%", change: "+7%" },
        { label: "Other States", value: "35%", change: "+2%" },
      ]
    },
    browsers: {
      title: "Browser Usage",
      metrics: [
        { label: "Chrome", value: "52%", change: "+2%" },
        { label: "Safari", value: "28%", change: "+5%" },
        { label: "Firefox", value: "12%", change: "-1%" },
        { label: "Edge", value: "8%", change: "+3%" },
      ]
    }
  };

  // Mock data for charts - 1 year of data
  const visitorTrendData = [
    { date: "Jan 2024", visitors: 45000, unique: 38000, cumulative: 45000 },
    { date: "Feb 2024", visitors: 52000, unique: 44000, cumulative: 97000 },
    { date: "Mar 2024", visitors: 48000, unique: 41000, cumulative: 145000 },
    { date: "Apr 2024", visitors: 55000, unique: 47000, cumulative: 200000 },
    { date: "May 2024", visitors: 58000, unique: 50000, cumulative: 258000 },
    { date: "Jun 2024", visitors: 62000, unique: 53000, cumulative: 320000 },
    { date: "Jul 2024", visitors: 59000, unique: 51000, cumulative: 379000 },
    { date: "Aug 2024", visitors: 65000, unique: 56000, cumulative: 444000 },
    { date: "Sep 2024", visitors: 68000, unique: 59000, cumulative: 512000 },
    { date: "Oct 2024", visitors: 72000, unique: 63000, cumulative: 584000 },
    { date: "Nov 2024", visitors: 75000, unique: 66000, cumulative: 659000 },
    { date: "Dec 2024", visitors: 78000, unique: 69000, cumulative: 737000 },
    { date: "Jan 2025", visitors: 82000, unique: 72000, cumulative: 819000 },
  ];

  const referrerData = [
    { name: "Direct Traffic", value: 45, color: "#3B82F6" },
    { name: "Google Search", value: 32, color: "#10B981" },
    { name: "Social Media", value: 15, color: "#F59E0B" },
    { name: "Other Sources", value: 8, color: "#EF4444" },
  ];

  const locationData = [
    { name: "Kuala Lumpur", visitors: 12650, color: "#3B82F6" },
    { name: "Selangor", visitors: 9950, color: "#10B981" },
    { name: "Johor", visitors: 6750, color: "#F59E0B" },
    { name: "Penang", visitors: 5200, color: "#8B5CF6" },
    { name: "Perak", visitors: 3800, color: "#EF4444" },
    { name: "Other States", visitors: 15850, color: "#6B7280" },
  ];

  const browserData = [
    { name: "Chrome", users: 23500, color: "#4285F4" },
    { name: "Safari", users: 12600, color: "#000000" },
    { name: "Firefox", users: 5400, color: "#FF7139" },
    { name: "Edge", users: 3600, color: "#0078D4" },
    { name: "Others", users: 1134, color: "#6B7280" },
  ];

  // Filter data based on time range
  const filteredVisitorData = useMemo(() => {
    const monthsMap = { '3m': 3, '6m': 6, '1y': 12 };
    const monthsToShow = monthsMap[timeRange];
    return visitorTrendData.slice(-monthsToShow);
  }, [timeRange]);

  // Get latest data for summary
  const latestData = filteredVisitorData[filteredVisitorData.length - 1];
  const totalVisitors = latestData?.visitors || 0;
  const totalUnique = latestData?.unique || 0;
  const cumulativeVisitors = latestData?.cumulative || 0;

  const accessibilityStats = {
    title: "Accessibility Score (WCAG)",
    metrics: [
      { label: "WCAG 2.1 AA Compliance", value: "98%", change: "+2%", status: "pass" },
      { label: "Color Contrast", value: "100%", change: "0%", status: "pass" },
      { label: "Keyboard Navigation", value: "95%", change: "+5%", status: "pass" },
      { label: "Screen Reader", value: "92%", change: "+8%", status: "pass" },
    ]
  };

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
    <div className="space-y-8">
      {/* Visitor Trend Chart */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Number of Website Visitors</h3>
              <p className="text-sm text-gray-600">Number of visitors to the Ministry of Digital website</p>
              <p className="text-xs text-gray-500">as of Jan 2025</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">View:</label>
              <select 
                value={viewType} 
                onChange={(e) => setViewType(e.target.value as 'monthly' | 'cumulative')}
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="monthly">Monthly Visitors</option>
                <option value="cumulative">Cumulative Visitors</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Time Range:</label>
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value as '3m' | '6m' | '1y')}
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="3m">3 Months</option>
                <option value="6m">6 Months</option>
                <option value="1y">1 Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{totalVisitors.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Monthly Visitors</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{totalUnique.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Unique Visitors</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{cumulativeVisitors.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Cumulative</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={filteredVisitorData}>
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
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
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
              labelFormatter={(label) => `Date: ${label}`}
              formatter={(value: number, name: string) => {
                const labelMap: Record<string, string> = {
                  visitors: "Monthly Visitors",
                  unique: "Unique Visitors",
                  cumulative: "Cumulative Visitors",
                };
                return [`${value.toLocaleString()}`, labelMap[name] || name];
              }}
            />
            <Area
              type="monotone"
              dataKey={viewType === 'monthly' ? 'visitors' : 'cumulative'}
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorVisitors)"
              strokeWidth={2}
              dot={{ r: 4, fill: "#3B82F6", strokeWidth: 2, stroke: "white" }}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Chart Footer */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>Data source: Google Analytics</span>
          <div className="flex items-center gap-4">
            <span>1,234 views</span>
            <span>45 downloads</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Referrer Pie Chart */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={referrerData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {referrerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #3B82F6",
                  borderRadius: "8px",
                  padding: "12px",
                }}
                formatter={(value: number) => [`${value}%`, "Traffic"]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-wrap gap-2">
            {referrerData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div 
                  className="h-3 w-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location Bar Chart */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Visitor Locations</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #3B82F6",
                  borderRadius: "8px",
                  padding: "12px",
                }}
                formatter={(value: number) => [value.toLocaleString(), "Visitors"]}
              />
              <Bar dataKey="visitors" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Browser Usage Chart */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Browser Usage</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={browserData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #3B82F6",
                borderRadius: "8px",
                padding: "12px",
              }}
              formatter={(value: number) => [value.toLocaleString(), "Users"]}
            />
            <Bar dataKey="users" fill="#3B82F6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Accessibility Score */}
      <div>
        <StatCard 
          title={accessibilityStats.title} 
          metrics={accessibilityStats.metrics} 
          showStatus={true}
        />
      </div>

      {/* Additional Analytics Info */}
      <div className="rounded-lg bg-gray-50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Analytics Source</span>
        </div>
        <p className="text-xs text-gray-600">
          Data is collected using Google Analytics and accessibility testing tools. 
          WCAG compliance is measured using automated and manual testing methods.
        </p>
      </div>
    </div>
  );
};

export default PageStatisticsCard; 