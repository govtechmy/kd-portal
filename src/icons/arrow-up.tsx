import React, { HTMLAttributes } from "react";

const ArrowUp: React.FC<HTMLAttributes<SVGElement>> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 2L14 8L12.6 9.4L9 5.8V14H7V5.8L3.4 9.4L2 8L8 2Z"
      fill="currentColor"
    />
  </svg>
);

export default ArrowUp;
