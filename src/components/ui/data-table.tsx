"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
  ExpandedState,
  Header,
  RowSelectionState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  Table as TTable,
  getPaginationRowModel,
  Row,
  Cell,
} from "@tanstack/react-table";
import { useParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState, ReactNode, FunctionComponent } from "react";
import { cn } from "@/lib/utils";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/solid";
import ReadMore from "./read-more";
import { useTranslations } from "next-intl";
import Paginate from "@/components/ui/pagination";

interface DataTableProps<TData, TValue> {
  className?: string;
  columns: ColumnDef<TData, any>[];
  data: TData[];
  resizeable?: boolean;
  filterable?: boolean;
  paginate?: {
    pageIndex: number;
    pageSize: number;
  };
  filter?: (
    table: TTable<TData>,
    headers: Header<TData, unknown>[],
  ) => ReactNode;
  onRowSelection?: (value: string[]) => void;
  isMerged?: (row: Row<TData>) => Cell<TData, unknown> | false;
}

const DataTable = <TData, TValue>({
  columns,
  data: _data,
  className,
  resizeable = false,
  filterable = false,
  paginate,
  onRowSelection,
  filter,
  isMerged,
}: DataTableProps<TData, TValue>) => {
  const t = useTranslations();
  const [data, setData] = useState<TData[]>(_data);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { push } = useRouter();
  const params = useParams();
  const [pagination, setPagination] = useState({
    pageIndex: !!paginate ? paginate.pageIndex : 0,
    pageSize: !!paginate ? paginate.pageSize : 10,
  });

  const defaultColumn: Partial<ColumnDef<TData>> = {
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ getValue, row, column: { id, columnDef }, table }) => {
      const initialValue = getValue();
      // We need to keep and update the state of the cell normally
      const [value, setValue] = useState(initialValue);

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateData(row.index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      useEffect(() => setValue(initialValue), [initialValue]);

      const canUseReadMore = columnDef.meta?.enableReadMore || false;

      return canUseReadMore ? (
        <ReadMore
          className="whitespace-nowrap"
          max={["char", columnDef.meta?.maxChar ?? 50]}
        >
          {value as string}
        </ReadMore>
      ) : (
        <p className="w-full" key={value as string}>
          {value as string}
        </p>
      );
    },
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    columnResizeMode: "onChange",
    enableColumnResizing: resizeable,
    enableColumnFilters: filterable,

    state: {
      expanded,
      rowSelection,
      columnFilters,
      pagination,
    },

    // Controlled state functions
    // onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,

    // Tanstack function
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: paginate ? getPaginationRowModel() : undefined,
    onPaginationChange: (value) => {
      if (!paginate) return;
      setPagination(value);
    },
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
    debugTable: false,
    debugHeaders: false,
  });

  const headerGroups = table.getHeaderGroups();

  return (
    <div className={cn("flex w-full flex-col", className)}>
      {/* Action */}
      {filter ? filter(table, headerGroups[0].headers) : <></>}

      {/* Table */}
      <Table
        style={{
          width:
            resizeable && data.length > 0
              ? table.getCenterTotalSize()
              : "inherit",
        }}
      >
        <TableHeader>
          {headerGroups.map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    id={header.id}
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn(
                      "group relative",
                      header.column.columnDef.meta?.type! === "number" &&
                        "text-right",
                      header.column.columnDef.meta?.headerClass,
                    )}
                    style={{ width: header.getSize() }}
                  >
                    {resizeable && <TableResizer header={header} />}

                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {{
                            desc: <BarsArrowDownIcon className="h-3 w-3" />,
                            asc: <BarsArrowUpIcon className="h-3 w-3" />,
                          }[header.column.getIsSorted() as string] ?? null}
                          {/* {header.column.getIsFiltered() ? (
                            <FunnelIcon className="h-3 w-3" />
                          ) : null} */}
                          {/* {filterable && header.column.getCanFilter() ? (
                            <TableFilterSort table={table} header={header} />
                          ) : null} */}
                        </div>
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table?.getRowModel()?.rows?.length > 0 ? (
            table.getRowModel().rows.map((row) => {
              const mergedRow = isMerged ? isMerged(row) : undefined;
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "relative",
                    (row.depth > 0 || row.getIsExpanded()) && "border-b-0",
                    row.depth === 0 && "border-t",
                  )}
                >
                  {mergedRow ? (
                    <TableCell
                      id={mergedRow.id}
                      key={mergedRow.id}
                      colSpan={6}
                      className={cn(
                        "font-bold",
                        mergedRow.column.columnDef.meta?.type! === "number"
                          ? "text-right tabular-nums"
                          : "text-center",
                        mergedRow.column.columnDef.meta?.cellClass,
                      )}
                    >
                      {flexRender(
                        mergedRow.column.columnDef.cell,
                        mergedRow.getContext(),
                      )}
                    </TableCell>
                  ) : (
                    row.getVisibleCells().map((cell) => (
                      <TableCell
                        id={cell.id}
                        key={cell.id}
                        className={cn(
                          cell.column.columnDef.meta?.type! === "number"
                            ? "text-right tabular-nums"
                            : "text-start",
                          cell.column.columnDef.meta?.cellClass,
                        )}
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))
                  )}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllLeafColumns().length}
                className="text-dim h-24 text-center"
              >
                {t("Table.no_data")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {data.length > 0 && paginate && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Paginate
            curr={table.getState().pagination.pageIndex}
            disable_next={!table.getCanNextPage()}
            disable_prev={!table.getCanPreviousPage()}
            setPage={(page) => table.setPageIndex(page)}
            totalPages={table.getPageCount()}
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;

interface TableResizerProps {
  header: Header<any, unknown>;
}

const TableResizer: FunctionComponent<TableResizerProps> = ({ header }) => {
  return (
    <div
      onDoubleClick={() => header.column.resetSize()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      className={cn(
        "absolute right-0 top-0 h-full w-1 cursor-col-resize touch-none select-none bg-outline-200 opacity-0 group-hover:opacity-100",
        header.column.getIsResizing() && "bg-outline-400 opacity-100",
      )}
    />
  );
};
