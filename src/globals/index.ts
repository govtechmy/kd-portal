import { GlobalConfig } from "payload";
import { Header } from "./Header";
import { SiteInfo } from "./SiteInfo";
import { Footer } from "./Footer";
import { MinisterProfile } from "./MinisterProfile";

const GlobalCollections: GlobalConfig[] = [
  SiteInfo,
  Header,
  Footer,
  MinisterProfile,
];

export { SiteInfo, Header, Footer, MinisterProfile };
export default GlobalCollections;
