// components/BookBanner.js
import React from "react";
import "../App.css";

const BookBanner = ({ book }) => {
  return (
    <div className="book-banner">
      <img src={book.image} alt={book.title} className="book-image" />
      <div className="book-info">
        <h2 className="book-title">{book.title}</h2>
        <p className="book-author">Author: {book.author}</p>
        <p className="book-year">Year: {book.year}</p>
      </div>
    </div>
  );
};

export default BookBanner;
