import React, { HTMLAttributes } from "react";

const ArrowDown: React.FC<HTMLAttributes<SVGElement>> = (props) => (
    <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
      d="M8 14L2 8L3.4 6.6L7 10.2V2H9V10.2L12.6 6.6L14 8L8 14Z"
      fill="currentColor"
      />
    </svg>
  );

export default ArrowDown;
