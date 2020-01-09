import Dispatcher from "../dispatcher/appDispatcher";
import axios from "axios";
import { makeNewBook, makeBook } from "../factories";

const ROOT_URL = "http://localhost:3000/book";
const [emptyBook, emptyBookWithId] = [makeNewBook(), makeBook()];

export const bookActionTypes = {
  READ_BOOKS_STARTED: "read_books_started",
  READ_BOOKS_SUCCESSFUL: "read_books_successful",
  READ_BOOKS_FAILURE: "read_books_failure",
  CREATE_BOOK: "create_book",
  DELETE_BOOK: "delete_book",
  UPDATE_BOOK: "update_book",
};

export const createNewBookAction = (book = emptyBook) => ({
  type: bookActionTypes.CREATE_BOOK,
  value: book,
});

export const createDeleteBookAction = (id = 0) => ({
  type: bookActionTypes.DELETE_BOOK,
  value: id,
});

export const createUpdateBookAction = (book = emptyBookWithId) => ({
  type: bookActionTypes.UPDATE_BOOK,
  value: book,
});

export const bookActions = {
  readBooks() {
    Dispatcher.dispatch({
      actionType: bookActionTypes.READ_BOOKS_STARTED,
    });
    axios
      .get(`${ROOT_URL}`)
      .then(res => {
        Dispatcher.dispatch({
          actionType: bookActionTypes.READ_BOOKS_SUCCESSFUL,
          data: res.data,
        });
      })
      .catch(error => {
        console.log(error);
        Dispatcher.dispatch({
          actionType: bookActionTypes.READ_BOOKS_FAILURE,
        });
      });
  },
  addBook(book = emptyBook) {
    axios
      .post(
        `${ROOT_URL}/${book.title}/${book.author}/${book.publisher}/${book.pages}`,
      )
      .then(() => {
        Dispatcher.dispatch(createNewBookAction(book));
        this.readBooks();
      })
      .catch(error => console.log(error));
  },
  deleteBook(id = -1) {
    axios
      .delete(`${ROOT_URL}/${id}`)
      .then(() => {
        Dispatcher.dispatch(createDeleteBookAction(id));
        this.readBooks();
      })
      .catch(error => console.log(error));
  },
  updateBook(book = emptyBookWithId) {
    const url = `${ROOT_URL}/${book.id}/${book.title}/${book.author}/${book.publisher}/${book.pages}`;
    axios
      .put(url)
      .then(() => {
        Dispatcher.dispatch(createUpdateBookAction(book));
        this.readBooks();
      })
      .catch(error => console.log(error));
  },
};
