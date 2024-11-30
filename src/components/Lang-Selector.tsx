import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faJs,
  faPython,
  faCuttlefish,
  faGolang,
  faPhp,
  faRust,
} from "@fortawesome/free-brands-svg-icons";

interface LangProps {
  setLang: (language: string) => void; // Callback to update the language in CodeEditor
}

export default function Lang({ setLang }: LangProps) {
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("javascript");

  const languages = [
    { name: "JavaScript", value: "javascript", icon: faJs },
    { name: "Python", value: "python", icon: faPython },
    { name: "C++", value: "cpp", icon: faCuttlefish },
    { name: "Go", value: "go", icon: faGolang },
    { name: "PHP", value: "php", icon: faPhp },
    { name: "Rust", value: "rust", icon: faRust },
  ];

  const handleLanguageClick = (language: string) => {
    setSelectedLanguage(language);
    setLang(language);
  };

  return (
    <div className="flex flex-col items-start space-y-2 p-2">
      {languages.map((lang) => (
        <button
          key={lang.value}
          onClick={() => handleLanguageClick(lang.value)}
          className={`flex items-center px-4 py-2 border rounded-md w-full ${
            selectedLanguage === lang.value
              ? "bg-blue-500 text-white" // Active style
              : "bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
          }`}
        >
          <FontAwesomeIcon
            icon={lang.icon}
            className={`text-5xl ${
              selectedLanguage === lang.value ? "text-white" : "text-gray-600"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
