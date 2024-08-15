"use client";

import Script from "next/script";

const SiteScript = () => {
  if (process.env.APP_ENV === "development") {
    return null;
  }

  return (
    <>
      {
        <Script
          strategy="afterInteractive"
          id="clarity-script"
          type="text/javascript"
        >
          {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
        `}
        </Script>
      }
    </>
  );
};

export default SiteScript;
