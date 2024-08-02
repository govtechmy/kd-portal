import { GlobalConfig } from "payload";
import { Header } from "./Header";
import { SiteInfo } from "./SiteInfo";
import { Footer } from "./Footer";
import { MinisterProfile } from "./MinisterProfile";
import { Homepage } from "./Homepage";

const GlobalCollections: GlobalConfig[] = [
  SiteInfo,
  Header,
  Footer,
  Homepage,
  MinisterProfile,
];

export { SiteInfo, Header, Footer, MinisterProfile, Homepage };
export default GlobalCollections;
