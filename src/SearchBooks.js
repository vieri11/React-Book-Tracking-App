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

	/**
	* @description Function handler for search input
	* @param {object} event - The event object
	*/
	handleChange = (event) => {
		this.updateQuery(event.target.value.trim())
		this.updateSearchResult(event.target.value.trim())
	}
  
    /**
    * @description Update this.state.query
    * @param {string} query
    */
    updateQuery = (query) => {
		this.setState({query: query})
	  }
	
	/**
    * @description Update this.state.searchResults with books
	* from the BooksAPI.search combined with myReads shelf data
    * @param {string} query
    */
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
					clearSearch()
				}	
			})
		}
		else {
			clearSearch()
			
		}
	}
	 
	/**
    * @description Clear this.state.searchResults
    */ 
	clearSearch() {
		this.setState(() => ({
			searchResults : []
		}))
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