"use client";

import Pagination from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Paginate({
  href,
  setPage,
  totalPages,
}: {
  href: string;
  setPage?: (page: number) => void;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page"));

  return (
    <Suspense>
      <Pagination
        curr={page - 1 ?? 0}
        href={href}
        setPage={setPage}
        totalPages={totalPages}
      />
    </Suspense>
  );
}
