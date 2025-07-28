import { FC } from "react";

interface FirefoxIconProps {
  className?: string;
  size?: number;
}

const FirefoxIcon: FC<FirefoxIconProps> = ({ className = "", size = 16 }) => {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <ellipse cx="50" cy="50" rx="24" ry="24" fill="#80e"></ellipse> <path d="M50 42c-14-7-11-8-16-11-1-4-1-8 0-12-5 2-9 5-12 9-1-4-1.4-7-1-12C8 24 2 38 2 50c-0 31 26 49 48 49 22 0 48-16 48-49 0-5 0-9-3-16-9 21-23 40-45 40-8 0-23-4-23-25 7-2 16-3 23-7z" fill="#f73"></path> <path d="M50 42c-17 6-20-8-35 0 3 6 7 7 11 7 0 20 12 26 24 26 19 0 37-9 45-41-7-17-23-19-29-34-9 6-15 14-16 26 12 0 24 10 24 24 0 15-14 23-24 23-5 0-19-2-21-17 2-6 8-8 16-9 3-1 4-3 5-5z" fill="#fc3"></path> </g></svg>
  );
};

export default FirefoxIcon; 