import React from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import NoMatch from './NoMatch'
import SearchBooks from './SearchBooks'
import './App.css'
import { Route, Switch, Link } from 'react-router-dom'

class BooksApp extends React.Component {
	
  state = {
	 myReads: [],
  }
  
  /**
  * @description componentDidMount function to populate myReads 
  * from BooksAPI.getAll
  */
  componentDidMount() {
	
    BooksAPI.getAll()
      .then((books) => {

        this.setState(() => ({
		  myReads: books,
        }))
      })
  }
  
  /**
  * @description filters myReads for individual Bookshelfs
  * @param {array} shelfName - Array of my books
  */
  shelf = (shelfName) => {
	  
	  const newShelf = this.state.myReads.filter((b) => {
		return b.shelf === shelfName
	  })
		  
	  return newShelf
  }
  
  /**
  * @description Update myReads array
  * @param {array} book - Array of shelf books
  * @param {object} e - The event object
  */
  updateShelf = (book, e) => {
	book.shelf = e;

	this.setState((currentState) => ({
		myReads: currentState.myReads.filter((b) => {
			return b.id !== book.id
		})
	}))
	
	if(book.shelf !== 'none') {
		this.setState((currentState) => ({
		  myReads: currentState.myReads.concat([book])
		}))
	}
	
	BooksAPI.update(book, book.shelf)
  }
  
  render() {	
    return (
      <div className="app">
	    <Switch>
		<Route path='/search' render={() => (
          <SearchBooks myReads={this.state.myReads} onUpdateCurrentShelf={this.updateShelf} />
        )} />
		<Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
				<Bookshelf bookType="Currently Reading" bookList={this.shelf("currentlyReading")} onUpdateCurrentShelf={this.updateShelf} />
				<Bookshelf bookType="Want to Read" bookList={this.shelf("wantToRead")} onUpdateCurrentShelf={this.updateShelf} />
				<Bookshelf bookType="Read" bookList={this.shelf("read")} onUpdateCurrentShelf={this.updateShelf} />
              </div>
            </div>
			<Link
			  to='/search'
			  className='open-search'> Search
			</Link>
          </div>
		)} />
		<Route component={NoMatch} />
		</Switch>
      </div>
    )
  }
}

export default BooksApp
