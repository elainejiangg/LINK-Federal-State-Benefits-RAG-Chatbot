import React from "react";
import ReactMarkdown from "react-markdown";
import TypingIndicator from "./TypingIndicator";

function Chat({ chatHistory, pendingMessage, promptLoading, chatEndRef }) {
  return (
    <div className="mx-6 py-6 flex-grow overflow-y-scroll bg-gradient-to-tr from-violet-100 shadow-xl via-blue-100 to-pink-50 shadow-inner rounded-xl">
      <div className="mt-10">
        {[...chatHistory].reverse().map((chat, index) => (
          <div key={index} className=" mx-4 mt-2 text-sm">
            <div className="relative">
              <ReactMarkdown
                className={` bg-white rounded-lg px-4 py-2 mx-3 ${
                  chat.role === "user"
                    ? "ml-auto text-end w-1/2"
                    : "mr-auto  w-3/4"
                }`}
              >
                {chat.content}
              </ReactMarkdown>
              <div className="text-sm font-semibold py-1">
                {chat.role === "user" ? (
                  <div className="text-right mr-5 flex flex-row justify-end ">
                    <p>You</p>
                  </div>
                ) : (
                  <div className="text-left ml-5 font-bold">LINK</div>
                )}
              </div>
            </div>
          </div>
        ))}

        {pendingMessage && (
          <>
            <div className="relative">
              <div className=" bg-white mx-4 mt-2 text-sm  rounded-lg px-3 py-2 w-1/2  mx-3  ml-auto">
                {pendingMessage}
              </div>

              <div className="text-sm font-semibold py-1">
                <div className="text-right mr-5 flex flex-row justify-end ">
                  <p>You</p>
                </div>

                <div className="text-left ml-5 ">
                  <div className="w-12 bg-white px-3 pb-1 rounded-full mb-1">
                    <TypingIndicator />
                  </div>
                  LINK
                </div>
              </div>
            </div>
          </>
        )}

        {promptLoading && (
          <>
            <div className="relative">
              <div className="text-sm font-semibold py-1">
                <div className="text-left ml-5 ">
                  <div className="w-12 bg-white px-3 pb-1 rounded-full mb-1">
                    <TypingIndicator />
                  </div>
                  LINK
                </div>
              </div>
            </div>
          </>
        )}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}

export default Chat;
