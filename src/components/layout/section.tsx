// TODO: Add grid support with dotted lines
export default function Section({ children }: { children?: React.ReactNode }) {
  return (
    <section>
      <div className="container">{children}</div>
    </section>
  );
}
