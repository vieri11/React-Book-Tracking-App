import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
	

	  
	render() {
		
		const { book } = this.props
		console.log('book', book);
		
		return(
		
			 <li>
				<div className="book">
				  <div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
					<div className="book-shelf-changer">
					  <select>
						<option value="move" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					  </select>
					</div>
				  </div>
				  <div className="book-title">To Kill a Mockingbird</div>
				  <div className="book-authors">Harper Lee</div>
				</div>
			  </li>
		
		)	
	}	
}

export default Book