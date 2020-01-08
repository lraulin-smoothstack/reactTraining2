import Dispatcher from "../dispatcher/appDispatcher";
import axios from "axios";
import { makeNewBook } from "../factories";

const emptyBook = makeNewBook(); // for type hints

export const bookActionTypes = {
  READ_BOOKS_STARTED: "read_books_started",
  READ_BOOKS_SUCCESSFUL: "read_books_successful",
  READ_BOOKS_FAILURE: "read_books_failure",
  CREATE_BOOK: "create_book",
};

export const createNewBookAction = (book = emptyBook) => ({
  type: bookActionTypes.CREATE_BOOK,
  value: book,
});

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
    axios
      .post(
        `http://localhost:3000/book/${book.title}/${book.author}/${book.publisher}/${book.pages}`,
      )
      .then(result => {
        console.log("Book added successfully!");
        console.log(result);
        Dispatcher.dispatch(createNewBookAction(book));
      })
      .catch(error => {
        console.log(error);
        Dispatcher.dispatch({
          actionType: bookActionTypes.ADD_BOOK_FAILURE,
        });
      });
  },
};
