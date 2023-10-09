import React, { useState } from "react";
import { updateProfile } from "firebase/auth";

const Profile = ({ user }) => {
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async () => {
    if (user) {
      await updateProfile(user, {
        displayName: displayName,
      });
      setIsEditing(false);
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="profile-input"
          />
          <button onClick={handleUpdate} className="profile-save-btn">
            Save
          </button>
        </div>
      ) : (
        <div>
          <p>Name: {displayName}</p>
          <p>Email: {user.email}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="profile-edit-btn"
          >
            Edit Name
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
