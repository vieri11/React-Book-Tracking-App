import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  
	static propTypes = {
		book: PropTypes.object.isRequired,
		onUpdateCurrentShelf: PropTypes.func.isRequired
	}
	render() {
		
		const { book, onUpdateCurrentShelf } = this.props;
		
		const smThumbnail = (book.imageLinks !== undefined)? book.imageLinks.smallThumbnail:''
		const bookTitle = book.title
		const bookAuth = (book.authors !== undefined)? book.authors.join(', ') : ''

		return(
			 <li>
				<div className="book">
				  <div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${smThumbnail}")` }}></div>
					<div className="book-shelf-changer">
					  <select value={book.shelf} onChange={ (e) => onUpdateCurrentShelf(book, e.target.value)} >
						<option value="move" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read" >Read</option>
						<option value="none">None</option>
					  </select>
					</div>
				  </div>
				  <div className="book-title">{bookTitle}</div>
				  <div className="book-authors">
					{bookAuth}
				  </div>
				</div>
			 </li>
		)	
	}	
}

export default Book