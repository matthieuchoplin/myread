import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from "react-router-dom";
import BookShelves from "./BookShelf";
import ListBooks from "./ListBooks";

class BooksApp extends React.Component {
  state = {
    books: [
      {
        id: 'hobbit',
        title: 'The Hobbit',
        authors: 'J.R.R. Tolkien',
        bookCoverURL: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api',
        section:'currentlyReading'
      },
      {
        id: 'go',
        title: 'Oh, the Places You\'ll Go!',
        authors: 'Seuss',
        bookCoverURL: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api',
        section:'wantToRead'
      },
      {
        id: 'tom',
        title: 'The Adventures of Tom Sawyer',
        authors: 'Mark Twain',
        bookCoverURL: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api',
        section:'currentlyReading'
      },
    ]
  };

  handleChangeShelf = (bookId, e) => {
    let temp = this.state.books;
    const book = temp.filter(t => t.id === bookId)[0];
    book.section = e.target.value;
    this.setState({
      books: temp
    });
  };

  render() {
    const books = this.state.books;
    return (
      <div>
        <ListBooks books={books}/>
        <Route exact path='/' render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelves onChangeShelf={this.handleChangeShelf} sectionTitle="Currently Reading" section="currentlyReading" books={books.filter(book => book.section === "currentlyReading")}/>
              <BookShelves onChangeShelf={this.handleChangeShelf} sectionTitle="Want to read" section="wantToRead" books={books.filter(book => book.section === "wantToRead")}/>
              <BookShelves onChangeShelf={this.handleChangeShelf} sectionTitle="Read" section="read" books={books.filter(book => book.section === "read")}/>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      )}/>
      </div>

    )
  }
}

export default BooksApp
