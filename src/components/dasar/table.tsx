"use client";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import ReadMore from "@/components/ui/read-more";
import Download from "@/icons/download";
import FileDocumentPaper from "@/icons/file-document-paper";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { dummy } from "./dummy";
import { DasarFilter } from "./filter";

interface Dasar {
  title: string;
  type: string;
  description: string;
  date: string;
}

export default function DasarTable() {
  const t = useTranslations("Policy.table_header");
  const { accessor } = createColumnHelper<Dasar>();

  const desktopColumns = [
    accessor("title", {
      header: t("title"),
      cell: (info) => (
        <div className="flex gap-x-2 whitespace-nowrap">
          <FileDocumentPaper className="shrink-0 text-dim-500" />
          <ReadMore className="whitespace-nowrap" max={["char", 50]}>
            {info.getValue()}
          </ReadMore>
        </div>
      ),
    }),
    accessor("type", {
      header: t("type"),
      cell: (info) => info.getValue(),
      meta: {
        cellClass: "whitespace-nowrap",
      },
    }),
    accessor("description", {
      header: t("description"),
      cell: (info) => (
        <ReadMore className="whitespace-nowrap" max={["char", 35]}>
          {info.getValue()}
        </ReadMore>
      ),
    }),
    accessor("date", {
      header: t("date"),
      cell: (info) => info.getValue(),
    }),
    accessor("type", {
      header: "",
      id: "actions",
      cell: () => (
        <Button
          variant="secondary"
          size="icon"
          className="flex-none rounded-lg"
        >
          <Download className="text-dim-500" />
          {t("download")}
        </Button>
      ),
      meta: {
        cellClass: "sm:py-1.5",
      },
    }),
  ];

  const mobileColumn = [
    accessor("type", {
      cell: (info) => {
        const { title, type, description, date } = info.row.original;

        return (
          <div className="flex items-start gap-x-3 pr-3">
            <div className="flex-none rounded-md border border-outline-200 bg-washed-100 p-2">
              <FileDocumentPaper className="text-dim-500" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="space-y-1">
                <p className="font-semibold">{title}</p>
                <p className="line-clamp-3 text-sm text-black-700">
                  {description}
                </p>
              </div>
              <div className="flex gap-x-1.5 text-sm text-dim-500">
                <span>{date}</span>|<span>{type}</span>
              </div>
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="flex-none rounded-lg"
            >
              <Download className="text-dim-500" />
            </Button>
          </div>
        );
      },
    }),
  ];

  return (
    <section className="container flex w-full border-x border-x-washed-100 py-12">
      <DataTable
        className="sm:hidden"
        columns={mobileColumn}
        data={dummy as Dasar[]}
        filter={(table, headers) => (
          <DasarFilter
            table={table}
            headers={headers}
            column="type"
            subtitle={t("type")}
          />
        )}
        paginate={{
          pageIndex: 0,
          pageSize: 15,
        }}
      />
      <DataTable
        className="hidden sm:flex"
        columns={desktopColumns}
        data={dummy as Dasar[]}
        filter={(table, headers) => (
          <DasarFilter
            table={table}
            headers={headers}
            column="type"
            subtitle={t("type")}
          />
        )}
        paginate={{
          pageIndex: 0,
          pageSize: 15,
        }}
      />
    </section>
  );
}
