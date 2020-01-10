import React, { useState } from "react";
import { bookActions } from "../actions/bookActions";

const AddBook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("[Title]");
  const [author, setAuthor] = useState("[Author Name]");
  const [publisher, setPublisher] = useState("[Publisher]");
  const [pages, setPages] = useState(0);

  const handleSubmit = e => {
    console.log("submit!");
    e.preventDefault();
    bookActions.addBook({ title, author, publisher, pages });
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <form onSubmit={e => handleSubmit(e)}>
            Title:{" "}
            <input
              type="text"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            Author:{" "}
            <input
              type="text"
              name="author"
              value={author}
              onChange={e => setAuthor(e.target.value)}
            />
            Publisher:{" "}
            <input
              type="text"
              name="publisher"
              value={publisher}
              onChange={e => setPublisher(e.target.value)}
            />
            Pages:{" "}
            <input
              type="number"
              name="pages"
              value={pages}
              onChange={e => setPages(e.target.value)}
            />
            <input type="submit" value="Submit" />
          </form>
        </>
      ) : (
        <button onClick={() => setIsOpen(true)}>Add Book</button>
      )}
    </>
  );
};

export default AddBook;
