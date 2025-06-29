import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PaymentMethodNo } from "./screens/PaymentMethodNo";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <PaymentMethodNo />
  </StrictMode>,
);
