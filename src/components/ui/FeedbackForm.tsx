"use client";

import { useTranslations } from "next-intl";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import Envelope from "@/icons/envelope";
import { countries } from "@/lib/constants/countries-code";
import { useState, useEffect } from "react";
import CountryCodeDropdown from "./CountryCodeDrop";

interface Props {
  type: "aduan" | "pertanyaan" | "cadangan";
  onSuccess: () => void;
}

declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: any) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback: () => void;
  }
}

export default function FeedbackForm({ type, onSuccess }: Props) {
  const t = useTranslations(`Feedback.${type}`);
  const validationT = useTranslations("Feedback.validation");
  const placeholdersT = useTranslations("Feedback.placeholders");
  const [selectedCode, setSelectedCode] = useState("+60");
  const [icNumber, setIcNumber] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string>("");
  const [turnstileVerified, setTurnstileVerified] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    ic_number?: string;
    email?: string;
    phone_number?: string;
  }>({});
  const errors: { ic_number?: string; email?: string; phone_number?: string } =
    {};

  const [isLoading, setIsLoading] = useState(false);

  const formatIcNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Format as 000000-00-0000
    if (digits.length <= 6) {
      return digits;
    } else if (digits.length <= 8) {
      return `${digits.slice(0, 6)}-${digits.slice(6)}`;
    } else {
      return `${digits.slice(0, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 12)}`;
    }
  };

  const handleIcNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatIcNumber(e.target.value);
    setIcNumber(formatted);
  };

  // Load Cloudflare Turnstile script with best practices
  useEffect(() => {
    const turnstileSiteKey =
      process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;
    const isDevelopment = process.env.NODE_ENV === "development";

    // Skip Turnstile in development or if not properly configured
    if (
      isDevelopment ||
      !turnstileSiteKey ||
      turnstileSiteKey === "1x00000000000000000000AA"
    ) {
      console.log(
        "Turnstile skipped:",
        isDevelopment ? "development mode" : "not configured",
      );
      return;
    }

    // Prevent multiple initializations
    if (turnstileWidgetId) {
      return;
    }

    let scriptLoaded = false;
    let scriptElement: HTMLScriptElement | null = null;
    let retryCount = 0;
    const maxRetries = 3;

    const loadTurnstile = () => {
      if (!window.turnstile || turnstileWidgetId) {
        return;
      }

      try {
        // Clear any existing widget first
        const existingWidget = document.querySelector("#turnstile-widget");
        if (existingWidget) {
          existingWidget.innerHTML = "";
        }

        const widgetId = window.turnstile.render("#turnstile-widget", {
          sitekey: turnstileSiteKey,
          callback: (token: string) => {
            console.log("Turnstile success, token received");
            setTurnstileToken(token);
            setTurnstileVerified(true);
          },
          "expired-callback": () => {
            console.log("Turnstile token expired");
            setTurnstileToken("");
            setTurnstileVerified(false);
            // Reset the widget when token expires
            if (window.turnstile && turnstileWidgetId) {
              window.turnstile.reset(turnstileWidgetId);
            }
          },
          "error-callback": () => {
            console.log("Turnstile error occurred");
            setTurnstileToken("");
            setTurnstileVerified(false);
          },
          // Add theme and size options for better UX
          theme: "light",
          size: "normal",
        });

        setTurnstileWidgetId(widgetId);
        console.log("Turnstile widget rendered successfully");
      } catch (error) {
        console.error("Error rendering Turnstile widget:", error);
        // Retry if widget rendering fails
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(loadTurnstile, 1000 * retryCount);
        }
      }
    };

    const initializeTurnstile = () => {
      if (window.turnstile) {
        loadTurnstile();
      } else if (!scriptLoaded) {
        // Check if script is already loaded
        const existingScript = document.querySelector(
          'script[src*="turnstile"]',
        );
        if (existingScript) {
          scriptLoaded = true;
          // Wait a bit for the script to initialize
          setTimeout(loadTurnstile, 100);
          return;
        }

        scriptElement = document.createElement("script");
        scriptElement.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js";
        scriptElement.async = true;
        scriptElement.defer = true;
        scriptElement.onload = () => {
          scriptLoaded = true;
          // Add a small delay to ensure Turnstile is fully loaded
          setTimeout(loadTurnstile, 100);
        };
        scriptElement.onerror = () => {
          console.error("Failed to load Turnstile script");
        };
        document.head.appendChild(scriptElement);
      }
    };

    // Initialize with a longer delay to ensure DOM is ready and component is fully mounted
    const timer = setTimeout(initializeTurnstile, 300);

    return () => {
      clearTimeout(timer);
      if (turnstileWidgetId && window.turnstile) {
        try {
          window.turnstile.remove(turnstileWidgetId);
        } catch (error) {
          console.error("Error removing Turnstile widget:", error);
        }
      }
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [turnstileWidgetId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      type,
      name: formData.get("name") as string,
      ic_number: icNumber,
      address: formData.get("address") as string,
      phone_country_code: selectedCode,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      agency: formData.get("agency") as string,
      message: formData.get("message") as string,
      "cf-turnstile-response": turnstileToken,
    };

    const idRegex = /^\d{6}-\d{2}-\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // --- Client-side validation ---
    const errors: { email?: string; ic_number?: string } = {};
    if (!idRegex.test(data.ic_number)) {
      errors.ic_number = validationT("ic_format_error");
    }
    if (!emailRegex.test(data.email)) {
      errors.email = validationT("email_format_error");
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return; // stop here, don't show spinner
    }

    // --- Captcha check ---
    const turnstileSiteKey =
      process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;
    const isDevelopment = process.env.NODE_ENV === "development";

    if (
      !isDevelopment &&
      turnstileSiteKey &&
      turnstileSiteKey !== "1x00000000000000000000AA" &&
      !turnstileToken
    ) {
      setErrorMessage("Please complete the verification before submitting.");
      return; // stop here, no spinner
    }

    // ✅ Passed all instant checks — show spinner now
    setIsLoading(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let serverMessage = "Something went wrong while submitting the form.";
        try {
          const errorData = await response.json();
          if (errorData?.message) serverMessage = errorData.message;
        } catch {
          // ignore JSON parsing errors
        }
        setErrorMessage(serverMessage);
        return;
      }

      onSuccess();
    } catch {
      setErrorMessage(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsLoading(false);

      // Always reset captcha after submission
      if (turnstileWidgetId && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId);
      }
      setTurnstileToken("");
      setTurnstileVerified(false);
    }
  };

  return (
    <form
      {...{ "splwpk-feedback-form": "splwpk-feedback-form" }}
      className="flex flex-col gap-[6px] space-y-3"
      onSubmit={handleSubmit}
    >
      {/* Row 1: Name */}
      <div className="flex flex-col gap-[6px]">
        <label className="mb-0.5 block text-sm font-medium">{t("name")}</label>
        <input
          type="text"
          name="name"
          placeholder={t("name")}
          className="h-8 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 py-1.5 text-sm shadow-input-shadow"
          required
        />
      </div>

      {/* Row 2: ID + Phone + Email */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-1">
          <label className="mb-0.5 block text-sm font-medium">{t("id")}</label>
          <input
            type="text"
            name="ic_number"
            value={icNumber}
            onChange={handleIcNumberChange}
            placeholder={placeholdersT("ic_format")}
            pattern="^\d{6}-\d{2}-\d{4}$"
            title={placeholdersT("ic_title")}
            className="h-8 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 py-1.5 text-sm shadow-input-shadow"
            required
            maxLength={14}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.ic_number}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="mb-0.5 block text-sm font-normal">
            {t("phone")}
          </label>
          <div className="relative flex w-full">
            <CountryCodeDropdown
              countries={countries}
              selectedCode={selectedCode}
              onCodeChange={setSelectedCode}
              className="z-20"
            />
            <input
              type="tel"
              name="phone"
              placeholder={placeholdersT("phone")}
              className="h-8 w-full rounded-r-lg border border-gray-200 px-3 py-1.5 text-sm shadow-input-shadow"
              required
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors.phone_number}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="mb-0.5 block text-sm font-normal">
            {t("email")}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <Envelope className="h-4 w-4" />
            </span>
            <input
              type="email"
              name="email"
              placeholder={placeholdersT("email")}
              className="h-8 w-full rounded-lg border border-gray-200 py-1.5 pl-10 pr-3 text-sm shadow-input-shadow"
              required
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      {/* Row 3: Address */}
      <div className="space-y-1">
        <label className="mb-0.5 block text-sm font-medium">
          {t("address")}
        </label>
        <textarea
          name="address"
          placeholder={t("address")}
          className="h-20 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 py-1.5 text-sm shadow-input-shadow"
          required
        />
      </div>

      {/* Row 4: Agency */}
      <div className="space-y-1">
        <label className="mb-0.5 block text-sm font-medium">
          {t("agency")}
        </label>
        <input
          type="text"
          name="agency"
          placeholder={placeholdersT("agency")}
          className="h-8 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 py-1.5 text-sm shadow-input-shadow"
          required
        />
      </div>

      {/* Row 5: Statement / Message */}
      <div className="space-y-1">
        <label className="mb-0.5 block text-sm font-medium">
          {t("message")}
        </label>
        <textarea
          name="message"
          placeholder={t("placeholder")}
          className="h-20 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 py-1.5 text-sm shadow-input-shadow"
          required
        />
      </div>

      {/* Row 6: Cloudflare Turnstile */}
      {process.env.NODE_ENV === "production" &&
        process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY &&
        process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY !==
          "1x00000000000000000000AA" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <label className="text-sm font-medium text-gray-700">
                Security Verification
              </label>
            </div>

            <div className="flex justify-center">
              <div id="turnstile-widget"></div>
            </div>

            {/* Hidden input for Turnstile response */}
            <input
              type="hidden"
              name="cf-turnstile-response"
              value={turnstileToken}
            />
          </div>
        )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <div className="p-6 text-right">
        <button
          type="submit"
          disabled={isLoading}
          className={`flex w-full items-center justify-center rounded-md px-4 py-2 text-white ${
            isLoading
              ? "cursor-not-allowed bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? (
            <svg
              className="h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
}
