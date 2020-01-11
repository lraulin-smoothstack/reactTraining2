import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus as addIcon } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { bookActions } from "../actions/bookActions";
import { createBookWithoutId } from "../factories";

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
  const [newBook, setNewBook] = useState(
    createBookWithoutId({
      title: "[Title]",
      author: "[Author Name]",
      publisher: "[Publisher]",
      pages: 0,
    }),
  );

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

  const handleSubmit = e => {
    e.preventDefault();
    bookActions.addBook(newBook);
    closeModal();
  };

  return (
    <div className="float-right" style={{ paddingRight: "10em" }}>
      <button onClick={openModal}>
        <FontAwesomeIcon icon={addIcon} />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Book Modal"
      >
        <h2 ref={_subtitle => (subtitle = _subtitle)}>Add Book</h2>
        <button onClick={closeModal}>close</button>
        <form onSubmit={e => handleSubmit(e)}>
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
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </div>
  );
};

export default AddModal;
