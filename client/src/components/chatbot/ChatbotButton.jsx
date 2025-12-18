import React, { useState } from "react";
import { IoChatbubblesOutline, IoClose } from "react-icons/io5";
import BWLogo from "../../assets/Logo/BitWisdom_Secondary_Logomark_Registered.png";

const ChatbotButton = ({ isOpen, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {!isOpen && showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 animate-fade-in">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
            <p className="text-sm font-medium">Need help? Chat with us!</p>
            {/* Arrow */}
            <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-blue-500"></div>
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`group relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl ${
          !isOpen ? "animate-bounce-subtle" : ""
        }`}
        style={{
          background: "linear-gradient(135deg, #00ecff 0%, #0080fa 100%)",
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {/* Button content */}
        <div className="relative z-10">
          {isOpen ? (
            <IoClose className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <img
              src={BWLogo}
              alt="BitWisdom"
              className="w-10 h-10 object-contain transition-transform duration-300 group-hover:rotate-12"
            />
          )}
        </div>
      </button>
    </div>


);
};

export default ChatbotButton;
