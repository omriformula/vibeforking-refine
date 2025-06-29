import { EyeOffIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

export const Login = (): JSX.Element => {
  return (
    <main
      className="bg-[#ffffff] flex flex-row justify-center w-full"
      data-model-id="2:530"
    >
      <div className="bg-white w-[1440px] h-[900px]">
        <div className="flex w-full h-full items-center justify-center gap-8 p-8 relative">
          <img
            className="relative flex-1 self-stretch grow"
            alt="Login"
            src="https://c.animaapp.com/UBKS4WE7/img/login.png"
          />

          <div className="flex flex-col items-center justify-center gap-6 relative flex-1 self-stretch grow">
            <div className="flex flex-col items-start justify-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
              <h1 className="relative self-stretch mt-[-1.00px] font-text-4xl-semibold font-[number:var(--text-4xl-semibold-font-weight)] text-blue-100 text-[length:var(--text-4xl-semibold-font-size)] text-center tracking-[var(--text-4xl-semibold-letter-spacing)] leading-[var(--text-4xl-semibold-line-height)] [font-style:var(--text-4xl-semibold-font-style)]">
                Get started now
              </h1>

              <p className="relative self-stretch font-text-base-normal font-[number:var(--text-base-normal-font-weight)] text-grey-50 text-[length:var(--text-base-normal-font-size)] text-center tracking-[var(--text-base-normal-letter-spacing)] leading-[var(--text-base-normal-line-height)] [font-style:var(--text-base-normal-font-style)]">
                Create an account or log in to get going.
              </p>
            </div>

            <Card className="w-[466px] border-none shadow-none">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="h-9 grid w-full grid-cols-2 bg-grey-10 rounded-[7px] p-0.5 shadow-[inset_0px_3px_6px_#00000005]">
                  <TabsTrigger
                    value="login"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-100 data-[state=active]:shadow-[inset_0px_-2px_2px_#00000008,0px_1px_2px_#e4e5e73d] font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]"
                  >
                    Log in
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-100 font-text-sm-normal font-[number:var(--text-sm-normal-font-weight)] text-grey-50 text-[length:var(--text-sm-normal-font-size)] tracking-[var(--text-sm-normal-letter-spacing)] leading-[var(--text-sm-normal-line-height)] [font-style:var(--text-sm-normal-font-style)]"
                  >
                    Sign up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-6">
                  <CardContent className="p-0 space-y-6">
                    <div className="flex flex-col gap-5">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="font-text-sm-normal font-[number:var(--text-sm-normal-font-weight)] text-blue-100 text-[length:var(--text-sm-normal-font-size)] tracking-[var(--text-sm-normal-letter-spacing)] leading-[var(--text-sm-normal-line-height)] [font-style:var(--text-sm-normal-font-style)]"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          placeholder="Enter your email"
                          className="border-grey-20 shadow-shadow-xs font-text-base-normal font-[number:var(--text-base-normal-font-weight)] text-grey-50 text-[length:var(--text-base-normal-font-size)] tracking-[var(--text-base-normal-letter-spacing)] leading-[var(--text-base-normal-line-height)] [font-style:var(--text-base-normal-font-style)]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="password"
                          className="font-text-sm-normal font-[number:var(--text-sm-normal-font-weight)] text-blue-100 text-[length:var(--text-sm-normal-font-size)] tracking-[var(--text-sm-normal-letter-spacing)] leading-[var(--text-sm-normal-line-height)] [font-style:var(--text-sm-normal-font-style)]"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <Input
                            id="password"
                            type="password"
                            defaultValue="••••••••"
                            className="border-grey-20 shadow-shadow-xs pr-10 font-text-base-normal font-[number:var(--text-base-normal-font-weight)] text-grey-50 text-[length:var(--text-base-normal-font-size)] tracking-[var(--text-base-normal-letter-spacing)] leading-[var(--text-base-normal-line-height)] [font-style:var(--text-base-normal-font-style)]"
                          />
                          <button className="absolute right-3.5 top-1/2 transform -translate-y-1/2">
                            <EyeOffIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="remember"
                          className="w-4 h-4 rounded border-grey-20 data-[state=checked]:bg-blue-100 data-[state=checked]:border-blue-100"
                        />
                        <label
                          htmlFor="remember"
                          className="font-text-sm-normal font-[number:var(--text-sm-normal-font-weight)] text-blue-100 text-[length:var(--text-sm-normal-font-size)] tracking-[var(--text-sm-normal-letter-spacing)] leading-[var(--text-sm-normal-line-height)] [font-style:var(--text-sm-normal-font-style)]"
                        >
                          Remember me
                        </label>
                      </div>

                      <button className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-orange-50 text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                        Forgot password
                      </button>
                    </div>

                    <div className="space-y-4">
                      <Button className="w-full h-12 rounded-[10px] bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%),linear-gradient(0deg,rgba(29,97,231,1)_0%,rgba(29,97,231,1)_100%)] shadow-[0px_0px_0px_1px_#375dfb,0px_1px_2px_#253ea77a] font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-white text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                        Log in
                      </Button>

                      <div className="flex items-center gap-2">
                        <Separator className="flex-1" />
                        <span className="font-text-sm-normal font-[number:var(--text-sm-normal-font-weight)] text-grey-50 text-[length:var(--text-sm-normal-font-size)] tracking-[var(--text-sm-normal-letter-spacing)] leading-[var(--text-sm-normal-line-height)] [font-style:var(--text-sm-normal-font-style)]">
                          OR
                        </span>
                        <Separator className="flex-1" />
                      </div>

                      <div className="space-y-[15px]">
                        <Button
                          variant="outline"
                          className="w-full h-12 rounded-[10px] border-grey-10 shadow-[inset_0px_-3px_6px_#f3f5f999] font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-blue-100 text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]"
                        >
                          <img
                            className="w-5 h-5 mr-2.5"
                            alt="Google"
                            src="https://c.animaapp.com/UBKS4WE7/img/google.svg"
                          />
                          Continue with Google
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full h-12 rounded-[10px] border-grey-10 shadow-[inset_0px_-3px_6px_#f3f5f999] font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-blue-100 text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]"
                        >
                          <img
                            className="w-5 h-5 mr-2.5"
                            alt="Microsoft logo"
                            src="https://c.animaapp.com/UBKS4WE7/img/microsoft-logo-1.svg"
                          />
                          Continue in with Microsoft
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </TabsContent>

                <TabsContent value="signup">
                  {/* Sign up form would go here */}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};
