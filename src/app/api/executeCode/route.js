import axios from "axios";

export async function POST(req) {
  try {
    const { language, code } = await req.json();

    let response;

    if (language === "javascript") {
      try {
        const output = eval(code);
        response = { output: output?.toString() || "No Output" };
      } catch (error) {
        response = { output: `Error: ${error.message}` };
      }
    } else {
      const languageMapping = {
        python: "python3", // Map "python" to "python3"
        javascript: "nodejs", // Example for JavaScript if needed
      };

      const jdoodleLanguage = languageMapping[language] || language;

      const payload = {
        script: code,
        language: jdoodleLanguage,
        versionIndex: null, // Set versionIndex to null if not required
        clientId: "d15cc637476f2fd66de8c530d45a1e25",
        clientSecret:
          "2dc9af15febc5e578456091c80bab1e0dfae29b460ea5c3026dc69a82db7671e",
      };

      const jdoodleResponse = await axios.post(
        "https://api.jdoodle.com/v1/execute",
        payload
      );
      response = jdoodleResponse.data;
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return new Response(JSON.stringify({ error: "Code execution failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
