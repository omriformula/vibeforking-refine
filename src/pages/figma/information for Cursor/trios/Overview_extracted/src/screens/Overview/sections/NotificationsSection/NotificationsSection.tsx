import { BugIcon, StarIcon, UserIcon } from "lucide-react";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

export const NotificationsSection = (): JSX.Element => {
  // Notification data
  const notifications = [
    {
      icon: <BugIcon className="h-4 w-4" />,
      iconBg: "bg-colors-background-bg4",
      title: "You fixed a bug.",
      time: "Just now",
    },
    {
      icon: <UserIcon className="h-4 w-4" />,
      iconBg: "bg-colors-background-bg3",
      title: "New user registered.",
      time: "59 minutes ago",
    },
    {
      icon: <BugIcon className="h-4 w-4" />,
      iconBg: "bg-colors-background-bg4",
      title: "You fixed a bug.",
      time: "12 hours ago",
    },
    {
      icon: <StarIcon className="h-4 w-4" />,
      iconBg: "bg-colors-background-bg3",
      title: "Andi Lane subscribed to you.",
      time: "Today, 11:59 AM",
    },
  ];

  // Activity data
  const activities = [
    {
      avatar: "https://c.animaapp.com/5h59n1Cx/img/frame-1@2x.png",
      title: "Changed the style.",
      time: "Just now",
    },
    {
      avatar: "https://c.animaapp.com/5h59n1Cx/img/frame-2@2x.png",
      title: "Released a new version.",
      time: "59 minutes ago",
    },
    {
      avatar: "https://c.animaapp.com/5h59n1Cx/img/frame-3@2x.png",
      title: "Submitted a bug.",
      time: "12 hours ago",
    },
    {
      avatar: "https://c.animaapp.com/5h59n1Cx/img/frame-4@2x.png",
      title: "Modified A data in Page X.",
      time: "Today, 11:59 AM",
    },
    {
      avatar: "https://c.animaapp.com/5h59n1Cx/img/frame-5@2x.png",
      title: "Deleted a page in Project X.",
      time: "Feb 2, 2025",
    },
  ];

  // Contacts data
  const contacts = [
    {
      avatar: "https://c.animaapp.com/5h59n1Cx/img/frame-6@2x.png",
      name: "Natali Craig",
    },
    {
      avatar: "https://c.animaapp.com/5h59n1Cx/img/frame-7@2x.png",
      name: "Drew Cano",
    },
    {
      avatar: "https://c.animaapp.com/5h59n1Cx/img/frame-8@2x.png",
      name: "Andi Lane",
    },
    {
      avatar: "https://c.animaapp.com/5h59n1Cx/img/frame-9@2x.png",
      name: "Koray Okumus",
    },
    {
      avatar: "https://c.animaapp.com/5h59n1Cx/img/frame-10@2x.png",
      name: "Kate Morrison",
    },
    {
      avatar: "https://c.animaapp.com/5h59n1Cx/img/frame-11@2x.png",
      name: "Melody Macy",
    },
  ];

  return (
    <Card className="flex flex-col h-full border-l border-colors-black-10 border-t-0 border-r-0 border-b-0 rounded-none">
      <CardContent className="flex flex-col gap-[var(--spacing-16)] p-[var(--spacing-16)]">
        {/* Notifications Section */}
        <div className="flex flex-col items-start gap-[var(--spacing-4)] w-full">
          <div className="flex items-center w-full py-[var(--spacing-8-duplicate)] px-[var(--spacing-4)] rounded-[var(--corner-radius-8)]">
            <div className="flex flex-col items-start justify-center flex-1">
              <div className="font-14-regular text-colors-black-100 text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)]">
                Notifications
              </div>
            </div>
          </div>

          {notifications.map((notification, index) => (
            <div
              key={`notification-${index}`}
              className="flex items-start gap-[var(--spacing-8-duplicate)] p-[var(--spacing-8-duplicate)] w-full rounded-[var(--corner-radius-12-duplicate)]"
            >
              <div
                className={`flex items-center justify-center p-[var(--spacing-4)] ${notification.iconBg} rounded-[var(--spacing-radius-8)]`}
              >
                {notification.icon}
              </div>
              <div className="flex flex-col items-start justify-center flex-1">
                <div className="w-full mt-[-1.00px] font-14-regular text-colors-black-100 text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)] overflow-hidden text-ellipsis whitespace-nowrap">
                  {notification.title}
                </div>
                <div className="w-full font-12-regular text-colors-black-40 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)]">
                  {notification.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activities Section */}
        <div className="flex flex-col items-start gap-[var(--spacing-4)] w-full">
          <div className="flex items-center w-full py-[var(--spacing-8-duplicate)] px-[var(--spacing-4)] rounded-[var(--corner-radius-8)]">
            <div className="flex flex-col items-start justify-center flex-1">
              <div className="font-14-regular text-colors-black-100 text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)]">
                Activities
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-0 left-[19px] h-full flex flex-col">
              <Separator
                orientation="vertical"
                className="flex-1 bg-colors-black-10 rounded-[var(--corner-radius-80)]"
              />
            </div>

            {activities.map((activity, index) => (
              <div
                key={`activity-${index}`}
                className="flex items-start gap-[var(--spacing-8-duplicate)] p-[var(--spacing-8-duplicate)] w-full rounded-[var(--corner-radius-12-duplicate)]"
              >
                <Avatar className="h-6 w-6 bg-colors-black-4 rounded-[var(--corner-radius-80)]">
                  <AvatarImage
                    src={activity.avatar}
                    alt="User avatar"
                    className="h-6"
                  />
                  <AvatarFallback className="h-6 w-6 bg-colors-black-4">
                    U
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center flex-1">
                  <div className="w-full mt-[-1.00px] font-14-regular text-colors-black-100 text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)] overflow-hidden text-ellipsis whitespace-nowrap">
                    {activity.title}
                  </div>
                  <div className="w-full font-12-regular text-colors-black-40 text-[length:var(--12-regular-font-size)] tracking-[var(--12-regular-letter-spacing)] leading-[var(--12-regular-line-height)]">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contacts Section */}
        <div className="flex flex-col items-start gap-[var(--spacing-4)] w-full">
          <div className="flex items-center w-full py-[var(--spacing-8-duplicate)] px-[var(--spacing-4)] rounded-[var(--corner-radius-8)]">
            <div className="flex flex-col items-start justify-center flex-1">
              <div className="font-14-regular text-colors-black-100 text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)]">
                Contacts
              </div>
            </div>
          </div>

          {contacts.map((contact, index) => (
            <div
              key={`contact-${index}`}
              className="flex items-center gap-[var(--spacing-8-duplicate)] p-[var(--spacing-8-duplicate)] w-full rounded-[var(--corner-radius-8)]"
            >
              <Avatar className="h-6 w-6 bg-colors-black-4 rounded-[var(--corner-radius-80)]">
                <AvatarImage
                  src={contact.avatar}
                  alt={`${contact.name}'s avatar`}
                  className="h-6"
                />
                <AvatarFallback className="h-6 w-6 bg-colors-black-4">
                  {contact.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start justify-center">
                <div className="mt-[-1.00px] font-14-regular text-colors-black-100 text-[length:var(--14-regular-font-size)] tracking-[var(--14-regular-letter-spacing)] leading-[var(--14-regular-line-height)]">
                  {contact.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
