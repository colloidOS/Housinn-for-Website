"use client";
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import api from "@/lib/api";
import { SendHorizontal, ArrowLeftIcon } from "lucide-react";
import Pfp from "../../../../public/images/pfp.png"; 
import Search from "../../../../public/icons/search.svg"; 
import { useAuth } from "@/context/AuthContext";
import {
  format,
  isToday,
  isThisWeek,
  isYesterday,
  isSameDay,
  differenceInDays,
  isAfter,
  isBefore,
  addYears,
  subDays,
  formatDate,
} from "date-fns";

const socket = io("https://housinn.onrender.com"); // Backend socket URL

const MessagePage = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showChatList, setShowChatList] = useState(true); // Initially show chat list
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messageInputRef = useRef(null);

  // Ref to keep track of the last message for auto-scroll
  const scrollRef = useRef(null);

  const { user } = useAuth();

  const userId = user?.id;
  const token = user?.token;

  // Scroll to the bottom of the message list
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Format time to 'hh:mm a'
  const messageformatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  const formatDateHeader = (timeString) => {
    const date = new Date(timeString);
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (differenceInDays(new Date(), date) < 7) {
      return format(date, "EEEE"); // Returns day of the week (e.g., Monday)
    }
    return format(date, "dd/MM/yyyy"); // Returns in 'dd/MM/yyyy' format
  };

  // Helper function to format time

  const formatTime = (timestamp) => {
    const messageDate = new Date(timestamp);
    const oneHundredYearsAgo = addYears(new Date(), -100);
    const sixDaysAgo = subDays(new Date(), 6);

    // If it's today, display the time
    if (isToday(messageDate)) {
      return format(messageDate, "hh:mm a");
    }

    // If the message is within the current week, display the weekday
    if (isThisWeek(messageDate)) {
      return format(messageDate, "EEEE"); // e.g., Tuesday
    }

    // If the message is older than 6 days but less than 100 years
    if (
      isBefore(messageDate, sixDaysAgo) &&
      isAfter(messageDate, oneHundredYearsAgo)
    ) {
      return format(messageDate, "dd/MM/yy");
    }

    // Handle other cases if necessary
    return ""; // Optional: For dates older than 100 years or future dates
  };

  useEffect(() => {
    // Connect to socket server and fetch chats
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    const fetchChatsAndUpdateUnread = async () => {
      try {
        const chatResponse = await api.get("/chats", {
          headers: {
            Authorization: `Bearer ${token}`, // Use the stored token
          },
        });

        const fetchedChats = chatResponse.data.data.chats;
        console.log(fetchedChats);

        if (Array.isArray(fetchedChats)) {
          // Join all chat rooms by emitting a `joinChat` event for each chat ID
          fetchedChats.forEach((chat) => {
            socket.emit("joinChat", chat.id);
          });

          // Update the chat state with unread status, lastMessage, and lastMessageTime
          setChats(
            fetchedChats.map((chat) => ({
              ...chat,
              lastMessage: chat.lastMessage || "", // Update with the last message
              lastMessageTime: chat.messages.length
                ? chat.messages[chat.messages.length - 1].createdAt
                : chat.createdAt, // Use latest message time if available
              unread: chat.isRead === false, // Chat is unread if `isRead` is false
              unreadCount: chat.isRead === false ? 1 : 0, // If unread, set unreadCount to 1
            }))
          );
        } else {
          console.error("Error: fetched chats is not an array");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChatsAndUpdateUnread();
  }, [token]);

  // Select a chat and fetch its messages
  const selectChat = (chat) => {
    setCurrentChat(chat); // Set current chat

    // Mark chat as read when selected
    api
      .put(`/chats/read/${chat.id}`, {
        seenBy: [...chat.seenBy, userId],
      })
      .then((response) => {
        if (response.data.status === "success") {
          // Update chats list to mark the chat as read without resetting the time
          setChats((prevChats) =>
            prevChats.map((c) =>
              c.id === chat.id
                ? { ...c, unread: false, unreadCount: 0 } // No lastMessageTime update here
                : c
            )
          );
        }
      })
      .catch((error) => console.error("Error marking chat as read:", error));

    // Fetch the messages for the selected chat
    api
      .get(`/chats/${chat.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.status === "success") {
          setMessages(response.data.data.messages);
          scrollToBottom();

          // Listen for chat updates for the selected chat
          socket.on("chatUpdated", (data) => {
            if (data.chatId === chat.id) {
              const { updatedChat } = data;
              console.log(updatedChat);
              // Update the chat without resetting the lastMessageTime
              setChats((prevChats) =>
                prevChats.map((c) =>
                  c.id === chat.id
                    ? {
                        ...c,
                        seenBy: updatedChat.seenBy,
                        // Only update lastMessageTime if there's a newer message
                        lastMessageTime:
                          updatedChat.messages.length > 0
                            ? updatedChat.messages[
                                updatedChat.messages.length - 1
                              ].createdAt
                            : c.lastMessageTime,
                      }
                    : c
                )
              );
            }
          });
        }
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      })
      .catch((error) => console.error("Error fetching chat messages:", error));
  };

  // Mark chat as read when user selects it
  const markChatAsRead = (chatId) => {
    if (currentChat?.id === chatId) {
      api
        .put(`/chats/read/${chatId}`, {
          seenBy: [...currentChat.seenBy, userId],
        })
        .then(() => {
          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === chatId
                ? { ...chat, unread: false, unreadCount: 0 }
                : chat
            )
          );
        })
        .catch((error) => console.error("Error marking chat as read:", error));
    }
  };

  // Handle marking as unread when a new message is received and the chat isn't open
  useEffect(() => {
    socket.on("newMessage", (message) => {
      if (message.chatId !== currentChat?.id) {
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === message.chatId
              ? { ...chat, unread: true, unreadCount: chat.unreadCount + 1 }
              : chat
          )
        );
      }
    });

    return () => {
      socket.off("newMessage");
    };
  }, [currentChat]);

  // Clean up the socket listener when the component unmounts or chat changes
  useEffect(() => {
    return () => {
      socket.off("chatUpdated"); // Clean up on component unmount or re-render
    };
  }, [currentChat]);

  // Function to handle sending a new message
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const handleSendMessage = () => {
   
    if (newMessageText && currentChat) {
      setIsLoading(true); // Show loading spinner when sending the message

      // Emit the new message via WebSocket
      socket.emit(
        "sendMessage",
        {
          chatId: currentChat.id,
          userId, // The sender's ID
          text: newMessageText,
        },
        console.log("Message sent:", newMessageText)
      );

      // Optionally: Also make an API call for server-side persistence
      api
        .post(
          `messages/${currentChat.id}`,
          { text: newMessageText },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          const messageData = response.data.data;
          console.log("new mess:", messageData);
          // Immediately add the new message to the message list
          setMessages((prevMessages) => [...prevMessages, messageData]);

          // Update the chats list with the latest message and time
          setChats((prevChats) => {
            console.log(prevChats);
            const updatedChats = prevChats.map((chat) => {
              if (chat.id === currentChat.id) {
                return {
                  ...chat,
                  lastMessage: newMessageText, // Update with the new message text
                  lastMessageTime: messageData.createdAt, // Use the correct timestamp for this message
                };
              }
              return chat;
            });
            console.log(updatedChats);
            // Sort the updated chats list by lastMessageTime
            return updatedChats.sort(
              (a, b) =>
                new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
            );
          });

          // Clear the message input and scroll to the bottom of the chat
          setNewMessageText("");
          setTimeout(() => {
            scrollToBottom();
          }, 100);
          setNewMessageText("");
          if (messageInputRef.current) {
            messageInputRef.current.style.height = "auto"; // Reset height after message is sent
          }
        })
        .catch((error) => console.error("Error sending message:", error))
        .finally(() => {
          setIsLoading(false); // Remove loading spinner after sending the message
        });
    }
  };

  // Focus on the input when a chat is opened
  useEffect(() => {
    if (currentChat && messageInputRef.current) {
      messageInputRef.current.focus();
      adjustInputHeight(); // Adjust height on load if there's existing text
    }
  }, [currentChat]);

  // Adjust input height dynamically
  const adjustInputHeight = () => {
    if (messageInputRef.current) {
      messageInputRef.current.style.height = "auto"; // Reset height to recalculate
      messageInputRef.current.style.height = `${messageInputRef.current.scrollHeight}px`; // Set to scrollHeight
    }
  };

  const handleInputChange = (e) => {
    setNewMessageText(e.target.value);
    adjustInputHeight();
  };

  const handleMessageChange = (e) => {
    setNewMessageText(e.target.value);

    // Adjust the height of the textarea based on content
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on scroll height
  };

  useEffect(() => {
    // Simulate loading chats on page load
    setTimeout(() => {
      setLoadingChats(false); // Set to false once chats are loaded
    }, 3000); // Adjust delay as necessary for your application
  }, []);

  const handleSelectChat = (chat) => {
    selectChat(chat);
    setShowChatList(false); // Hide chat list on selecting a chat
    setLoadingMessages(true); // Start loading messages
    setTimeout(() => {
      setLoadingMessages(false); // Set to false when messages are loaded
    }, 1000);
  };

  const handleGoBack = () => {
    setShowChatList(true); // Show chat list when going back
  };

  // Fetch chats on page load
  useEffect(() => {
    api
      .get("/chats", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const fetchedChats = response.data.data;
        console.log(fetchedChats);
        // Update the chat list with initial data
        setChats(
          fetchedChats.map((chat) => ({
            ...chat,
            lastMessageTime: chat.messages.length
              ? chat.messages[chat.messages.length - 1].createdAt
              : chat.createdAt, // Use the latest message time if available
            unread: chat.isRead === false, // Chat is unread if `isRead` is false
          }))
        );
      })
      .catch((error) => console.error("Error fetching chats:", error));
  }, [token]);

  // Handle receiving new messages via WebSocket
  useEffect(() => {
    socket.on("newMessage", (message) => {
      console.log("socket message:", message);
      if (message.chatId) {
        setChats((prevChats) => {
          const updatedChats = prevChats.map((chat) => {
            if (chat.id === message.chatId) {
              // Update the chat to reflect the new message and its time
              return {
                ...chat,
                lastMessage: message.text, // Update with the new message's text
                lastMessageTime: message.createdAt, // Use the current message's timestamp
                unread: chat.id !== currentChat?.id, // Mark as unread if it's not the active chat
                unreadCount:
                  chat.id !== currentChat?.id ? chat.unreadCount + 1 : 0, // Increment unread count only if the chat is not active
              };
            }
            return chat;
          });
          console.log("receive:", updatedChats);
          // Sort the updated chats list by lastMessageTime to keep most recent chats on top
          return updatedChats.sort(
            (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
          );
        });

        // If the message belongs to the currently open chat, update the message list
        if (message.chatId === currentChat?.id) {
          setMessages((prevMessages) => [...prevMessages, message]);
          setTimeout(() => {
            scrollToBottom();
          }, 100);
        }
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.off("newMessage");
    };
  }, [currentChat, chats]);

  useEffect(() => {
    console.log("Chats updated:", chats);
  }, [chats]); // This will log each time the chats state changes

  // Filter chats based on category (all or unread) and search query
  const filteredChats = chats
    .filter((chat) => {
      if (category === "unread") {
        return chat.unread; // Only show unread chats when 'unread' category is selected
      }
      return true; // Show all chats otherwise
    })
    .filter((chat) => {
      const receiverName =
        `${chat.receiver.firstName} ${chat.receiver.lastName}`.toLowerCase();
      return receiverName.includes(searchQuery.toLowerCase());
    });


  // States for managing transitions and button behavior
const [sendingMessage, setSendingMessage] =useState(false)
  const handleSendMessageClick = async () => {
    
    if (!newMessageText.trim()) return;
    if (newMessageText.trim()) {
      newMessageText.trimStart()
      // Simulate sending message while preserving formatting
      console.log("Sending message:", newMessageText);
      setNewMessageText(""); // Clear input after sending
    } // Prevent sending empty messages
    console.log("Button clicked: Disabling...");
    setSendingMessage(true); // Disable button
    handleSendMessage(); // Call your send message logic
    console.log("Re-enabling button...");
    setSendingMessage(false); // Re-enable button
  };

  return (
    <div className={`w-full flex flex-col h-full bg-background-2 gap-5 h-scree px-4 sm:px-8 ${showChatList ? 'pt-6': 'p-0'} `}>
      {/* Chat List and Search */}
      <div className="flex flex-col gap-4 lg:border-b border-gray-400">
        <h2 className={`text-2xl font-bold text-black ${showChatList ? 'block': 'hidden'}`}>Messages</h2>
        <div
          className={`flex sm:gap-6 sm:w-fit bg-white p-1 ${
            showChatList ? "block" : "hidden sm:flex"
          }`}
        >
          <div
            onClick={() => setCategory("all")}
            className={`px-4 py-2 rounded cursor-pointer w-full text-center sm:w-fit text-sm lg:text-base ${
              category === "all"
                ? "bg-primary-2 text-primary duration-300 outline-none"
                : ""
            }`}
          >
            All Messages
          </div>
          <div
            onClick={() => setCategory("unread")}
            className={`px-4 py-2 rounded cursor-pointer w-full text-center sm:w-fit text-sm lg:text-base active:outline-none ${
              category === "unread"
                ? "bg-primary-2 text-primary duration-300 outline-none"
                : ""
            }`}
          >
            Unread Messages
          </div>
        </div>
      </div>

      <div className="flex gap-5 w-full h-full md:h-[560px]">
        
        <div
          className={`flex flex-col gap-6 w-full lg:w-2/5 rounded-lg px-3 lg:px-4 xl:px-6 py-3 bg-white-200 ${
            showChatList ? "block" : "hidden lg:block"
          }`}
        >
          {" "}
          {/* Search Input */}
          <div className="flex justify-between border border-gray-300 items-center w-full pl-4 pr-8 py-2 text-sm rounded-lg text-gray-800 text-black">
            <input
              type="text"
              placeholder="Search Messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="placeholder:text-gray-500 placeholder:text-sm bg-transparent w-full focus:outline-none appearance-none"
            />
            <span className="bg">
              <Image src={Search} width={20} height={20} alt="search-icon" />
            </span>
          </div>
          {/* Chat List */}
          <div className="w-full overflow-y-auto custom-scrollbar duration-300 gap-3">
            {loadingChats ? (
              <div className="text-gray-500 text-center p-4">
                Loading Chats...
              </div>
            ) : filteredChats.length > 0 ? (
              filteredChats
                .sort((a, b) => {
                  const lastMessageTimeA =
                    a.messages.length > 0
                      ? new Date(a.lastMessageTime)
                      : new Date(a.createdAt);
                  const lastMessageTimeB =
                    b.messages.length > 0
                      ? new Date(b.lastMessageTime)
                      : new Date(b.createdAt);
                  return lastMessageTimeB - lastMessageTimeA;
                })
                .map((chat, index) => (
                  <>
                    <hr className="bg-gray-500 " />
                    <div
                      key={index}
                      onClick={() => handleSelectChat(chat)}
                      className={`px-3 py-3 rounded-lg flex gap-6 cursor-pointer truncate  w-full duration-300 ${
                        currentChat?.id === chat.id
                          ? "bg-primary-1 text-primary"
                          : "bg-white hover:bg-background-2 text-black"
                      }`}
                    >
                      {chat?.receiver.avatar ? (
                        <img
                          src={chat.receiver.avatar}
                          alt={chat.receiver.firstName}
                          width={40}
                          height={40}
                          className="rounded-full w-12 h-12"
                        />
                      ) : (
                        <Image
                          src={Pfp}
                          alt={chat.receiver.firstName}
                          width={48}
                          height={48}
                          className="rounded-"
                        />
                      )}
                      <div className="flex flex-col gap-2 w-full truncate">
                        <div className="flex w-full justify-between items-center">
                          <p className="font-semibold truncate">{`${chat.receiver.firstName} ${chat.receiver.lastName}`}</p>
                          <p className="text-xs text-gray-500">
                            {chat.lastMessageTime === null
                              ? formatTime(chat.createdAt)
                              : chat.messages.length > 0
                              ? formatTime(chat.lastMessageTime)
                              : formatTime(chat.createdAt)}
                          </p>
                        </div>
                        <div className="flex w-full justify-between">
                          <p className="text-sm text-gray-600 truncate max-w-[300px]">
                            {chat.lastMessage || "No messages yet"}
                          </p>
                          {chat.unread ? (
                            <span className="text-white bg-primary-3 px-2.5 py-0.5 rounded-full text-xs font-bold"></span>
                          ) : (
                            <span className="text-gray-300"></span> // Empty div when no unread messages
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ))
            ) : (
              <div className="text-gray-500 text-center p-4">
                No Chats Available
              </div> // No Chats message
            )}
          </div>
        </div>

        {/* Message Section */}
        <div
          className={`${
            showChatList ? "hidden lg:flex" : "flex"
          } w-full h-full lg:w-3/5 bg-white-200 rounded-lg flex flex-col justify-between`}
        >
          {currentChat ? (
            <div className="h-full">
              <div className="p-2 sm:p-4 bg-blue-100 rounded-t-lg flex items-center">
                {currentChat.receiver && (
                  <>
                    <button
                      onClick={handleGoBack}
                      className=" lg:hidden  text-primary mr-2 font-bold text-lg"
                    >
                      <ArrowLeftIcon className="w-7 h-7"/>
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg> */}
                    </button>
                    <img
                      src={currentChat.receiver.avatar || "/property.png"}
                      alt={currentChat.receiver.firstName}
                      width={40}
                      height={40}
                      className="rounded-full w-12 h-12"
                    />
                    <h3 className="ml-4 text-lg font-semibold">
                      {`${currentChat.receiver.firstName} ${currentChat.receiver.lastName}`}
                    </h3>
                  </>
                )}
              </div>

              {/* Messages Section */}
              <div className="relative flex flex-col overflow-y-auto p-4 sm:px-10 h-full w-full custom-scrollbar">
                {loadingMessages ? (
                  <p className="h-[500px] w-full flex items-center justify-center">
                    Loading messages... <ClipLoader color="#000" size={20} />
                  </p>
                ) : messages.length > 0 ? (
                  messages.reduce((acc, message, index, arr) => {
                    const currentMessageDate = new Date(message.createdAt);
                    const previousMessageDate =
                      index > 0 ? new Date(arr[index - 1].createdAt) : null;

                    if (
                      !previousMessageDate ||
                      !isSameDay(currentMessageDate, previousMessageDate)
                    ) {
                      acc.push(
                        <div
                          key={`date-${message.id}`}
                          className="text-center mx-auto text-gray-500 text-xs p-1 px-2 bg-gray-600/20 rounded-lg w-fit "
                          
                        >
                          {formatDateHeader(message.createdAt)}
                        </div>
                      );
                    }

                    acc.push(
                      <div
                        key={message.id}
                        className={`w-full flex ${
                          message.userId === userId
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div className="my-2 flex bg-white px-2 justify-between max-w-[400px] text-wrap truncate gap-3">
                          <div
                            className={`inline-block p-2 rounded-lg text-sm ${
                              message.userId === userId
                                ? "text-black"
                                : "text-black"
                            }`}
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {message.text.replace(/^\n+/, "")}
                          </div>
                          <div className="text-[10px] w-11 flex items-end text-nowrap">
                            {messageformatTime(message.createdAt)}
                          </div>
                        </div>
                        <div ref={scrollRef} />
                      </div>
                    );

                    return acc;
                  }, [])
                ) : (
                  <p className="h-[500px] w-full">No messages yet</p>
                )}
              </div>

              {/* Message Input */}
              <div className="flex p-4 border-t border-gray-300">
                <textarea
                  value={newMessageText}
                  onChange={handleInputChange}
                  rows={1}
                  className="w-full p-2 rounded-lg resize-none overflow-hidden focus:outline-none"
                  placeholder="Type a message"
                  style={{
                    maxHeight: "150px", // Maximum height for textarea
                  }}
                />
                <button
                  onClick={handleSendMessageClick}
                  disabled={
                    sendingMessage || !newMessageText.trim() // Disable button based on conditions
                  }
                  className={`${
                    sendingMessage || !newMessageText.trim()
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500"
                  } text-white rounded-r-lg px-4`}>
                  <SendHorizontal />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-2/3 flex p-5 justify-center items-center">
              <h2 className="text-xl">Select a chat to start messaging</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
