import React from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import './App.css'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
	
  state = {
	 currentlyReading: [],
	 wantToRead: [],
	 read: [],
  }
  
  componentDidMount() {
	
	let currentlyReadingInit = [], wantToReadInit = [], readInit = [];
	
    BooksAPI.getAll()
      .then((books) => {
		  
	    books.forEach(function(book) {
			if( book.shelf === 'currentlyReading') {
				currentlyReadingInit.push(book);
			}
			
			else if( book.shelf === 'wantToRead') {
				wantToReadInit.push(book);
			}
			
			else if( book.shelf === 'read') {
				readInit.push(book);
			}
		});

        this.setState(() => ({
          currentlyReading : currentlyReadingInit,
		  wantToRead : wantToReadInit,
		  read : readInit
        }))
      })
  }
  
  render() {	
    return (
      <div className="app">
		<Route exact path='/search' render={() => (
          <SearchBooks />
        )} />
		<Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
				<Bookshelf type="Currently Reading" bookList={this.state.currentlyReading} />
				<Bookshelf type="Want to Read" bookList={this.state.wantToRead} />
				<Bookshelf type="Read" bookList={this.state.read} />
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
