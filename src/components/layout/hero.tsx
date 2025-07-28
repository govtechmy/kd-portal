import HeroPattern from "@/components/layout/hero-pattern";

export default function Hero({
  title,
  subtitle,
  search,
  splaskPrivacyPolicy,
}: {
  title: string;
  subtitle?: string;
  search?: React.ReactNode;
  splaskPrivacyPolicy?: boolean;
}) {
  return (
    <section className="relative border-b border-outline-200">
      <div className="absolute -z-10 flex h-full w-full justify-center overflow-hidden">
        <HeroPattern className="absolute -top-[83.33%]" />
      </div>

      <div className="container flex flex-col gap-6 py-16">
        <h1
          className="text-center font-poppins text-[2rem]/10 font-semibold sm:text-hmd"
          {...(splaskPrivacyPolicy && {
            "splwpk-privacy-policy": "splwpk-privacy-policy",
          })}
        >
          {title}
        </h1>
        {search}
      </div>
    </section>
  );
}
