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
    book.section = e.target.value;
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
                    sectionTitle="Currently Reading"
                    section="currentlyReading"
                    books={books.filter(
                      book => book.section === "currentlyReading"
                    )}
                  />
                  <BookShelves
                    onChangeShelf={this.handleChangeShelf}
                    sectionTitle="Want to read"
                    section="wantToRead"
                    books={books.filter(book => book.section === "wantToRead")}
                  />
                  <BookShelves
                    onChangeShelf={this.handleChangeShelf}
                    sectionTitle="Read"
                    section="read"
                    books={books.filter(book => book.section === "read")}
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
