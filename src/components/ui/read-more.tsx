"use client";
import { cn } from "@/lib/utils";
import { FunctionComponent, useMemo, useState } from "react";

type CountBy = "word" | "char";

interface ReadMoreProps {
  className?: string;
  children: string;
  max: [count: CountBy, length: number];
}

const ReadMore: FunctionComponent<ReadMoreProps> = ({
  className,
  children,
  max,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const text = useMemo(() => {
    if (!children || children.length === 0)
      return { short: "", long: "", original: [] };

    const joiner = max[0] === "word" ? " " : "";
    let _text: string[] = children.split(joiner);

    const [short, long] = [
      _text.slice(0, max[1]).join(joiner),
      _text.slice(max[1]).join(joiner),
    ];
    return {
      short,
      long,
      original: _text,
    };
  }, [children]);

  return (
    <p className={className}>
      {text.original.length > max[1] ? (
        <>
          <span className="inline-block">
            {text.short}
            {!expanded && "..."}
          </span>
          {max[0] === "word" && " "}
          <span className={cn(expanded ? "inline-block" : "hidden")}>
            {text.long}
          </span>{" "}
          <button
            typeof="button"
            className="text-primary bg-primary/10 inline-block cursor-pointer rounded px-1 text-xs hover:underline"
            onClick={() => setExpanded(!expanded)}
          >
            {!expanded ? "..." : "Tutup"}
          </button>
        </>
      ) : (
        children
      )}
    </p>
  );
};

export default ReadMore;
