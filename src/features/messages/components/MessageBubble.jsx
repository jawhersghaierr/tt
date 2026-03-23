// MessageBubble.jsx
import React from "react";

export default function MessageBubble({ message }) {
  return (
    <div
      className={`flex ${message.fromMe ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`px-3 py-2 rounded-lg max-w-xs ${
          message.fromMe
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-900"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
