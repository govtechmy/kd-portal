import { routes } from "@/lib/routes";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const { APP_URL } = process.env;
  return [
    {
      url: `${APP_URL}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          "en-GB": `${APP_URL}/en-GB`,
          "ms-MY": `${APP_URL}`,
        },
      },
    },
    {
      url: `${APP_URL}${routes.DISCLAIMER}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          "en-GB": `${APP_URL}/en-GB${routes.DISCLAIMER}`,
          "ms-MY": `${APP_URL}${routes.DISCLAIMER}`,
        },
      },
    },
    {
      url: `${APP_URL}${routes.PRIVACY}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          "en-GB": `${APP_URL}/en-GB${routes.PRIVACY}`,
          "ms-MY": `${APP_URL}${routes.PRIVACY}`,
        },
      },
    },
    {
      url: `${APP_URL}${routes.MINISTRY_PROFILE}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          "en-GB": `${APP_URL}/en-GB${routes.MINISTRY_PROFILE}`,
          "ms-MY": `${APP_URL}${routes.MINISTRY_PROFILE}`,
        },
      },
    },
    {
      url: `${APP_URL}${routes.DIRECTORY}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          "en-GB": `${APP_URL}/en-GB${routes.DIRECTORY}`,
          "ms-MY": `${APP_URL}${routes.DIRECTORY}`,
        },
      },
    },
    {
      url: `${APP_URL}${routes.CONTACT_US}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          "en-GB": `${APP_URL}/en-GB${routes.CONTACT_US}`,
          "ms-MY": `${APP_URL}${routes.CONTACT_US}`,
        },
      },
    },
  ];
}
