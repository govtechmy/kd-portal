"use client";

import { FunctionComponent, ReactNode, createContext } from "react";
import { cn } from "@/lib/utils";

interface EmptyProps {
  className?: string;
  from: unknown;
  message?: ReactNode;
  children: ReactNode;
}

const Empty: FunctionComponent<EmptyProps> = ({
  children,
  className,
  from,
  message = "Tiada yang ditetapkan.",
}) => {
  const isEmpty = () => {
    if (Array.isArray(from)) return from.length <= 0;
    return !from;
  };
  return isEmpty() ? (
    <div
      className={cn(
        "text-dim border-outline rounded-lg border-4 border-dashed p-4 text-sm",
        className,
      )}
    >
      <p className="font-thin">{message}</p>
    </div>
  ) : (
    children
  );
};

export default Empty;
