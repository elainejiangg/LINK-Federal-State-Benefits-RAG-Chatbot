import React from "react";

function MessageInput({
  message,
  setMessage,
  handleSendMessage,
  handleKeyPress,
  isLoading,
}) {
  return (
    <div className="flex mx-6">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-grow m-2 ml-0 p-2 border border-sm border-slate-500 border-2 rounded "
        placeholder="Type your message..."
        disabled={isLoading}
      />
      <button
        onClick={() => handleSendMessage()}
        className="m-2 mr-0 p-2 text-blue-600 border rounded font-semibold text-blue-600 bg-blue-600 text-white  hover:text-blue-500 hover:bg-white hover:border-blue-600"
        disabled={isLoading}
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
