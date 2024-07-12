import { GlobalConfig } from "payload";
import { Header } from "./Header";
import { SiteInfo } from "./SiteInfo";
import { Footer } from "./Footer";
import { InfoKorporat } from "./InfoKorporat";

const GlobalCollections: GlobalConfig[] = [
  SiteInfo,
  Header,
  Footer,
  InfoKorporat,
];

export { SiteInfo, Header, Footer, InfoKorporat };
export default GlobalCollections;
