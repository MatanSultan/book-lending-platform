import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref, set, child } from "firebase/database";
import { auth } from "../firebase";
import BookPreview from "./BookPreview";
import Alert from "./Alert";
const DonateBook = () => {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    year: "",
    image: "",
  });
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setBookDetails({
      ...bookDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const storage = getStorage();
      const uniqueId = uuidv4();
      const newFileName = `${uniqueId}-${file.name}`;
      const storageReference = storageRef(storage, "books/" + newFileName);
      await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(storageReference);
      setBookDetails({
        ...bookDetails,
        image: downloadURL,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookDetails.image) {
      alert("Please wait for the image to upload before submitting.");
      return;
    }
    if (auth.currentUser) {
      const finalBookDetails = {
        ...bookDetails,
        donatedBy: auth.currentUser.displayName,
      };
      const db = getDatabase();
      const booksRef = ref(db, "books");
      const newBookRef = child(booksRef, uuidv4());
      await set(newBookRef, finalBookDetails);
      setAlertMessage("Book donated successfully!");
    } else {
      setAlertMessage("You must be logged in to donate a book.");
    }
  };

  return (
    <div className="donate-book">
      <h2>Donate a Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" onChange={handleChange} required />
        </label>
        <label>
          Author:
          <input type="text" name="author" onChange={handleChange} required />
        </label>
        <label>
          Year:
          <input type="number" name="year" onChange={handleChange} required />
        </label>
        <label>
          Image:
          <input type="file" onChange={handleImageUpload} required />
          <img src={bookDetails.image} alt="" width="100" />
        </label>
        <button type="submit">Donate</button>
      </form>
      <Alert message={alertMessage} onClose={() => setAlertMessage("")} />

      <BookPreview bookDetails={bookDetails} />
    </div>
  );
};

export default DonateBook;
