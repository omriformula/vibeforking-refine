import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

export const CalendarSection = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Step data
  const steps = [
    {
      number: 1,
      text: "Pick your payment day",
      icon: "https://c.animaapp.com/mNrNJXyS/img/frame-33839.svg",
      isActive: true,
    },
    {
      number: 2,
      text: "Confirm the early payment fees",
      isActive: false,
    },
    {
      number: 3,
      text: "Done!",
      boldText: "Your payment will arrive at the chosen day",
      isActive: false,
    },
  ];

  // Invoice data
  const invoiceData = {
    invoice: "Feb 2025",
    amount: "$23,045",
    status: "Available for pulling",
  };

  // Calendar data
  const marchCalendarData = {
    month: "March",
    year: "2025",
    weekdays: ["S", "S", "M", "T", "W", "T", "F"],
    days: [
      { day: "", isCurrentMonth: false },
      { day: "", isCurrentMonth: false },
      { day: "", isCurrentMonth: false },
      { day: "", isCurrentMonth: false },
      { day: "", isCurrentMonth: false },
      { day: "", isCurrentMonth: false },
      { day: "1", isCurrentMonth: true, isSelectable: false },
      { day: "2", isCurrentMonth: true, isSelectable: false },
      {
        day: "3",
        isCurrentMonth: true,
        isSelectable: true,
        hasIndicator: true,
      },
      { day: "4", isCurrentMonth: true, isSelectable: false },
      { day: "5", isCurrentMonth: true, isSelectable: false },
      { day: "6", isCurrentMonth: true, isSelectable: true },
      { day: "7", isCurrentMonth: true, isSelectable: false },
      { day: "8", isCurrentMonth: true, isSelectable: false },
      { day: "9", isCurrentMonth: true, isSelectable: false },
      { day: "10", isCurrentMonth: true, isSelectable: true },
      { day: "11", isCurrentMonth: true, isSelectable: false },
      { day: "12", isCurrentMonth: true, isSelectable: false },
      { day: "13", isCurrentMonth: true, isSelectable: true },
      { day: "14", isCurrentMonth: true, isSelectable: false },
      { day: "15", isCurrentMonth: true, isSelectable: false },
      { day: "16", isCurrentMonth: true, isSelectable: false },
      { day: "17", isCurrentMonth: true, isSelectable: true },
      { day: "18", isCurrentMonth: true, isSelectable: false },
      { day: "19", isCurrentMonth: true, isSelectable: false },
      { day: "20", isCurrentMonth: true, isSelectable: true },
      { day: "21", isCurrentMonth: true, isSelectable: false },
      { day: "22", isCurrentMonth: true, isSelectable: false },
      { day: "23", isCurrentMonth: true, isSelectable: false },
      { day: "24", isCurrentMonth: true, isSelectable: true },
      { day: "25", isCurrentMonth: true, isSelectable: false },
      { day: "26", isCurrentMonth: true, isSelectable: false },
      { day: "27", isCurrentMonth: true, isSelectable: true },
      { day: "28", isCurrentMonth: true, isSelectable: false },
      { day: "29", isCurrentMonth: true, isSelectable: false },
      { day: "30", isCurrentMonth: true, isSelectable: false },
      { day: "31", isCurrentMonth: true, isSelectable: true },
      { day: "1", isCurrentMonth: false, isSelectable: false },
      { day: "2", isCurrentMonth: false, isSelectable: false },
      { day: "3", isCurrentMonth: false, isSelectable: false },
      { day: "4", isCurrentMonth: false, isSelectable: false },
      { day: "5", isCurrentMonth: false, isSelectable: false },
    ],
  };

  const aprilCalendarData = {
    month: "April",
    year: "2025",
    weekdays: ["S", "S", "M", "T", "W", "T", "F"],
    days: [
      { day: "30", isCurrentMonth: false, isSelectable: false },
      { day: "31", isCurrentMonth: false, isSelectable: false },
      { day: "1", isCurrentMonth: true, isSelectable: false },
      { day: "2", isCurrentMonth: true, isSelectable: false },
      { day: "3", isCurrentMonth: true, isSelectable: true },
      { day: "4", isCurrentMonth: true, isSelectable: false },
      { day: "5", isCurrentMonth: true, isSelectable: false },
      { day: "6", isCurrentMonth: true, isSelectable: false },
      { day: "7", isCurrentMonth: true, isSelectable: false },
      { day: "8", isCurrentMonth: true, isSelectable: true },
      { day: "9", isCurrentMonth: true, isSelectable: false },
      { day: "10", isCurrentMonth: true, isSelectable: false },
      { day: "11", isCurrentMonth: true, isSelectable: false },
      { day: "12", isCurrentMonth: true, isSelectable: false },
      { day: "13", isCurrentMonth: true, isSelectable: false },
      { day: "14", isCurrentMonth: true, isSelectable: false },
      { day: "15", isCurrentMonth: true, isSelectable: false },
      { day: "16", isCurrentMonth: true, isSelectable: false },
      { day: "17", isCurrentMonth: true, isSelectable: false },
      { day: "18", isCurrentMonth: true, isSelectable: false },
      { day: "19", isCurrentMonth: true, isSelectable: false },
      { day: "20", isCurrentMonth: true, isSelectable: false },
      { day: "21", isCurrentMonth: true, isSelectable: false },
      { day: "22", isCurrentMonth: true, isSelectable: false },
      { day: "23", isCurrentMonth: true, isSelectable: false },
      { day: "24", isCurrentMonth: true, isSelectable: false },
      { day: "25", isCurrentMonth: true, isSelectable: false },
      { day: "26", isCurrentMonth: true, isSelectable: false },
      { day: "27", isCurrentMonth: true, isSelectable: false },
      { day: "28", isCurrentMonth: true, isSelectable: false },
      { day: "29", isCurrentMonth: true, isSelectable: false },
      { day: "30", isCurrentMonth: true, isSelectable: false },
    ],
  };

  const handleDateClick = (day: string, month: string) => {
    setSelectedDate(`${day} ${month}`);
  };

  return (
    <Card className="flex flex-col items-center gap-3 p-6 relative flex-1 self-stretch w-full bg-white rounded-xl">
      <div className="inline-flex items-start justify-center gap-[42px] relative">
        {steps.map((step, index) => (
          <div
            key={`step-${index}`}
            className="inline-flex items-start gap-3.5 relative"
          >
            {index === 0 ? (
              <div className="inline-flex items-start gap-1.5 relative">
                <img className="relative w-5 h-5" alt="Frame" src={step.icon} />
                <div className="relative w-fit mt-[-1.00px] [font-family:'Open_Sans_Hebrew-Regular',Helvetica] font-normal text-[#323232] text-sm text-right tracking-[0] leading-[21px] whitespace-nowrap">
                  {step.text}
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col w-5 h-5 items-center justify-center gap-2.5 p-0.5 relative bg-black rounded-[100px]">
                  <div className="relative w-fit mt-[-0.50px] [font-family:'Open_Sans_Hebrew-Bold',Helvetica] font-bold text-white text-[10px] text-right tracking-[0] leading-[15px] whitespace-nowrap">
                    {step.number}
                  </div>
                </div>
                <div className="relative w-fit mt-[-1.00px] [font-family:'Open_Sans_Hebrew-Regular',Helvetica] font-normal text-[#323232] text-sm text-right tracking-[0] leading-[21px] whitespace-nowrap">
                  <span className="[font-family:'Open_Sans_Hebrew-Regular',Helvetica] font-normal text-[#323232] text-sm tracking-[0] leading-[21px]">
                    {step.text}{" "}
                  </span>
                  {step.boldText && (
                    <span className="[font-family:'Open_Sans_Hebrew-Bold',Helvetica] font-bold">
                      {step.boldText}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <Card className="flex flex-col items-center gap-8 p-6 relative flex-1 self-stretch w-full bg-[#fbfdff] rounded-xl">
        <Card className="flex w-full items-center justify-center gap-16 px-8 py-[13px] relative bg-white rounded-lg overflow-hidden border-2 border-solid border-black shadow-[6px_6px_0px_#fcae17]">
          <div className="inline-flex items-center gap-6 relative">
            {/* Invoice Section */}
            <div className="inline-flex flex-col h-[54px] items-center justify-center px-[18px] py-2 relative overflow-hidden">
              <div className="relative w-fit -mt-2.5 [font-family:'Open_Sans_Hebrew-Bold',Helvetica] font-bold text-[#0000005e] text-xs text-right tracking-[0] leading-[18px] whitespace-nowrap">
                Invoice
              </div>
              <div className="relative w-fit mb-[-3.50px] -mt-1.5 [font-family:'Open_Sans_Hebrew-Bold',Helvetica] font-bold text-black text-base text-center tracking-[0] leading-5 whitespace-nowrap">
                {invoiceData.invoice}
              </div>
            </div>

            {/* Total Amount Section */}
            <div className="inline-flex flex-col h-[54px] items-center justify-center px-[18px] py-2 relative">
              <div className="relative w-fit mt-[-4.50px] [font-family:'Open_Sans_Hebrew-Bold',Helvetica] font-bold text-[#0000005e] text-xs text-right tracking-[0] leading-[18px] whitespace-nowrap">
                Total amount
              </div>
              <div className="relative w-fit mb-[-3.50px] -mt-1.5 [font-family:'Open_Sans_Hebrew-Bold',Helvetica] font-bold text-black text-base text-center tracking-[0] leading-5 whitespace-nowrap">
                <span className="[font-family:'Open_Sans_Hebrew-Bold',Helvetica] font-bold text-black text-base tracking-[0] leading-5">
                  {" "}
                  {invoiceData.amount}
                </span>
              </div>
            </div>

            {/* Status Section */}
            <div className="inline-flex flex-col h-[54px] items-center justify-center px-[18px] py-2 relative overflow-hidden">
              <div className="relative w-fit -mt-2.5 [font-family:'Open_Sans_Hebrew-Bold',Helvetica] font-bold text-[#0000005e] text-xs text-right tracking-[0] leading-[18px] whitespace-nowrap">
                Status
              </div>
              <div className="relative w-fit mb-[-3.50px] -mt-1.5 [font-family:'Open_Sans_Hebrew-Bold',Helvetica] font-bold text-black text-base text-center tracking-[0] leading-5 whitespace-nowrap">
                {invoiceData.status}
              </div>
            </div>
          </div>
        </Card>

        <div className="inline-flex items-center gap-2.5 p-[13px] relative bg-white rounded-xl border border-solid border-[#dde1e6] w-full">
          <div className="flex items-center justify-between gap-4 w-full">
            {/* March Calendar */}
            <div className="flex-1">
              <div className="flex flex-col items-center">
                <div className="mb-3 [font-family:'Open_Sans_Hebrew-Regular',Helvetica] font-normal text-[#474c59] text-[16.4px] text-center">
                  <span className="[font-family:'Open_Sans_Hebrew-Regular',Helvetica] font-normal text-[#474c59] text-[16.4px]">
                    {marchCalendarData.month}
                  </span>
                  <span className="[font-family:'Open_Sans_Hebrew-Bold',Helvetica] font-bold">
                    {" "}
                    {marchCalendarData.year}
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1 w-full">
                  {/* Weekday headers */}
                  {marchCalendarData.weekdays.map((day, index) => (
                    <div
                      key={`weekday-${index}`}
                      className="h-10 flex items-center justify-center"
                    >
                      <div className="[font-family:'Open_Sans_Hebrew-Bold',Helvetica] font-bold text-black text-[14.1px] text-center">
                        {day}
                      </div>
                    </div>
                  ))}

                  {/* Calendar days */}
                  {marchCalendarData.days.map((day, index) => (
                    <div
                      key={`march-day-${index}`}
                      className={`h-10 w-10 flex items-center justify-center ${
                        day.isSelectable
                          ? "bg-[#fcae1733] rounded-md cursor-pointer"
                          : day.isCurrentMonth
                            ? "bg-white rounded-md"
                            : ""
                      }`}
                      onClick={() =>
                        day.isSelectable &&
                        handleDateClick(day.day, marchCalendarData.month)
                      }
                    >
                      <div className="relative flex flex-col items-center">
                        <div
                          className={`[font-family:'Open_Sans_Hebrew-Regular',Helvetica] font-normal text-[16.4px] text-center ${
                            day.isCurrentMonth
                              ? day.isSelectable
                                ? "text-[#343740]"
                                : "text-[#ceccc7]"
                              : "text-[#d7d5d1]"
                          }`}
                        >
                          {day.day}
                        </div>
                        {day.hasIndicator && (
                          <div className="w-[5px] h-[5px] bg-[#2b2a2a] rounded-[2.5px] mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator orientation="vertical" className="h-[407px]" />

            {/* April Calendar */}
            <div className="flex-1">
              <div className="flex flex-col items-center">
                <div className="mb-3 [font-family:'Inter',Helvetica] font-normal text-[#474c59] text-[16.4px] text-center">
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#474c59] text-[16.4px]">
                    {aprilCalendarData.month}
                  </span>
                  <span className="font-bold"> {aprilCalendarData.year}</span>
                </div>

                <div className="grid grid-cols-7 gap-1 w-full">
                  {/* Weekday headers */}
                  {aprilCalendarData.weekdays.map((day, index) => (
                    <div
                      key={`april-weekday-${index}`}
                      className="h-10 flex items-center justify-center"
                    >
                      <div className="[font-family:'Open_Sans_Hebrew-Bold',Helvetica] font-bold text-black text-[14.1px] text-center">
                        {day}
                      </div>
                    </div>
                  ))}

                  {/* Calendar days */}
                  {aprilCalendarData.days.map((day, index) => (
                    <div
                      key={`april-day-${index}`}
                      className={`h-10 w-10 flex items-center justify-center ${
                        day.isSelectable
                          ? "bg-[#fcae1733] rounded-md cursor-pointer"
                          : day.isCurrentMonth
                            ? "bg-white rounded-md"
                            : ""
                      }`}
                      onClick={() =>
                        day.isSelectable &&
                        handleDateClick(day.day, aprilCalendarData.month)
                      }
                    >
                      <div
                        className={`[font-family:'Open_Sans_Hebrew-Regular',Helvetica] font-normal text-[16.4px] text-center ${
                          day.isCurrentMonth
                            ? day.isSelectable
                              ? "text-[#343740]"
                              : "text-[#ceccc7]"
                            : "text-[#d7d5d1]"
                        }`}
                      >
                        {day.day}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator orientation="vertical" className="h-[407px]" />

            {/* Right side panel */}
            <div className="flex flex-col w-[324.45px] items-center justify-between pt-2 pb-6 px-6 bg-white rounded-2xl">
              <div className="flex items-center justify-around gap-1.5 py-4 w-full bg-white rounded-2xl">
                <div className="relative w-[263px] [font-family:'Open_Sans_Hebrew-Bold',Helvetica] font-normal text-[#323232] text-sm text-center tracking-[0] leading-[21px]">
                  <span className="font-bold">
                    Click one of the highlighted dates
                  </span>
                  <span className="[font-family:'Open_Sans_Hebrew-Regular',Helvetica]">
                    {" "}
                    from the calendar
                  </span>
                </div>
              </div>

              <Button
                className="w-[270px] h-[51px] px-6 py-2.5 bg-[#e2e2e2] rounded-md text-white text-xl font-bold"
                disabled={!selectedDate}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Card>
  );
};
