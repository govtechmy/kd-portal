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
            className="w-[600px]"
            onChange={(query) => searchArray(StaffDirectory, query)}
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
            pageSize: 20,
          }}
          dropdownFilter="bhg"
        />
      </section>
    </main>
  );
};

export default DirektoriMain;
