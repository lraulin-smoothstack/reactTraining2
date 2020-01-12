import Dispatcher from "../dispatcher/appDispatcher";
import { createBookWithoutId, createBook } from "../factories";

const [emptyBook, emptyBookWithId] = [createBookWithoutId(), createBook()];

export const bookActionTypes = {
  READ_BOOKS_STARTED: "read_books_started",
  READ_BOOKS_SUCCESSFUL: "read_books_successful",
  READ_BOOKS_FAILURE: "read_books_failure",
  CREATE_BOOK: "create_book",
  DELETE_BOOK: "delete_book",
  UPDATE_BOOK: "update_book",
};

export const createNewBookAction = (book = emptyBook) => ({
  actionType: bookActionTypes.CREATE_BOOK,
  data: book,
});

export const createDeleteBookAction = (id = 0) => ({
  actionType: bookActionTypes.DELETE_BOOK,
  data: id,
});

export const createUpdateBookAction = (book = emptyBookWithId) => ({
  actionType: bookActionTypes.UPDATE_BOOK,
  data: book,
});

export const bookActions = {
  readBooks() {
    const data = [
      {
        id: 1,
        title: "Composing Software",
        author: "Eric Elliot",
        publisher: "Leanpub",
        pages: 257,
      },
      {
        id: 2,
        title: "How JavaScript Works",
        author: "Douglas Crockford",
        publisher: "Leanpub",
        pages: 453,
      },
      {
        id: 3,
        title: "Design Patterns",
        author: "Gang of Four",
        publisher: "O'Reilly",
        pages: 999,
      },
    ];

    Dispatcher.dispatch({
      actionType: bookActionTypes.READ_BOOKS_STARTED,
    });

    Dispatcher.dispatch({
      actionType: bookActionTypes.READ_BOOKS_SUCCESSFUL,
      data,
    });
  },
  addBook(book = emptyBook) {
    Dispatcher.dispatch(createNewBookAction(book));
  },
  deleteBook(id = 0) {
    Dispatcher.dispatch(createDeleteBookAction(id));
  },
  updateBook(book = emptyBookWithId) {
    console.log(
      "bookActions.js: preparing to dispatch update book: with action:",
    );
    const action = createUpdateBookAction(book);
    console.log(action);
    Dispatcher.dispatch(action);
  },
};
