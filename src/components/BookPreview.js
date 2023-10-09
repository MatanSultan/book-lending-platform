import React from "react";

const BookPreview = ({ bookDetails }) => {
  const defaultImage =
    "https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg";

  return (
    <div className="book-preview animate-fade-in">
      <h3>Book Preview:</h3>
      <img
        src={bookDetails.image ? bookDetails.image : defaultImage}
        alt="Book Preview"
        className="book-image"
      />
      <p>
        <strong>Title:</strong> {bookDetails.title}
      </p>
      <p>
        <strong>Author:</strong> {bookDetails.author}
      </p>
      <p>
        <strong>Year:</strong> {bookDetails.year}
      </p>
      <p>
        <strong>Donated By:</strong> {bookDetails.donatedBy}
      </p>
    </div>
  );
};

export default BookPreview;
