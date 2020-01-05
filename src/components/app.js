"use strict";

import React from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "./Header.js";
import { Home } from "./Home.js";
import { BookList } from "./BookList";
import BookStore from "../stores/bookStore";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {
        bookList: [],
        readState: {
          pending: false,
          success: false,
          failure: false,
        },
        error: "",
      },
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home title="Library Management System" />}
          />
          <Route
            path="/books"
            render={props => <BookList {...props} book={this.state.book} />}
          />
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    BookStore.addChangeListener(this._onBookChange.bind(this));
  }

  componentWillUnmount() {
    BookStore.removeChangeListener(this._onBookChange.bind(this));
  }

  _onBookChange() {
    this.setState({ book: BookStore.getAllBooks() });
  }
}
