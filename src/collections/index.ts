import { CollectionConfig } from "payload";
import { Users } from "./Users";
import { Media } from "./Media";
import { Broadcast } from "./Broadcast";
import { KDDepartment, KDDirectory } from "./Directory";
import { QuickLink } from "./QuickLink";

const PayloadCollections: CollectionConfig[] = [
  Users,
  Media,
  Broadcast,
  KDDepartment,
  KDDirectory,
  QuickLink,
];

export { Users, Media, Broadcast, KDDepartment, KDDirectory, QuickLink };
export default PayloadCollections;
