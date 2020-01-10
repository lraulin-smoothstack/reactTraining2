import React, { useState } from "react";

const Row = ({ book, isEditModeOn = false } = {}) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publisher, setPublisher] = useState(book.publisher);
  const [pages, setPages] = useState(book.pages);

  const displayModeContent = (
    <>
      <td> {book.id} </td>
      <td> {book.title} </td>
      <td> {book.author} </td>
      <td> {book.publisher} </td>
      <td> {book.pages} </td>
    </>
  );
  const editModeContent = (
    <>
      <td>
        <form>
          <input
            type="text"
            name="title"
            value={title}
            onChange={e => handleChange(e)}
          />
        </form>
      </td>
      <td>
        <form>
          <input
            type="text"
            name="author"
            value={author}
            onChange={e => handleChange(e)}
          />
        </form>
      </td>
      <td>
        <form>
          <input
            type="text"
            name="publisher"
            value={publisher}
            onChange={e => handleChange(e)}
          />
        </form>
      </td>
      <td>
        <form>
          <input
            type="number"
            name="pages"
            value={pages}
            onChange={e => handleChange(e)}
          />
        </form>
      </td>
    </>
  );
  return (
    <tr>
      <td>
        <button onClick={() => onClickDelete(book.id)}>
          <FontAwesomeIcon icon={deleteIcon} />
        </button>
      </td>
    </tr>
  );
};

export default Row;
