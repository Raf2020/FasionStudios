"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type ConsentStatus = "pending" | "accepted" | "rejected" | "configured";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

export function CookieBanner() {
  const t = useTranslations("CookieBanner");
  const [consentGiven, setConsentGiven] = useState<ConsentStatus | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("cookie-consent");
    const savedPreferences = localStorage.getItem("cookie-preferences");

    if (consent) {
      setConsentGiven(consent as ConsentStatus);
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    } else {
      setConsentGiven("pending");
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-preferences", JSON.stringify(allAccepted));
    setConsentGiven("accepted");
    setPreferences(allAccepted);
    setShowBanner(false);
    setShowConfigModal(false);
    enableCookies(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
    };
    localStorage.setItem("cookie-consent", "rejected");
    localStorage.setItem("cookie-preferences", JSON.stringify(onlyNecessary));
    setConsentGiven("rejected");
    setPreferences(onlyNecessary);
    setShowBanner(false);
    setShowConfigModal(false);
    enableCookies(onlyNecessary);
  };

  const handleConfigure = () => {
    setShowBanner(false);
    setShowConfigModal(true);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", "configured");
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences));
    setConsentGiven("configured");
    setShowBanner(false);
    setShowConfigModal(false);
    enableCookies(preferences);
  };

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return; // Can't disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const enableCookies = (prefs: CookiePreferences) => {
    // Add your cookie enabling/disabling logic here
    if (prefs.analytics) {
      // Enable Google Analytics
      console.log("Analytics cookies enabled");
    } else {
      console.log("Analytics cookies disabled");
    }

    if (prefs.functional) {
      // Enable functional cookies
      console.log("Functional cookies enabled");
    } else {
      console.log("Functional cookies disabled");
    }

    if (prefs.marketing) {
      // Enable marketing cookies
      console.log("Marketing cookies enabled");
    } else {
      console.log("Marketing cookies disabled");
    }
  };

  if (!showBanner && !showConfigModal) {
    return null;
  }

  return (
    <>
      {/* Overlay to block interaction */}
      {(showBanner || showConfigModal) && (
        <div className="fixed inset-0 bg-black/50 z-[9998]" />
      )}

      {/* Cookie Banner */}
      {showBanner && consentGiven === "pending" && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-[9999] p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4">
              {/* Message */}
              <div className="text-sm text-gray-700">
                <p className="mb-2">{t("ConsentMessage")}</p>
                <p className="text-xs text-gray-600">
                  {t("Description")}{" "}
                  <Link
                    href="/cookie-policy"
                    className="text-blue-600 hover:underline"
                  >
                    {t("CookiePolicy")}
                  </Link>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
                <button
                  onClick={handleConfigure}
                  className="px-6 py-2 border border-gray-400 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  {t("ConfigureCookies")}
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-2 bg-gray-800 text-white text-sm font-medium hover:bg-gray-900 transition-colors"
                >
                  {t("RejectAll")}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 bg-gray-800 text-white text-sm font-medium hover:bg-gray-900 transition-colors"
                >
                  {t("AcceptAll")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {t("Title")}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                {t("Description")}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Necessary Cookies */}
              <CookieCategory
                title="Strictly Necessary Cookies"
                description="These cookies are essential for the website to function properly. They cannot be disabled."
                enabled={preferences.necessary}
                locked={true}
                onToggle={() => {}}
              />

              {/* Analytics Cookies */}
              <CookieCategory
                title="Analytics Cookies"
                description="These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously."
                enabled={preferences.analytics}
                locked={false}
                onToggle={() => handleTogglePreference("analytics")}
              />

              {/* Functional Cookies */}
              <CookieCategory
                title="Functional Cookies"
                description="These cookies enable enhanced functionality and personalization, such as videos and live chat."
                enabled={preferences.functional}
                locked={false}
                onToggle={() => handleTogglePreference("functional")}
              />

              {/* Marketing Cookies */}
              <CookieCategory
                title="Marketing Cookies"
                description="These cookies are used to track visitors across websites to display relevant advertisements."
                enabled={preferences.marketing}
                locked={false}
                onToggle={() => handleTogglePreference("marketing")}
              />
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={handleRejectAll}
                className="px-6 py-2 border border-gray-400 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                {t("RejectAll")}
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-gray-800 text-white text-sm font-medium hover:bg-gray-900 transition-colors"
              >
                {t("AcceptAll")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Cookie Category Component
interface CookieCategoryProps {
  title: string;
  description: string;
  enabled: boolean;
  locked: boolean;
  onToggle: () => void;
}

function CookieCategory({ title, description, enabled, locked, onToggle }: CookieCategoryProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-600">
            {description}
          </p>
        </div>
        <div className="ml-4">
          <button
            onClick={onToggle}
            disabled={locked}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              enabled ? "bg-blue-600" : "bg-gray-300"
            } ${locked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
      {locked && (
        <p className="text-xs text-gray-500 mt-2">
          Always Active
        </p>
      )}
    </div>
  );
}

