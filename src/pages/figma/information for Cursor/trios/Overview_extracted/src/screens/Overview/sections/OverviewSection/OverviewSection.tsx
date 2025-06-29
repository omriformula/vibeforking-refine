import {
  BellIcon,
  ClockIcon,
  SidebarIcon,
  StarIcon,
  SunIcon,
} from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";
import { Button } from "../../../../components/ui/button";

export const OverviewSection = (): JSX.Element => {
  // Define tooltip data for icons
  const iconTooltips = [
    { name: "Sidebar", shortcut: "⌘S" },
    { name: "Favorites", shortcut: "⌘F" },
    { name: "Toggle theme", shortcut: "⌘T" },
    { name: "Activities", shortcut: "⌘A" },
    { name: "Notifications", shortcut: "⌘N" },
    { name: "Rightbar", shortcut: "⌘R" },
  ];

  return (
    <header className="w-full flex items-center justify-between py-5 px-7 border-b-[0.5px] border-colors-black-10">
      <div className="flex items-center gap-2">
        <div className="flex flex-wrap gap-2 rounded-[var(--corner-radius-8)] items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-[var(--corner-radius-8)]"
          >
            <SidebarIcon className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-[var(--corner-radius-8)]"
          >
            <StarIcon className="w-5 h-5" />
          </Button>
        </div>

        <Breadcrumb className="ml-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                className="font-14-regular text-colors-black-40"
              >
                Dashboards
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-colors-black-20" />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                className="font-14-regular text-colors-black-100"
              >
                Default
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-start gap-5">
        <div className="flex items-center gap-2 w-40 p-1 bg-colors-black-4 rounded-[var(--corner-radius-8)]">
          <div className="flex items-center gap-2 flex-1 rounded-[var(--corner-radius-8)]">
            <img
              className="w-4 h-4"
              alt="Search"
              src="https://c.animaapp.com/5h59n1Cx/img/search.svg"
            />
            <span className="font-14-regular text-colors-black-20">Search</span>
          </div>
          <div className="flex items-center justify-center w-5 h-5 bg-colors-white-20 rounded-[var(--corner-radius-4-duplicate)] border-[0.5px] border-solid border-colors-black-4">
            <span className="font-12-regular text-colors-black-20 text-center">
              /
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 rounded-[var(--corner-radius-8)] items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-[var(--corner-radius-8)]"
          >
            <SunIcon className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-[var(--corner-radius-8)]"
          >
            <ClockIcon className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-[var(--corner-radius-8)]"
          >
            <BellIcon className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-[var(--corner-radius-8)]"
          >
            <SidebarIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
