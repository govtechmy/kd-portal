"use client";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import ReadMore from "@/components/ui/read-more";
import Download from "@/icons/download";
import FileDocumentPaper from "@/icons/file-document-paper";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { DasarFilter } from "./filter";
import { Policy } from "@/payload-types";
import { DateTime } from "luxon";
interface DasarTableProps {
  data: Policy[];
}

export default function DasarTable({ data }: DasarTableProps) {
  const t = useTranslations("Policy.table_header");
  const t2 = useTranslations("Policy");
  const { accessor } = createColumnHelper<Policy>();

  const desktopColumns = [
    accessor("doc_name", {
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
    accessor("doc_type", {
      header: t("type"),
      cell: (info) => t2(`type.${info.getValue()}`),
      meta: {
        cellClass: "whitespace-nowrap",
      },
    }),
    accessor("doc_description", {
      header: t("description"),
      cell: (info) => (
        <ReadMore className="whitespace-nowrap" max={["char", 35]}>
          {info.getValue() || ""}
        </ReadMore>
      ),
    }),
    accessor("doc_date", {
      header: t("date"),
      cell: (info) => {
        const date = info.getValue();
        if (date) {
          return DateTime.fromISO(date).toFormat("dd/M/yyyy");
        } else {
          return "";
        }
      },
    }),
    accessor("file_upload.url", {
      header: "",
      id: "actions",
      cell: (info) => {
        const downloadFile = () => {
          const link = document.createElement("a");
          link.href = info.getValue() || "";
          link.download = info.row.original.doc_name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
        return (
          <Button
            variant="secondary"
            size="icon"
            className="flex-none rounded-lg"
            onClick={downloadFile}
          >
            <Download className="text-dim-500" />
            {t("download")}
          </Button>
        );
      },
      meta: {
        cellClass: "sm:py-1.5",
      },
    }),
  ];

  const mobileColumn = [
    accessor("doc_type", {
      header: t("type"),
      cell: (info) => {
        const { doc_name, doc_type, doc_description, doc_date, file_upload } =
          info.row.original;

        return (
          <div className="flex items-start gap-x-3 pr-3">
            <div className="flex-none rounded-md border border-outline-200 bg-washed-100 p-2">
              <FileDocumentPaper className="text-dim-500" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="space-y-1">
                <p className="font-semibold">{doc_name}</p>
                <p className="line-clamp-3 text-sm text-black-700">
                  {doc_description}
                </p>
              </div>
              <div className="flex gap-x-1.5 text-sm text-dim-500">
                <span>
                  {doc_date
                    ? DateTime.fromISO(doc_date).toFormat("dd/M/yyyy")
                    : ""}
                </span>
                |<span>{t2(`type.${doc_type}`)}</span>
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
        key={JSON.stringify(data) + "-desktop"}
        className="sm:hidden"
        columns={mobileColumn}
        data={data}
        filter={(table, headers) => (
          <DasarFilter
            table={table}
            headers={headers}
            column="doc_type"
            subtitle={t("type")}
          />
        )}
        paginate={{
          pageIndex: 0,
          pageSize: 15,
        }}
      />
      <DataTable
        key={JSON.stringify(data) + "-mobile"}
        className="hidden sm:flex"
        columns={desktopColumns}
        data={data}
        filter={(table, headers) => (
          <DasarFilter
            table={table}
            headers={headers}
            column="doc_type"
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
