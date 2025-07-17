import { CollectionConfig } from "payload";
import { Users } from "./Users";
import { Media } from "./Media";
import { Broadcast } from "./Broadcast";
import { KDDepartment, KDDirectory } from "./Directory";
import { QuickLink } from "./QuickLink";
import { File } from "./File";
import ECards from "./Ecard";
import { KDPolicy } from "./Policy";
import { Achievement } from "./Achievement";
import { SearchOverride } from "./Search-Overrides";
import { HeroBanner } from "./HeroBanner";
import { Celebration } from "./Celebration";

const PayloadCollections: CollectionConfig[] = [
  Users,
  Media,
  File,
  ECards, // added this for e-cards, insyallah
  HeroBanner,
  Broadcast,
  Achievement,
  KDDepartment,
  KDDirectory,
  KDPolicy,
  QuickLink,
  Celebration,
];

export {
  Users,
  Media,
  File,
  ECards, //added this too
  HeroBanner,
  Broadcast,
  Achievement,
  KDDepartment,
  KDDirectory,
  KDPolicy,
  QuickLink,
  SearchOverride,
  Celebration,
};
export default PayloadCollections;
