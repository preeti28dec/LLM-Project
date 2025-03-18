import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProApps from "./logos/pro-apps.svg";
import ProEMR from "./logos/emr-white.svg";
import ProBM from "./logos/bm-logo.svg";
import ProPIM from "./logos/pim-logo.svg";
import en from "../../language/en.json";
import fr from "../../language/fr.json";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const translations = language === "fr" ? fr : en;

  const MyApp = "ProEMR";
  const AppType = { ProEMR: translations.medical, ProBM: translations.business, ProPIM: translations.personal };
  const AppColor = { ProEMR: "#0c3ff0", ProPIM: "#ff8f8f", ProBM: "#1271b8" };
  const AppLogos = { ProEMR: ProEMR, ProBM: ProBM, ProPIM: ProPIM };

  const appType = AppType[MyApp] || "Unknown";
  const appColor = AppColor[MyApp] || "#000";
  const appLogo = AppLogos[MyApp] || ProApps;

  const AppLinks = [
    { id: "ProBM", name: translations.business, url: "https://s6.appsolutly.com/bm/web/" },
    { id: "ProEMR", name: translations.medical, url: "https://s6.appsolutly.com/emr/web/" },
    { id: "ProPIM", name: translations.personal, url: "https://s6.appsolutly.com/pim/web/" },
  ].filter((app) => app.id !== MyApp);

  return (
    <header className="shadow-md w-full top-0 z-50" style={{ backgroundColor: appColor }}>
      <nav className="container mx-auto px-4 lg:px-6 py-2.5 flex justify-between items-center">
        <div className="flex items-center space-x-3 text-white font-semibold text-lg">
          <img src={appLogo} className="h-8" alt={`${MyApp} Logo`} />
          <span>{appType}</span>
        </div>
        <div className="hidden lg:flex items-center space-x-6 text-white">
          {AppLinks.map(({ id, name, url }) => (
            <Link key={id} to={url} className="hover:underline">
              {name}
            </Link>
          ))}
          <Link to="https://s6.appsolutly.com/contact-app/web/contact/index" className="hover:underline">
            {translations.contacts}
          </Link>
          <Link to="https://s6.appsolutly.com/message-app/web/" className="hover:underline">
            {translations.messages}
          </Link>
        </div>

        {/* Right - User Actions */}
        <div className="hidden lg:flex items-center space-x-4 text-white">
          <button className="hover:underline">Preeti Thakur</button>

          {/* Language Dropdown */}
          <select
            className={`bg-transparent p-1 rounded text-white}`}
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value="en" className={"text-black"}>English</option>
            <option value="fr" className={"text-black"}>Français</option>
          </select>

          <button className="hover:underline">{translations.logout}</button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white">
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 py-3 space-y-2 text-white" style={{ backgroundColor: appColor }}>
          {AppLinks.map(({ id, name }) => (
            <Link key={id} to={`/${id.toLowerCase()}`} className="block text-white">
              {name}
            </Link>
          ))}
          <Link to="/contacts" className="block text-white">
            {translations.contacts}
          </Link>
          <Link to="/messages" className="block text-white">
            {translations.messages}
          </Link>
          <hr className="border-white" />
          <button className="block text-white">Preeti Thakur</button>
          <select
            className="block bg-transparent  p-1 rounded w-full"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
          <button className="block text-white" >
          {/* <a id="logout" class="nav-link" href="https://iamonline.app/auth/realms/iamonline/protocol/openid-connect/auth?client_id=iamDemo&redirect_uri=https://localhost&scope=openid&response_type=code&response_mode=query&nonce=32123"> */}
           {translations.logout}
           {/* </a> */}
           </button>
        </div>
      )}
    </header>
  );
}
