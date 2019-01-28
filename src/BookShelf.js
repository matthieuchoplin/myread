import React from "react";
import Book from "./Book";

function BookShelves(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book => (
            <Book
              key={book.id}
              book={book}
              onChangeShelf={(bookId, e) =>
                props.onChangeShelf(bookId, e)
              }
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default BookShelves;
