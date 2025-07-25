import React, { Suspense } from "react";
import StatistikComponent from "./page-component";
import { FSP, inject, metagen, MetagenProps } from "@/lib/decorator";
import { getStatisticsData } from "@/lib/utils/statistics";

const Statistik: FSP = async ({ locale }) => {
  // Fetch statistics data from external source
  // You can change the source parameter to: 'api', 'database', 'file', or 'third-party'
  const data = await getStatisticsData('api');
  
  return (
    <Suspense>
      <StatistikComponent
        data={data}
        locale={locale}
      />
    </Suspense>
  );
};

export const generateMetadata = async (params: MetagenProps) => {
  return metagen(params, "Header", { title: "statistics" });
};

export default inject(Statistik); 