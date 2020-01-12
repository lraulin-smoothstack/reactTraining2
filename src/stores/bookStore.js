import Dispatcher from "../dispatcher/appDispatcher";
import { EventEmitter } from "events";
import { bookActionTypes } from "../actions/bookActions";
import { createInitialBookStoreState } from "../factories";

const CHANGE_EVENT = "change";

let _bookStore = createInitialBookStoreState();

class BookStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getAllBooks() {
    return _bookStore.book;
  }

  resetReadState() {
    _bookStore.book.readState = createInitialBookStoreState().book.readState;
  }
}

const BookStore = new BookStoreClass();

Dispatcher.register(action => {
  switch (action.actionType) {
    case bookActionTypes.READ_BOOKS_SUCCESSFUL:
      BookStore.resetReadState();
      _bookStore.book.bookList = action.data;
      _bookStore.book.readState.success = true;
      BookStore.emitChange();
      break;
    case bookActionTypes.READ_BOOKS_FAILURE:
      BookStore.resetReadState();
      _bookStore.book.readState.failure = true;
      BookStore.emitChange();
      break;
    case bookActionTypes.READ_BOOKS_STARTED:
      BookStore.resetReadState();
      _bookStore.book.readState.pending = true;
      BookStore.emitChange();
      break;
    case bookActionTypes.CREATE_BOOK:
      _bookStore.book.bookList.push({
        ...action.data,
        id: Math.max(..._bookStore.book.bookList.map(b => b.id)) + 1, // assign the highest id + 1
      });
      BookStore.emitChange();
      break;
    case bookActionTypes.UPDATE_BOOK:
      {
        const index = _bookStore.book.bookList.findIndex(
          b => b.id === action.data.id,
        );
        _bookStore.book.bookList[index] = { ...action.data };
        BookStore.emitChange();
      }
      break;
    case bookActionTypes.DELETE_BOOK:
      _bookStore.book.bookList = _bookStore.book.bookList.filter(
        b => b.id !== action.data,
      );
      BookStore.emitChange();
      break;
    default:
      return;
  }
});

export default BookStore;
