import { GlobalConfig } from "payload";
import { Header } from "./Header";
import { SiteInfo } from "./SiteInfo";
import { Footer } from "./Footer";
import { MinisterProfile } from "./MinisterProfile";
import { Homepage } from "./Homepage";
import { FeedbackSettings } from "./FeedbackSettings";

const GlobalCollections: GlobalConfig[] = [
  FeedbackSettings,
  SiteInfo,
  Header,
  Footer,
  Homepage,
  MinisterProfile,
];

export {
  FeedbackSettings,
  SiteInfo,
  Header,
  Footer,
  MinisterProfile,
  Homepage,
};
export default GlobalCollections;
