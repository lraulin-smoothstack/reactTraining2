"use strict";

import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import Title from "./Title";
import BookList from "./BookList";
import BookStore from "../stores/bookStore";

const App = () => {
  const [bookList, setBookList] = useState([]);
  const [readStateIsPending, setReadStateIsPending] = useState(false);
  const [readStateIsSuccess, setReadStateIsSuccess] = useState(false);
  const [readStateIsFailure, setReadStateIsFailure] = useState(false);

  const onBookChange = () => {
    console.log("app.js: BOOKS CHANGED!");
    const data = { ...BookStore.getAllBooks() };
    setBookList([...data.bookList]);
    setReadStateIsPending(data.readState.pending);
    setReadStateIsSuccess(data.readState.success);
    setReadStateIsFailure(data.readState.failure);
  };

  // Once after mounting
  useEffect(() => BookStore.addChangeListener(onBookChange), []);

  // Before component is removed
  useEffect(() => () => BookStore.removeChangeListener(onBookChange), []);

  return (
    <div>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Title title="Library Management System" />}
        />
        <Route
          path="/books"
          render={() => (
            <BookList
              bookList={bookList}
              readStateIsFailure={readStateIsFailure}
              readStateIsPending={readStateIsPending}
              readStateIsSuccess={readStateIsSuccess}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
