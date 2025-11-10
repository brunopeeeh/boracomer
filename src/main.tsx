import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Inicializa tema antes de renderizar
(() => {
  try {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldDark = saved ? saved === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", shouldDark);
  } catch {}
})();

createRoot(document.getElementById("root")!).render(<App />);
