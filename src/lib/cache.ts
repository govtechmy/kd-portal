import Cloudflare from "cloudflare";

const cloudflare = new Cloudflare();

/** Purge remote cache */
export async function purgeCache(paths: string[]) {
  if (!process.env.APP_URL) {
    throw Error("missing env variable `APP_URL`");
  }
  if (!process.env.CLOUDFLARE_ZONE_ID) {
    throw Error("missing env variable `CLOUDFLARE_ZONE_ID`");
  }

  await cloudflare.cache.purge({
    zone_id: process.env.CLOUDFLARE_ZONE_ID,
    files: paths.map((path) => process.env.APP_URL.concat(path)),
  });
}
