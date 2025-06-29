import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BuyerSide } from "./screens/BuyerSide";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BuyerSide />
  </StrictMode>,
);
