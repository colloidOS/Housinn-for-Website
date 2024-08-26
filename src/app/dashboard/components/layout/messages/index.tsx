import React from "react";
import Link from "next/link";
import Image from "next/image";
import Profile from "@/../public/icons/pfp.svg";

function MessageList() {
  const messages = [
    {
      name: "Gregory Weh",
      message: "Hello, wanted to contact you for the property...",
      time: "9:16 AM",
      isUnread: true,
    },
    {
      name: "Patricia Okah",
      message: "I'll get back to you",
      time: "7:22 AM",
    },
    {
      name: "Samuel Nnanna",
      message: "I'll be willing to meet up for an inspection",
      time: "5:06 PM",
      isDelivered: true,
    },
    {
      name: "Baraka Oman",
      message: "That's fair",
      time: "6:18 PM",
      isUnread: true,
    },
  ];
  return (
    <>
      <div className="flex flex-col px-6 w-full gap-[18px] pt-6 pb-11 bg-white rounded-xl">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold text-gray-700">Messages</h1>
          <Link
            href={`dashboard/messages`}
            className="text-secondary text-sm pr-1"
          >
            See All
          </Link>
        </div>
        <div>
          <div className="">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="flex justify-between pt-2 pb-1.5 w-full items-center "
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={Profile}
                    alt={`${msg.name}-profile`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-xs font-semibold text-black">
                      {msg.name}
                    </p>
                    <p
                      className={`text-[10px] ${
                        msg.isUnread ? "" : "text-gray-500"
                      } truncate`}
                      style={{ width: "240px" }}
                    >
                      {msg.message}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-xs text-gray-500">{msg.time}</p>
                  {msg.isUnread && (
                    <span className="bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      1
                    </span>
                  )}
                  {msg.isDelivered && (
                    <span className="text-gray-500 text-xl">✔️</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageList;
