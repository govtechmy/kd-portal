import HeroPattern from "@/components/layout/hero-pattern";

export default function Hero({
  title,
  subtitle,
  search,
}: {
  title: string;
  subtitle?: string;
  search?: React.ReactNode;
}) {
  return (
    <section className="relative border-b border-outline-200">
      <div className="absolute -z-10 flex h-full w-full justify-center overflow-hidden">
        <HeroPattern className="absolute -top-[83.33%]" />
      </div>

      <div className="container flex flex-col gap-6 py-16">
        <div className="text-center">
          <h1 className="font-poppins text-[2rem]/10 font-semibold sm:text-hmd">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-lg text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
        {search}
      </div>
    </section>
  );
}
