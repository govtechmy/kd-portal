import { cn } from "@/lib/utils";

export default function Overline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-foreground-primary text-sm font-semibold uppercase tracking-[0.2em]", className)}>
      {children}
    </p>
  );
}
