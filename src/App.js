import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Link, Route } from "react-router-dom";
import BookShelves from "./BookShelf";
import ListBooks from "./ListBooks";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  handleChangeShelf = (bookId, e) => {
    let temp = this.state.books;
    const book = temp.filter(t => t.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: temp
      });
    });
  };

  render() {
    const books = this.state.books;
    return (
      <div>
        <ListBooks books={books} onChangeShelf={this.handleChangeShelf} />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelves
                    onChangeShelf={this.handleChangeShelf}
                    shelfTitle="Currently Reading"
                    shelf="currentlyReading"
                    books={books.filter(
                      book => book.shelf === "currentlyReading"
                    )}
                  />
                  <BookShelves
                    onChangeShelf={this.handleChangeShelf}
                    shelfTitle="Want to read"
                    shelf="wantToRead"
                    books={books.filter(book => book.shelf === "wantToRead")}
                  />
                  <BookShelves
                    onChangeShelf={this.handleChangeShelf}
                    shelfTitle="Read"
                    shelf="read"
                    books={books.filter(book => book.shelf === "read")}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
