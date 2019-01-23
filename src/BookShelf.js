import React from "react";
import Book from "./Book";

class BookShelves extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <Book
                key={book.id}
                book={book}
                onChangeShelf={(bookId, e) =>
                  this.props.onChangeShelf(bookId, e)
                }
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelves;
