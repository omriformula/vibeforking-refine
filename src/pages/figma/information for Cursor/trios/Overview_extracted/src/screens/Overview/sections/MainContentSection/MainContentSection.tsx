import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

export const MainContentSection = (): JSX.Element => {
  // Metric card data
  const metricCards = [
    {
      title: "Views",
      value: "7,265",
      change: "+11.01%",
      isPositive: true,
      bgClass: "bg-colors-background-bg4",
    },
    {
      title: "Visits",
      value: "3,671",
      change: "-0.03%",
      isPositive: false,
      bgClass: "bg-colors-background-bg3",
    },
    {
      title: "New Users",
      value: "156",
      change: "+15.03%",
      isPositive: true,
      bgClass: "bg-colors-background-bg4",
    },
    {
      title: "Active Users",
      value: "2,318",
      change: "+6.08%",
      isPositive: true,
      bgClass: "bg-colors-background-bg3",
    },
  ];

  // Chart y-axis labels
  const yAxisLabels = ["30K", "20K", "10K", "0"];

  // Months for x-axis
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const fullMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Traffic by website data
  const websiteTraffic = [
    { name: "Google", bars: 3 },
    { name: "YouTube", bars: 3 },
    { name: "Instagram", bars: 3 },
    { name: "Pinterest", bars: 3 },
    { name: "Facebook", bars: 3 },
    { name: "Twitter", bars: 3 },
  ];

  // Traffic by location data
  const locationTraffic = [
    {
      name: "United States",
      percentage: "52.1%",
      dotColor: "https://c.animaapp.com/5h59n1Cx/img/dot-4.svg",
    },
    {
      name: "Canada",
      percentage: "22.8%",
      dotColor: "https://c.animaapp.com/5h59n1Cx/img/dot-5.svg",
    },
    {
      name: "Mexico",
      percentage: "13.9%",
      dotColor: "https://c.animaapp.com/5h59n1Cx/img/dot-6.svg",
    },
    {
      name: "Other",
      percentage: "11.2%",
      dotColor: "https://c.animaapp.com/5h59n1Cx/img/dot-7.svg",
    },
  ];

  // Device traffic data
  const deviceLabels = ["Linux", "Mac", "iOS", "Windows", "Android", "Other"];

  return (
    <div className="flex flex-wrap gap-[var(--spacing-28)] p-[var(--spacing-24-duplicate)]">
      {/* Metric Cards */}
      {metricCards.map((card, index) => (
        <Card
          key={`metric-card-${index}`}
          className={`min-w-[200px] ${card.bgClass} flex-1 rounded-[var(--corner-radius-16-duplicate)]`}
        >
          <CardContent className="flex flex-col items-start gap-[var(--spacing-8-duplicate)] p-[var(--spacing-24-duplicate)]">
            <div className="[display:var(--show-text-show-text,flex)] flex-col items-start justify-center w-full rounded-[var(--corner-radius-8)]">
              <div className="h-5 mt-[-1.00px] font-14-regular font-[number:var(--14-regular-font-weight)] text-black-100 text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)] whitespace-nowrap [font-style:var(--14-regular-font-style)]">
                {card.title}
              </div>
            </div>

            <div className="flex justify-between items-center w-full rounded-[var(--corner-radius-8)]">
              <div className="text-themes-black-100-duplicate text-[length:var(--24-semibold-font-size)] font-[number:var(--24-semibold-font-weight)] tracking-[var(--24-semibold-letter-spacing)] leading-[var(--24-semibold-line-height)] [font-style:var(--24-semibold-font-style)]">
                {card.value}
              </div>

              <div className="flex items-center justify-end gap-[var(--spacing-8-duplicate)] flex-1 rounded-[var(--corner-radius-8)]">
                <div className="[display:var(--show-text-show-text,inline-flex)] flex-col items-start justify-center rounded-[var(--corner-radius-8)]">
                  <div className="mt-[-1.00px] font-12-regular font-[number:var(--12-regular-font-weight)] text-black-100 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]">
                    {card.change}
                  </div>
                </div>

                <div className="[display:var(--show-icon-show-icon,inline-flex)] items-center justify-center rounded-[var(--spacing-radius-8)]">
                  <img
                    className="w-4 h-4"
                    alt={card.isPositive ? "Arrow rise" : "Arrow fall"}
                    src={
                      card.isPositive
                        ? "https://c.animaapp.com/5h59n1Cx/img/arrowrise-2.svg"
                        : "https://c.animaapp.com/5h59n1Cx/img/arrowfall.svg"
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Total Users Chart */}
      <Card className="min-w-[662px] h-[330px] flex-1 bg-colors-background-bg2 rounded-[var(--corner-radius-16-duplicate)] overflow-hidden">
        <CardContent className="flex flex-col gap-[var(--spacing-16)] p-[var(--spacing-24-duplicate)]">
          <div className="flex flex-wrap gap-[var(--spacing-16)] items-center w-full rounded-[var(--corner-radius-8)]">
            <Tabs
              defaultValue="totalUsers"
              className="flex gap-[var(--spacing-16)]"
            >
              <TabsList className="bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="totalUsers"
                  className="px-0 py-0 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-colors-primary-brand data-[state=active]:font-[number:var(--14-semibold-font-weight)] data-[state=inactive]:text-colors-black-40"
                >
                  <span className="font-14-semibold text-[length:var(--14-semibold-font-size)] tracking-[var(--14-semibold-letter-spacing)] leading-[var(--14-semibold-line-height)] [font-style:var(--14-semibold-font-style)]">
                    Total Users
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="totalProjects"
                  className="px-0 py-0 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-colors-primary-brand data-[state=active]:font-[number:var(--14-semibold-font-weight)] data-[state=inactive]:text-colors-black-40"
                >
                  <span className="font-14-regular text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)] [font-style:var(--14-regular-font-style)]">
                    Total Projects
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="operatingStatus"
                  className="px-0 py-0 h-auto data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-colors-primary-brand data-[state=active]:font-[number:var(--14-semibold-font-weight)] data-[state=inactive]:text-colors-black-40"
                >
                  <span className="font-14-regular text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)] [font-style:var(--14-regular-font-style)]">
                    Operating Status
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="font-14-regular text-colors-black-20 text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)] [font-style:var(--14-regular-font-style)]">
              |
            </div>

            <div className="flex items-center gap-4">
              <Badge
                variant="outline"
                className="flex items-center gap-1 py-0.5 pl-[var(--spacing-4)] pr-[var(--spacing-8-duplicate)] bg-transparent border-0"
              >
                <img
                  className="w-4 h-4"
                  alt="Dot"
                  src="https://c.animaapp.com/5h59n1Cx/img/dot-4.svg"
                />
                <span className="font-12-regular text-colors-black-100 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]">
                  This year
                </span>
              </Badge>

              <Badge
                variant="outline"
                className="flex items-center gap-1 py-0.5 pl-[var(--spacing-4)] pr-[var(--spacing-8-duplicate)] bg-transparent border-0"
              >
                <img
                  className="w-4 h-4"
                  alt="Dot"
                  src="https://c.animaapp.com/5h59n1Cx/img/dot-7.svg"
                />
                <span className="font-12-regular text-colors-black-100 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]">
                  Last year
                </span>
              </Badge>
            </div>
          </div>

          <div className="flex items-start gap-[var(--spacing-16)] flex-1 w-full">
            {/* Y-axis labels */}
            <div className="flex flex-col items-end justify-between h-full">
              {yAxisLabels.map((label, index) => (
                <div
                  key={`y-axis-${index}`}
                  className="flex-1 font-12-regular text-colors-black-40 text-right text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="flex flex-col items-start flex-1 h-full relative">
              <div className="flex-1 w-full" />

              <div className="absolute w-[575px] h-[246px] top-0 left-0 bg-[url(https://c.animaapp.com/5h59n1Cx/img/line-b.svg)] bg-[100%_100%]">
                <img
                  className="absolute w-[575px] h-[246px] top-0 left-0"
                  alt="Line a"
                  src="https://c.animaapp.com/5h59n1Cx/img/line-a.svg"
                />
              </div>

              {/* X-axis labels */}
              <div className="[display:var(--show-text-show-text,flex)] w-[575px] items-center absolute top-[230px] left-0">
                {months.map((month, index) => (
                  <div
                    key={`x-axis-${index}`}
                    className="flex-1 text-center mt-[-1.00px] font-12-regular text-colors-black-40 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]"
                  >
                    {month}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traffic by Website */}
      <Card className="min-w-[200px] max-w-[272px] h-[330px] flex-1 bg-colors-background-bg2 rounded-[var(--corner-radius-16-duplicate)] overflow-hidden">
        <CardContent className="flex flex-col gap-[var(--spacing-16)] p-[var(--spacing-24-duplicate)]">
          <div className="[display:var(--show-text-show-text,flex)] flex-col items-start justify-center w-full rounded-[var(--corner-radius-8)]">
            <div className="font-14-semibold text-colors-black-100 text-[length:var(--14-semibold-font-size)] tracking-[var(--14-semibold-letter-spacing)] leading-[var(--14-semibold-line-height)] [font-style:var(--14-semibold-font-style)]">
              Traffic by Website
            </div>
          </div>

          <div className="flex items-start gap-[var(--spacing-16)] flex-1 w-full">
            {/* Website names */}
            <div className="[display:var(--show-text-show-text,inline-flex)] flex-col items-start justify-between py-[var(--spacing-8-duplicate)] px-0 rounded-[var(--corner-radius-8)]">
              {websiteTraffic.map((site, index) => (
                <div
                  key={`website-${index}`}
                  className="font-12-regular text-colors-black-100 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]"
                >
                  {site.name}
                </div>
              ))}
            </div>

            {/* Traffic bars */}
            <div className="flex flex-col w-20 items-start gap-[var(--spacing-8-duplicate)] h-full">
              {websiteTraffic.map((site, index) => (
                <div
                  key={`traffic-bar-${index}`}
                  className="flex items-center gap-0.5 py-[var(--spacing-16)] px-0 flex-1 w-full"
                >
                  <div className="flex-1 h-2 max-h-2 bg-colors-black-100 rounded-[var(--corner-radius-80)]" />
                  <div className="flex-1 h-2 max-h-2 bg-colors-black-40 rounded-[var(--corner-radius-80)]" />
                  <div className="flex-1 h-2 max-h-2 bg-colors-black-10 rounded-[var(--corner-radius-80)]" />
                  {site.bars > 3 && (
                    <>
                      <div className="flex-1 h-2 max-h-2 bg-colors-black-100 rounded-[var(--corner-radius-80)] opacity-0" />
                      <div className="flex-1 h-2 max-h-2 bg-colors-black-100 rounded-[var(--corner-radius-80)] opacity-0" />
                    </>
                  )}
                  {site.bars > 5 && (
                    <>
                      <div className="flex-1 h-2 max-h-2 bg-colors-black-100 rounded-[var(--corner-radius-80)] opacity-0" />
                      <div className="flex-1 h-2 max-h-2 bg-colors-black-100 rounded-[var(--corner-radius-80)] opacity-0" />
                      <div className="flex-1 h-2 max-h-2 bg-colors-black-100 rounded-[var(--corner-radius-80)] opacity-0" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traffic by Device */}
      <Card className="min-w-[400px] h-[280px] flex-1 bg-colors-background-bg2 rounded-[var(--corner-radius-16-duplicate)] overflow-hidden">
        <CardContent className="flex flex-col gap-[var(--spacing-16)] p-[var(--spacing-24-duplicate)]">
          <div className="[display:var(--show-text-show-text,flex)] flex-col items-start justify-center w-full rounded-[var(--corner-radius-8)]">
            <div className="font-14-semibold text-colors-black-100 text-[length:var(--14-semibold-font-size)] tracking-[var(--14-semibold-letter-spacing)] leading-[var(--14-semibold-line-height)] [font-style:var(--14-semibold-font-style)]">
              Traffic by Device
            </div>
          </div>

          <div className="flex items-start gap-[var(--spacing-16)] flex-1 w-full">
            {/* Y-axis labels */}
            <div className="flex flex-col items-end justify-between h-full">
              {yAxisLabels.map((label, index) => (
                <div
                  key={`device-y-axis-${index}`}
                  className="flex-1 font-12-regular text-colors-black-40 text-right text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="flex flex-col items-start flex-1 h-full relative">
              <div className="flex-1 w-full" />

              {/* Bar chart */}
              <div className="w-[345px] flex h-[196px] items-end justify-between pb-[var(--spacing-28)] pt-0 px-0 absolute top-0 left-0">
                <div className="flex-1 h-full relative">
                  <div className="w-7 h-[84px] top-[84px] left-[15px] absolute bg-colors-secondary-indigo rounded-[var(--corner-radius-8)]" />
                </div>
                <div className="flex-1 h-full relative">
                  <div className="w-7 h-[147px] top-[21px] left-[15px] absolute bg-colors-secondary-mint rounded-[var(--corner-radius-8)]" />
                </div>
                <div className="flex-1 h-full relative">
                  <div className="w-7 h-[105px] top-[63px] left-[15px] absolute bg-colors-primary-brand rounded-[var(--corner-radius-8)]" />
                </div>
                <div className="flex-1 h-full relative">
                  <div className="w-7 h-[168px] left-[15px] absolute bg-[color:var(--colors-secondary-blue)] rounded-[var(--corner-radius-8)]" />
                </div>
                <div className="flex-1 h-full relative">
                  <div className="w-7 h-[63px] top-[105px] left-[15px] absolute bg-colors-secondary-cyan rounded-[var(--corner-radius-8)]" />
                </div>
                <div className="flex-1 h-full relative">
                  <div className="w-7 h-[126px] top-[42px] left-[15px] absolute bg-colors-secondary-green rounded-[var(--corner-radius-8)]" />
                </div>
              </div>

              {/* X-axis labels */}
              <div className="[display:var(--show-text-show-text,flex)] w-[345px] items-center absolute top-[180px] left-0">
                {deviceLabels.map((device, index) => (
                  <div
                    key={`device-x-axis-${index}`}
                    className="flex-1 text-center mt-[-1.00px] font-12-regular text-colors-black-40 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]"
                  >
                    {device}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traffic by Location */}
      <Card className="min-w-[400px] h-[280px] flex-1 bg-colors-background-bg2 rounded-[var(--corner-radius-16-duplicate)] overflow-hidden">
        <CardContent className="flex flex-col gap-[var(--spacing-16)] p-[var(--spacing-24-duplicate)]">
          <div className="[display:var(--show-text-show-text,flex)] flex-col items-start justify-center w-full rounded-[var(--corner-radius-8)]">
            <div className="font-14-semibold text-colors-black-100 text-[length:var(--14-semibold-font-size)] tracking-[var(--14-semibold-letter-spacing)] leading-[var(--14-semibold-line-height)] [font-style:var(--14-semibold-font-style)]">
              Traffic by Location
            </div>
          </div>

          <div className="flex items-center gap-[var(--spacing-40)] px-[var(--spacing-20)] py-0 flex-1 w-full">
            {/* Pie chart */}
            <div className="relative w-[120px] h-[120px]">
              <div className="relative w-[120px] h-[120px]">
                <div className="absolute w-[74px] h-[120px] top-0 left-[46px] bg-[url(https://c.animaapp.com/5h59n1Cx/img/frame-12.svg)] bg-[100%_100%]" />
                <div className="w-[52px] h-[73px] top-[45px] left-0 bg-[url(https://c.animaapp.com/5h59n1Cx/img/frame-13.svg)] absolute bg-[100%_100%]" />
                <div className="w-[42px] h-[42px] top-2 left-[3px] bg-[url(https://c.animaapp.com/5h59n1Cx/img/frame-14.svg)] absolute bg-[100%_100%]" />
                <div className="w-7 h-[33px] top-0 left-[31px] bg-[url(https://c.animaapp.com/5h59n1Cx/img/frame-15.svg)] absolute bg-[100%_100%]" />
              </div>
            </div>

            {/* Location list */}
            <div className="flex flex-col gap-[var(--spacing-12)] flex-1 rounded-[var(--corner-radius-16-duplicate)]">
              {locationTraffic.map((location, index) => (
                <div
                  key={`location-${index}`}
                  className="flex justify-between items-center w-full rounded-[var(--corner-radius-8)]"
                >
                  <div className="flex items-center pr-[var(--spacing-8-duplicate)] pl-[var(--spacing-4)] py-0.5 rounded-[var(--corner-radius-8)]">
                    <img
                      className="w-4 h-4"
                      alt="Dot"
                      src={location.dotColor}
                    />
                    <div className="ml-1 font-12-regular text-colors-black-100 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] whitespace-nowrap [font-style:var(--12-regular-font-style)]">
                      {location.name}
                    </div>
                  </div>
                  <div className="font-12-regular text-colors-black-100 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]">
                    {location.percentage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketing & SEO */}
      <Card className="min-w-[800px] h-[280px] flex-1 bg-colors-background-bg2 rounded-[var(--corner-radius-16-duplicate)] overflow-hidden">
        <CardContent className="flex flex-col gap-[var(--spacing-16)] p-[var(--spacing-24-duplicate)]">
          <div className="[display:var(--show-text-show-text,flex)] flex-col items-start justify-center w-full rounded-[var(--corner-radius-8)]">
            <div className="font-14-semibold text-colors-black-100 text-[length:var(--14-semibold-font-size)] tracking-[var(--14-semibold-letter-spacing)] leading-[var(--14-semibold-line-height)] [font-style:var(--14-semibold-font-style)]">
              Marketing &amp; SEO
            </div>
          </div>

          <div className="flex items-start gap-[var(--spacing-16)] flex-1 w-full">
            {/* Y-axis labels */}
            <div className="flex flex-col items-end justify-between h-full">
              {yAxisLabels.map((label, index) => (
                <div
                  key={`marketing-y-axis-${index}`}
                  className="flex-1 font-12-regular text-colors-black-40 text-right text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="flex flex-col items-start flex-1 h-full relative">
              <div className="flex-1 w-full" />

              {/* Bar chart */}
              <div className="w-[805px] flex h-[196px] items-end justify-between pb-[var(--spacing-28)] pt-0 px-0 absolute top-0 left-0">
                {Array(12)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={`marketing-bar-${index}`}
                      className="flex flex-col items-center justify-end relative flex-1 h-full"
                    >
                      {/* Different bar heights based on position */}
                      <div
                        className={`relative flex-1 max-w-[var(--icon-size-28-duplicate)] w-full ${
                          index % 3 === 0
                            ? "bg-colors-secondary-indigo h-[84px] top-[84px]"
                            : index % 3 === 1
                              ? "bg-colors-secondary-mint h-[147px] top-[21px]"
                              : "bg-colors-primary-brand h-[105px] top-[63px]"
                        } rounded-[var(--corner-radius-8)_var(--corner-radius-8)_0px_0px]`}
                      />
                      <div
                        className={`relative flex-1 max-w-[var(--icon-size-28-duplicate)] w-full ${
                          index % 3 === 0
                            ? "bg-colors-secondary-indigo"
                            : index % 3 === 1
                              ? "bg-colors-secondary-mint"
                              : "bg-colors-primary-brand"
                        }`}
                      />
                      <div
                        className={`relative flex-1 max-w-[var(--icon-size-28-duplicate)] w-full ${
                          index % 3 === 0
                            ? "bg-colors-secondary-indigo"
                            : index % 3 === 1
                              ? "bg-colors-secondary-mint"
                              : "bg-colors-primary-brand"
                        }`}
                      />
                      <div
                        className={`relative flex-1 max-w-[var(--icon-size-28-duplicate)] w-full ${
                          index % 3 === 0
                            ? "bg-colors-secondary-indigo"
                            : index % 3 === 1
                              ? "bg-colors-secondary-mint"
                              : "bg-colors-primary-brand"
                        }`}
                      />
                      <div
                        className={`relative flex-1 max-w-[var(--icon-size-28-duplicate)] w-full ${
                          index % 3 === 0
                            ? "bg-colors-secondary-indigo"
                            : index % 3 === 1
                              ? "bg-colors-secondary-mint"
                              : "bg-colors-primary-brand"
                        }`}
                      />
                      <div
                        className={`relative flex-1 max-w-[var(--icon-size-28-duplicate)] w-full ${
                          index % 3 === 0
                            ? "bg-colors-secondary-indigo"
                            : index % 3 === 1
                              ? "bg-colors-secondary-mint"
                              : "bg-colors-primary-brand"
                        } rounded-[0px_0px_var(--corner-radius-8)_var(--corner-radius-8)]`}
                      />
                    </div>
                  ))}
              </div>

              {/* X-axis labels */}
              <div className="[display:var(--show-text-show-text,flex)] w-[805px] items-center absolute top-[180px] left-0">
                {fullMonths.map((month, index) => (
                  <div
                    key={`marketing-x-axis-${index}`}
                    className="flex-1 text-center mt-[-1.00px] font-12-regular text-colors-black-40 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)] [font-style:var(--12-regular-font-style)]"
                  >
                    {month}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
