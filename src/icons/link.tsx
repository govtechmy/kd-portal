export default function Link({ ...props }) {
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
        d="M6.11338 8.8866L4.26677 10.7332C2.98921 12.0108 3.07267 14.1656 4.4532 15.5461C5.83372 16.9266 7.98853 17.0101 9.26609 15.7325L11.1127 13.8859M7.22643 12.7729L12.7729 7.22642M13.8859 11.1127L15.7325 9.26608C17.0101 7.98852 16.9266 5.83371 15.5461 4.45319C14.1656 3.07266 12.0108 2.98919 10.7332 4.26676L8.88661 6.11337"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
}
