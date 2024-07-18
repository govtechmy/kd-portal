import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

export const GET = async () => {
  const payload = await getPayloadHMR({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "search",
    // where: {
    //   title: { contains: "go" },
    // },
  });

  return Response.json(data);
};
