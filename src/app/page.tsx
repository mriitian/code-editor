import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import CodeEditor from "@/components/Code-Editor";

export default function Home() {
  return (
    <div>
      <main>
        <CodeEditor />
        <div className="absolute top-10 right-10">
          <ThemeToggle />
        </div>
      </main>
    </div>
  );
}
