import {
  FileTextIcon,
  HeartIcon,
  MapIcon,
  ShoppingCartIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

export const Discover = (): JSX.Element => {
  // Category filter data
  const categories = [
    { id: "all", label: "All", active: true, icon: null, gradient: true },
    {
      id: "road",
      icon: "https://c.animaapp.com/getwfqQF/img/subtract.svg",
      label: "",
    },
    {
      id: "mountain",
      icon: "https://c.animaapp.com/getwfqQF/img/road@2x.png",
      label: "",
    },
    {
      id: "electric",
      icon: "https://c.animaapp.com/getwfqQF/img/union.svg",
      label: "",
    },
    {
      id: "accessories",
      icon: "https://c.animaapp.com/getwfqQF/img/union-1.svg",
      label: "",
    },
  ];

  // Product data
  const products = [
    {
      id: 1,
      type: "Road Bike",
      name: "PEUGEOT - LR01",
      price: "$ 1,999.99",
      image:
        "https://c.animaapp.com/getwfqQF/img/robert-bye-tg36rvceqng-unsplash-removebg-preview-4@2x.png",
    },
    {
      id: 2,
      type: "Road Helmet",
      name: "SMITH - Trade",
      price: "$ 120",
      image:
        "https://c.animaapp.com/getwfqQF/img/cobi-krumholz-mzkf19ydezk-unsplash-removebg-preview-1@2x.png",
    },
    {
      id: 3,
      type: "Mountain Bike",
      name: "PILOT - Chromoly",
      price: "$ 1,999.99",
      image:
        "https://c.animaapp.com/getwfqQF/img/mikkel-bech-yjafnkltky0-unsplash-removebg-preview-2@2x.png",
    },
    {
      id: 4,
      type: "Road Helmet",
      name: "SMITH - Trade",
      price: "$ 120",
      image:
        "https://c.animaapp.com/getwfqQF/img/cobi-krumholz-mzkf19ydezk-unsplash-removebg-preview-1-2@2x.png",
    },
  ];

  // Navigation items
  const navItems = [
    { icon: <StarIcon className="w-7 h-7" />, active: true },
    { icon: <MapIcon className="w-5 h-5" /> },
    { icon: <ShoppingCartIcon className="w-5 h-5" /> },
    { icon: <UserIcon className="w-4 h-4" /> },
    { icon: <FileTextIcon className="w-7 h-7" /> },
  ];

  return (
    <div
      className="bg-[#242c3b] flex flex-row justify-center w-full h-full"
      data-model-id="11:13492"
    >
      <div className="bg-[#242c3b] overflow-hidden w-full max-w-[390px] h-[844px] relative">
        {/* Background image */}
        <div className="absolute w-full h-[1040px] top-[136px] left-0">
          <img
            className="absolute w-[390px] h-[695px] top-[13px] left-0"
            alt="Bg"
            src="https://c.animaapp.com/getwfqQF/img/bg.png"
          />

          {/* Category filters */}
          <div className="absolute w-[330px] h-[90px] top-[232px] left-1/2 -translate-x-1/2">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="flex gap-5 bg-transparent p-0 h-auto">
                {categories.map((category, index) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className={`w-[50px] h-[50px] rounded-[10px] border-none shadow-[0px_20px_30px_#10141b,0px_-20px_30px_#2a334580] flex items-center justify-center p-0 ${
                      category.gradient
                        ? "bg-[linear-gradient(149deg,rgba(52,200,232,1)_0%,rgba(78,74,242,1)_100%)]"
                        : "bg-[linear-gradient(169deg,rgba(53,63,84,1)_0%,rgba(34,40,52,1)_100%)]"
                    } ${index === 3 || index === 4 ? "backdrop-blur-[15px]" : ""}`}
                    style={{ marginTop: `${index * 10}px` }}
                  >
                    {category.label ? (
                      <span className="font-medium text-white text-[13px]">
                        {category.label}
                      </span>
                    ) : category.icon ? (
                      <img
                        src={category.icon}
                        alt={category.id}
                        className={`${index === 1 ? "w-9 h-6" : index === 2 ? "w-[30px] h-[30px]" : index === 3 ? "w-[30px] h-[30px]" : "w-[27px] h-[27px]"}`}
                      />
                    ) : null}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Product grid */}
          <div className="absolute w-[350px] h-[734px] top-[306px] left-5">
            <div className="relative h-[734px]">
              {/* Product 1 - Road Bike */}
              <div className="absolute w-[165px] h-[235px] top-[31px] left-0">
                <Card className="absolute w-[245px] h-[375px] top-[-63px] -left-5 bg-[url(https://c.animaapp.com/getwfqQF/img/rectangle-166.svg)] bg-[100%_100%] border-none">
                  <CardContent className="p-0">
                    <div className="absolute w-[127px] h-[105px] top-[79px] left-[42px]">
                      <div className="w-[114px] top-[93px] left-2 absolute h-1.5">
                        <div className="w-[50px] left-0 rounded-[25.14px/2.97px] absolute h-1.5 top-0 bg-[#0000001a] blur-[2.29px]" />
                        <div className="w-[52px] left-[62px] rounded-[26.06px/2.97px] absolute h-1.5 top-0 bg-[#0000001a] blur-[2.29px]" />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 left-[103px] p-0 h-auto"
                      >
                        <HeartIcon className="w-6 h-6 text-white" />
                      </Button>
                      <img
                        className="absolute w-[121px] h-[89px] top-4 left-0"
                        alt="Road bike"
                        src="https://c.animaapp.com/getwfqQF/img/robert-bye-tg36rvceqng-unsplash-removebg-preview-4@2x.png"
                      />
                    </div>
                    <div className="top-[201px] left-[38px] inline-flex flex-col items-start absolute">
                      <div className="relative w-fit mt-[-1.00px] font-medium text-[#ffffff99] text-[13px] tracking-[-0.30px]">
                        Road Bike
                      </div>
                      <div className="relative w-fit font-bold text-white text-[15px] tracking-[-0.30px]">
                        PEUGEOT - LR01
                      </div>
                      <div className="relative w-fit font-medium text-[#ffffff99] text-[13px] tracking-[-0.30px]">
                        $ 1,999.99
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Product 2 - Mountain Bike */}
              <div className="absolute w-[165px] h-[255px] top-[219px] left-[185px]">
                <Card className="relative h-[217px] top-1 border-none">
                  <CardContent className="p-0">
                    <img
                      className="absolute w-[165px] h-[179px] top-0 left-0"
                      alt="Card background"
                      src="https://c.animaapp.com/getwfqQF/img/rectangle-166-1.svg"
                    />
                    <div className="w-36 top-[125px] left-2.5 absolute h-1.5">
                      <div className="w-[50px] left-0 rounded-[25.14px/2.97px] absolute h-1.5 top-0 bg-[#0000001a] blur-[2.29px]" />
                      <div className="absolute w-[52px] h-1.5 top-0 left-[92px] bg-[#0000001a] rounded-[26.06px/2.97px] blur-[2.29px]" />
                    </div>
                    <div className="top-[154px] left-2.5 inline-flex flex-col items-start absolute">
                      <div className="relative w-fit mt-[-1.00px] font-medium text-[#ffffff99] text-[13px] tracking-[-0.30px]">
                        Mountain Bike
                      </div>
                      <div className="relative w-fit font-bold text-white text-[15px] tracking-[-0.30px]">
                        PILOT - Chromoly
                      </div>
                      <div className="relative w-fit font-medium text-[#ffffff99] text-[13px] tracking-[-0.30px]">
                        $ 1,999.99
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 left-[125px] p-0 h-auto"
                    >
                      <HeartIcon className="w-6 h-6 text-white" />
                    </Button>
                    <img
                      className="absolute w-[116px] h-[79px] top-12 left-[23px]"
                      alt="Mountain bike"
                      src="https://c.animaapp.com/getwfqQF/img/mikkel-bech-yjafnkltky0-unsplash-removebg-preview-2@2x.png"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Product 3 - Road Helmet */}
              <div className="absolute w-[165px] h-[219px] top-0 left-[185px]">
                <Card className="relative h-[214px] top-[3px] bg-[url(https://c.animaapp.com/getwfqQF/img/rectangle-167.svg)] bg-[100%_100%] border-none">
                  <CardContent className="p-0">
                    <div className="top-[132px] left-2.5 inline-flex flex-col items-start absolute">
                      <div className="relative w-fit mt-[-1.00px] font-medium text-[#ffffff99] text-[13px] tracking-[-0.30px]">
                        Road Helmet
                      </div>
                      <div className="relative w-fit font-bold text-white text-[15px] tracking-[-0.30px]">
                        SMITH - Trade
                      </div>
                      <div className="relative w-fit font-medium text-[#ffffff99] text-[13px] tracking-[-0.30px]">
                        $ 120
                      </div>
                    </div>
                    <div className="absolute w-[139px] h-[104px] top-[19px] left-2.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 left-[115px] p-0 h-auto"
                      >
                        <HeartIcon className="w-6 h-6 text-white" />
                      </Button>
                      <div className="w-[135px] h-[104px] top-0 left-0 rounded-[9.29px] overflow-hidden absolute bg-blend-overlay">
                        <img
                          className="absolute w-[124px] h-[104px] top-0 left-[5px] object-cover"
                          alt="Road helmet"
                          src="https://c.animaapp.com/getwfqQF/img/cobi-krumholz-mzkf19ydezk-unsplash-removebg-preview-1@2x.png"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Product 4 - Road Helmet */}
              <div className="absolute w-[165px] h-[233px] top-[266px] left-px">
                <Card className="absolute w-[165px] h-[132px] top-1 left-0 bg-[url(https://c.animaapp.com/getwfqQF/img/rectangle-167-1.svg)] bg-[100%_100%] border-none">
                  <CardContent className="p-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 left-[125px] p-0 h-auto"
                    >
                      <HeartIcon className="w-6 h-6 text-white" />
                    </Button>
                    <img
                      className="w-[118px] h-[108px] top-6 left-[21px] absolute object-cover"
                      alt="Road helmet"
                      src="https://c.animaapp.com/getwfqQF/img/cobi-krumholz-mzkf19ydezk-unsplash-removebg-preview-1-2@2x.png"
                    />
                  </CardContent>
                </Card>
                <div className="inline-flex top-[151px] flex-col items-start absolute left-2.5">
                  <div className="relative w-fit mt-[-1.00px] font-medium text-[#ffffff99] text-[13px] tracking-[-0.30px]">
                    Road Helmet
                  </div>
                  <div className="relative w-fit font-bold text-white text-[15px] tracking-[-0.30px]">
                    SMITH - Trade
                  </div>
                  <div className="relative w-fit font-medium text-[#ffffff99] text-[13px] tracking-[-0.30px]">
                    $ 120
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Promotional banner */}
          <div className="w-full max-w-[350px] h-60 top-0 absolute left-1/2 -translate-x-1/2">
            <Card className="relative w-full max-w-[390px] h-[398px] -top-20 left-1/2 -translate-x-1/2 bg-[url(https://c.animaapp.com/getwfqQF/img/mikkel-bech-yjafnkltky0-unsplash-removebg-preview-5.svg)] bg-[100%_100%] border-none">
              <CardContent className="p-0">
                <img
                  className="absolute w-[317px] h-[153px] top-[110px] left-1/2 -translate-x-1/2"
                  alt="Electric bicycle"
                  src="https://c.animaapp.com/getwfqQF/img/electric-20bicycle-i05-2@2x.png"
                />
                <div className="gap-1 top-[257px] left-9 inline-flex flex-col items-start absolute">
                  <div className="relative w-fit mt-[-1.00px] font-bold text-[#ffffff99] text-[26px]">
                    30% Off
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom navigation */}
          <div className="absolute w-full h-[104px] top-[605px] left-0">
            <div className="relative h-[103px] w-full bg-[url(https://c.animaapp.com/getwfqQF/img/rectangle-24.png)] bg-[100%_100%]">
              <div className="flex flex-col w-full items-center absolute top-5 left-0 backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)]">
                <div className="relative self-stretch w-full h-[49px] flex justify-around">
                  {navItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="icon"
                      className={`w-[75px] h-[49px] ${index === 0 ? "bg-[url(https://c.animaapp.com/getwfqQF/img/rectangle-481.svg)] bg-[100%_100%]" : ""}`}
                    >
                      {item.icon}
                    </Button>
                  ))}
                </div>
                <div className="relative w-[375px] h-[34px] flex justify-center items-center">
                  <div className="relative w-[134px] h-[5px] bg-white rounded-[100px]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="absolute w-full max-w-[375px] h-11 top-0 left-1/2 -translate-x-1/2">
          <div className="absolute w-6 h-[11px] top-[17px] left-[336px]">
            <div className="absolute w-[22px] h-[11px] top-0 left-0 rounded-[2.67px] border border-solid border-[#ffffff59]">
              <div className="relative w-[18px] h-[7px] top-px left-px bg-white rounded-[1.33px]" />
            </div>
            <img
              className="absolute w-px h-1 top-1 left-[23px]"
              alt="Cap"
              src="https://c.animaapp.com/getwfqQF/img/cap.svg"
            />
          </div>
          <img
            className="absolute w-[15px] h-[11px] top-[17px] left-[316px]"
            alt="Wifi"
            src="https://c.animaapp.com/getwfqQF/img/wifi.svg"
          />
          <img
            className="absolute w-[17px] h-[11px] top-[18px] left-[294px]"
            alt="Cellular connection"
            src="https://c.animaapp.com/getwfqQF/img/cellular-connection.svg"
          />
          <div className="h-[21px] top-[7px] left-[21px] absolute w-[54px]">
            <div className="top-1.5 left-0 font-normal text-white text-[15px] text-center tracking-[-0.30px] absolute w-[54px]">
              9:41
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="inline-flex items-center justify-between w-[calc(100%-40px)] top-[60px] absolute left-5">
          <div className="relative w-fit font-bold text-white text-xl">
            Choose Your Bike
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="relative w-[94px] h-36 mt-[-50.00px] mb-[-50.00px] mr-[-20.00px] p-0"
          >
            <img
              className="w-full h-full"
              alt="Cart button"
              src="https://c.animaapp.com/getwfqQF/img/cart-button.svg"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
