import ProfilKementerianComponent from "./page-component";
import { FSP, inject, metagen, MetagenProps } from "@/lib/decorator";

const ProfilKementerian: FSP = async ({ payload, locale }) => {
  const data = await payload.findGlobal({
    slug: "profil-kementerian",
    locale: locale,
    depth: 3,
  });

  return <ProfilKementerianComponent data={data} locale={locale} />;
};

export const generateMetadata = async (params: MetagenProps) => {
  return metagen(params, "Agency", { title: "name" });
};

export default inject(ProfilKementerian);
// export const dynamic = "error";
