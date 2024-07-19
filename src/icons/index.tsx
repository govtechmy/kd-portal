import React, { HTMLAttributes } from "react";
import { Option } from "payload";
import { JSX } from "react";
import ArrowBack from "./arrow-back";
import ArrowForward from "./arrow-forward";
import ArrowOutgoing from "./arrow-outgoing";
import Bolt from "./bolt";
import CheckCircle from "./check-circle";
import Checkmark14PointStar from "./checkmark-14-point-star";
import CheckmarkShield from "./checkmark-shield";
import ChevronDown from "./chevron-down";
import ChevronLeft from "./chevron-left";
import ChevronRight from "./chevron-right";
import ChevronUp from "./chevron-up";
import CrossX from "./cross-x";
import Direction from "./direction";
import Ellipsis from "./ellipsis";
import Envelope from "./envelope";
import EyeShow from "./eye-show";
import FileDocumentPaper from "./file-document-paper";
import Flag from "./flag";
import Globe from "./globe";
import Gov from "./gov";
import HamburgerMenu from "./hamburger-menu";
import Lock from "./lock";
import Map from "./map";
import Money from "./money";
import Phone from "./phone";
import Search from "./search";
import SolidLock from "./solid-lock";
import Star from "./star";
import Trophy from "./trophy";
import UserGroup from "./user-group";

export const IconList: Record<
  string,
  (props: HTMLAttributes<SVGElement>) => JSX.Element
> = {
  "arrow-back": (props) => <ArrowBack {...props} />,
  "arrow-forward": (props) => <ArrowForward {...props} />,
  "arrow-outgoing": (props) => <ArrowOutgoing {...props} />,
  bolt: (props) => <Bolt {...props} />,
  "check-circle": (props) => <CheckCircle {...props} />,
  "checkmark-14-point-star": (props) => <Checkmark14PointStar {...props} />,
  "checkmark-shield": (props) => <CheckmarkShield {...props} />,
  "chevron-down": (props) => <ChevronDown {...props} />,
  "chevron-left": (props) => <ChevronLeft {...props} />,
  "chevron-right": (props) => <ChevronRight {...props} />,
  "chevron-up": (props) => <ChevronUp {...props} />,
  "cross-x": (props) => <CrossX {...props} />,
  direction: (props) => <Direction {...props} />,
  ellipsis: (props) => <Ellipsis {...props} />,
  envelope: (props) => <Envelope {...props} />,
  "eye-show": (props) => <EyeShow {...props} />,
  "file-document-paper": (props) => <FileDocumentPaper {...props} />,
  flag: (props) => <Flag {...props} />,
  globe: (props) => <Globe {...props} />,
  gov: (props) => <Gov {...props} />,
  "hamburger-menu": (props) => <HamburgerMenu {...props} />,
  lock: (props) => <Lock {...props} />,
  map: (props) => <Map {...props} />,
  money: (props) => <Money {...props} />,
  phone: (props) => <Phone {...props} />,
  search: (props) => <Search {...props} />,
  "solid-lock": (props) => <SolidLock {...props} />,
  star: (props) => <Star {...props} />,
  trophy: (props) => <Trophy {...props} />,
  "user-group": (props) => <UserGroup {...props} />,
};

const IconListOptions: Option[] = Object.keys(IconList).map((key) => ({
  label: key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
  value: key,
}));

export default IconListOptions;
