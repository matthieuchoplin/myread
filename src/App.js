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
    const book = temp.find(function(element) {return element.id === bookId});
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }));
    });
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
                  {shelves.map((shelf) =>
                    <BookShelves
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
