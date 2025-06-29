import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SchedulePayment } from "./screens/SchedulePayment";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <SchedulePayment />
  </StrictMode>,
);
