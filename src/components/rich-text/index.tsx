import React from "react";

import { serializeLexical } from "@/components/rich-text/serialize";

export default function RichText({
  className,
  content,
}: {
  className?: string;
  content: any;
}) {
  if (!content) {
    return null;
  }

  return (
    <div className={className}>
      {content &&
        !Array.isArray(content) &&
        typeof content === "object" &&
        "root" in content &&
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  );
}
