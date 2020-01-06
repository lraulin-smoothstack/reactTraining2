import Dispatcher from "../dispatcher/appDispatcher";
import axios from "axios";

export const bookActionTypes = {
  READ_BOOKS_STARTED: "read_books_started",
  READ_BOOKS_SUCCESSFUL: "read_books_successful",
  READ_BOOKS_FAILURE: "read_books_failure",
};

export const bookActions = {
  readBooks: function() {
    Dispatcher.dispatch({
      actionType: bookActionTypes.READ_BOOKS_STARTED,
    });
    axios
      .get(`http://www.mocky.io/v2/5daca80c30000092002987ad`)
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
};