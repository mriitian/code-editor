"use client";

import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { php } from "@codemirror/lang-php";
import { rust } from "@codemirror/lang-rust";
import Lang from "./Lang-Selector";
import {
  abcdef,
  darcula,
  nord,
  andromeda,
  abyss,
} from "@uiw/codemirror-themes-all"; // Import the themes you want to use

export default function CodeEditor() {
  const [code, setCode] = useState<string>("// Start typing your code...");
  const [output, setOutput] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("javascript");

  // Store code for each language separately
  const [languageCodes, setLanguageCodes] = useState<Record<string, string>>({
    javascript: "// Start typing your JavaScript code...",
    python: "# Start typing your Python code...",
    cpp: "// Start typing your C++ code...",
    go: "// Start typing your Go code...",
    php: "// Start typing your PHP code...",
    rust: "// Start typing your Rust code...",
  });

  const [theme, setTheme] = useState(abcdef); // Default theme set to abcdef

  const handleChange = (value: string) => {
    setCode(value);
    setLanguageCodes((prev) => ({
      ...prev,
      [language]: value,
    }));
  };

  const executeCode = async () => {
    try {
      const response = await fetch("/api/executeCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          code,
        }),
      });

      const result = await response.json();
      setOutput(result.output || "No Output");
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput("An unexpected error occurred.");
      }
    }
  };

  // Clear the output
  const clearOutput = () => {
    setOutput(null);
  };

  // Get CodeMirror language extension based on the selected language
  const getLanguageExtension = () => {
    switch (language) {
      case "python":
        return python();
      case "cpp":
        return cpp();
      case "go":
        return go();
      case "php":
        return php();
      case "rust":
        return rust();
      case "javascript":
      default:
        return javascript();
    }
  };

  useEffect(() => {
    // Load code for the selected language when the language changes
    setCode(languageCodes[language]);
  }, [language, languageCodes]);

  return (
    <div className="flex h-full">
      <div className="flex space-x-4">
        <Lang setLang={setLanguage} />
      </div>
      <div className="flex flex-col justify-center space-y-4 w-full">
        <div className="flex justify-center space-x-4 h-[80vh]">
          {/* Code Editor */}
          <div className="flex-1 h-full border rounded">
            <CodeMirror
              value={code}
              height="100%"
              theme={theme}
              extensions={[getLanguageExtension()]}
              onChange={handleChange}
              className="h-full"
            />
          </div>

          {/* Output Panel */}
          <div className="flex-1 h-full border rounded p-4">
            <h2 className="font-bold text-lg">Output:</h2>
            <pre className="mt-2 h-full overflow-auto">
              {output || "No output yet."}
            </pre>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={executeCode}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Run Code
          </button>
          <button
            onClick={clearOutput}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear Output
          </button>
          <button
            onClick={() => setTheme(abcdef)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            ABCDEF Theme
          </button>
          <button
            onClick={() => setTheme(darcula)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Darcula Theme
          </button>
          <button
            onClick={() => setTheme(nord)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Nord Theme
          </button>
          <button
            onClick={() => setTheme(andromeda)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Andromeda Theme
          </button>
          <button
            onClick={() => setTheme(abyss)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Abyss Theme
          </button>
        </div>
      </div>
    </div>
  );
}
