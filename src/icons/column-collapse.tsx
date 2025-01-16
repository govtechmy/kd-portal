export default function ColumnCollapse({ ...props }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 6L12 10L16 14"
        stroke="#18181B"
        strokeWidth="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 14L8 10L4 6"
        stroke="#18181B"
        strokeWidth="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 10L18 10"
        stroke="#18181B"
        strokeWidth="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2 10H8"
        stroke="#18181B"
        strokeWidth="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
