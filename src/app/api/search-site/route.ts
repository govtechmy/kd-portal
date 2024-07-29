import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

export const GET = async (req: Request) => {
  const url = new URL(req.url);

  const searchParams = new URLSearchParams(url.searchParams);
  const search = searchParams.get("search");
  const locale = searchParams.get("locale");
  const payload = await getPayloadHMR({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "search",
    limit: 15,
    locale: locale as "ms-MY" | "en-GB",
    where: {
      title: { contains: search || "" },
    },
  });

  return Response.json(data);
};
