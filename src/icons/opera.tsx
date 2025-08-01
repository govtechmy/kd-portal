import { FC } from "react";

interface OperaIconProps {
  className?: string;
  size?: number;
}

const OperaIcon: FC<OperaIconProps> = ({ className = "", size = 16 }) => {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M11.3953 23.8859C9.84219 22.0594 8.84688 19.3578 8.78125 16.3281V15.6719C8.84688 12.6422 9.85313 9.94063 11.3953 8.11406C13.4078 5.51094 16.3609 4.34063 19.6969 4.34063C21.7531 4.34063 23.6891 4.48281 25.3297 5.57656C22.8687 3.35625 19.6203 2.01094 16.0547 2H16C8.26719 2 2 8.26719 2 16C2 23.5031 7.90625 29.6391 15.3328 29.9891C15.5516 30 15.7812 30 16 30C19.5875 30 22.8578 28.6547 25.3297 26.4344C23.6891 27.5281 21.8625 27.5719 19.8062 27.5719C16.4813 27.5828 13.3969 26.5 11.3953 23.8859Z"
          fill="url(#paint0_linear_87_7112)"
        ></path>{" "}
        <path
          d="M11.3955 8.11426C12.6752 6.59395 14.3377 5.68613 16.1533 5.68613C20.233 5.68613 23.5361 10.3018 23.5361 16.0111C23.5361 21.7205 20.233 26.3361 16.1533 26.3361C14.3377 26.3361 12.6861 25.4174 11.3955 23.908C13.408 26.5111 16.3939 28.1736 19.7189 28.1736C21.7643 28.1736 23.6893 27.5502 25.3299 26.4564C28.1955 23.8752 30.0002 20.1455 30.0002 16.0002C30.0002 11.8549 28.1955 8.1252 25.3299 5.56582C23.6893 4.47207 21.7752 3.84863 19.7189 3.84863C16.383 3.84863 13.3971 5.5002 11.3955 8.11426Z"
          fill="url(#paint1_linear_87_7112)"
        ></path>{" "}
        <defs>
          {" "}
          <linearGradient
            id="paint0_linear_87_7112"
            x1="13.6655"
            y1="2.4564"
            x2="13.6655"
            y2="29.5926"
            gradientUnits="userSpaceOnUse"
          >
            {" "}
            <stop offset="0.3" stop-color="#FF1B2D"></stop>{" "}
            <stop offset="0.4381" stop-color="#FA1A2C"></stop>{" "}
            <stop offset="0.5939" stop-color="#ED1528"></stop>{" "}
            <stop offset="0.7581" stop-color="#D60E21"></stop>{" "}
            <stop offset="0.9272" stop-color="#B70519"></stop>{" "}
            <stop offset="1" stop-color="#A70014"></stop>{" "}
          </linearGradient>{" "}
          <linearGradient
            id="paint1_linear_87_7112"
            x1="20.696"
            y1="4.05613"
            x2="20.696"
            y2="28.0566"
            gradientUnits="userSpaceOnUse"
          >
            {" "}
            <stop stop-color="#9C0000"></stop>{" "}
            <stop offset="0.7" stop-color="#FF4B4B"></stop>{" "}
          </linearGradient>{" "}
        </defs>{" "}
      </g>
    </svg>
  );
};

export default OperaIcon;
