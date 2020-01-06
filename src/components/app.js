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
        <Route
          path="/books"
          render={props => <BookList {...props} book={book} />}
        />
      </Switch>
    </div>
  );
};
