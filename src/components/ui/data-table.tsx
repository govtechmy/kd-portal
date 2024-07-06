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
} from "@tanstack/react-table";
import { useParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useEffect,
  useState,
  ReactNode,
  FunctionComponent,
  useMemo,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import { DeepKeys, route, routes } from "@/lib/routes";
import Ellipsis from "@/icons/ellipsis";
import { cn, toRM } from "@/lib/utils";
import {
  ArrowUturnLeftIcon,
  Bars3Icon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { FunnelIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Button } from "./button";
import ReadMore from "./read-more";

interface DataTableProps<TData, TValue> {
  className?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  resizeable?: boolean;
  filtering?: boolean;
  visibility?: boolean;
  paginate?: {
    // route: DeepKeys<typeof routes>;
    pageIndex: number;
    pageSize: number;
  };
  defaultVisibility?: { [key: string]: boolean };
  visibilityCache?: (current: string[]) => void;
  title?: ReactNode;
  action?: ReactNode;
  actionIcon?: ReactNode;
  onRowSelection?: (value: string[]) => void;
}

const DataTable = <TData, TValue>({
  title,
  columns,
  data: _data,
  className,
  defaultVisibility,
  visibilityCache,
  resizeable = false,
  filtering = false,
  visibility = false,
  paginate,
  onRowSelection,
  action,
  actionIcon = <Ellipsis className="size-4" />,
}: DataTableProps<TData, TValue>) => {
  const [data, setData] = useState<TData[]>(_data);
  const originalDefault = useRef(defaultVisibility);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<{
    [key: string]: boolean;
  }>(defaultVisibility || {});

  useEffect(() => {
    visibilityCache &&
      visibilityCache(
        Object.keys(columnVisibility).filter(
          (curr) => columnVisibility[curr] === true,
        ),
      );
  }, [columnVisibility]);
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

      const isEditable = columnDef.meta?.editable || false;
      const canUseReadMore = columnDef.meta?.enableReadMore || false;

      const toDisplay = (value: unknown) => {
        if (columnDef.meta?.type === "currency") {
          if (typeof value === "number") return toRM(value as number);
          return "0";
        }
        return value as string;
      };

      return canUseReadMore ? (
        <ReadMore
          className="whitespace-nowrap"
          max={["char", columnDef.meta?.maxChar ?? 50]}
        >
          {value as string}
        </ReadMore>
      ) : (
        <p className="w-full" key={value as string}>
          {toDisplay(value)}
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
    enableColumnFilters: filtering,
    enableHiding: visibility,

    state: {
      expanded,
      rowSelection,
      columnFilters,
      columnVisibility,
      pagination,
    },

    // Controlled state functions
    // onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

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
    debugTable: true,
    debugHeaders: true,
  });

  const [headerGroups, footerGroup] = [
    table.getHeaderGroups(),
    table.getFooterGroups(),
  ];

  const createRange = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };

  const createMiddlePages = (current: number, max: number) => {
    const mid_start = Math.max(2, current - 3);
    const mid_end = Math.min(current + 3, max - 1);
    return createRange(mid_start, mid_end);
  };

  const getVisiblePageNumber = () => {
    const max = table.getPageCount();
    const current = table.getState().pagination.pageIndex + 1;
    const ELLIPSIS_THRESHOLD = 4;
    if (max < ELLIPSIS_THRESHOLD) return createRange(1, max);

    if (current <= 3) {
      const ellipsis_start = ELLIPSIS_THRESHOLD;
      return [...createRange(1, ellipsis_start), "...", max];
    }

    if (current >= max - 3) return [1, "...", ...createRange(max - 3, max)];

    return [1, "...", ...createMiddlePages(current, max), "...", max];
  };

  return (
    <div className={cn("flex flex-col rounded-md border", className)}>
      <div className="mb-4 flex items-center gap-2">
        <div className="flex-1">
          {typeof title === "string" ? <h5>{title}</h5> : title}
        </div>
        {/* Visibility */}
        {/* {visibility && (
          <TableVisibilityToggle
            table={table}
            setColumnVisibility={setColumnVisibility}
            defaultVisibility={originalDefault.current}
          />
        )} */}

        {/* Action */}
        {/* {action && (
          <Popover
            trigger={
              <Button
                className="self-stretch"
                variant="default"
                icon={actionIcon}
              />
            }
            option={{
              side: "bottom",
              sideOffset: 10,
              alignOffset: 0,
              align: "end",
            }}
          >
            <Card className="w-80 space-y-3 max-h-[400px] overflow-scroll">
              <div className="flex gap-2 flex-col">{action}</div>
            </Card>
          </Popover>
        )} */}
      </div>
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
                      ["currency", "number"].includes(
                        header.column.columnDef.meta?.type!,
                      ) && "text-right",
                      header.column.columnDef.meta?.headerClass,
                    )}
                    style={{ width: header.getSize() }}
                  >
                    {resizeable && <TableResizer header={header} />}

                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-2">
                        <div
                          {...{
                            className: cn("flex-1"),
                          }}
                        >
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
                          {header.column.getIsFiltered() ? (
                            <FunnelIcon className="h-3 w-3" />
                          ) : null}
                          {/* {filtering && header.column.getCanFilter() ? (
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
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  "relative",
                  (row.depth > 0 || row.getIsExpanded()) && "border-b-0",
                  row.depth === 0 && "border-t",
                )}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    id={cell.id}
                    key={cell.id}
                    className={cn(
                      "py-2.5 text-start",
                      ["currency", "number"].includes(
                        cell.column.columnDef.meta?.type!,
                      ) && "text-right tabular-nums",
                      cell.column.columnDef.meta?.cellClass,
                    )}
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllLeafColumns().length}
                className="text-dim h-24 text-center"
              >
                Tiada yang ditetapkan
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {/* <TableFooter>
          {footerGroup.map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  colSpan={header.colSpan}
                  className={cn(
                    "relative group",
                    ["currency", "number"].includes(
                      header.column.columnDef.meta?.type!
                    ) && "text-right",
                    header.column.columnDef.meta?.headerClass
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter> */}
      </Table>

      {paginate && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="secondary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <ol className="flex gap-1">
            {getVisiblePageNumber().map((page, index) =>
              typeof page === "number" ? (
                <li key={page}>
                  <Button
                    onClick={() => table.setPageIndex(page - 1)}
                    variant={
                      page === table.getState().pagination.pageIndex + 1
                        ? "secondary-colour"
                        : "default"
                    }
                    className={cn(
                      "rounded-lg bg-brand-50 px-3 py-1 text-sm",
                      page === table.getState().pagination.pageIndex + 1
                        ? "border-0 bg-brand-50"
                        : "bg-inherit",
                    )}
                  >
                    {page}
                  </Button>
                </li>
              ) : (
                <span key={`ellipsis-${index}`}>{page}</span>
              ),
            )}
          </ol>

          <Button
            variant="secondary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
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
