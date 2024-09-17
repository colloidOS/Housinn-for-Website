"use client";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";

//const socket = io("http://localhost:3000"); // Your backend socket URL

const token = Cookies.get("token");
const id = Cookies.get("id");

const MessagePage = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [userId, setUserId] = useState(`${id}`); // Set this to your logged-in user's ID

  // Fetch all chats when component loads
  useEffect(() => {
    axios
      .get("https://housinn.onrender.com/api/chats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setChats(response.data); // Set chats only if the data is an array
        } else {
          console.error("Chats data is not an array:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching chats:", error));
  }, []);

  // Fetch messages for the selected chat
  const selectChat = (chat) => {
    setCurrentChat(chat);

    // Fetch chat messages
    axios
      .get(`https://housinn.onrender.com/api/chats/${id}`)
      .then((response) => {
        setMessages(response.data.messages);
        console.log(response.data);
        // Fetch user details for the current chat
        axios
          .get(`https://housinn.onrender.com/api/users/search/${id}`)
          .then((userResponse) => setCurrentUser(userResponse.data.data))
          .catch((userError) =>
            console.error("Error fetching user:", userError)
          );
      })
      .catch((error) => console.error("Error fetching chat messages:", error));
  };

  // Send a new message
  const handleSendMessage = () => {
    if (newMessageText && currentChat) {
      socket.emit("sendMessage", {
        chatId: currentChat._id,
        text: newMessageText,
      });
      setNewMessageText(""); // Clear input after sending
    }
  };

  useEffect(() => {
    // Listen for new incoming messages
    socket.on("receiveMessage", (newMessage) => {
      if (currentChat && newMessage.chatId === currentChat._id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    // Clean up on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [currentChat]);

  return (
    <div className="message-page">
      <div className="sidebar">
        <h3>Chats</h3>
        <ul>
          {chats.map((chat, index) => (
            <li key={index} onClick={() => selectChat(chat)}>
              {chat.receiverName} {/* Display the other user's name */}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-section">
        {currentUser && (
          <div className="chat-header">
            <Image
              src={currentUser.avatar}
              alt="User Avatar"
              width={50}
              height={50}
            />
            <h3>
              {currentUser.firstName} {currentUser.lastName}
            </h3>
            <p>Email: {currentUser.email}</p>
          </div>
        )}

        <div className="message-list">
          {/* Display messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-item ${
                message.senderId === userId ? "sent" : "received"
              }`}
            >
              <p>{message.text}</p>
              <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>

        <div className="message-input">
          <input
            type="text"
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
