import { SearchIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const MainFeedSection = (): JSX.Element => {
  // Featured communities data
  const featuredCommunities = [
    {
      id: 1,
      title: "Virtual Reality",
      description:
        "A community for VR and novices alike, regular and friendly chat.",
      onlineCount: "5,678",
      memberCount: "345,678",
      backgroundImage: "https://c.animaapp.com/MnblMAUi/img/group-img@2x.png",
      avatarImage: "https://c.animaapp.com/MnblMAUi/img/avatar.svg",
    },
    {
      id: 2,
      title: "Game Play",
      description: "Always a new challenge. Great place to make new friends.",
      onlineCount: "28,628",
      memberCount: "527,953",
      backgroundImage:
        "https://c.animaapp.com/MnblMAUi/img/featured-card-2.svg",
    },
  ];

  // Popular communities data
  const popularCommunities = [
    {
      id: 1,
      title: "3D Art",
      description: "A great place to discuss art.",
      memberCount: "345,678",
      backgroundImage:
        "https://c.animaapp.com/MnblMAUi/img/photo-1634986666676-ec8fd927c23d-1@2x.png",
      polygonImage1: "https://c.animaapp.com/MnblMAUi/img/polygon-16.svg",
      polygonImage2: "https://c.animaapp.com/MnblMAUi/img/polygon-17.svg",
    },
    {
      id: 2,
      title: "NFT",
      description: "An NFT community so that everyone can share their NFTs.",
      memberCount: "887,789",
      backgroundImage: "https://c.animaapp.com/MnblMAUi/img/popular-card-2.svg",
    },
  ];

  // Recent communities data
  const recentCommunities = [
    {
      id: 1,
      title: "Movie recapped",
      description: "Discuss your favourite movies and TV serie here.",
      memberCount: "3",
      backgroundImage:
        "https://c.animaapp.com/MnblMAUi/img/photo-1651211305258-0c08f09097b3-1@2x.png",
    },
    {
      id: 2,
      backgroundImage: "https://c.animaapp.com/MnblMAUi/img/recent-card-4.svg",
    },
    {
      id: 3,
      backgroundImage:
        "https://c.animaapp.com/MnblMAUi/img/recent-card-4-1.svg",
    },
  ];

  return (
    <div className="w-full max-w-[716px] h-[844px] mx-auto">
      {/* SearchIcon header */}
      <div className="w-full h-11 bg-[#2c2f48] flex items-center justify-center">
        <div className="w-[442px] h-6 rounded border border-solid border-[#ffffff33] flex items-center justify-center">
          <div className="flex items-center gap-1">
            <SearchIcon className="w-6 h-6 text-white" />
            <div className="font-normal text-white text-[13px] [font-family:'Lato',Helvetica]">
              Explore
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="w-full h-[800px] bg-[#1d203e] p-6 overflow-y-auto">
        {/* Banner */}
        <Card className="w-full h-[180px] rounded-[20px] overflow-hidden mb-6 border-none">
          <CardContent className="p-0 h-full">
            <div
              className="h-full w-full flex items-center justify-center bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://c.animaapp.com/MnblMAUi/img/photo-1647351408653-d582b364bf2f.png)",
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="[font-family:'SF_Compact_Rounded-Regular',Helvetica] font-normal text-white text-2xl text-center">
                  Find Your Community
                </div>
                <div className="[font-family:'SF_Compact_Rounded-Regular',Helvetica] font-normal text-white text-2xl text-center">
                  on Daccord
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Community Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[22px]">
              Featured Community
            </h2>
            <span className="[font-family:'SF_Compact_Rounded-Regular',Helvetica] font-normal text-[#ffffff8c] text-[15px] cursor-pointer">
              See all
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {featuredCommunities.map((community) => (
              <Card
                key={community.id}
                className="h-[210px] bg-[#2c2f48] rounded-[20px] overflow-hidden border-none shadow-[0px_10px_20px_#00000080]"
              >
                <CardContent className="p-0 h-full relative">
                  <div
                    className="w-full h-full bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url(${community.backgroundImage})`,
                    }}
                  >
                    {community.id === 1 && (
                      <>
                        <img
                          className="absolute w-full h-[150px] bottom-0 left-0"
                          alt="Shape"
                          src="https://c.animaapp.com/MnblMAUi/img/shape.svg"
                        />
                        <img
                          className="absolute w-[38px] h-9 top-[62px] left-[141px]"
                          alt="Avatar"
                          src={community.avatarImage}
                        />
                      </>
                    )}

                    <div className="absolute bottom-[70px] left-3">
                      <h3 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[22px]">
                        {community.title}
                      </h3>
                    </div>

                    <div className="absolute bottom-[40px] left-3 w-[90%]">
                      <p className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff8c] text-[13px]">
                        {community.description}
                      </p>
                    </div>

                    <div className="absolute bottom-3 left-3 w-[90%] flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <span className="[font-family:'SF_Compact-Regular',Helvetica] font-normal text-[#ffffff40] text-xs">
                          􁂛
                        </span>
                        <span className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff40] text-xs">
                          {community.onlineCount} Online
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] font-normal text-text-colordarktertiary text-xs">
                          􀉭
                        </span>
                        <span className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff40] text-xs">
                          {community.memberCount} Members
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Right Now Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[22px]">
              Popular Right Now
            </h2>
            <span className="[font-family:'SF_Compact_Rounded-Regular',Helvetica] font-normal text-[#ffffff8c] text-[15px] cursor-pointer">
              See all
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {popularCommunities.map((community) => (
              <Card
                key={community.id}
                className="h-[154px] bg-[#2c2f48] rounded-[20px] overflow-hidden border-none shadow-[0px_10px_20px_#00000080]"
              >
                <CardContent className="p-0 h-full relative">
                  {community.id === 1 ? (
                    <div className="relative w-full h-full">
                      <img
                        className="absolute w-[135px] h-[152px] top-0 left-0 object-cover"
                        alt="Background"
                        src={community.backgroundImage}
                      />

                      <div className="absolute w-[222px] h-full top-0 left-[99px] rounded-[20px] overflow-hidden border border-solid border-[#ffffff66] bg-[linear-gradient(124deg,rgba(91,127,214,1)_0%,rgba(27,177,208,1)_100%)]">
                        <div className="relative w-full h-full bg-[url(https://c.animaapp.com/MnblMAUi/img/rectangle-831.svg)] bg-[100%_100%]">
                          <h3 className="absolute top-5 left-12 [font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[22px]">
                            {community.title}
                          </h3>

                          <p className="absolute top-[54px] left-12 [font-family:'Lato',Helvetica] font-normal text-[#ffffff8c] text-[13px]">
                            {community.description}
                          </p>

                          <div className="absolute bottom-5 left-12 flex items-center gap-1">
                            <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] font-normal text-text-colordarktertiary text-xs">
                              􀉭
                            </span>
                            <span className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff40] text-xs">
                              {community.memberCount} Members
                            </span>
                          </div>
                        </div>
                      </div>

                      <img
                        className="absolute w-[75px] h-20 top-11 left-[62px] object-cover"
                        alt="Polygon"
                        src={community.polygonImage1}
                      />

                      <img
                        className="absolute w-[79px] h-[84px] top-[42px] left-[60px]"
                        alt="Polygon"
                        src={community.polygonImage2}
                      />
                    </div>
                  ) : (
                    <img
                      className="w-full h-full object-cover"
                      alt="Popular card"
                      src={community.backgroundImage}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Add Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="[font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[22px]">
              Recent Add
            </h2>
            <span className="[font-family:'SF_Compact_Rounded-Regular',Helvetica] font-normal text-[#ffffff8c] text-[15px] cursor-pointer">
              See all
            </span>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {recentCommunities.map((community) => (
              <Card
                key={community.id}
                className="h-[202px] bg-[#2c2f48] rounded-[20px] overflow-hidden border-none shadow-[0px_10px_20px_#00000080]"
              >
                <CardContent className="p-0 h-full relative">
                  {community.id === 1 ? (
                    <>
                      <img
                        className="w-full h-[26px] object-cover"
                        alt="Header"
                        src={community.backgroundImage}
                      />

                      <div className="p-3">
                        <h3 className="mt-[57px] mb-4 [font-family:'SF_Compact_Rounded-Semibold',Helvetica] font-normal text-white text-[22px]">
                          {community.title}
                        </h3>

                        <p className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff8c] text-[13px] mb-4">
                          {community.description}
                        </p>

                        <div className="flex items-center gap-1 mt-auto">
                          <span className="[font-family:'SF_Compact_Display-Regular',Helvetica] font-normal text-text-colordarktertiary text-xs">
                            􀉭
                          </span>
                          <span className="[font-family:'Lato',Helvetica] font-normal text-[#ffffff40] text-xs">
                            {community.memberCount} Members
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      className="w-full h-full object-cover"
                      alt="Recent card"
                      src={community.backgroundImage}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
