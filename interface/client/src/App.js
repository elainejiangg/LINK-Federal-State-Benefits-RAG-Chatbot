import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Chat from "./Chat";
import Header from "./Header";
import MessageInput from "./MessageInput";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState(() => {
    const savedChatHistory = sessionStorage.getItem("chatHistory");
    return savedChatHistory ? JSON.parse(savedChatHistory) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [pendingMessage, setPendingMessage] = useState(null);
  const [promptLoading, setPromptLoading] = useState(false);
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    sessionStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleSendMessage = async (msg = message) => {
    console.log("sending!!");
    console.log("Sending message:", msg);
    if (typeof msg !== "string" || msg.trim() === "") {
      console.log("Message is empty, not sending");
      return;
    }

    setPendingMessage(msg);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5001/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: msg,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      console.log("Received response:", data);

      setChatHistory(data.messages);
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setPendingMessage(null);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, pendingMessage]);

  const handleLanguageChange = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "English" ? "Spanish" : "English"
    );
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <Header language={language} handleLanguageChange={handleLanguageChange} />
      <Chat
        chatHistory={chatHistory}
        pendingMessage={pendingMessage}
        promptLoading={promptLoading}
        chatEndRef={chatEndRef}
      />
      <MessageInput
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
