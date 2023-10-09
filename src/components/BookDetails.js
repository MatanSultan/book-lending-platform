// pages/BookDetails.js
import React from "react";

const BookDetails = ({ book }) => {
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p> {book.donatedBy}</p>{" "}
    </div>
  );
};

export default BookDetails;
