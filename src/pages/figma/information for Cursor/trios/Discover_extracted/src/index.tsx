import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Discover } from "./screens/Discover";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Discover />
  </StrictMode>,
);
