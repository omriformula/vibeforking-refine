import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Separator } from "../../../../components/ui/separator";
import { Switch } from "../../../../components/ui/switch";

export const DiscountRateSection = (): JSX.Element => {
  // Data for the slider labels
  const sliderLabels = [
    { text: "1.0%", position: "left" },
    { text: "Low", position: "left-center" },
    { text: "Benchmark", position: "center", hasImages: true },
    { text: "Popular", position: "right-center" },
    { text: "High", position: "right" },
    { text: "8.0%", position: "right" },
  ];

  return (
    <Card className="flex flex-col w-full max-w-[582px] items-start gap-[14.63px] p-[14.63px] bg-white rounded-[6.1px] border-[1.22px] border-solid border-[#dfdfdf]">
      <CardContent className="flex flex-col items-start gap-[7.32px] self-stretch w-full p-0">
        <div className="flex items-center justify-between self-stretch w-full">
          <div className="font-semibold text-[#0f171f] text-[12.2px] leading-[17.1px]">
            Set Early Payment Discount Rate
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-[112.8px] h-[37.8px] justify-center bg-white border-[0.61px] border-solid border-black rounded-[7.32px] text-[9.8px]">
              <SelectValue placeholder="All suppliers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All suppliers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="w-full h-[1.22px]" />

        <div className="w-[321.34px] font-normal text-[#0f171f] text-[12.2px] leading-[23.2px]">
          <span className="font-semibold">
            Discount Rate:
            <br />
          </span>

          <span className="text-[9.8px] leading-[18.5px]">
            4.5% / 30 days acceleration
          </span>
        </div>

        <div className="relative self-stretch w-full h-[94.51px]">
          <div className="relative w-full h-[95px]">
            {/* Slider track */}
            <div className="flex flex-col w-full items-start gap-[7.32px] absolute top-[49px] left-0">
              <div className="relative self-stretch w-full h-[3.66px] bg-[#d9d9d9] rounded-[60.97px]" />

              {/* Slider labels */}
              <div className="flex flex-col items-start gap-[6.1px] p-[6.1px] relative self-stretch w-full">
                <div className="flex items-center justify-between self-stretch w-full">
                  <div className="font-normal text-black text-[12.2px] leading-[20.7px] whitespace-nowrap">
                    1.0%
                  </div>

                  <div className="font-normal text-black text-[12.2px] leading-[20.7px] whitespace-nowrap">
                    Low
                  </div>

                  <div className="inline-flex items-center gap-[7.32px]">
                    <div className="font-normal text-black text-[12.2px] leading-[20.7px] whitespace-nowrap">
                      Benchmark
                    </div>

                    <div className="w-[56.71px] justify-between flex items-center">
                      <img
                        className="w-[21.95px] h-[21.95px]"
                        alt="Benchmark user"
                        src="https://c.animaapp.com/ohMqHPdP/img/ellipse-2@2x.png"
                      />

                      <img
                        className="w-[21.95px] h-[21.95px]"
                        alt="Benchmark user"
                        src="https://c.animaapp.com/ohMqHPdP/img/ellipse-3.svg"
                      />
                    </div>
                  </div>

                  <div className="font-normal text-black text-[12.2px] leading-[20.7px] whitespace-nowrap">
                    Popular
                  </div>

                  <div className="font-normal text-black text-[12.2px] leading-[20.7px] whitespace-nowrap">
                    High
                  </div>

                  <div className="font-normal text-black text-[12.2px] leading-[20.7px] whitespace-nowrap">
                    8.0%
                  </div>
                </div>
              </div>

              {/* Slider filled track */}
              <div className="absolute w-[113px] h-1 top-0 left-[168px] rounded-[60.97px] bg-[linear-gradient(90deg,rgba(83,102,255,1)_0%,rgba(50,61,153,1)_100%)]" />
            </div>

            {/* Slider tooltip and thumb */}
            <div className="flex flex-col w-[67px] items-start gap-[6.1px] p-[6.1px] absolute top-0 left-[190px]">
              <div className="flex flex-col items-start gap-[6.1px] p-[6.1px] relative self-stretch w-full">
                <div className="flex flex-col items-center relative self-stretch w-full">
                  <div className="inline-flex items-center gap-[6.1px] px-[7.32px] py-[4.88px] bg-components-tooltip-bg rounded-[4.88px] overflow-hidden">
                    <div className="mt-[-0.61px] font-normal text-color-light-white text-[8.5px] text-center leading-[13.4px] whitespace-nowrap">
                      4.5%
                    </div>
                  </div>

                  <img
                    className="self-stretch w-full"
                    alt="Arrow position"
                    src="https://c.animaapp.com/ohMqHPdP/img/arrow-position-scrubber.svg"
                  />
                </div>
              </div>

              {/* Slider thumb */}
              <div className="absolute w-2.5 h-2.5 top-[46px] left-7 bg-white rounded-[5.18px] border-[0.61px] border-solid border-black" />
            </div>
          </div>
        </div>

        {/* Formula AI section */}
        <div className="flex flex-col items-start gap-[9.76px] p-[9.76px] self-stretch w-full bg-[#e5e7fa] rounded-[7.32px]">
          <div className="flex flex-wrap items-start gap-[8px_41.46px] self-stretch w-full">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-[13.41px]">
                <div className="inline-flex items-center gap-[8.54px]">
                  <div className="relative w-[36.58px] h-[36.58px] bg-white rounded-[7.32px]">
                    <img
                      className="absolute w-[18px] h-[17px] top-2.5 left-[9px]"
                      alt="AI icon"
                      src="https://c.animaapp.com/ohMqHPdP/img/vector-2.svg"
                    />
                  </div>

                  <div className="font-medium text-black text-[14.6px] leading-[27.8px] whitespace-nowrap">
                    Formula AI
                  </div>
                </div>

                <Badge className="h-[17.07px] bg-[#a4adf6] rounded-[609.75px] px-[6.1px] py-[6.1px]">
                  <span className="font-medium text-[#282d52] text-[8.5px] leading-[16.2px]">
                    Recommended
                  </span>
                </Badge>
              </div>

              <Switch className="w-[21.34px] h-[12.99px]" />
            </div>

            <div className="flex flex-col w-full md:w-[342.07px] h-[58px] items-start gap-[9.76px]">
              <p className="font-normal text-black text-[8.5px] leading-[16.2px]">
                Maximize your results by taking into account various factors,
                such as seasonality, market trends, and more, and automatically
                adjusts the discount rate.
              </p>

              <p className="font-normal text-black text-[8.5px] leading-[16.2px]">
                Discount rate will shift between -0.5% to +1.5% from your
                selected discount rate.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
