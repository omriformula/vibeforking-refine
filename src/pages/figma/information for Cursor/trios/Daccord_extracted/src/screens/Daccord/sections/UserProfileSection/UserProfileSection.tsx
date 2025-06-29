import React from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Card, CardContent } from "../../../../components/ui/card";

export const UserProfileSection = (): JSX.Element => {
  // User profile data
  const user = {
    name: "Sophie Fortune",
    username: "@sophiefortune",
    profileImage: "https://c.animaapp.com/MnblMAUi/img/user-profil@2x.png",
  };

  // Action icons data
  const actionIcons = [
    { symbol: "􀣪", fontFamily: "SF_Compact_Display-Regular" },
    { symbol: "􀋙", fontFamily: "SF_Compact_Display-Regular" },
    { symbol: "􀌤", fontFamily: "SF_Compact_Display-Regular" },
    { symbol: "􀣋", fontFamily: "SF_Pro_Display-Regular" },
  ];

  // New members data
  const newMembers = [
    {
      name: "Anne Couture",
      timeAgo: "5 min ago",
      image: "https://c.animaapp.com/MnblMAUi/img/user-profil-1@2x.png",
    },
    {
      name: "Miriam Soleil",
      timeAgo: "20 min ago",
      image: "https://c.animaapp.com/MnblMAUi/img/polygon-1-15@2x.png",
    },
    {
      name: "Marie Laval",
      timeAgo: "35 min ago",
      image: "https://c.animaapp.com/MnblMAUi/img/polygon-1-16@2x.png",
    },
    {
      name: "Mark Morain",
      timeAgo: "40 min ago",
      image: "https://c.animaapp.com/MnblMAUi/img/polygon-1-17@2x.png",
    },
  ];

  // Polygon images for profile decoration
  const polygonImages = [
    "https://c.animaapp.com/MnblMAUi/img/polygon-1-13.svg",
    "https://c.animaapp.com/MnblMAUi/img/polygon-1-12.svg",
    "https://c.animaapp.com/MnblMAUi/img/polygon-1-11.svg",
    "https://c.animaapp.com/MnblMAUi/img/polygon-1-10.svg",
    "https://c.animaapp.com/MnblMAUi/img/polygon-1-9.svg",
    "https://c.animaapp.com/MnblMAUi/img/polygon-1-8.svg",
    "https://c.animaapp.com/MnblMAUi/img/polygon-1-7.svg",
    "https://c.animaapp.com/MnblMAUi/img/polygon-1-6.svg",
    "https://c.animaapp.com/MnblMAUi/img/polygon-1-5.svg",
    "https://c.animaapp.com/MnblMAUi/img/polygon-1-4.svg",
    "https://c.animaapp.com/MnblMAUi/img/polygon-1-3.svg",
    "https://c.animaapp.com/MnblMAUi/img/polygon-1-2.svg",
    "https://c.animaapp.com/MnblMAUi/img/polygon-1-1.svg",
    "https://c.animaapp.com/MnblMAUi/img/polygon-1-14.svg",
  ];

  return (
    <aside className="w-[244px] h-full bg-[#2c2f48] shadow-[inset_1px_0px_0px_#ffffff1a] flex flex-col">
      {/* Header with action icons */}
      <header className="h-11 w-full bg-[#ffffff00] shadow-[inset_0px_-1px_0px_#ffffff1a]">
        <div className="flex w-[220px] items-center justify-between relative top-2 left-3">
          {actionIcons.map((icon, index) => (
            <div key={index} className="relative w-6 h-6">
              <div
                className={`top-0.5 left-0.5 [font-family:'${icon.fontFamily}',Helvetica] font-normal text-[#ffffff99] text-sm tracking-[0] absolute leading-[normal]`}
              >
                {icon.symbol}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* User profile section */}
      <div className="relative pt-8 pb-4 flex flex-col items-center">
        {/* Profile decoration */}
        <div className="relative w-[155px] h-[156px]">
          {polygonImages.map((src, index) => (
            <img
              key={index}
              className="absolute"
              alt="Polygon"
              src={src}
              style={{
                width: "135px to 151px",
                height: "132px to 151px",
                top: "0px to 15px",
                left: "0px to 9px",
              }}
            />
          ))}

          {/* Profile image */}
          <img
            className="absolute w-[111px] h-[121px] top-[0px] left-[-22px]"
            alt="User profile"
            src={user.profileImage}
          />
        </div>

        {/* User name and username */}
        <h2 className="mt-6 [font-family:'Lato',Helvetica] font-bold text-white text-[17px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
          {user.name}
        </h2>
        <p className="mt-2 [font-family:'Lato',Helvetica] text-[#ffffff40] text-[15px] text-center whitespace-nowrap font-normal tracking-[0] leading-[normal]">
          {user.username}
        </p>
      </div>

      {/* New members section */}
      <div className="flex flex-col px-4 mt-4 gap-2">
        <div className="flex justify-between items-center py-2">
          <h3 className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff8c] text-[15px] tracking-[0] leading-[normal] whitespace-nowrap">
            New Members
          </h3>
          <button className="[font-family:'Lato',Helvetica] text-[#ffffff40] font-normal text-[15px] text-right tracking-[0] leading-[normal] whitespace-nowrap">
            See all
          </button>
        </div>

        {/* Member cards */}
        {newMembers.map((member, index) => (
          <Card
            key={index}
            className="w-[212px] bg-[#ffffff4c] rounded-[5px] overflow-hidden bg-blend-overlay"
          >
            <CardContent className="p-2">
              <div className="flex items-center gap-2">
                <Avatar className="w-[39.1px] h-[41.29px]">
                  <AvatarImage src={member.image} alt={member.name} />
                </Avatar>
                <div className="flex flex-col">
                  <span className="[font-family:'Lato',Helvetica] font-normal text-white text-[15px] leading-tight">
                    {member.name}
                  </span>
                  <span className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff40] text-[13px] leading-tight">
                    {member.timeAgo}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Follow me section */}
      <div className="px-4 mt-8">
        <h3 className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff8c] text-[15px] tracking-[0] leading-[normal] whitespace-nowrap py-2">
          Follow me
        </h3>
      </div>
    </aside>
  );
};
