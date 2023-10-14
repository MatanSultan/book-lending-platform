import React, { useState } from "react";

const RequestBookModal = ({ isOpen, onClose, onSendRequest }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    onSendRequest(name, email, message);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Request Book</h2>
        <input
          type="text"
          placeholder="Name/Nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Message content..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSubmit}>Send Request</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RequestBookModal;
