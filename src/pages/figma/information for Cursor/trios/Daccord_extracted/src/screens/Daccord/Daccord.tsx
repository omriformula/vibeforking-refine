import React from "react";
import { MainFeedSection } from "./sections/MainFeedSection";
import { NavigationMenuSection } from "./sections/NavigationMenuSection";
import { UserProfileSection } from "./sections/UserProfileSection";

export const Daccord = (): JSX.Element => {
  return (
    <main
      className="bg-transparent flex flex-row justify-center w-full"
      data-model-id="12:14741"
    >
      <div className="w-full max-w-[1280px] flex flex-row">
        <NavigationMenuSection />
        <MainFeedSection />
        <UserProfileSection />
      </div>
    </main>
  );
};
