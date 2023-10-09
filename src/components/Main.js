// components/Main.js
import React, { useState, useEffect } from "react";
import "../App.css";
import BookBanner from "./BookBanner";
import { getDatabase, ref, get } from "firebase/database";

const Main = () => {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const db = getDatabase();
      const booksRef = ref(db, "books");
      const booksSnapshot = await get(booksRef);
      if (booksSnapshot.exists()) {
        setBooks(Object.values(booksSnapshot.val()));
      }
    };

    fetchBooks();
  }, []);

  // The onSearch function
  // const onSearch = (query) => {
  //   // Filter books based on the query and update the searchResults state
  //   const results = books.filter((book) =>
  //     book.title.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setSearchResults(results);
  // };

  return (
    <main className="main">
      <h1 className="title">Book Lending Platform</h1>
      <p>
        Welcome to the Book Lending Platform. Here, you can lend and borrow
        books from people around the world. Explore our vast collection of books
        and start your reading journey today.
      </p>
      <div>
        {/* Pass the onSearch function as a prop to the Search component */}
        {/* <Search onSearch={onSearch} /> */}

        {/* Display the search results */}
        <div>
          {searchResults.length > 0
            ? searchResults.map((book, index) => (
                <BookBanner key={index} book={book} />
              ))
            : books.map((book, index) => (
                <BookBanner key={index} book={book} />
              ))}
        </div>
      </div>
    </main>
  );
};

export default Main;
