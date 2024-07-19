import { JSX } from "react";
import { Icon } from "@/icons/social-media";
import { Option } from "payload";
import React from "react";

// Social Media
type SocialMedia = "Facebook" | "X" | "Instagram" | "Tiktok";

type SMContent = {
  icon: JSX.Element;
  // Can add more metadata here
};

export const _social_media: Record<SocialMedia, SMContent> = {
  Facebook: {
    icon: <Icon.Facebook />,
  },
  X: {
    icon: <Icon.X />,
  },
  Instagram: {
    icon: <Icon.Instagram />,
  },
  Tiktok: {
    icon: <Icon.Tiktok />,
  },
};

export const socialMediaOptions: Option[] = Object.keys(_social_media).map(
  (key) => ({
    label: key,
    value: key,
  }),
);

// Quick Links
type QuickLinksOptions =
  | "SpotMe"
  | "MyGovUC"
  | "DDMS"
  | "MyMesyuarat"
  | "ePenyata Gaji"
  | "HRMIS"
  | "ePerolehan";

interface QuickLinks {
  name: QuickLinksOptions;
  href: string;
}

export const quick_links: QuickLinks[] = [
  { name: "SpotMe", href: "https://www.spotme.gov.my/" },
  { name: "MyGovUC", href: "https://www.mygovuc.gov.my/" },
  { name: "DDMS", href: "https://portalddms.malaysia.gov.my/" },
  { name: "MyMesyuarat", href: "https://www.mymesyuarat.gov.my/" },
  { name: "ePenyata Gaji", href: "https://epenyatagaji-laporan.anm.gov.my/" },
  { name: "HRMIS", href: "https://hrmis2.eghrmis.gov.my/" },
  { name: "ePerolehan", href: "https://www.eperolehan.gov.my/" },
];
