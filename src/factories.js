export const makeBook = ({
  id = -1,
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
