"use client";

import Script from "next/script";

const TinybirdScript = () => {
  return (
    <Script
      id="tinybird-script"
      src="https://unpkg.com/@tinybirdco/flock.js"
      strategy="afterInteractive"
      defer
      data-host={process.env.NEXT_PUBLIC_TINYBIRD_HOST}
      data-token={process.env.TINYBIRD_TOKEN}
      // onLoad={() => {
      //   const script = document.querySelector("script[data-host]");
      //   if (script) {
      //     script.setAttribute(
      //       "data-host",
      //       `${process.env.NEXT_PUBLIC_TINYBIRD_HOST}`,
      //     );
      //     script.setAttribute("data-token", `${process.env.TINYBIRD_TOKEN}`);
      //   }
      // }}
    />
  );
};

export default TinybirdScript;
