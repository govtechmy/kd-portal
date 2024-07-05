import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import ChevronLeft from "@/icons/chevron-left";
import ChevronRight from "@/icons/chevron-right";
import Ellipsis from "@/icons/ellipsis";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ComponentProps, forwardRef, useMemo } from "react";

const Pagination = ({ className, ...props }: ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex flex-row items-center gap-1.5", className)}
      {...props}
    />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("rounded-md", className)} {...props} />
  ),
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size" | "disabled"> &
  ComponentProps<typeof Link>;

const PaginationLink = ({
  className,
  disabled,
  isActive,
  size,
  ...props
}: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: "secondary",
        size,
      }),
      isActive ? "bg-washed-100" : "",
      className,
    )}
    aria-disabled={disabled}
    scroll={false}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationEllipsis = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex size-8 items-center justify-center", className)}
    {...props}
  >
    <Ellipsis className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export default function _Pagination({
  curr,
  disable_next,
  disable_prev,
  setPage,
  totalPages,
}: {
  curr: number;
  disable_next?: boolean;
  disable_prev?: boolean;
  setPage: (page: number) => void;
  totalPages: number;
}) {
  const t = useTranslations();

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const DOTS = "...";
  const siblings = 1; // square(s) beside curr
  const pageRange = useMemo(() => {
    // If num of pages < the squares we want to show, return the range [1..totalPages]
    if (totalPages <= 5 + siblings) {
      return range(1, totalPages);
    }

    const leftSibIdx = Math.max(curr + 1 - siblings, 1);
    const rightSibIdx = Math.min(curr + 1 + siblings, totalPages);

    const showLeftDots = leftSibIdx > 2;
    const showRightDots = rightSibIdx < totalPages - 2;

    const firstPageIdx = 1;
    const lastPageIdx = totalPages;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblings;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblings;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIdx, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSibIdx, rightSibIdx);
      return [firstPageIdx, DOTS, ...middleRange, DOTS, lastPageIdx];
    }
  }, [curr, totalPages]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="secondary"
            className="mr-1.5 gap-1 max-sm:p-2 sm:pl-2.5"
            disabled={disable_prev || curr <= 0}
            onClick={() => setPage(curr - 1)}
          >
            <ChevronLeft className="size-4" />
            <span className="max-sm:hidden">{t("previous")}</span>
            <span className="sr-only">{t("previous")}</span>
          </Button>
        </PaginationItem>

        {pageRange?.map((page, i) => {
          return typeof page === "number" ? (
            <PaginationItem
              className="hidden min-[360px]:flex"
              key={i}
              onClick={() => setPage(page - 1)}
            >
              <PaginationLink href="" isActive={curr === i}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem className="hidden min-[360px]:flex" key={i}>
              <PaginationEllipsis />
            </PaginationItem>
          );
        })}
        <span className="flex items-center gap-1 text-center min-[360px]:hidden">
          {t("page_of", {
            current: curr,
            total: totalPages,
          })}
        </span>
        <PaginationItem>
          <Button
            aria-label={t("next")}
            variant="secondary"
            className="ml-1.5 gap-1 max-sm:p-2 sm:pr-2.5"
            disabled={disable_next || curr >= totalPages - 1}
            onClick={() => setPage(curr + 1)}
          >
            <span className="max-sm:hidden">{t("next")}</span>
            <span className="sr-only">{t("next")}</span>
            <ChevronRight className="size-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
