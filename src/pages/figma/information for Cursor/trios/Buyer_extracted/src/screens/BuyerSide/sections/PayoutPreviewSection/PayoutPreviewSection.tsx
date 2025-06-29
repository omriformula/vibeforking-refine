import React from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Separator } from "../../../../components/ui/separator";
import { Switch } from "../../../../components/ui/switch";

export const PayoutPreviewSection = (): JSX.Element => {
  return (
    <Card className="w-[270px] p-[14.63px] border-[1.22px] border-[#dfdfdf] rounded-[6.1px]">
      <CardContent className="p-0">
        <div className="flex flex-col gap-[18.29px]">
          <div className="flex flex-col gap-[9.76px]">
            <div className="flex flex-col gap-[4.88px]">
              <div className="flex flex-col gap-[7.32px]">
                <div className="flex flex-col gap-[14.63px]">
                  <div className="flex flex-col gap-[9.76px]">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-[12.2px] leading-[20.7px] font-['Inter',Helvetica]">
                        Capital Controls
                      </div>
                      <Avatar className="w-[21.95px] h-[21.95px]">
                        <AvatarImage
                          src="https://c.animaapp.com/ohMqHPdP/img/ellipse-2-1@2x.png"
                          alt="User avatar"
                        />
                      </Avatar>
                    </div>

                    <Separator className="w-[218.9px] h-px" />

                    <div className="flex items-center justify-between">
                      <div className="font-normal text-[12.2px] leading-[20.7px] font-['Inter',Helvetica]">
                        Out-of-pocket limit
                      </div>
                      <Switch className="w-[21.34px] h-[12.99px] rounded-[41.9px]" />
                    </div>
                  </div>
                </div>

                <Separator className="w-[218.9px] h-px mb-[-0.39px]" />
              </div>

              <div className="font-normal text-[12.2px] leading-[20.7px] font-['Inter',Helvetica]">
                Spend limit
              </div>

              <div className="w-full">
                <Input
                  className="h-[24.39px] px-[6.71px] py-[4.88px] text-[9.8px] leading-[14.6px] rounded-[3.66px] border-[0.48px] border-[#a4a4a48a] shadow-[0px_0.48px_0.96px_#0a0c120d]"
                  defaultValue="$15,000"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="font-normal text-[12.2px] leading-[20.7px] font-['Inter',Helvetica]">
              Activate financing
            </div>
            <Button className="h-[24.39px] bg-[#5366ff] rounded-[4.88px] text-[9.8px] leading-[16.6px] font-normal">
              Activate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
