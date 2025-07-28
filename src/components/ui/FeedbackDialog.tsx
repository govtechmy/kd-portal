"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import FeedbackForm from "./FeedbackForm";
import Envelope from "@/icons/envelope";
import CheckCircle from "@/icons/check-circle";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export default function FeedbackDialog() {
  const t = useTranslations("Feedback");
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"aduan" | "pertanyaan" | "cadangan">("aduan");
  const [submitted, setSubmitted] = useState(false);

  const closeModal = () => {
    setSubmitted(false);
    setOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "primary" }), "rounded-full")}
        onClick={() => setOpen(true)}
      >
        <Envelope />
        {t("button")}
      </button>

      {open && (
        <div className="bg-black/50 fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm md:overflow-y-hidden">
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className={cn(
                "relative w-full rounded-lg bg-white p-6 shadow-lg transition-all duration-300",
                "max-h-[90vh] overflow-y-auto md:max-h-none md:overflow-visible",
                submitted ? "max-w-sm" : "max-w-2xl",
              )}
            >
              <button
                onClick={closeModal}
                className="hover:text-black absolute right-4 top-4 rounded-lg border border-gray-200 p-2"
              >
                ✕
              </button>

              {!submitted ? (
                <>
                  <h2 className="mb-4 text-xl font-semibold">{t("title")}</h2>

                  <div className="mb-4 flex border-b">
                    {(["aduan", "pertanyaan", "cadangan"] as const).map(
                      (type) => (
                        <button
                          key={type}
                          onClick={() => setTab(type)}
                          className={cn(
                            "text-black px-4 py-2 text-sm font-medium",
                            tab === type
                              ? "border-b-2 border-blue-600 text-black-900"
                              : "hover:text-black-900",
                          )}
                        >
                          {t(`${type}.tab`)}
                        </button>
                      ),
                    )}
                  </div>

                  <FeedbackForm
                    type={tab}
                    onSuccess={() => setSubmitted(true)}
                  />
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
