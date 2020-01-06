"use strict";

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { bookActions } from "../actions/bookActions";

export const BookList = ({ book }) => {
  const createBookRow = book => {
    return (
      <tr key={book.book_id}>
        <td> {book.book_id} </td>
        <td> {book.title} </td>
        <td> {book.author} </td>
      </tr>
    );
  };

  // componentDidMount() {
  // bookActions.readBooks();
  // }
  useEffect(() => bookActions.readBooks(), []);

  // render() {
  let content = "";

  if (book.readState.pending) {
    content = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (book.readState.success) {
    content = (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Pages</th>
          </tr>
        </thead>
        <tbody>{book.bookList.map(createBookRow)}</tbody>
      </table>
    );
  }

  if (book.readState.failure) {
    content = (
      <div className="alert alert-danger" role="alert">
        Error while loading books!
      </div>
    );
  }

  return (
    <div>
      <h1>Books</h1>
      {content}
    </div>
  );
};

BookList.propTypes = {
  book: PropTypes.object.isRequired,
};
