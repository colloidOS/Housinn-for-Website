"use client";
import React, { useState } from "react";
import Pfp from "@/../../public/images/pfp.png";
import Image from "next/image";
import Search from "../../../../public/icons/search.svg";

const dummyData = [
  {
    id: 1,
    image: Pfp,
    name: "Deborah Grandy",
    message:
      "Hello Sir. I would like to make an enquiry corncerning your recent listings",
    time: "10:59 PM",
    read: true,
  },
  {
    id: 2,
    name: "Solomon Grandy",
    image: Pfp,
    message:
      "Hello Sir. I would like to make an enquiry relating to the house postings",
    time: "11:53 PM",
    read: false,
  },
  {
    id: 3,
    image: Pfp,
    name: "Mike Realties",
    message: "Hello there. Welcome to Mikes Realties. How may we assist you?",
    time: "11:59 PM",
    read: true,
  },
  {
    id: 4,
    image: Pfp,
    name: "Mike Realties",
    message: "Hello there. Welcome to Mikes Realties. How may we assist you?",
    time: "11:56 PM",
    read: false,
  },
  {
    id: 5,
    image: Pfp,
    name: "James Rodulf",
    message: "Hello there. Welcome to Mikes Realties. How may we assist you?",
    time: "11:59 PM",
    read: false,
  },
  {
    id: 6,
    image: Pfp,
    name: "Agent Henry",
    message: "Hello there. Welcome to Mikes Realties. How may we assist you?",
    time: "11:59 PM",
    read: true,
  },
  // Add more messages as needed
];

function MessagePage() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [category, setCategory] = useState("all"); // 'all', 'read', 'unread'
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessageText, setNewMessageText] = useState("");

  const filteredMessages = dummyData.filter((message) => {
    if (category === "read" && !message.read) return false;
    if (category === "unread" && message.read) return false;
    if (
      searchQuery &&
      !message.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleSendMessage = () => {
    if (selectedMessage) {
      const newChat = {
        sender: "Mike",
        text: newMessageText,
        time: new Date().toLocaleTimeString(),
      };

      if (!selectedMessage.chats) {
        selectedMessage.chats = [];
      }

      selectedMessage.chats.push(newChat);
      setSelectedMessage({ ...selectedMessage });
      setNewMessageText(""); // Clear the input field after sending
    }
  };

  return (
    <div className="w-full flex flex-col bg-background-2 gap-5 h-auto px-8 pt-8">
      <div className="flex flex-col gap-4 border-b border-gray-400">
        <h2 className="text-2xl font-bold text-black">Messages</h2>
        <div className=" flex gap-6 w-fit bg-white p-1">
          <div
            onClick={() => setCategory("all")}
            className={`px-4 py-2 rounded cursor-pointer ${
              category === "all"
                ? "bg-primary-2 text-primary duration-300 outline-none"
                : ""
            }`}
          >
            All Messages
          </div>
          <div
            onClick={() => setCategory("unread")}
            className={`px-4 py-2 rounded cursor-pointer active:outline-none ${
              category === "unread"
                ? "bg-primary-2 text-primary duration-300 outline-none"
                : ""
            }`}
          >
            Unread Messages
          </div>
        </div>
      </div>
      {/* Left Side: Message List and Category Bar */}
      <div className="flex gap-5 w-full h-[500px]">
        <div className="flex flex-col gap-6 w-2/5 rounded-lg px-3 lg:px-6 py-3 bg-white">
          <div className="flex justify-between border border-gray-300 items-center w-full pl-4 pr-8 py-2 text-sm rounded-lg text-gray-800  text-black">
            <input
              type="text"
              placeholder="Search Messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="placeholder:text-gray-500 placeholder:text-sm w-full focus:outline-none appearance-none"
            />
            <span className="bg">
              <Image src={Search} width={20} height={20} alt="search-icon" />
            </span>
          </div>
          <div className="w-full overflow-y-auto custom-scrollbar duration-300">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleSelectMessage(message)}
                className={`px-1 py-3 cursor-pointer w-full flex items-center lg:gap-6 hover:bg-white-200 duration-100 border-t ${
                  selectedMessage?.id === message.id
                    ? "bg-background duration-150 hover:bg-background"
                    : ""
                }`}
              >
                {" "}
                <Image src={Pfp} alt="pfp" width={60} height={60} />
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-center gap-2 relative">
                    <div className="font-semibold text-base">
                      {message.name}
                    </div>
                    <div className="text-[10px] text-gray-500 ">
                      {message.time}
                    </div>
                  </div>
                  <div
                    className={`text-sm w-full text-gray-600 truncate`}
                    style={{ width: "280px" }}
                  >
                    {message.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Side: Chat Window */}
        <div className="w-3/5 flex bg-white rounded-lg flex-col">
          {selectedMessage ? (
            <>
              <div className="flex gap-6 items-center bg-blue-100 px-10 py-2 rounded ">
                <Image src={Pfp} alt="pfp" width={60} height={60} />

                <div className="font-semibold">{selectedMessage.name}</div>
              </div>
              <div className="flex-grow overflow-y-auto bg-white-200 px-10">
                <div className="mb-2">
                  <div className="flex justify-between bg-white py-2 w-[350px] relative">
                    <p className="block px-5">{selectedMessage.message}</p>
                    <span className=" text-[10px] text-gray-500 flex items-end absolute bottom-1 right-1 text-nowrap">
                      {selectedMessage.time}
                    </span>
                  </div>
                </div>
                {/* Add your chat history rendering here if needed */}
              </div>
              <div className="message-compose flex gap-4 ">
                <input
                  type="text"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)} // Update state on input change
                  placeholder="Type a message..."
                  className="p-2 border rounded w-full"
                />
                <button
                  onClick={handleSendMessage} // Use the state value
                  className="p-2 bg-blue-500 text-white rounded ml-2"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center font-semibold text-black text-xl h-full">
              Select a message to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessagePage;
