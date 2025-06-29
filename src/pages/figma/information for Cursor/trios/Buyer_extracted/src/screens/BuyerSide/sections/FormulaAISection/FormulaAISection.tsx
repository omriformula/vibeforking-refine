import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Separator } from "../../../../components/ui/separator";

export const FormulaAISection = (): JSX.Element => {
  // Data for suppliers to enable mapping
  const suppliers = [
    {
      name: "Supplier 1",
      amount: "$5,480",
      dueDate: "May 1, 2025",
    },
    {
      name: "Supplier 2",
      amount: "$2,046",
      dueDate: "Jun 12, 2025",
    },
    {
      name: "Supplier 3",
      amount: "$7,182",
      dueDate: "Apr 28, 2025",
    },
    {
      name: "Supplier 4",
      amount: "$7,198",
      dueDate: "May 25, 2025",
    },
  ];

  return (
    <Card className="w-full max-w-[299px] border-[1.22px] border-[#dfdfdf] rounded-[6.1px]">
      <CardContent className="p-[14.63px] space-y-[9.76px]">
        <div className="flex flex-col gap-[9.76px]">
          <div className="flex items-center">
            <h3 className="font-semibold text-[12.2px] leading-[20.7px] text-black">
              Upcoming Payouts
            </h3>
          </div>

          <div className="flex items-center justify-between w-full">
            <span className="text-[12.2px] leading-[20.7px] text-[#818181] font-normal">
              Supplier name
            </span>
            <span className="text-[12.2px] leading-[20.7px] text-[#818181] font-normal">
              Amount
            </span>
            <span className="text-[12.2px] leading-[20.7px] text-[#818181] font-normal">
              Due Date
            </span>
          </div>

          <Separator className="h-px bg-[#dfdfdf]" />
        </div>

        <div className="flex flex-col gap-[7.32px]">
          {suppliers.map((supplier, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center gap-[7.32px]">
                <Checkbox className="w-[13.41px] h-[13.41px] rounded-[3.66px] border-[0.61px] border-black" />
                <div className="flex w-full items-center justify-between">
                  <span className="text-[8.5px] leading-[14.5px] text-black font-normal">
                    {supplier.name}
                  </span>
                  <span className="text-[8.5px] leading-[14.5px] text-black font-normal">
                    {supplier.amount}
                  </span>
                  <span className="text-[8.5px] leading-[14.5px] text-black font-normal">
                    {supplier.dueDate}
                  </span>
                </div>
              </div>
              <Separator className="h-px bg-[#dfdfdf]" />
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
