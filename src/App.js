import React from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import './App.css'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
	
  state = {
	 myReads: [],
  }
  
  componentDidMount() {
	
    BooksAPI.getAll()
      .then((books) => {

        this.setState(() => ({
		  myReads: books,
        }))
      })
  }
  
  shelf = (shelfName) => {
	  
	  const newShelf = this.state.myReads.filter((b) => {
			return b.shelf === shelfName
		  })
		  
	  return newShelf
  }
  
  
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

  }
  

  render() {	
    return (
      <div className="app">
		<Route exact path='/search' render={() => (
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
      </div>
    )
  }
}

export default BooksApp
