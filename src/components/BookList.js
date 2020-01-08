"use strict";

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { bookActions } from "../actions/bookActions";
import { makeBook } from "../factories";
import AddModal from "./AddModal";

const emptyBook = makeBook();

export const BookList = ({ book = emptyBook } = {}) => {
  const onClickDelete = id => bookActions.deleteBook(id);

  const onClickEdit = id => bookActions.editBook(id);

  const createBookRow = book => (
    <tr key={book.id}>
      <td> {book.id} </td>
      <td> {book.title} </td>
      <td> {book.author} </td>
      <td> {book.publisher} </td>
      <td> {book.pages} </td>
      <td>
        <button onClick={() => onClickEdit(book.id)}>
          <i className="far fa-edit"></i>
        </button>
      </td>
      <td>
        <button onClick={() => onClickDelete(book.id)}>X</button>
      </td>
    </tr>
  );

  useEffect(() => bookActions.readBooks(), []);

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
      <AddModal />
      <h1>Books</h1>
      {content}
    </div>
  );
};

BookList.propTypes = {
  book: PropTypes.object.isRequired,
};
