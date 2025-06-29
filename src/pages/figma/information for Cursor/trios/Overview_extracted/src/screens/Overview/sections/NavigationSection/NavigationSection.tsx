import { ChevronRightIcon, PieChartIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { Separator } from "../../../../components/ui/separator";

export const NavigationSection = (): JSX.Element => {
  // Navigation data for mapping
  const favorites = [
    {
      name: "Overview",
      icon: "https://c.animaapp.com/5h59n1Cx/img/dot-1.svg",
      active: true,
    },
    {
      name: "Projects",
      icon: "https://c.animaapp.com/5h59n1Cx/img/dot-1.svg",
      active: false,
    },
  ];

  const dashboards = [
    {
      name: "Overview",
      icon: <PieChartIcon className="w-5 h-5" />,
      active: true,
    },
    {
      name: "eCommerce",
      icon: (
        <img
          className="w-5 h-5"
          alt="Shopping bag open"
          src="https://c.animaapp.com/5h59n1Cx/img/shoppingbagopen.svg"
        />
      ),
      active: false,
    },
    {
      name: "Projects",
      icon: (
        <img
          className="w-5 h-5"
          alt="Folder notch"
          src="https://c.animaapp.com/5h59n1Cx/img/foldernotch.svg"
        />
      ),
      active: false,
    },
  ];

  const pages = [
    {
      name: "User Profile",
      icon: (
        <img
          className="w-5 h-5"
          alt="Identification badge"
          src="https://c.animaapp.com/5h59n1Cx/img/identificationbadge.svg"
        />
      ),
      active: false,
      hasSubpages: true,
      subpages: [
        { name: "Overview", active: false },
        { name: "Projects", active: false },
        { name: "Campaigns", active: false },
        { name: "Documents", active: false },
        { name: "Followers", active: false },
      ]
    },
    {
      name: "Account",
      icon: (
        <img
          className="w-5 h-5"
          alt="Identification card"
          src="https://c.animaapp.com/5h59n1Cx/img/identificationcard.svg"
        />
      ),
      active: false,
    },
    {
      name: "Corporate",
      icon: (
        <img
          className="w-5 h-5"
          alt="Users three"
          src="https://c.animaapp.com/5h59n1Cx/img/usersthree.svg"
        />
      ),
      active: false,
    },
    {
      name: "Blog",
      icon: (
        <img
          className="w-5 h-5"
          alt="Notebook"
          src="https://c.animaapp.com/5h59n1Cx/img/notebook.svg"
        />
      ),
      active: false,
    },
    {
      name: "Social",
      icon: (
        <img
          className="w-5 h-5"
          alt="Chats teardrop"
          src="https://c.animaapp.com/5h59n1Cx/img/chatsteardrop.svg"
        />
      ),
      active: false,
    },
  ];

  return (
    <aside className="flex flex-col h-full w-[240px] border-r border-colors-black-10 py-[var(--spacing-16)] px-[var(--spacing-16)]">
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-[var(--spacing-8-duplicate)]">
          {/* Brand section */}
          <div className="flex flex-col items-start gap-[var(--spacing-4)] pb-[var(--spacing-12)]">
            <div className="flex items-center gap-[var(--spacing-8-duplicate)] p-[var(--spacing-8-duplicate)] w-full rounded-[var(--corner-radius-8)]">
              <div className="[display:var(--show-icon-show-icon,inline-flex)] items-center justify-center rounded-[var(--corner-radius-8)]">
                <div className="relative w-6 h-6 bg-colors-black-4 rounded-[var(--corner-radius-80)] overflow-hidden [display:var(--show-icon-show-icon)]">
                  <div className="h-6 bg-[url(https://c.animaapp.com/5h59n1Cx/img/frame@2x.png)] bg-cover bg-[50%_50%]" />
                </div>
              </div>
              <div className="[display:var(--show-text-show-text,inline-flex)] flex-col items-start justify-center">
                <span className="font-14-regular text-colors-black-100">
                  ByeWind
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start px-0 py-0.5 w-full opacity-0">
              <Separator className="w-full h-px" />
            </div>

            {/* Favorites section */}
            <div className="flex flex-wrap gap-[var(--spacing-8-duplicate)] w-full rounded-[var(--corner-radius-8)] items-center">
              <Button
                variant="ghost"
                className="h-[var(--spacing-size-28)] px-[var(--spacing-8-duplicate)] py-[var(--spacing-4)]"
              >
                <span className="font-14-regular text-colors-black-40">
                  Favorites
                </span>
              </Button>
              <Button
                variant="ghost"
                className="h-[var(--spacing-size-28)] px-[var(--spacing-8-duplicate)] py-[var(--spacing-4)]"
              >
                <span className="font-14-regular text-colors-black-20">
                  Recently
                </span>
              </Button>
            </div>

            {/* Favorites items */}
            {favorites.map((item, index) => (
              <Button
                key={`favorite-${index}`}
                variant={item.active ? "secondary" : "ghost"}
                className="flex items-center gap-[var(--spacing-4)] p-[var(--spacing-8-duplicate)] w-full justify-start rounded-[var(--corner-radius-12-duplicate)]"
              >
                <img className="w-4 h-4" alt="Dot" src={item.icon} />
                <span className="font-14-regular text-colors-black-100">
                  {item.name}
                </span>
              </Button>
            ))}
          </div>

          {/* Dashboards section */}
          <div className="flex flex-col items-start gap-[var(--spacing-4)] pb-[var(--spacing-12)]">
            <div className="[display:var(--show-text-show-text,flex)] flex-col items-start justify-center pt-[var(--spacing-4)] pr-[var(--spacing-12)] pb-[var(--spacing-4)] pl-[var(--spacing-12)] w-full">
              <span className="font-14-regular text-colors-black-40">
                Dashboards
              </span>
            </div>

            {dashboards.map((item, index) => (
              <Button
                key={`dashboard-${index}`}
                variant={item.active ? "secondary" : "ghost"}
                className={`flex items-center gap-[var(--spacing-4)] p-[var(--spacing-8-duplicate)] w-full justify-start rounded-[var(--corner-radius-12-duplicate)] ${item.active ? "bg-colors-black-4" : ""}`}
              >
                {!item.active && <ChevronRightIcon className="w-4 h-4" />}
                <div className="flex items-center gap-[var(--spacing-8-duplicate)] flex-1">
                  <div className="[display:var(--show-icon-show-icon,inline-flex)] items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-14-regular text-colors-black-100">
                    {item.name}
                  </span>
                </div>
              </Button>
            ))}
          </div>

          {/* Pages section */}
          <div className="flex flex-col items-start gap-[var(--spacing-4)] pb-[var(--spacing-12)]">
            <div className="[display:var(--show-text-show-text,flex)] flex-col items-start justify-center pt-[var(--spacing-4)] pr-[var(--spacing-12)] pb-[var(--spacing-4)] pl-[var(--spacing-12)] w-full">
              <span className="font-14-regular text-colors-black-40">
                Pages
              </span>
            </div>

            {pages.map((item, index) => (
              <React.Fragment key={`page-${index}`}>
                <Button
                  variant="ghost"
                  className="flex items-center gap-[var(--spacing-4)] p-[var(--spacing-8-duplicate)] w-full justify-start rounded-[var(--corner-radius-12-duplicate)]"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                  <div className="flex items-center gap-[var(--spacing-8-duplicate)] flex-1">
                    {item.icon && (
                      <div className="[display:var(--show-icon-show-icon,inline-flex)] items-center justify-center">
                        {item.icon}
                      </div>
                    )}
                    <span className="font-14-regular text-colors-black-100">
                      {item.name}
                    </span>
                  </div>
                </Button>
                
                {item.hasSubpages && item.subpages && (
                  <div className="pl-8">
                    {item.subpages.map((subpage, subIndex) => (
                      <Button
                        key={`subpage-${index}-${subIndex}`}
                        variant="ghost"
                        className="flex items-center gap-[var(--spacing-4)] p-[var(--spacing-8-duplicate)] w-full justify-start rounded-[var(--corner-radius-12-duplicate)]"
                      >
                        <span className="font-14-regular text-colors-black-100">
                          {subpage.name}
                        </span>
                      </Button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Footer logo */}
      <div className="flex justify-center items-center p-[var(--spacing-8-duplicate)] mt-auto rounded-[var(--corner-radius-8)] backdrop-blur-[20px]">
        <div className="relative w-[74px] h-5">
          <img
            className="absolute w-[50px] h-[9px] top-1.5 left-6"
            alt="Snowui logo"
            src="https://c.animaapp.com/5h59n1Cx/img/snowui-logo.svg"
          />
          <img
            className="absolute w-5 h-5 top-0 left-0"
            alt="Snowui logo"
            src="https://c.animaapp.com/5h59n1Cx/img/snowui-logo-1.svg"
          />
        </div>
      </div>
    </aside>
  );
};
