"use client";

import { useTranslations } from "next-intl";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import Envelope from "@/icons/envelope";
import { countries } from "@/lib/constants/countries-code";
import { useState } from "react";
import CountryCodeDropdown from "./CountryCodeDrop";

interface Props {
  type: "aduan" | "pertanyaan" | "cadangan";
  onSuccess: () => void;
}

export default function FeedbackForm({ type, onSuccess }: Props) {
  const t = useTranslations(`Feedback.${type}`);
  const [selectedCode, setSelectedCode] = useState("+60");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      type,
      name: formData.get("name") as string,
      ic_number: formData.get("ic_number") as string,
      address: formData.get("address") as string,
      phone_country_code: selectedCode,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      agency: formData.get("agency") as string,
      message: formData.get("message") as string,
    };

    const idRegex = /^\d{6}-\d{2}-\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!idRegex.test(data.ic_number)) {
      alert("Kad pengenalan mesti dalam format 123456-78-9999");
      return;
    }

    if (!emailRegex.test(data.email)) {
      alert("Sila masukkan emel yang sah");
      return;
    }

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        onSuccess();
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Row 1: Name */}
      <div>
        <label className="mb-1 block text-sm font-medium">{t("name")}</label>
        <input
          type="text"
          name="name"
          placeholder={t("name")}
          className="h-10 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 py-2 shadow-sm shadow-gray-300"
          required
        />
      </div>

      {/* Row 2: ID */}
      <div>
        <label className="mb-1 block text-sm font-medium">{t("id")}</label>
        <input
          type="text"
          name="ic_number"
          placeholder="000000-00-0000"
          pattern="^\d{6}-\d{2}-\d{4}$"
          title="Format: 000000-00-0000"
          className="h-10 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 py-2 shadow-sm shadow-gray-300"
          required
        />
      </div>

      {/* Row 3: Address */}
      <div>
        <label className="mb-1 block text-sm font-medium">{t("address")}</label>
        <textarea
          name="address"
          placeholder={t("address")}
          className="py- h-24 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 shadow-sm shadow-gray-300"
          required
        />
      </div>

      {/* Row 4: Phone + Email */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-normal">{t("phone")}</label>
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
              placeholder="13 3214 450"
              className="h-10 w-full rounded-r-lg border border-gray-200 px-3 py-2 shadow-sm shadow-gray-300"
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
              name="email"
              placeholder="hello@tech.gov.my"
              className="h-10 w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 shadow-sm shadow-gray-300"
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
          name="agency"
          placeholder="Kementerian Digital"
          className="h-10 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 py-2 shadow-sm shadow-gray-300"
          required
        />
      </div>

      {/* Row 6: Statement / Message */}
      <div>
        <label className="mb-1 block text-sm font-normal">{t("message")}</label>
        <textarea
          name="message"
          placeholder={t("placeholder")}
          className="h-24 w-full rounded-lg border-[1px] border-solid border-gray-200 px-3 py-2 shadow-sm shadow-gray-300"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4 text-right">
        <button
          type="submit"
          className={cn(buttonVariants({ variant: "primary" }), "rounded-lg")}
        >
          {t("submit")}
        </button>
      </div>
    </form>
  );
}
