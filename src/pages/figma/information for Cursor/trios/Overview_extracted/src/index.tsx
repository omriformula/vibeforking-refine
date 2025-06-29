import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Overview } from "./screens/Overview";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Overview />
  </StrictMode>,
);
