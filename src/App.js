// App.js
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { auth, onAuthStateChanged } from "./firebase";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Profile from "./components/Profile";
import DonateBook from "./components/DonateBook";
import ViewDonatedBooks from "./components/ViewDonatedBooks";
import Spinner from "./components/Spinner";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false); // New state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthChecked(true); // Set this to true once the auth check is complete
    });
    return () => unsubscribe();
  }, []);

  if (!isAuthChecked) {
    return <Spinner />; // Show a spinner or some placeholder while the auth check is ongoing
  }

  return (
    <div>
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/donate-book" element={<DonateBook />} />
        <Route path="/view-donated-books" element={<ViewDonatedBooks />} />
      </Routes>
    </div>
  );
}

export default App;
