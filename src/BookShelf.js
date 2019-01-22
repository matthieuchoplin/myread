import React from 'react';
import Book from "./Book";


class BookShelves extends React.Component {
  // handleChange = (event) => {
  //   console.log(this);
  //   this.setState({
  //     section: event.target.value
  //   }, () => {
  //     console.log(this.props.books, 'Updated')
  //   });
  // };

  handleChangeShelf = (bookId, e) => {
    let temp = this.props.books;
    const book = temp.filter(t => t.id === bookId)[0];
    book.section = e.target.value;
    this.setState({
      books: temp
    });
  };

  render(){
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.sectionTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <Book key={book.title} book={book} onChangeShelf={(bookId, e) => this.props.onChangeShelf(bookId, e)}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelves;