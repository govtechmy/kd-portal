"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import FeedbackForm from "./FeedbackForm";
import Envelope from "@/icons/envelope";
import CheckCircle from "@/icons/check-circle";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export default function FeedbackDialog({className}: {className?: string}) {
  const t = useTranslations("Feedback");
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"aduan" | "pertanyaan" | "cadangan">("aduan");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  const closeModal = () => {
    setSubmitted(false);
    setOpen(false);
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(buttonVariants({ variant: "primary" }), "rounded-full",className)}
        disabled
      >
        <Envelope />
        {t("button")}
      </button>
    );
  }

  return (
    <div className={className}>
      <button
        type="button"
        className={cn(
          buttonVariants({ variant: "primary" }),
          "h-10 rounded-full",
        )}
        onClick={() => setOpen(true)}
      >
        <Envelope />
        {t("button")}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-[rgba(0,0,0,0.5)] backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
            <div
              className={cn(
                "relative w-full rounded-lg bg-white shadow-lg transition-all duration-300",
                "max-h-[90vh] overflow-y-auto sm:max-h-none sm:overflow-visible",
                submitted ? "max-w-sm" : "max-w-4xl",
              )}
            >
              <button
                onClick={closeModal}
                className="hover:text-black absolute right-2 top-2 z-10 rounded-lg border border-gray-200 px-2 py-0.5 sm:right-4 sm:top-4"
              >
                ✕
              </button>

              {!submitted ? (
                <>
                  <div className="flex justify-start gap-2 px-6 pb-[18] pt-6">
                    <Envelope className="mt-1 h-6 w-6" />
                    <h2 className="mb-4 text-xl font-semibold">{t("title")}</h2>
                  </div>

                  <div className="flex border-b-[1px] font-medium">
                    {(["aduan", "pertanyaan", "cadangan"] as const).map(
                      (type) => (
                        <button
                          key={type}
                          onClick={() => setTab(type)}
                          className={cn(
                            "group relative px-6 py-2 text-sm font-medium",
                            tab === type ? "text-black-900" : "text-black",
                          )}
                        >
                          <span
                            className={cn(
                              "relative",
                              tab === type ? "text-black-900" : "text-black",
                            )}
                          >
                            {t(`${type}.tab`)}

                            {tab === type && (
                              <span className="absolute bottom-[-10px] left-0 right-0 h-[1px] bg-blue-600"></span>
                            )}
                          </span>
                        </button>
                      ),
                    )}
                  </div>

                  <div className="max-h-[50vh] overflow-y-auto p-6 sm:max-h-none sm:overflow-visible sm:pb-0">
                    <FeedbackForm
                      type={tab}
                      onSuccess={() => setSubmitted(true)}
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="mx-auto h-11 w-11 text-green-600">
                    <CheckCircle className="h-full w-full" />
                  </div>

                  <h3 className="text-lg font-bold">{t("success.title")}</h3>
                  <p className="text-sm text-gray-600">{t("success.desc")}</p>
                  <button
                    className={cn(
                      buttonVariants({ variant: "primary" }),
                      "w-full rounded-lg",
                    )}
                    onClick={closeModal}
                  >
                    {t("success.continue")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
