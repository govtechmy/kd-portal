"use client";

import { cn } from "@/lib/utils";
import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "prefix"
> & {
  id?: string;
  name?: string;
  className?: string;
  label?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: HTMLInputTypeAttribute | "currency";
  placeholder?: string;
  action?: ReactNode;
  value?: string | number | null;
  onChange?: (e: string | number) => void;
  autoCaps?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      prefix,
      suffix,
      value,
      onChange,
      action,
      autoCaps = false,
      ...props
    },
    ref,
  ) => {
    const _value = () => {
      if (value === null) return "";
      if (type === "number") return Number(value).toString();
      return value;
    };

    const _onChange = (value: string) => {
      if (!onChange) return;
      if (type === "number") return onChange(+value);

      if (autoCaps) return onChange(value.toUpperCase());
      return onChange(value);
    };

    return (
      <div className={cn("space-y-2", className)}>
        <div className="relative flex flex-row gap-2">
          {prefix && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {typeof prefix === "string" ? (
                <span className="text-dim text-sm">{prefix}</span>
              ) : (
                prefix
              )}
            </div>
          )}
          <input
            ref={ref}
            type={type === "currency" ? "text" : type}
            className={cn(
              "focus-visible:ring-ring flex w-full rounded-md border bg-white px-3 py-1 text-base font-normal shadow-sm transition-colors placeholder:max-w-[150px] placeholder:text-dim-500 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:placeholder:max-w-[initial]",
              prefix && "pl-10",
              suffix && "pr-10",
              className,
            )}
            value={_value()}
            onChange={(e) => _onChange(e.currentTarget.value)}
            {...props}
          />
          {suffix && (
            <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              {typeof suffix === "string" ? (
                <span className="text-dim text-sm">{suffix}</span>
              ) : (
                suffix
              )}
            </div>
          )}

          {action}
        </div>
      </div>
    );
  },
);
Input.displayName = "Input";

export default Input;
