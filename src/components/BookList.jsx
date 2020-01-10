"use strict";

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt as deleteIcon } from "@fortawesome/free-solid-svg-icons";
import { bookActions } from "../actions/bookActions";
import { makeBook } from "../factories";
import AddModal from "./AddModal";
import EditModal from "./EditModal";

const emptyBook = makeBook();

export const BookList = ({
  bookList = [],
  readStateIsFailure = false,
  readStateIsPending = false,
  readStateIsSuccess = false,
  readBooksError = "",
} = {}) => {
  const onClickDelete = id => bookActions.deleteBook(id);

  const createBookRow = (book = emptyBook) => (
    <tr key={book.id}>
      <td> {book.id} </td>
      <td> {book.title} </td>
      <td> {book.author} </td>
      <td> {book.publisher} </td>
      <td> {book.pages} </td>
      <td>
        <EditModal book={book} />
        <button onClick={() => onClickDelete(book.id)}>
          <FontAwesomeIcon icon={deleteIcon} />
        </button>
      </td>
    </tr>
  );

  useEffect(() => {
    bookActions.readBooks();
    bookActions.addBook({
      title: "New Book",
      author: "Test",
      publisher: "Whatever",
      pages: 90,
    });
  }, []);

  let content = "";

  if (readStateIsPending) {
    content = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (readStateIsSuccess) {
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
        <tbody>{bookList.map(createBookRow)}</tbody>
      </table>
    );
  }

  if (readStateIsFailure) {
    content = (
      <div className="alert alert-danger" role="alert">
        Error while loading books!
        {readBooksError}
      </div>
    );
  }

  return (
    <div>
      <h1>Books</h1>
      <AddModal />
      {content}
    </div>
  );
};

BookList.propTypes = {
  bookList: PropTypes.array.isRequired,
  readStateIsFailure: PropTypes.bool.isRequired,
  readStateIsSuccess: PropTypes.bool.isRequired,
  readStateIsPending: PropTypes.bool.isRequired,
  readBooksError: PropTypes.string.isRequired,
};
