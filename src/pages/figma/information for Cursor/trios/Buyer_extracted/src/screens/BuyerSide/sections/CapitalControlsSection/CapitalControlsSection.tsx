import { BarChart3Icon, HomeIcon, SettingsIcon, UsersIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";

export const CapitalControlsSection = (): JSX.Element => {
  // Navigation menu items data
  const menuItems = [
    {
      icon: <HomeIcon className="w-[14.63px] h-[14.63px]" />,
      text: "Create",
      isActive: true,
    },
    {
      icon: <SettingsIcon className="w-[14.63px] h-[14.63px]" />,
      text: "Manage",
      isActive: false,
    },
    {
      icon: <UsersIcon className="w-[14.63px] h-[14.63px]" />,
      text: "Team",
      isActive: false,
    },
    {
      icon: <BarChart3Icon className="w-[14.63px] h-[14.63px]" />,
      text: "Finance",
      isActive: false,
    },
  ];

  return (
    <nav className="flex flex-col w-[169px] items-start gap-[14.63px]">
      {menuItems.map((item, index) => (
        <Button
          key={index}
          variant="ghost"
          className={`flex h-[36.58px] items-center gap-[7.32px] p-[14.63px] w-full rounded-[7.32px] justify-start ${
            item.isActive ? "bg-[#5d65f8]" : ""
          }`}
        >
          {item.icon}
          <span
            className={`font-normal text-[12.2px] leading-[17.1px] ${
              item.isActive ? "text-white" : "text-black"
            }`}
          >
            {item.text}
          </span>
        </Button>
      ))}
    </nav>
  );
};
