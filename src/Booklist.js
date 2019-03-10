import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Booklist extends Component {
	
	render() {
		
		const { bookList, onUpdateCurrentShelf } = this.props
		
		return(
			<ol className="books-grid">
			  {bookList.map((book, index) => (
				<Book key={book.id} book={book} onUpdateCurrentShelf={onUpdateCurrentShelf} />
			  ))}
			</ol>
		)	
	}	
}

export default Booklist