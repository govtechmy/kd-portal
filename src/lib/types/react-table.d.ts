import "@tanstack/react-table";
import type { HTMLInputTypeAttribute } from "react";
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }

  interface ColumnMeta {
    type?: HTMLInputTypeAttribute;
    editable?: boolean;
    enableReadMore?: boolean;
    maxChar?: number;
    headerClass?: string;
    cellClass?: string;
  }
}
