"use strict";

import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "./Header.js";
import { Home } from "./Home.js";
import { BookList } from "./BookList";
import BookStore from "../stores/bookStore";

const initialState = {
  bookList: [],
  readState: {
    pending: false,
    success: false,
    failure: false,
  },
  error: "",
};

// const list1 = {
//   bookList: [
//     { book_id: 1, title: "Harry Potter", author: "JK . Rowling" },
//     { book_id: 2, title: "Lord of The Rings", author: "Tolkien" },
//     { book_id: 3, title: "Matrix", author: "Lana Wachowski" },
//     { book_id: 30, title: "anotherNewBook", author: "someAuthor" },
//   ],
//   readState: { pending: false, success: true, failure: false },
//   error: "",
// };
// const list2 = {
//   bookList: [
//     { book_id: 1, title: "FAKE BOOK", author: "JK . Rowling" },
//     { book_id: 2, title: "Dude wheres my car", author: "Tolkien" },
//     {
//       book_id: 3,
//       title: "Matrix reloaded was terrible",
//       author: "Lana Wachowski",
//     },
//     { book_id: 30, title: "anotherNewBook", author: "someAuthor" },
//   ],
//   readState: { pending: false, success: true, failure: false },
//   error: "",
// };

export const App = () => {
  const [book, setBook] = useState(initialState);

  const _onBookChange = () => setBook(BookStore.getAllBooks());

  // Once after mounting
  useEffect(() => BookStore.addChangeListener(_onBookChange), []);

  // Before component is removed
  useEffect(() => {
    return () => {
      BookStore.removeChangeListener(_onBookChange);
    };
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Home title="Library Management System" />}
        />
        <Route path="/books" render={() => <BookList book={book} />} />
      </Switch>
    </div>
  );
};
