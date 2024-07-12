import { CollectionConfig } from "payload";
import { Users } from "./Users";
import { Media } from "./Media";
import { Broadcast } from "./Broadcast";
import { KDDepartment, KDDirectory } from "./Directory";

const PayloadCollections: CollectionConfig[] = [
  Users,
  Media,
  Broadcast,
  KDDepartment,
  KDDirectory,
];

export { Users, Media, Broadcast, KDDepartment, KDDirectory };
export default PayloadCollections;
