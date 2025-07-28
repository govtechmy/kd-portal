import { FC } from "react";

interface BingIconProps {
  className?: string;
  size?: number;
}

const BingIcon: FC<BingIconProps> = ({ className = "", size = 16 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 50" fill="#00A1F1">
  <path d="M35 24.25l-22.177-7.761 4.338 10.82 6.923 3.225H35V24.25z" opacity=".7"/>
  <path d="M10 38.642V3.5L0 0v44.4L10 50l25-14.382V24.25z"/>
</svg>
  );
};

export default BingIcon; 