import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Booklist from './Booklist'

class SearchBooks extends Component {
	
	static propTypes = {
		myReads: PropTypes.array.isRequired,
	}
	
	state = {
		query: '',
		searchResults: []
	}

	handleChange = (event) => {
		this.updateQuery(event.target.value.trim())
		this.updateSearchResult(event.target.value.trim())
	}
  
    updateQuery = (query) => {
		this.setState({query: query})
	  }
	  
	updateSearchResult = (query) => {
		let newSearchResults = []
		const { myReads } = this.props
		
		if(query !== '') {
			BooksAPI.search(query)
				.then((books) => {
				
				if(!books.error) {
					
					newSearchResults = books.map((book) => {
								
						book.shelf = 'none'
						
						for(let i=0; i<myReads.length; i++) {
							if( book.id === myReads[i].id ) {
								book.shelf = myReads[i].shelf
								continue
							}	
						}
						
						return book
					})	
					
					this.setState(() => ({
						searchResults : newSearchResults
						
					}))
				}
				else {
					this.setState(() => ({
						searchResults : []
					}))
				}	
			})
		}
		else {
			this.setState(() => ({
					searchResults : []
				}))
		}
	}
	 
	render() {
		const { onUpdateCurrentShelf } = this.props
		return(
		  <div className="search-books">
            <div className="search-books-bar">
			  <Link
				className='close-search'
				to='/'>
				  Close
			  </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */
				
				
				}
                <input type="text" placeholder="Search by title or author" autoFocus value={this.state.query}
					onChange={this.handleChange}/>
              </div>
			  
			  
			  
            </div>
            <div className="search-books-results">
              <Booklist bookList={this.state.searchResults} onUpdateCurrentShelf={onUpdateCurrentShelf} />
            </div>
          </div>
		)	
	}	
}

export default SearchBooks