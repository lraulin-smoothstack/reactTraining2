import Dispatcher from "../dispatcher/appDispatcher";
import axios from "axios";
import { makeBook } from "../factories";

const emptyBook = makeBook(); // for type hints

export const bookActionTypes = {
  READ_BOOKS_STARTED: "read_books_started",
  READ_BOOKS_SUCCESSFUL: "read_books_successful",
  READ_BOOKS_FAILURE: "read_books_failure",
  ADD_BOOK_STARTED: "add_book_started",
  ADD_BOOK_SUCCESSFUL: "add_book_successful",
  ADD_BOOK_FAILURE: "add_book_failure",
};

export const bookActions = {
  readBooks: () => {
    Dispatcher.dispatch({
      actionType: bookActionTypes.READ_BOOKS_STARTED,
    });
    axios
      .get("http://localhost:3000/book")
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
  addBook: (book = emptyBook) => {
    Dispatcher.dispatch({
      actionType: bookActionTypes.ADD_BOOK_STARTED,
    });
    axios
      .post(
        `http://localhost:3000/book/${book.title}/${book.author}/${book.publisher}/${book.pages}`,
      )
      .then(result => {
        Dispatcher.dispatch({
          actionType: bookActionTypes.ADD_BOOK_SUCCESSFUL,
          data: result.data,
        });
      })
      .catch(error => {
        console.log(error);
        Dispatcher.dispatch({
          actionType: bookActionTypes.ADD_BOOK_FAILURE,
        });
      });
  },
};
