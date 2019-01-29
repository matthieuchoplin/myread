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
    const value = e.target.value;
    const book = this.state.books.find(element => element.id === bookId);
    if (book === undefined) {
      BooksAPI.get(bookId).then(newBook => {
        newBook.shelf=value;
        this.setState(prevState => ({
          books: prevState.books.concat(newBook)
        }));
        BooksAPI.update(newBook, value)
      })
    } else {
      book.shelf = value;
      BooksAPI.update(book, value).then(response => {
        this.setState(prevState => ({
          books: prevState.books.filter(b => b.id !== book.id).concat(book)
        }));
      });
    }
  };

  render() {
    const books = this.state.books;
    const shelves = [
      { title: 'Read', slug: 'read' },
      { title: 'Want To Read', slug: 'wantToRead' },
      { title: 'Currently Reading', slug: 'currentlyReading' }
    ];
    return (
      <div>
        <ListBooks myBooks={books} onChangeShelf={this.handleChangeShelf} />
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
                  {shelves.map((shelf) =>
                    <BookShelves
                      key={shelf.slug}
                      onChangeShelf={this.handleChangeShelf}
                      shelfTitle={shelf.title}
                      shelf={shelf.slug}
                      books={books.filter(
                        book => book.shelf === shelf.slug
                      )}
                    />)}
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
