"use client";

import { useTranslations } from "next-intl";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import Envelope from "@/icons/envelope";
import { countries } from "@/lib/constants/countries-code";
import { useState } from "react";

interface Props {
  type: "aduan" | "pertanyaan" | "cadangan";
  onSuccess: () => void;
}

export default function FeedbackForm({ type, onSuccess }: Props) {
  const t = useTranslations(`Feedback.${type}`);
  const [selectedCode, setSelectedCode] = useState("+60");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const id =
      form.querySelector<HTMLInputElement>(
        'input[placeholder="000000-00-0000"]',
      )?.value || "";
    const email =
      form.querySelector<HTMLInputElement>('input[type="email"]')?.value || "";

    const idRegex = /^\d{6}-\d{2}-\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!idRegex.test(id)) {
      alert("Kad pengenalan mesti dalam format 123456-78-9999");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Sila masukkan emel yang sah");
      return;
    }

    // Simulate Successful Submission - Will update to API
    setTimeout(() => {
      onSuccess();
    }, 500);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Row 1: Name */}
      <div>
        <label className="mb-1 block text-sm font-medium">{t("name")}</label>
        <input
          type="text"
          placeholder={t("name")}
          className="h-10 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 py-2"
          required
        />
      </div>

      {/* Row 2: ID */}
      <div>
        <label className="mb-1 block text-sm font-medium">{t("id")}</label>
        <input
          type="text"
          placeholder="000000-00-0000"
          pattern="^\d{6}-\d{2}-\d{4}$"
          title="Format: 000000-00-0000"
          className="h-10 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 py-2"
          required
        />
      </div>

      {/* Row 3: Address */}
      <div>
        <label className="mb-1 block text-sm font-medium">{t("address")}</label>
        <textarea
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequ"
          className="h-24 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 py-2"
          required
        />
      </div>

      {/* Row 4: Phone + Email */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-normal">{t("phone")}</label>
          <div className="relative flex w-full">
            <select
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
              className="h-10 w-20 truncate rounded-l-lg border border-gray-200 bg-white px-2 text-sm"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.dial_code}>
                  {country.name} ({country.dial_code})
                </option>
              ))}
            </select>
            <input
              type="tel"
              placeholder="13 3214 450"
              className="h-10 w-full rounded-r-lg border border-gray-200 px-3 py-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-normal">{t("email")}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <Envelope className="h-4 w-4" />
            </span>
            <input
              type="email"
              placeholder="hello@tech.gov.my"
              className="h-10 w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3"
              required
            />
          </div>
        </div>
      </div>

      {/* Row 5: Agency */}
      <div>
        <label className="mb-1 block text-sm font-normal">{t("agency")}</label>
        <input
          type="text"
          placeholder="Kementerian Digital"
          className="h-10 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 py-2"
          required
        />
      </div>

      {/* Row 6: Statement / Message */}
      <div>
        <label className="mb-1 block text-sm font-normal">{t("message")}</label>
        <textarea
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequ"
          className="h-24 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 py-2"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4 text-right">
        <button
          type="submit"
          className={cn(buttonVariants({ variant: "primary" }), "rounded-full")}
        >
          {t("submit")}
        </button>
      </div>
    </form>
  );
}
