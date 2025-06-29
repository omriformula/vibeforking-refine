import React from "react";
import { MainContentSection } from "./sections/MainContentSection/MainContentSection";
import { NavigationSection } from "./sections/NavigationSection/NavigationSection";
import { NotificationsSection } from "./sections/NotificationsSection/NotificationsSection";
import { OverviewSection } from "./sections/OverviewSection/OverviewSection";

export const Overview = (): JSX.Element => {
  return (
    <div
      className="bg-white flex flex-col w-full h-screen"
      data-model-id="11:7382"
    >
      {/* Top Navigation Bar */}
      <OverviewSection />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Navigation */}
        <NavigationSection />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <MainContentSection />
        </div>

        {/* Right Notifications */}
        <div className="w-[280px]">
          <NotificationsSection />
        </div>
      </div>
    </div>
  );
};
