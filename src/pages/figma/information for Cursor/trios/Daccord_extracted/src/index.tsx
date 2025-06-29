import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Daccord } from "./screens/Daccord";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Daccord />
  </StrictMode>,
);
