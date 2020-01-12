import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus as addIcon,
  faEdit as editIcon,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { bookActions } from "../actions/bookActions";
import { createBook } from "../factories";

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

const BookModal = ({ book = createBook() } = {}) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newBook, setNewBook] = useState(book);
  const bookIsNew = !book.id;
  const addOrEdit = bookIsNew ? "Add" : "Edit";

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
    console.log("book id = " + book.id);
    if (bookIsNew) {
      console.log("saving new book");
      bookActions.addBook(newBook);
    } else {
      console.log("updating existing book");
      bookActions.updateBook(newBook);
    }
    closeModal();
  };

  return (
    <>
      <button onClick={openModal}>
        <FontAwesomeIcon icon={bookIsNew ? addIcon : editIcon} />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={addOrEdit + " Book Modal"}
      >
        <h2 ref={_subtitle => (subtitle = _subtitle)}>{addOrEdit} Book</h2>
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
    </>
  );
};

BookModal.propTypes = {
  book: PropTypes.object,
};

export default BookModal;
