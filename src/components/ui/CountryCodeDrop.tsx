"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Country {
  code: string;
  dial_code: string;
  name: string;
}

interface CountryCodeDropdownProps {
  countries: Country[];
  selectedCode: string;
  onCodeChange: (code: string) => void;
  className?: string;
}

export default function CountryCodeDropdown({
  countries,
  selectedCode,
  onCodeChange,
  className,
}: CountryCodeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCountry = countries.find(
    (country) => country.dial_code === selectedCode,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-20 cursor-pointer items-center justify-between truncate rounded-l-lg border border-gray-200 bg-white px-2 text-sm shadow-sm shadow-gray-300"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedCode}
        <svg
          className={`h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 max-h-60 w-48 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg focus:outline-none"
          role="listbox"
        >
          {countries.map((country) => (
            <li
              key={country.code}
              className={cn(
                "cursor-pointer px-3 py-2 text-sm",
                selectedCode === country.dial_code
                  ? "bg-blue-100 text-blue-900"
                  : "hover:bg-gray-100",
              )}
              onClick={() => {
                onCodeChange(country.dial_code);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={selectedCode === country.dial_code}
            >
              <span className="font-semibold">{country.name}</span> -{" "}
              {country.dial_code}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
