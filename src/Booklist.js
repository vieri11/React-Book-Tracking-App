import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Booklist extends Component {
	
	render() {
		
		const { bookList } = this.props
		
		return(
			<ol className="books-grid">
			  {bookList.map((book) => (
				<Book key={book.id} book={book} />
			  ))}
			</ol>
		)	
	}	
}

export default Booklist