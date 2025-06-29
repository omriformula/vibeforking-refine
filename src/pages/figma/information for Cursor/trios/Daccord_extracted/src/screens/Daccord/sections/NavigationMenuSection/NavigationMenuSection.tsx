import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";

// Navigation menu items data
const menuItems = [
  { icon: "􀎭", label: "Home", isActive: true },
  { icon: "􀑪", label: "Music", isActive: false },
  { icon: "􀛹", label: "Gaming", isActive: false },
  { icon: "􀫔", label: "Education", isActive: false },
  { icon: "􀤆", label: "Science & Tech", isActive: false },
  { icon: "􀊖", label: "Entertainment", isActive: false },
  { icon: "􀓥", label: "Student Hubs", isActive: false },
];

export const NavigationMenuSection = (): JSX.Element => {
  return (
    <div className="w-80 h-[844px]">
      <div className="relative h-full">
        {/* Left sidebar with icons */}
        <div className="w-[76px] h-full bg-[#1d203e4c] backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] absolute left-0 top-0">
          <div className="relative h-full">
            {/* Window control dots */}
            <div className="absolute w-[52px] h-3 top-3 left-3">
              <div className="absolute w-3 h-3 top-0 left-0 bg-[#ed695e] rounded-md" />
              <div className="absolute w-3 h-3 top-0 left-5 bg-[#f4bf4f] rounded-md" />
              <div className="absolute w-3 h-3 top-0 left-10 bg-[#61c554] rounded-md" />
            </div>

            {/* Logo */}
            <img
              className="absolute w-10 h-10 top-8 left-4"
              alt="Logo logo"
              src="https://c.animaapp.com/MnblMAUi/img/logo-logo.svg"
            />

            {/* Selected item highlight */}
            <div className="absolute w-[72px] h-[72px] top-[311px] left-0">
              <div className="relative w-[73px] h-[79px] -top-1 bg-[url(https://c.animaapp.com/MnblMAUi/img/blur.svg)] bg-[100%_100%]">
                <img
                  className="absolute w-[62px] h-[67px] top-1.5 left-[5px]"
                  alt="Polygon"
                  src="https://c.animaapp.com/MnblMAUi/img/polygon-12.svg"
                />
              </div>
            </div>

            {/* Sidebar background */}
            <img
              className="absolute w-[69px] h-[844px] top-0 left-[7px]"
              alt="Bar"
              src="https://c.animaapp.com/MnblMAUi/img/bar.svg"
            />

            {/* Selected indicator */}
            <img
              className="absolute w-[7px] h-[37px] top-[329px] left-[5px]"
              alt="Selected"
              src="https://c.animaapp.com/MnblMAUi/img/selected.svg"
            />

            {/* Navigation icons */}
            <div className="absolute w-10 h-10 top-[132px] left-5 rounded-[20px]">
              <div className="relative w-4 h-6 top-2 left-3">
                <div className="h-6">
                  <div className="relative w-4 h-[23px] top-px">
                    <img
                      className="absolute w-2 h-[21px] top-0.5 left-0"
                      alt="Rectangle"
                      src="https://c.animaapp.com/MnblMAUi/img/rectangle-818.svg"
                    />
                    <img
                      className="absolute w-[5px] h-2.5 top-3.5 left-[3px]"
                      alt="Rectangle"
                      src="https://c.animaapp.com/MnblMAUi/img/rectangle-822.svg"
                    />
                    <img
                      className="absolute w-2 h-[21px] top-0.5 left-2"
                      alt="Rectangle"
                      src="https://c.animaapp.com/MnblMAUi/img/rectangle-820.svg"
                    />
                    <img
                      className="absolute w-1 h-[5px] top-0 left-1"
                      alt="Rectangle"
                      src="https://c.animaapp.com/MnblMAUi/img/rectangle-821.svg"
                    />
                    <img
                      className="absolute w-[5px] h-[3px] top-4 left-[5px]"
                      alt="Rectangle"
                      src="https://c.animaapp.com/MnblMAUi/img/rectangle-815.svg"
                    />
                    <img
                      className="absolute w-1 h-[5px] top-0 left-2"
                      alt="Rectangle"
                      src="https://c.animaapp.com/MnblMAUi/img/rectangle-813.svg"
                    />
                    <img
                      className="absolute w-1 h-0.5 top-px left-1.5"
                      alt="Rectangle"
                      src="https://c.animaapp.com/MnblMAUi/img/rectangle-813-1.svg"
                    />
                    <img
                      className="absolute w-2 h-2.5 top-3.5 left-2"
                      alt="Group"
                      src="https://c.animaapp.com/MnblMAUi/img/group-1162@2x.png"
                    />
                    <img
                      className="absolute w-[9px] h-[5px] top-3 left-1"
                      alt="Rectangle"
                      src="https://c.animaapp.com/MnblMAUi/img/rectangle-814.svg"
                    />
                    <img
                      className="absolute w-1 h-1 top-[15px] left-2"
                      alt="Rectangle"
                      src="https://c.animaapp.com/MnblMAUi/img/rectangle-816.svg"
                    />
                    <img
                      className="absolute w-1 h-[15px] top-0.5 left-1"
                      alt="Rectangle"
                      src="https://c.animaapp.com/MnblMAUi/img/rectangle-818-1.svg"
                    />
                    <img
                      className="absolute w-1 h-[15px] top-0.5 left-2"
                      alt="Rectangle"
                      src="https://c.animaapp.com/MnblMAUi/img/rectangle-820-1.svg"
                    />
                    <img
                      className="absolute w-1 h-1 top-[15px] left-1"
                      alt="Rectangle"
                      src="https://c.animaapp.com/MnblMAUi/img/rectangle-817.svg"
                    />
                    <img
                      className="absolute w-[3px] h-1 top-4 left-0"
                      alt="Rectangle"
                      src="https://c.animaapp.com/MnblMAUi/img/rectangle-823.svg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <img
              className="top-[196px] absolute w-10 h-10 left-5"
              alt="Logo group"
              src="https://c.animaapp.com/MnblMAUi/img/logo-group-2.svg"
            />
            <img
              className="top-[260px] absolute w-10 h-10 left-5"
              alt="Logo group"
              src="https://c.animaapp.com/MnblMAUi/img/logo-group-3.svg"
            />
            <img
              className="absolute w-10 h-10 top-[388px] left-5"
              alt="Logo icon add"
              src="https://c.animaapp.com/MnblMAUi/img/logo-icon-add.svg"
            />

            {/* Compass icon */}
            <div className="absolute w-10 h-10 top-[324px] left-5">
              <div className="relative w-[50px] h-[50px] top-[-5px] left-[-5px] bg-[url(https://c.animaapp.com/MnblMAUi/img/blur-1.svg)] bg-[100%_100%]">
                <img
                  className="absolute w-10 h-10 top-[5px] left-[5px]"
                  alt="Ellipse"
                  src="https://c.animaapp.com/MnblMAUi/img/ellipse-330.svg"
                />
                <img
                  className="absolute w-[22px] h-[22px] top-3.5 left-3.5 bg-blend-overlay"
                  alt="Compass"
                  src="https://c.animaapp.com/MnblMAUi/img/compass.svg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation menu */}
        <div className="absolute w-[244px] h-full top-0 left-[76px] bg-[#2c2f4880]">
          {/* Header */}
          <header className="w-full h-11 bg-[#ffffff00] shadow-[inset_0px_-1px_0px_#ffffff1a]">
            <h1 className="absolute top-[11px] left-4 font-bold text-white text-[17px]">
              Explore
            </h1>
          </header>

          {/* Navigation menu items */}
          <nav className="flex flex-col items-start gap-2 absolute top-14 left-4">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant={item.isActive ? "secondary" : "ghost"}
                className={`relative w-[212px] h-10 rounded-[5px] justify-start p-0 ${
                  item.isActive ? "bg-[#00000080]" : ""
                }`}
              >
                <div className="inline-flex items-center gap-2 pl-2">
                  <div className="relative w-6 h-6">
                    <div
                      className={`absolute top-0.5 left-[3px] ${
                        item.isActive
                          ? "font-bold text-white"
                          : "font-normal text-[#ffffff99]"
                      } text-sm tracking-[0.36px]`}
                    >
                      {item.icon}
                    </div>
                  </div>
                  <span className="font-normal text-white text-[15px] tracking-[0.36px]">
                    {item.label}
                  </span>
                </div>
              </Button>
            ))}
          </nav>
        </div>

        {/* Audio visualization */}
        <div className="absolute w-80 h-[84px] top-[688px] left-0">
          <div className="relative h-[136px] top-[-26px]">
            <img
              className="absolute w-80 h-[89px] top-[26px] left-0"
              alt="Rectangle"
              src="https://c.animaapp.com/MnblMAUi/img/rectangle-828.svg"
            />
            <img
              className="absolute w-80 h-[136px] top-0 left-0"
              alt="Polygon"
              src="https://c.animaapp.com/MnblMAUi/img/polygon-14.svg"
            />
            <img
              className="absolute w-[250px] h-[38px] top-[49px] left-[35px]"
              alt="Frame"
              src="https://c.animaapp.com/MnblMAUi/img/frame-9.svg"
            />
          </div>
        </div>

        {/* User profile footer */}
        <div className="absolute w-80 h-[72px] top-[772px] left-0 bg-[#1d203e] shadow-[inset_-1px_0px_0px_#ffffff1a]">
          <div className="flex items-center gap-1 absolute top-5 left-3">
            <Avatar className="w-[28.71px] h-[31.76px]">
              <AvatarImage
                src="https://c.animaapp.com/MnblMAUi/img/profile@2x.png"
                alt="Profile"
              />
              <AvatarFallback>SF</AvatarFallback>
            </Avatar>
            <span className="text-white text-[13px] font-normal">
              sophiefortune
            </span>
          </div>

          <div className="flex w-[139px] items-start justify-between absolute top-5 left-[165px]">
            <div className="relative w-8 h-8">
              <div className="w-[34px] h-8">
                <div className="relative w-[29px] h-8 left-0.5 bg-[url(https://c.animaapp.com/MnblMAUi/img/polygon-1.svg)] bg-[100%_100%]">
                  <div className="absolute h-[17px] top-[7px] left-1.5 font-medium text-[#ffffff99] text-sm text-center">
                    􀊱
                  </div>
                </div>
              </div>
            </div>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <div className="relative w-5 h-[17px]">
                <div className="absolute top-0 left-0 font-medium text-[#ffffff99] text-sm">
                  􀺹
                </div>
              </div>
            </Button>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <div className="relative w-[18px] h-[17px]">
                <div className="absolute top-0 left-0 font-medium text-[#ffffff99] text-sm">
                  􀜕
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
