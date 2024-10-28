// import React, { useState, useEffect, useRef } from "react";
// import ReactMarkdown from "react-markdown";
// import TypingIndicator from "./TypingIndicator";
// import Chat from "./Chat";
// import { useLocation, useNavigate } from "react-router-dom";

// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState(() => {
//     const savedChatHistory = sessionStorage.getItem("chatHistory");
//     return savedChatHistory ? JSON.parse(savedChatHistory) : [];
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const chatEndRef = useRef(null);
//   const [pendingMessage, setPendingMessage] = useState(null);
//   const [promptLoading, setPromptLoading] = useState(false);

//   useEffect(() => {
//     sessionStorage.setItem("chatHistory", JSON.stringify(chatHistory));
//   }, [chatHistory]);

//   const handleSendMessage = async (msg = message) => {
//     console.log("sending!!");
//     console.log("Sending message:", msg);
//     if (typeof msg !== "string" || msg.trim() === "") {
//       console.log("Message is empty, not sending");
//       return;
//     }

//     setPendingMessage(msg);
//     setMessage("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("http://localhost:5001/ask", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           message: msg,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send message");
//       }

//       const data = await response.json();
//       console.log("Received response:", data);

//       setChatHistory(data.messages);
//       setMessage("");
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setPendingMessage(null);
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [chatHistory, pendingMessage]);

//   const [language, setLanguage] = useState("English");

//   const handleLanguageChange = () => {
//     setLanguage((prevLanguage) =>
//       prevLanguage === "English" ? "Spanish" : "English"
//     );
//   };

//   return (
//     <div className="flex flex-col h-screen p-4">
//       <h1 className="text-center p-4 font-bold ">
//         <div className="flex flex-row absolute top-0 right-0 m-4 space-x-2">
//           <button
//             onClick={handleLanguageChange}
//             className="text-sm p-2 text-blue-600 border rounded-full font-semibold bg-blue-600 text-white hover:text-blue-500 hover:bg-white hover:border-blue-600"
//           >
//             {language}
//           </button>
//           <button className="text-sm p-2 text-blue-600 border rounded-full font-semibold bg-blue-600 text-white hover:text-blue-500 hover:bg-white hover:border-blue-600">
//             ?
//           </button>
//         </div>

//         <div>
//           <span className="relative inline-block text-2xl px-4 pr-6 rounded pb-4 ml-1">
//             <span
//               className="absolute inset-0 bg-red-100 transform -skew-x-12"
//               style={{ top: "1.7rem", height: "30%", width: "100%" }}
//             ></span>
//             <span className="relative transform italic font-wildy-sans text-5xl">
//               Link
//             </span>
//           </span>{" "}
//           <br></br>
//           <div className="text-xs md:text-sm">
//             {" "}
//             Connecting you with federal and state (Massachusetts) benefits
//           </div>
//         </div>
//       </h1>

//       <Chat
//         chatHistory={chatHistory}
//         pendingMessage={pendingMessage}
//         promptLoading={promptLoading}
//         chatEndRef={chatEndRef}
//       />
//       <div className="flex mx-6">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           className="flex-grow m-2 ml-0 p-2 border border-sm border-slate-500 border-2 rounded "
//           placeholder="Type your message..."
//           disabled={isLoading}
//         />
//         <button
//           onClick={() => handleSendMessage()}
//           className="m-2 mr-0 p-2 text-blue-600 border rounded font-semibold text-blue-600 bg-blue-600 text-white  hover:text-blue-500 hover:bg-white hover:border-blue-600"
//           disabled={isLoading}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;

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
