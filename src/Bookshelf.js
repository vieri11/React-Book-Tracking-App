import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Booklist from './Booklist'

class Bookshelf extends Component {
	
	static propTypes = {
		bookType: PropTypes.string.isRequired,
		bookList: PropTypes.array.isRequired,
		onUpdateCurrentShelf: PropTypes.func.isRequired
	}
	
	render() {
		
		const { bookType, bookList, onUpdateCurrentShelf } = this.props
		
		return(
			<div className="bookshelf">
			  <h2 className="bookshelf-title">{bookType}</h2>
			  <div className="bookshelf-books">
				<Booklist bookList={bookList} onUpdateCurrentShelf={onUpdateCurrentShelf} />
			  </div>
			</div>
		)	
	}	
}

export default Bookshelf