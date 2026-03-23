// MessageComposer.jsx
import React, { useState } from "react";

export default function MessageComposer({ onSend }) {
  const [value, setValue] = useState("");
  const handleSend = () => {
    if (value.trim()) {
      onSend(value);
      setValue("");
    }
  };
  return (
    <div className="flex items-center p-2 border-t bg-white/5">
      <input
        className="flex-1 px-3 py-2 rounded border mr-2"
        type="text"
        placeholder="Votre message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
        onClick={handleSend}
      >
        Envoyer
      </button>
    </div>
  );
}
