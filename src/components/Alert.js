// Alert.js
import React from "react";
import "../App.css";

const Alert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="alert">
      {message}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Alert;
