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
	 myReads: [],
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
		  read : readInit,
		  myReads: books,
        }))
      })
  }
  
  transferBook = (book) => {
	  
	  if(book.shelf === 'currentlyReading') {
		this.addCurrentlyReading(book);
	  }
	  
	  if(book.shelf === 'wantToRead') {
		this.addWantToRead(book);
	  }
	  
	  if(book.shelf === 'read') {
		this.addRead(book);
	  }
  }
  
  updateCurrentlyReading = (book, e) => {
	book.shelf = e.target.value;
	
    this.setState((currentState) => ({
      currentlyReading: currentState.currentlyReading.filter((b) => {
        return b.id !== book.id
      })
    }))
	
	if(book.shelf !== 'none') {
		this.transferBook(book);
	}
  }
  
  updateWantToRead = (book, e) => {
	book.shelf = e.target.value;
	
    this.setState((currentState) => ({
      wantToRead: currentState.wantToRead.filter((b) => {
        return b.id !== book.id
      })
    }))
	
	this.transferBook(book);
  }
  
  updateRead = (book, e) => {
	book.shelf = e.target.value;
	
    this.setState((currentState) => ({
      read: currentState.read.filter((b) => {
        return b.id !== book.id
      })
    }))
	
	this.transferBook(book);
  }
  
  addCurrentlyReading = (book) => {
    this.setState((currentState) => ({
      currentlyReading: currentState.currentlyReading.concat([book])
    }))
  }
  
  addWantToRead = (book) => {
    this.setState((currentState) => ({
      wantToRead: currentState.wantToRead.concat([book])
    }))
  }
  
  addRead = (book) => {
    this.setState((currentState) => ({
      read: currentState.read.concat([book])
    }))
  }
  
  render() {	
    return (
      <div className="app">
		<Route exact path='/search' render={() => (
          <SearchBooks myReads={this.state.myReads} />
        )} />
		<Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
				<Bookshelf bookType="Currently Reading" bookList={this.state.currentlyReading} onUpdateCurrentShelf={this.updateCurrentlyReading} />
				<Bookshelf bookType="Want to Read" bookList={this.state.wantToRead} onUpdateCurrentShelf={this.updateWantToRead} />
				<Bookshelf bookType="Read" bookList={this.state.read} onUpdateCurrentShelf={this.updateRead} />
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
