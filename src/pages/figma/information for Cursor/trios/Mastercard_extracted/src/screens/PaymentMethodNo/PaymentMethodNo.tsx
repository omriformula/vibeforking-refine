import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const PaymentMethodNo = (): JSX.Element => {
  // Payment method options data
  const paymentMethods = [
    {
      id: "cash",
      name: "Cash",
      icon: "https://c.animaapp.com/JGXn3Yov/img/cash@2x.png",
      selected: false,
    },
    {
      id: "visa",
      name: "Visa",
      icon: "https://c.animaapp.com/JGXn3Yov/img/group@2x.png",
      selected: false,
    },
    {
      id: "mastercard",
      name: "Mastercard",
      icon: "https://c.animaapp.com/JGXn3Yov/img/group-2361@2x.png",
      selected: true,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: "https://c.animaapp.com/JGXn3Yov/img/paypal-icon-1@2x.png",
      selected: false,
    },
  ];

  return (
    <div
      className="bg-white flex flex-row justify-center w-full"
      data-model-id="12:14082"
    >
      <div className="bg-white overflow-hidden w-[375px] h-[808px] relative">
        {/* Header */}
        <div className="absolute w-[138px] h-[45px] top-[50px] left-6 flex items-center">
          <Button
            variant="ghost"
            className="w-[45px] h-[45px] p-0 bg-[#ecf0f4] rounded-[22.5px]"
          >
            <ArrowLeftIcon className="w-[7px] h-3" />
          </Button>
          <span className="ml-[18px] font-['Sen',Helvetica] text-[17px] text-[#181c2e] leading-[22px]">
            Payment
          </span>
        </div>

        {/* Payment Methods */}
        <div className="absolute top-[126px] left-6 flex space-x-[38px]">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex flex-col items-center">
              <div className="relative">
                <div className="w-[85px] h-[72px] bg-[url(https://c.animaapp.com/JGXn3Yov/img/rectangle-1260-3.svg)] bg-[100%_100%] flex items-center justify-center">
                  <img
                    className={`${
                      method.id === "visa"
                        ? "w-[41px] h-[13px]"
                        : method.id === "mastercard"
                          ? "w-8 h-[25px]"
                          : method.id === "paypal"
                            ? "w-[17px] h-[29px]"
                            : "w-6 h-6"
                    }`}
                    alt={method.name}
                    src={method.icon}
                  />
                </div>
                {method.selected && (
                  <div className="absolute w-6 h-6 top-0 right-0 bg-[#ff7621] rounded-xl border-2 border-solid border-white flex items-center justify-center">
                    <img
                      className="w-[11px] h-2"
                      alt="Check"
                      src="https://c.animaapp.com/JGXn3Yov/img/check@2x.png"
                    />
                  </div>
                )}
              </div>
              <span className="mt-4 font-['Sen',Helvetica] font-normal text-[#464e57] text-sm">
                {method.name}
              </span>
            </div>
          ))}
        </div>

        {/* No Card Added Section */}
        <Card className="absolute w-[327px] h-[257px] top-[244px] left-6 border-0">
          <CardContent className="p-0 relative">
            <img
              className="w-full h-full"
              alt="Rectangle"
              src="https://c.animaapp.com/JGXn3Yov/img/rectangle-1344-1.svg"
            />
            <img
              className="absolute w-[375px] h-[385px] top-[-103px] left-[-24px]"
              alt="Credit card"
              src="https://c.animaapp.com/JGXn3Yov/img/42@3x.png"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
              <h3 className="font-['Sen',Helvetica] font-bold text-[#31343d] text-base mb-1">
                No master card added
              </h3>
              <p className="w-[266px] opacity-70 font-['Sen',Helvetica] font-normal text-[#2d2d2d] text-[15px] text-center tracking-[0.50px] leading-6">
                You can add a mastercard and save it for later
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Add New Button */}
        <Button
          variant="outline"
          className="absolute w-[327px] h-[62px] top-[516px] left-6 border border-[#ff7621] rounded-xl flex items-center justify-center"
        >
          <PlusIcon className="w-4 h-4 text-[#ff7621]" />
          <span className="ml-2 font-['Sen',Helvetica] font-bold text-[#ff7621] text-sm">
            ADD NEW
          </span>
        </Button>

        {/* Total Amount */}
        <div className="absolute top-[657px] left-6 flex items-center">
          <span className="font-['Sen',Helvetica] font-normal text-[#a0a5ba] text-sm leading-6">
            TOTAL:
          </span>
          <span className="ml-[45px] font-['Sen',Helvetica] font-normal text-[#181c2e] text-3xl">
            $96
          </span>
        </div>

        {/* Pay & Confirm Button */}
        <Button className="absolute w-[329px] h-[62px] top-[716px] left-6 bg-[#ff7621] hover:bg-[#ff7621]/90 rounded-xl">
          <span className="font-['Sen',Helvetica] font-bold text-white text-sm">
            PAY &amp; CONFIRM
          </span>
        </Button>
      </div>
    </div>
  );
};
