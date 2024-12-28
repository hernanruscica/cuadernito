import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ messages, onClose, duration = 2000 }) => {
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        onClose(messages[0]); 
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [messages, onClose, duration]);

  return (
    <div className="toast-container">
      {messages.map((message, index) => (
        <div key={index} className="toast">
          {message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
