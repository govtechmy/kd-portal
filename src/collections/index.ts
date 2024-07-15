import { CollectionConfig } from "payload";
import { Users } from "./Users";
import { Media } from "./Media";
import { Broadcast } from "./Broadcast";
import { KDDepartment, KDDirectory } from "./Directory";
import { QuickLink } from "./QuickLink";
import { File } from "./File";
import { KDPolicy } from "./Policy";
import { Achievement } from "./Achievement";

const PayloadCollections: CollectionConfig[] = [
  Users,
  Media,
  File,
  Broadcast,
  Achievement,
  KDDepartment,
  KDDirectory,
  KDPolicy,
  QuickLink,
];

export {
  Users,
  Media,
  File,
  Broadcast,
  Achievement,
  KDDepartment,
  KDDirectory,
  KDPolicy,
  QuickLink,
};
export default PayloadCollections;
