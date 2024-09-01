"use client";
import React, { useState, useRef } from "react";
import Pfp from "@/../../public/images/pfp.png";
import Image from "next/image";
import Search from "../../../../public/icons/search.svg";
import { Link } from "lucide-react";

const initialDummyData = [
  {
    id: 1,
    image: Pfp,
    name: "Deborah Grandy",
    message:
      "Hello Sir. I would like to make an enquiry corncerning your recent listings",
    time: "10:59 PM",
    read: true,
    chats: [],
  },
  {
    id: 2,
    name: "Solomon Grandy",
    image: Pfp,
    message:
      "Hello Sir. I would like to make an enquiry relating to the house postings",
    time: "11:53 PM",
    read: false,
    chats: [],
  },
  {
    id: 3,
    image: Pfp,
    name: "Mike Realties",
    message: "Hello there. Welcome to Mikes Realties. How may we assist you?",
    time: "11:59 PM",
    read: true,
    chats: [],
  },
  {
    id: 4,
    image: Pfp,
    name: "Mike Realties",
    message: "Hello there. Welcome to Mikes Realties. How may we assist you?",
    time: "11:56 PM",
    read: false,
    chats: [],
  },
  {
    id: 5,
    image: Pfp,
    name: "James Rodulf",
    message: "Hello there. Welcome to Mikes Realties. How may we assist you?",
    time: "11:59 PM",
    read: false,
    chats: [],
  },
  {
    id: 6,
    image: Pfp,
    name: "Agent Henry",
    message: "Hello there. Welcome to Mikes Realties. How may we assist you?",
    time: "11:59 PM",
    read: true,
    chats: [],
  },
  // Add more messages as needed
];

function MessagePage() {
  const [messages, setMessages] = useState(initialDummyData);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessageText, setNewMessageText] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const filteredMessages = messages.filter((message) => {
    if (category === "read" && !message.read) return false;
    if (category === "unread" && message.read) return false;
    if (
      searchQuery &&
      !message.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleLinkClick = () => {
    fileInputRef.current.click();
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleSendMessage = () => {
    if (selectedMessage) {
      const newChat = {
        sender: "Mike",
        text: newMessageText,
        time: new Date().toLocaleTimeString(),
        file: fileName,
      };

      const updatedMessages = messages.map((msg) =>
        msg.id === selectedMessage.id
          ? { ...msg, chats: [...msg.chats, newChat] }
          : msg
      );

      setMessages(updatedMessages);
      setSelectedMessage(
        updatedMessages.find((msg) => msg.id === selectedMessage.id)
      );
      setNewMessageText("");
      setFileName("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
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
      <div className="flex gap-5 w-full h-[500px]">
        <div className="flex flex-col gap-6 w-2/5 rounded-lg px-3 lg:px-6 py-3 bg-white">
          <div className="flex justify-between border border-gray-300 items-center w-full pl-4 pr-8 py-2 text-sm rounded-lg text-gray-800 text-black">
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
                className={`px-1 py-3 cursor-pointer w-full flex items-center lg:gap-6 duration-100 border-t ${
                  selectedMessage?.id === message.id
                    ? "bg-background duration-150 hover:bg-background"
                    : "hover:bg-white-200"
                }`}
              >
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
        <div className="w-3/5 flex bg-white-200 rounded-lg flex-col">
          {selectedMessage ? (
            <>
              <div className="flex gap-6 items-center bg-blue-100 px-10 py-2 rounded ">
                <Image src={Pfp} alt="pfp" width={60} height={60} />
                <div className="font-semibold">{selectedMessage.name}</div>
              </div>
              <div className="flex-grow overflow-y-auto gap-3  px-10 py-5">
                <div className="flex justify-start">
                  <div className="flex justify-between bg-white py-2 w-[350px] relative">
                    <p>{selectedMessage.message} </p>
                    <span className="text-[10px] text-gray-500 flex items-end absolute bottom-1 right-1 text-nowrap">
                      {selectedMessage.time}
                    </span>
                  </div>
                </div>
                <div className="mb-2 flex flex-col gap-2 bg-white-200 justify-end items-end">
                  {selectedMessage.chats.map((chat, index) => (
                    <div
                      key={index}
                      className="flex justify-between bg-white px-4 py-2 w-[350px] relative"
                    >
                      <p className="block px-">{chat.text}</p>
                      {chat.file && (
                        <span className="  w-full items-end  text-blue-600 ">
                          {chat.file}
                        </span>
                      )}
                      <span className=" text-[10px] text-gray-500 flex items-end absolute bottom-1 right-1 text-nowrap">
                        {chat.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="message-compose flex items-center gap-2 border-y border-primary-2 bg-white-200 p-2">
                <div onClick={handleLinkClick} className="cursor-pointer">
                  <Link />
                </div>
                <input
                  type="text"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a message..."
                  className="p-2 rounded-lg w-full bg-white placeholder:text-gray-500 focus:outline-none focus:text-wrap"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-500 text-white rounded ml-2"
                >
                  Send
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none " }}
                onChange={handleFileUpload}
                accept="*"
              />
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
