import HeroPattern from "@/components/layout/hero-pattern";
import { useTranslations } from "next-intl";
import React from "react";
import StaffDirectory from "@/lib/resources/directory_kd.json";
import { unstable_setRequestLocale } from "next-intl/server";
import DataTable from "@/components/ui/data-table";

export const dynamic = "force-static";

export default function Page({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();
  const data = StaffDirectory;

  const column = [
    {
      header: "Nama",
      accessorKey: "nama",
      meta: {
        type: "text",
        editable: false,
        cellClass: "whitespace-nowrap",
      },
    },
    {
      header: "Gred",
      accessorKey: "gred",
      meta: {
        type: "text",
        editable: false,
        enableReadMore: true,
        maxChar: 10,
      },
    },
    {
      header: "Bahagian",
      accessorKey: "bhg",
      meta: {
        type: "text",
        editable: false,
        cellClass: "whitespace-nowrap",
        enableReadMore: true,
        maxChar: 18,
      },
    },
    {
      header: "Jawatan",
      accessorKey: "jawatan",
      meta: {
        type: "text",
        editable: false,
        cellClass: "whitespace-nowrap",
      },
    },
    {
      header: "No Telefon",
      accessorKey: "telefon",
      meta: {
        type: "text",
        editable: false,
        cellClass: "whitespace-nowrap",
      },
    },
    {
      header: "Emel (@digital.gov.my)",
      accessorKey: "emel",
      size: 100,
      meta: {
        type: "text",
        editable: false,
        headerClass: "whitespace-nowrap",
      },
    },
  ];

  return (
    <main className="divide-y-washed-100 divide-y">
      <section className="relative">
        <div className="absolute -z-10 flex h-full w-full justify-center overflow-hidden">
          <HeroPattern className="absolute -top-[83.33%]" />
        </div>
        <h1 className="py-16 text-center font-poppins text-hmd font-semibold">
          {t("Directory.header")}
        </h1>

        <h1 className="text-center font-poppins text-hmd font-semibold">
          {t("Directory.header")}
        </h1>
      </section>

      <section className="container flex min-h-screen w-full border-x border-x-washed-100 px-6 py-12">
        <DataTable
          className="w-full border-0"
          columns={column}
          data={data}
          resizeable={false}
          paginate={{
            pageIndex: 0,
            pageSize: 20,
          }}
        />
      </section>
    </>
  );
}
