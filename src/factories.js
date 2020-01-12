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
