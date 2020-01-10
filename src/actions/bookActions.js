import Dispatcher from "../dispatcher/appDispatcher";
import { makeNewBook, makeBook } from "../factories";

const [emptyBook, emptyBookWithId] = [makeNewBook(), makeBook()];

export const bookActionTypes = {
  READ_BOOKS_STARTED: "read_books_started",
  READ_BOOKS_SUCCESSFUL: "read_books_successful",
  READ_BOOKS_FAILURE: "read_books_failure",
  CREATE_BOOK: "create_book",
  DELETE_BOOK: "delete_book",
  UPDATE_BOOK: "update_book",
};

export const bookActions = {
  readBooks() {
    Dispatcher.dispatch({
      actionType: bookActionTypes.READ_BOOKS_STARTED,
    });

    Dispatcher.dispatch({
      actionType: bookActionTypes.READ_BOOKS_SUCCESSFUL,
    });
  },
  addBook(book = emptyBook) {
    console.log("Adding book...");
    Dispatcher.dispatch({
      actionType: bookActionTypes.CREATE_BOOK,
      data: book,
    });
  },
  deleteBook(id = 0) {
    console.log("Deleting book #" + id);
    Dispatcher.dispatch({
      actionType: bookActionTypes.DELETE_BOOK,
      data: id,
    });
  },
  updateBook(book = emptyBookWithId) {
    console.log("Updating book...");
    Dispatcher.dispatch({
      actionType: bookActionTypes.UPDATE_BOOK,
      data: book,
    });
  },
};
