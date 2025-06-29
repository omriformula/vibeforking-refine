import { LogOutIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";

import { CapitalControlsSection } from "./sections/CapitalControlsSection";
import { DiscountRateSection } from "./sections/DiscountRateSection";
import { FormulaAISection } from "./sections/FormulaAISection";
import { MainContentSection } from "./sections/MainContentSection";
// Import all sections
import { PayoutPreviewSection } from "./sections/PayoutPreviewSection";
import { UpcomingPayoutsSection } from "./sections/UpcomingPayoutsSection";

export const BuyerSide = (): JSX.Element => {
  return (
    <div
      className="bg-background flex flex-row justify-center w-full"
      data-model-id="11:313"
    >
      <div className="bg-background w-full flex relative">
        {/* Sidebar */}
        <aside className="w-[220px] h-full bg-background border-r border-solid border-[#dfdfdf] flex flex-col justify-between">
          {/* Top section with logo */}
          <div className="p-7">
            <div className="flex flex-col items-start gap-[14.63px]">
              <div className="flex items-center gap-[7.32px]">
                <div className="flex items-center gap-[5.42px]">
                  <img
                    className="w-[63.37px] h-[16.39px]"
                    alt="Formula"
                    src="https://c.animaapp.com/ohMqHPdP/img/formula@2x.png"
                  />
                </div>
                <div className="[font-family:'Inter',Helvetica] font-normal text-[#0f171f87] text-[19.5px] leading-[27.3px] whitespace-nowrap">
                  Payers
                </div>
              </div>
              <Separator className="w-full" />
            </div>
          </div>

          {/* Capital Controls Section */}
          <div className="flex-grow">
            <CapitalControlsSection />
          </div>

          {/* Sign out button */}
          <div className="p-[18px] pb-7">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-[7.32px] p-[14.63px] rounded-[7.32px] h-[36.58px]"
            >
              <LogOutIcon className="w-[14.63px] h-[14.63px]" />
              <span className="[font-family:'Inter',Helvetica] font-normal text-[12.2px] leading-[17.1px]">
                Sign out
              </span>
            </Button>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 flex flex-col">
          {/* Main Content Section */}
          <section className="w-full">
            <MainContentSection />
          </section>

          {/* Middle sections */}
          <div className="flex flex-1">
            {/* Left column */}
            <div className="flex flex-col flex-1">
              {/* Discount Rate Section */}
              <section className="flex-1">
                <DiscountRateSection />
              </section>

              {/* Bottom row with PayoutPreview and FormulaAI */}
              <div className="flex">
                <section className="flex-1">
                  <PayoutPreviewSection />
                </section>
                <section className="flex-1">
                  <FormulaAISection />
                </section>
              </div>
            </div>

            {/* Right column - Upcoming Payouts */}
            <section className="w-[300px]">
              <UpcomingPayoutsSection />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};
