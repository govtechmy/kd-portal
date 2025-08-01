import { FC } from "react";

interface InternetExplorerIconProps {
  className?: string;
  size?: number;
}

const InternetExplorerIcon: FC<InternetExplorerIconProps> = ({
  className = "",
  size = 16,
}) => {
  return (
    <svg
      viewBox="0 0 3000 3000"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path fill="#2672ec" d="M0 0h3000v3000H0z"></path>
        <path
          fill="#ffffff"
          d="M2563 1520c0-170-45-330-121-468 328-742-352-634-390-626a1718 1718 0 00-400 130 965 965 0 00-995 746c242-270 411-380 513-423l-48 43a707 707 0 01-46 45l-104 110-22 26-18 20-20 25a124 124 0 00-18 22l-20 23-33 44-19 25-12 17a3519 3519 0 00-105 152l-25 40-23 38v1a2148 2148 0 00-187 370c-275 980 580 567 700 505a965 965 0 001336-542h-506a445 445 0 01-385 212c-243 0-440-184-440-411h1380c5-40 8-82 8-124zm-180-950c82 56 149 144 35 441a968 968 0 00-471-391c89-43 310-134 435-50zM616 2383c-68-70-80-239 70-547a968 968 0 00420 514c-97 53-353 173-490 33zm557-1003c7-220 200-398 436-398a425 425 0 01435 398h-871z"
        ></path>
      </g>
    </svg>
  );
};

export default InternetExplorerIcon;
