import { CollectionConfig } from "payload";
import { Users } from "./Users";
import { Media } from "./Media";
import { Broadcast } from "./Broadcast";
import { KDDepartment, KDDirectory } from "./Directory";
import { QuickLink } from "./QuickLink";
import { File } from "./File";
import { KDPolicy } from "./Policy";
import { Achievement } from "./Achievement";
import { SearchOverride } from "./Search-Overrides";
import { HeroBanner } from "./HeroBanner";
import { Celebration } from "./Celebration";
import { Feedback } from "./Feedback";

const PayloadCollections: CollectionConfig[] = [
  Users,
  Media,
  File,
  HeroBanner,
  Broadcast,
  Achievement,
  KDDepartment,
  KDDirectory,
  KDPolicy,
  QuickLink,
  Celebration,
  Feedback,
];

export {
  Users,
  Media,
  File,
  HeroBanner,
  Broadcast,
  Achievement,
  KDDepartment,
  KDDirectory,
  KDPolicy,
  QuickLink,
  SearchOverride,
  Celebration,
  Feedback,
};
export default PayloadCollections;
