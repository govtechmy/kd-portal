import { GlobalConfig } from "payload";
import { Header } from "./Header";
import { SiteInfo } from "./SiteInfo";
import { Footer } from "./Footer";
import { MinisterProfile } from "./MinisterProfile";
import { Homepage } from "./Homepage";
import { Addresses } from "./Addresses";

const GlobalCollections: GlobalConfig[] = [
  SiteInfo,
  Header,
  Footer,
  Homepage,
  MinisterProfile,
  Addresses,
];

export { SiteInfo, Header, Footer, MinisterProfile, Homepage, Addresses };
export default GlobalCollections;
