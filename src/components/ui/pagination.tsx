import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import ChevronLeft from "@/icons/chevron-left";
import ChevronRight from "@/icons/chevron-right";
import Ellipsis from "@/icons/ellipsis";
import { usePathname, useRouter } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
} & Pick<ButtonProps, "size" | "variant" | "disabled"> &
  ComponentProps<typeof Link>;

const PaginationLink = ({
  className,
  disabled,
  isActive,
  size,
  variant,
  ...props
}: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant,
        size,
      }),
      isActive ? "bg-brand-50" : "",
      "lg:size-10",
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
  setPage?: (page: number) => void;
  totalPages: number;
}) {
  const t = useTranslations("Pagination");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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

  const changePage = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const getUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="secondary"
            size="default"
            className="p-2 lg:p-2.5"
            disabled={disable_prev || curr <= 0}
            onClick={() => (setPage ? setPage(curr - 1) : changePage(curr))}
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">{t("previous")}</span>
          </Button>
        </PaginationItem>

        {pageRange?.map((page, i) => {
          return typeof page === "number" ? (
            <PaginationItem className="hidden min-[360px]:flex" key={i}>
              {/* {pathname ? (
                <PaginationLink
                  href={getUrl(page)}
                  variant={curr === page - 1 ? "tertiary-colour" : "tertiary"}
                  isActive={curr === page- 1}
                >
                  {page}
                </PaginationLink>
              ) : ( */}
              <Button
                onClick={() => (setPage ? setPage(page - 1) : changePage(page))}
                variant={curr === page - 1 ? "tertiary-colour" : "tertiary"}
                className={curr === page - 1 ? "bg-brand-50" : ""}
              >
                {page}
              </Button>
              {/* )} */}
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
            size="default"
            className="p-2 lg:p-2.5"
            disabled={disable_next || curr >= totalPages - 1}
            onClick={() => (setPage ? setPage(curr + 1) : changePage(curr + 2))}
          >
            <span className="sr-only">{t("next")}</span>
            <ChevronRight className="size-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
