import React from "react";
import { serializeLexical, TagMap } from "@/components/rich-text/serialize";
import { cn } from "@/lib/utils";

export default function RichText({
  className,
  content,
  tagMap,
}: {
  className?: string;
  content: any;
  tagMap?: TagMap;
}) {
  if (!content) {
    return null;
  }

  return (
    <div className={cn("article", className)}>
      {content &&
        !Array.isArray(content) &&
        typeof content === "object" &&
        "root" in content &&
        serializeLexical({ nodes: content?.root?.children, tagMap })}
    </div>
  );
}
