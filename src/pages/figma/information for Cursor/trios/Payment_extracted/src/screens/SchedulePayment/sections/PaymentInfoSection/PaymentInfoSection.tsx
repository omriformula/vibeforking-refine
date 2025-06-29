import React from "react";

export const PaymentInfoSection = (): JSX.Element => {
  return (
    <header className="flex w-full items-center justify-between">
      <div className="flex flex-col items-start justify-center gap-1.5">
        <div className="flex items-center gap-3">
          <p className="text-2xl leading-[33.6px]">
            <span className="[font-family:'PP_Formula-Regular',Helvetica] font-normal">
              Hi [Supplier_name] 👋,{" "}
            </span>
            <span className="[font-family:'PP_Formula-Bold',Helvetica] font-bold">
              your
            </span>
            <span className="[font-family:'PP_Formula-Regular',Helvetica] font-normal">
              &nbsp;
            </span>
            <span className="[font-family:'PP_Formula-Bold',Helvetica] font-bold">
              payment is available for pulling
            </span>
          </p>
        </div>
      </div>

      <img
        className="w-[46px] h-[42px]"
        alt="Logo"
        src="https://c.animaapp.com/mNrNJXyS/img/logo-positive-1@2x.png"
      />
    </header>
  );
};
