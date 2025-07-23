"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import React from "react";
import Section from "../layout/section";
import { Button } from "../ui/button";
// Custom tooltip for better formatting
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const date = new Date(label);
    const formattedDate = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const value = payload[0].value;
    return (
      <div className="rounded-lg bg-white/95 p-3 text-sm shadow">
        <div className="mb-1 text-dim-500">{formattedDate}</div>
        <div className="text-black font-semibold">
          Visitors: <span className="font-bold">{value.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
}

function formatNumber(n: number) {
  return n.toLocaleString();
}

export default function TimeSeriesCharts({
  data,
}: {
  data: { day: string; total_visitors: number }[];
}) {
  // Calculate stats
  const cumulative = data.reduce((sum, d) => sum + d.total_visitors, 0);
  const last = data.length > 0 ? data[data.length - 1].total_visitors : 0;
  const prev = data.length > 1 ? data[data.length - 2].total_visitors : 0;
  const daily = last - prev;

  return (
    <Section>
      <div className="grid-cols-12 gap-6 border-washed-100 py-12 lg:py-[84px] xl:grid xl:border-x">
        <div className="col-span-10 col-start-2 space-y-12">
          <h2 className="text-balance font-poppins text-hsm font-semibold">
            {/* {t("title")} */} Page Statistics
          </h2>
          <div className="mb-2 flex items-end justify-between">
            <div>
              <div className="text-base font-semibold">Visitors Per Day</div>
              <div className="mt-1 flex gap-6">
                <div className="text-xs text-dim-500">Daily</div>
                <div className="text-xs text-dim-500">Cumulative</div>
              </div>
              <div className="flex gap-6">
                <div className="text-black text-2xl font-bold">
                  +{formatNumber(daily)}
                </div>
                <div className="text-black text-2xl font-bold">
                  {formatNumber(cumulative)}
                </div>
              </div>
            </div>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="day"
                  tickFormatter={(d) => {
                    const date = new Date(d);
                    return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
                  }}
                  tick={{ fontSize: 12 }}
                  minTickGap={20}
                  angle={-30}
                  textAnchor="end"
                  interval="preserveStartEnd"
                />
                <YAxis tickFormatter={formatNumber} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="total_visitors"
                  stroke="#2563EB"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center">
            {" "}
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                console.log("clicked");
              }}
            >
              View More Statistics
            </Button>{" "}
          </div>
        </div>
      </div>
    </Section>
  );
}
