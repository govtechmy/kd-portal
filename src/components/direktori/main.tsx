"use client";

import Hero from "@/components/layout/hero";
import Section from "@/components/layout/section";
import DataTable from "@/components/ui/data-table";
import Search from "@/components/ui/search";
import Phone from "@/icons/phone";
import Envelope from "@/icons/envelope";
import { Cell } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { FC, useMemo } from "react";
import { DirektoriFilter } from "./filter";
import { StaffDirectory } from "@/payload-types";
import { locales } from "@/lib/i18n";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/lib/i18n";
import StaffCardModal from "../ui/view-e-card";
import { SiteInfo } from "@/payload-types";

interface DirektoriMainProps {
  list: StaffDirectory[];
  locale: (typeof locales)[number];
  siteInfo: SiteInfo;
}
const DirektoriMain: FC<DirektoriMainProps> = ({ list, locale, siteInfo }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchQuery = searchParams.get("search");

  const column = useMemo(
    () => [
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
      // {
      //   header: t("Directory.table_header.gred"),
      //   accessorKey: "gred",
      //   meta: {
      //     type: "text",
      //     editable: false,
      //     enableReadMore: true,
      //     maxChar: 10,
      //   },
      // },
      {
        header: t("Directory.table_header.bhg"),
        accessorKey: "bhg",
        accessorFn: (item: StaffDirectory) =>
          typeof item.id_bhg !== "string" && item.id_bhg.bhg,
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
          // enableReadMore: true,
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
      {
        header: t("Directory.table_header.ecard"),
        id: "ecard",
        cell: (info: any) => {
          const staff = info.row.original;
          return staff.staff_id > 0 ? (
            <StaffCardModal staff={staff} siteInfo={siteInfo} />
          ) : null;
        },
        size: 100,
        meta: {
          type: "text",
          editable: false,
          headerClass: "whitespace-nowrap",
        },
      },
    ],
    [siteInfo, t],
  );

  const mobileColumn = [
    {
      header: "",
      id: "bhg",
      accessorKey: "id_bhg.bhg",
      cell: (info: any) => {
        const { id_bhg, emel, staff_id, jawatan, nama, telefon } = (
          info as Cell<StaffDirectory, unknown>
        ).row.original;

        if (staff_id === -1)
          return (
            <p className="text-center font-semibold">
              {typeof id_bhg !== "string" && id_bhg.bhg} - {nama}
            </p>
          );

        return (
          <div className="space-y-2 font-medium text-dim-500">
            <p className="text-balance text-xs font-semibold">
              {typeof id_bhg !== "string" && id_bhg.bhg}
            </p>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-x-1.5">
                <span className="text-base font-semibold text-foreground">
                  {staff_id === 0 ? (
                    <span className="text-red-600">KOSONG</span>
                  ) : (
                    nama
                  )}
                </span>
                {/* {gred !== "-" ? (
                  <span className="rounded-md bg-outline-200 px-1 text-black-700">
                    {gred}
                  </span>
                ) : (
                  <></>
                )} */}
              </div>
              <p className="text-black-700">{jawatan}</p>
            </div>

            {telefon !== "-" || emel !== "-" ? (
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                {telefon !== "-" ? (
                  <>
                    <Phone className="text-outline-400" />
                    <span>{telefon}</span>
                  </>
                ) : (
                  <></>
                )}
                {telefon !== "-" && emel !== "-" ? "|" : ""}
                {emel !== "-" ? (
                  <div className="flex items-center gap-x-1.5">
                    <Envelope className="text-outline-400" />
                    <span>{`${emel}@digital.gov.my`}</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}

            {staff_id > 0 && (
              <div className="pt-2">
                <StaffCardModal staff={info.row.original} siteInfo={siteInfo} />
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const data = useMemo(() => {
    const query = searchQuery ? searchQuery.toLowerCase() : "";

    return list.filter((item) => {
      const matchesQuery =
        (item.nama && item.nama.toLowerCase().includes(query)) ||
        (item.emel && item.emel.toLowerCase().includes(query)) ||
        // (item.gred && item.gred.toLowerCase().includes(query)) ||
        (item.jawatan && item.jawatan.toLowerCase().includes(query));

      return matchesQuery;
    });
  }, [list, searchQuery]);

  const searchArray = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("search", searchQuery.toLowerCase());
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <main>
      <Hero
        title={t("Directory.header")}
        search={
          <Search
            onChange={searchArray}
            placeholder={t("Directory.search_placeholder")}
            defaultValue={searchQuery || ""}
            useDefaultValue={true}
          />
        }
      />

      <Section>
        <div className="hidden w-full border-x-washed-100 py-12 sm:flex lg:border-x lg:px-6">
          <DataTable
            key={JSON.stringify(data)}
            columns={column}
            data={data}
            resizeable={false}
            paginate={{
              pageIndex: 0,
              pageSize: 15,
            }}
            filter={(table, headers) => (
              <DirektoriFilter
                table={table}
                headers={headers}
                column="bhg"
                subtitle={t("Directory.table_header.bhg")}
              />
            )}
            isMerged={(row) => {
              if (row.original.staff_id === -1) return row.getVisibleCells()[0];
              return false;
            }}
          />
        </div>
      </Section>

      {/* Mobile */}
      <Section>
        <div className="flex w-full flex-col border-x-washed-100 py-12 sm:hidden lg:border-x">
          <DataTable
            key={JSON.stringify(data)}
            columns={mobileColumn}
            data={data}
            resizeable={false}
            paginate={{
              pageIndex: 0,
              pageSize: 15,
            }}
            filter={(table, headers) => (
              <DirektoriFilter
                table={table}
                headers={headers}
                column="bhg"
                subtitle={t("Directory.table_header.bhg")}
              />
            )}
          />
        </div>
      </Section>
    </main>
  );
};

export default DirektoriMain;
