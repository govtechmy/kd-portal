"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface SPLaSKW3CProps {
  className?: string;
}

/**
 * SPLaSK W3C Accessibility Component
 *
 * This component provides accessibility features as required by SPLaSK:
 * - Change font size
 * - Change font type
 * - Change background color
 *
 * Usage:
 * - Add to layout for global accessibility compliance
 * - Provides W3C accessibility controls in a floating widget style
 */
export const SPLaSKW3C: React.FC<SPLaSKW3CProps> = ({ className = "" }) => {
  const t = useTranslations("Accessibility");
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [fontSize, setFontSize] = useState(100); // percentage
  const [fontFamily, setFontFamily] = useState("default");
  const [backgroundColor, setBackgroundColor] = useState("default");

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Remove existing accessibility style tag
    const existingStyle = document.getElementById(
      "splask-accessibility-styles",
    );
    if (existingStyle) {
      existingStyle.remove();
    }

    // Apply font size
    root.style.fontSize = `${fontSize}%`;

    // Create style tag for font family and background color with maximum specificity
    const styleTag = document.createElement("style");
    styleTag.id = "splask-accessibility-styles";

    let cssRules = "";

    // Apply font family
    switch (fontFamily) {
      case "arial":
        cssRules += `
          html, body, * {
            font-family: Arial, sans-serif !important;
          }
        `;
        break;
      case "times":
        cssRules += `
          html, body, * {
            font-family: Times New Roman, serif !important;
          }
        `;
        break;
      case "verdana":
        cssRules += `
          html, body, * {
            font-family: Verdana, sans-serif !important;
          }
        `;
        break;
      default:
        // Reset to default
        break;
    }

    // Apply background color
    switch (backgroundColor) {
      case "white":
        cssRules += `
          html, body {
            background-color: #ffffff !important;
          }
          body > * {
            background-color: #ffffff !important;
          }
        `;
        break;
      case "yellow":
        cssRules += `
          html, body {
            background-color: #ffffcc !important;
          }
          body > * {
            background-color: #ffffcc !important;
          }
        `;
        break;
      case "blue":
        cssRules += `
          html, body {
            background-color: #ccf2ff !important;
          }
          body > * {
            background-color: #ccf2ff !important;
          }
        `;
        break;
      default:
        // Reset to default
        break;
    }

    if (cssRules) {
      styleTag.textContent = cssRules;
      document.head.appendChild(styleTag);
    }
  }, [fontSize, fontFamily, backgroundColor]);

  const resetSettings = () => {
    setFontSize(100);
    setFontFamily("default");
    setBackgroundColor("default");
  };

  const toggleMenu = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
      setIsClosing(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 500); // Match the enhanced animation duration
  };

  // Add keyboard shortcut for CTRL+U
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if 'CTRL + U' key combination is pressed
      if (event.ctrlKey && event.key === "u") {
        event.preventDefault();
        toggleMenu();
      }
      // Also support 'CMD + U' for Mac users
      if (event.metaKey && event.key === "u") {
        event.preventDefault();
        toggleMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Hidden SPLaSK W3C tag for crawler detection */}
      <div
        {...{ "splwpk-w3c": "splwpk-w3c" }}
        className="sr-only"
        aria-hidden="true"
      >
        W3C Accessibility Features Available
      </div>

      {/* Floating Accessibility Button */}
      <button
        onClick={toggleMenu}
        {...{ "splwpk-w3c": "splwpk-w3c" }}
        className="fixed bottom-4 right-3 z-50 flex h-14 min-h-[44px] w-14 min-w-[44px] items-center justify-center rounded-full bg-blue-600 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-700 hover:shadow-xl sm:right-4 sm:top-1/2 sm:h-12 sm:w-12 sm:-translate-y-1/2 sm:transform"
        aria-label={t("accessibility_menu")}
        title={t("menu_title")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Icon/accessible">
            <path
              id="Vector"
              d="M8.5 11.8L8.5 10.9V8.79507L8.5 8.53234C8.5 7.93066 8.14046 7.3872 7.58671 7.15185L4 5.5L5.54331 6.11733C8.40425 7.2617 11.5958 7.2617 14.4567 6.11733L16 5.5L12.4 7.15185C11.8463 7.3872 11.4867 7.93066 11.4867 8.53235V8.79507L11.4867 10.9L11.502 11.8M8.5 11.8L7.6 17.5M8.5 11.8L9 11.5C9.62489 11.1334 10.3751 11.1334 11 11.5L11.502 11.8M11.502 11.8L12.4 17.5M11 3.5C11 4.05228 10.5523 4.5 10 4.5C9.44772 4.5 9 4.05228 9 3.5C9 2.94772 9.44772 2.5 10 2.5C10.5523 2.5 11 2.94772 11 3.5Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      </button>

      {/* Accessibility Menu Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-start justify-center pt-8 transition-all duration-500 sm:items-center sm:pt-0 ${
            isClosing ? "animate-out fade-out" : "animate-in fade-in"
          }`}
        >
          {/* Backdrop with blur and darkening - enhanced transitions */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              isClosing
                ? "bg-black/0 backdrop-blur-none"
                : "bg-black/40 backdrop-blur-sm"
            }`}
            onClick={handleClose}
          />

          {/* Additional blur layer for navbar and content */}
          <div
            className={`pointer-events-none absolute inset-0 transition-all duration-700 ease-out ${
              isClosing ? "backdrop-blur-none" : "backdrop-blur-xs"
            }`}
          />

          {/* Menu Content with slide and fade animation */}
          <div
            {...{ "splwpk-w3c": "splwpk-w3c" }}
            className={`relative mx-4 mt-24 max-h-[75vh] w-full max-w-sm overflow-y-auto rounded-lg bg-white shadow-2xl transition-all duration-500 ease-out sm:mt-0 sm:max-h-[85vh] sm:max-w-md md:max-w-lg lg:max-w-xl ${
              isClosing
                ? "animate-out fade-out slide-out-to-bottom-4"
                : "animate-in fade-in slide-in-from-bottom-4"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
                {t("menu_title")}
              </h2>
              <button
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-2xl font-bold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                aria-label={t("close_menu")}
              >
                ×
              </button>
            </div>

            <div className="space-y-6 p-4 sm:p-6">
              {/* Font Size Control */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  {t("font_size")}
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { value: 80, label: t("small") },
                    { value: 100, label: t("normal") },
                    { value: 120, label: t("large") },
                    { value: 140, label: t("extra_large") },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFontSize(option.value)}
                      className={`flex min-h-[44px] items-center justify-center rounded-lg border p-4 text-sm font-medium transition-colors sm:p-3 ${
                        fontSize === option.value
                          ? "border-blue-300 bg-blue-100 text-blue-700"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Type Control */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  {t("font_type")}
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { value: "default", label: t("default") },
                    { value: "arial", label: t("arial") },
                    { value: "times", label: t("times") },
                    { value: "verdana", label: t("verdana") },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFontFamily(option.value)}
                      className={`flex min-h-[44px] items-center justify-center rounded-lg border p-4 text-sm font-medium transition-colors sm:p-3 ${
                        fontFamily === option.value
                          ? "border-blue-300 bg-blue-100 text-blue-700"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Color Control */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  {t("background_color")}
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    {
                      value: "default",
                      label: t("default"),
                      color: "bg-gray-100",
                    },
                    { value: "white", label: t("white"), color: "bg-white" },
                    {
                      value: "yellow",
                      label: t("yellow"),
                      color: "bg-yellow-200",
                    },
                    { value: "blue", label: t("blue"), color: "bg-blue-200" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setBackgroundColor(option.value)}
                      className={`flex min-h-[44px] items-center justify-center gap-3 rounded-lg border p-4 text-sm font-medium transition-colors sm:p-3 ${
                        backgroundColor === option.value
                          ? "border-blue-300 text-blue-700"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`h-5 w-5 rounded-full ${option.color} flex-shrink-0 border border-gray-300`}
                      ></div>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={resetSettings}
                  className="min-h-[44px] w-full rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300 sm:w-auto"
                >
                  {t("reset_default")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SPLaSKW3C;
