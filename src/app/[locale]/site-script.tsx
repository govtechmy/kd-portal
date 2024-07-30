"use client";

import Script from "next/script";

const SiteScript = () => {
  return (
    <>
      <Script strategy="lazyOnload" id="clarity-script" type="text/javascript">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
        `}
      </Script>

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
    </>
  );
};

export default SiteScript;
