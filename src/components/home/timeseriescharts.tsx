"use client";

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
} from "recharts";
import { format } from "date-fns";
import Section from "../layout/section";
import { Button } from "../ui/button";

interface VisitorsData {
  day: string;
  total_visitors: number;
}

interface Props {
  data: VisitorsData[];
}

export default function TimeSeriesChart({ data }: Props) {
  const latest = data[data.length - 1];
  const dailyVisitors = latest?.total_visitors || 0;
  const cumulativeVisitors = data.reduce((sum, d) => sum + d.total_visitors, 0);

  const formattedData = data.reduce(
    (acc, cur, index) => {
      const dateFormatted = format(new Date(cur.day), "dd MMM yyyy");
      const prevTotal = index === 0 ? 0 : acc[index - 1].cumulative_visitors;
      acc.push({
        ...cur,
        day: dateFormatted,
        cumulative_visitors: cur.total_visitors + prevTotal,
      });
      return acc;
    },
    [] as Array<VisitorsData & { cumulative_visitors: number }>,
  );

  return (
    <Section>
      <div className="border-washed-100 py-8 sm:py-12 lg:py-[84px] xl:grid xl:grid-cols-12 xl:gap-6 xl:border-x">
        <div className="space-y-10 px-4 sm:space-y-12 sm:px-6 lg:px-0 xl:col-span-10 xl:col-start-2">
          <h2 className="text-balance font-poppins text-hsm font-semibold">
            Page Statistics
          </h2>

          <div className="w-full">
            <h2 className="mb-4 text-base font-semibold sm:text-lg">
              No. of Visitors
            </h2>

            <div className="mb-4 flex flex-col items-start justify-between gap-4 px-1.5 sm:flex-row sm:items-end sm:px-2">
              <div className="mb-4 flex w-full justify-between gap-4 px-2">
                {/* Daily Visitors - aligned left */}
                <div className="flex flex-col text-left">
                  <span className="text-black/70 text-xs sm:text-sm">
                    Daily
                  </span>
                  <span className="text-black text-xl font-bold sm:text-2xl">
                    +{dailyVisitors}
                  </span>
                </div>

                {/* Cumulative Visitors - aligned right */}
                <div className="flex flex-col text-right">
                  <span className="text-black/70 text-xs sm:text-sm">
                    Cumulative
                  </span>
                  <span className="text-black text-xl font-bold sm:text-2xl">
                    {cumulativeVisitors}
                  </span>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={formattedData}>
                <defs>
                  <linearGradient
                    id="colorVisitors"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  tickFormatter={(d) => format(new Date(d), "dd MMM yyyy")}
                />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #3B82F6",
                    borderRadius: "8px",
                    padding: "12px",
                  }}
                  labelFormatter={(label) =>
                    `Date: ${format(new Date(label), "dd MMM yyyy")}`
                  }
                  formatter={(value: number, name: string) => {
                    const labelMap: Record<string, string> = {
                      total_visitors: "Daily Visitors",
                      cumulative_visitors: "Cumulative Visitors",
                    };
                    return [`${value}`, labelMap[name] || name];
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total_visitors"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorVisitors)"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                console.log("clicked");
              }}
            >
              View More Statistics
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
