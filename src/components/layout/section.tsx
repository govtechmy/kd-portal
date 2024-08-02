// TODO: Add grid support with dotted lines
export default function Section({
  children,
  className = "container",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section>
      <div className={className}>{children}</div>
    </section>
  );
}
