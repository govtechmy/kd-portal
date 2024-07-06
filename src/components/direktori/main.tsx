"use client";

import { FC, useState } from "react";
import DataTable from "@/components/ui/data-table";
import Search from "@/components/ui/search";
import StaffDirectory from "@/lib/resources/directory_kd.json";
import HeroPattern from "@/components/layout/hero-pattern";
import { useTranslations } from "next-intl";

interface StaffDirectory {
  id_bhg: number;
  bhg: string;
  id: number;
  nama: string;
  gred: string | null;
  jawatan: string | null;
  telefon: string | null;
  emel: string | null;
}

const DirektoriMain: FC = () => {
  const [data, setData] = useState(StaffDirectory);
  const t = useTranslations();

  const column = [
    {
      header: t("Directory.table_header.nama"),
      accessorKey: "nama",
      meta: {
        type: "text",
        editable: false,
        cellClass: "whitespace-nowrap",
      },
      cell: (info: any) =>
        info.row.original.id === -1 ? (
          `${info.row.original.bhg} - ${info.getValue()}`
        ) : info.row.original.id === 0 ? (
          <span className="text-red-600">KOSONG</span>
        ) : (
          info.getValue()
        ),
    },
    {
      header: t("Directory.table_header.gred"),
      accessorKey: "gred",
      meta: {
        type: "text",
        editable: false,
        enableReadMore: true,
        maxChar: 10,
      },
    },
    {
      header: t("Directory.table_header.bhg"),
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
      header: t("Directory.table_header.jawatan"),
      accessorKey: "jawatan",
      meta: {
        type: "text",
        editable: false,
        enableReadMore: true,
        maxChar: 60,
      },
    },
    {
      header: t("Directory.table_header.telefon"),
      accessorKey: "telefon",
      meta: {
        type: "text",
        editable: false,
        cellClass: "whitespace-nowrap",
      },
    },
    {
      header: t("Directory.table_header.emel"),
      accessorKey: "emel",
      size: 100,
      meta: {
        type: "text",
        editable: false,
        headerClass: "whitespace-nowrap",
      },
    },
  ];

  function searchArray(array: typeof data, searchQuery: string) {
    const query = searchQuery.toLowerCase();

    return setData(
      array.filter((item) => {
        return (
          item.nama.toLowerCase().includes(query) ||
          (item.emel && item.emel.toLowerCase().includes(query)) ||
          (item.jawatan && item.jawatan.toLowerCase().includes(query))
        );
      }),
    );
  }

  return (
    <main className="">
      <section className="relative border-b border-outline-200">
        <div className="absolute -z-10 flex h-full w-full justify-center overflow-hidden">
          <HeroPattern className="absolute -top-[83.33%]" />
        </div>
        <div className="flex flex-col items-center gap-6 py-16">
          <h1 className="text-center font-poppins text-hmd font-semibold">
            {t("Directory.header")}
          </h1>
          <Search
            className="w-full px-6 lg:w-[600px] lg:px-3"
            onChange={(query) => searchArray(StaffDirectory, query)}
            placeholder={t("Directory.search_placeholder")}
          />
        </div>
      </section>

      <section className="container flex min-h-screen w-full border-x border-x-washed-100 px-6 py-12">
        <DataTable
          key={JSON.stringify(data)}
          className="w-full border-0"
          columns={column}
          data={data}
          resizeable={false}
          paginate={{
            pageIndex: 0,
            pageSize: 15,
          }}
          dropdownFilter="bhg"
          dropdownText={t("Directory.table_header.bhg")}
          isMerged={(row) => {
            if (row.original.id === -1) return row.getVisibleCells()[0];
            return false;
          }}
        />
      </section>
    </main>
  );
};

export default DirektoriMain;
