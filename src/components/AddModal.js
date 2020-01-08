import React, { useState } from "react";
import Modal from "react-modal";
import { makeNewBook } from "../factories";
import { bookActions } from "../actions/bookActions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#app");

const AddModal = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newBook, setNewBook] = useState(makeNewBook());

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = event => {
    const book = { ...newBook };
    book[event.target.name] = event.target.value;
    setNewBook(book);
  };

  const onSubmit = () => {
    bookActions.addBook(newBook);
  };

  return (
    <div>
      <button onClick={openModal}>Add Book</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={_subtitle => (subtitle = _subtitle)}>Add Book</h2>
        <button onClick={closeModal}>close</button>
        For Development&gt;&gt;&gt;
        <br />
        {newBook.title}
        <br />
        {newBook.author}
        <br />
        {newBook.publisher}
        <br />
        {newBook.pages}
        <br />
        &lt;&lt;&lt;End For Development
        <form>
          Title:{" "}
          <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={e => handleChange(e)}
          />
          Author:{" "}
          <input
            type="text"
            name="author"
            value={newBook.author}
            onChange={e => handleChange(e)}
          />
          Publisher:{" "}
          <input
            type="text"
            name="publisher"
            value={newBook.publisher}
            onChange={e => handleChange(e)}
          />
          Pages:{" "}
          <input
            type="number"
            name="pages"
            value={newBook.pages}
            onChange={e => handleChange(e)}
          />
          <button onClick={() => onSubmit()}>Save</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddModal;