import CodeEditor from "./Code-Editor";

export default function Home() {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">CodeMirror in Next.js</h1>
      <CodeEditor />
    </div>
  );
}
