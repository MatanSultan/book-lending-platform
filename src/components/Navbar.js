// components/Navbar.js
import React, { useState } from "react";

import { auth, GoogleAuthProvider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import Alert from "./Alert";
const Navbar = ({ user }) => {
  const [alertMessage, setAlertMessage] = useState("");
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        setAlertMessage("Signed out successfully");
      })
      .catch((error) => {
        // An error happened during sign-out.
        console.error("Error during sign out:", error);
        alert("Error during sign out, please try again.");
      });
  };

  return (
    <nav className="navbar">
      {user ? (
        <div className="user-info">
          <Link to="/">
            <button className="button profile-button">home</button>
          </Link>
          <div> Hello, {user.displayName} </div>

          <button onClick={signOutUser} className="button sign-out-button">
            Sign Out
          </button>
          <Link to="/profile">
            <button className="button profile-button">Profile</button>
          </Link>
          <Link to="/donate-book">
            <button className="button donate-button">Donate Book</button>
          </Link>
          <Link to="/view-donated-books">
            <button className="button donate-button">view Donate Book</button>
          </Link>
        </div>
      ) : (
        <button onClick={signInWithGoogle} className="button">
          Sign In with Google
        </button>
      )}
      <Alert message={alertMessage} onClose={() => setAlertMessage("")} />
    </nav>
  );
};

export default Navbar;
