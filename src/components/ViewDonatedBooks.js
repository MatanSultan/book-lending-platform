import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { auth } from "../firebase";
import { sendEmailNotification } from "../utils/emailNotification";
import RequestBookModal from "./RequestBookModal"; // Import the modal component

import "../App.css";
import Spinner from "./Spinner";

const ViewDonatedBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedBook, setSelectedBook] = useState(null); // State for the selected book

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      if (auth.currentUser) {
        const db = getDatabase();
        const booksRef = ref(db, "books");
        const booksSnapshot = await get(booksRef);
        if (booksSnapshot.exists()) {
          setBooks(Object.values(booksSnapshot.val()));
        }
      } else {
        alert("You must be logged in to view donated books.");
      }
      setIsLoading(false);
    };
    fetchBooks();
  }, []);

  const handleRequestBook = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="donated-books-container">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2>Donated Books</h2>
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="book-search-input"
          />
          <div className="donated-books">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <div key={index} className="book-card">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="book-image"
                  />
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">Author: {book.author}</p>
                    <p className="book-year">Year: {book.year}</p>
                    <p className="book-donatedBy">
                      Donated By: {book.donatedBy}
                    </p>
                    <button
                      onClick={() => handleRequestBook(book)}
                      className="request-button"
                    >
                      Request Book
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No books donated yet...</p>
            )}
          </div>
          <RequestBookModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSendRequest={(name, email, message) => {
              const fullMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
              sendEmailNotification(selectedBook.donorEmail, fullMessage);
            }}
          />
        </>
      )}
    </div>
  );
};

export default ViewDonatedBooks;
