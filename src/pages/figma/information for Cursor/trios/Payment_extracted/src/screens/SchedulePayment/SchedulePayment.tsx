import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { CalendarSection } from "./sections/CalendarSection";
import { PaymentInfoSection } from "./sections/PaymentInfoSection";

export const SchedulePayment = (): JSX.Element => {
  return (
    <main
      className="flex min-h-screen w-full items-center justify-center p-8 relative"
      data-model-id="7:48"
    >
      <div className="absolute inset-0 w-full h-full bg-[#e8e8e8]">
        <img
          className="absolute w-[816px] h-full top-0 left-0"
          alt="Star background decoration"
          src="https://c.animaapp.com/mNrNJXyS/img/star.svg"
        />
        <img
          className="absolute w-[518px] h-[439px] top-0 right-0"
          alt="Light decoration"
          src="https://c.animaapp.com/mNrNJXyS/img/light.svg"
        />
      </div>

      <Card className="flex flex-col w-full relative z-10 bg-transparent">
        <CardContent className="flex flex-col items-start gap-6 p-0 w-full">
          <PaymentInfoSection />
          <CalendarSection />
        </CardContent>
      </Card>
    </main>
  );
};
