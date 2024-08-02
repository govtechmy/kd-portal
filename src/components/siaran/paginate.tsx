"use client";

import Pagination from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Paginate({
  setPage,
  totalPages,
}: {
  setPage?: (page: number) => void;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  return (
    <Suspense>
      <Pagination curr={page - 1} setPage={setPage} totalPages={totalPages} />
    </Suspense>
  );
}
