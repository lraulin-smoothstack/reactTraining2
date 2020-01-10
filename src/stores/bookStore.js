import Dispatcher from "../dispatcher/appDispatcher";
import { EventEmitter } from "events";
import { bookActionTypes } from "../actions/bookActions";

const CHANGE_EVENT = "change";

const initialBookList = [
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

export const createInitialBookStoreState = () => ({
  book: {
    maxId: 3,
    bookList: initialBookList,
    readState: {
      pending: false,
      success: false,
      failure: false,
    },
    error: "",
  },
});

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
    _bookStore.book.readState = {
      pending: false,
      success: false,
      failure: false,
    };
  }
}

const BookStore = new BookStoreClass();

Dispatcher.register(action => {
  switch (action.actionType) {
    case bookActionTypes.READ_BOOKS_SUCCESSFUL:
      console.log(
        "Dispatching action " + bookActionTypes.READ_BOOKS_SUCCESSFUL,
      );
      BookStore.resetReadState();
      _bookStore.book.readState.success = true;
      BookStore.emitChange();
      break;
    case bookActionTypes.READ_BOOKS_FAILURE:
      console.log("Dispatching action " + bookActionTypes.READ_BOOKS_FAILURE);
      BookStore.resetReadState();
      _bookStore.book.readState.failure = true;
      BookStore.emitChange();
      break;
    case bookActionTypes.READ_BOOKS_STARTED:
      console.log("Dispatching action " + bookActionTypes.READ_BOOKS_STARTED);
      BookStore.resetReadState();
      _bookStore.book.readState.pending = true;
      BookStore.emitChange();
      break;
    case bookActionTypes.CREATE_BOOK:
      console.log("Dispatching action " + bookActionTypes.CREATE_BOOK);
      {
        const id = ++_bookStore.book.maxId;
        const book = { id, ...action.data };
        console.log(book);
        _bookStore.book.bookList.push(book);
        console.log(_bookStore.book.bookList);
        BookStore.emitChange();
      }
      break;
    case bookActionTypes.UPDATE_BOOK:
      console.log("Dispatching action " + bookActionTypes.UPDATE_BOOK);
      {
        const index = _bookStore.book.bookList.findIndex(
          b => b.id === action.data.id,
        );
        _bookStore.book.bookList[index] = action.data;
      }
      BookStore.emitChange();
      break;
    case bookActionTypes.DELETE_BOOK:
      console.log("Dispatching action " + bookActionTypes.DELETE_BOOK);
      _bookStore.book.bookList = _bookStore.book.bookList.filter(
        book => book.id !== action.data,
      );
      BookStore.emitChange();
      break;
    default:
      return;
  }
});

export default BookStore;
