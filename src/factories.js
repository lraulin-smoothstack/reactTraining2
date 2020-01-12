// For creating a new book object with user-supplied data. (No id because the
// book has not yet been added to the database.)
export const createBookWithoutId = ({
  title = "",
  author = "",
  publisher = "",
  pages = 0,
} = {}) => ({
  title,
  author,
  publisher,
  pages,
});

// For filling an object from database data
export const createBook = ({
  id = 0,
  title = "",
  author = "",
  publisher = "",
  pages = 0,
} = {}) => ({
  id,
  title,
  author,
  publisher,
  pages,
});

export const createInitialBookStoreState = () => ({
  book: {
    bookList: [],
    readState: {
      pending: false,
      success: false,
      failure: false,
    },
    error: "",
  },
});
