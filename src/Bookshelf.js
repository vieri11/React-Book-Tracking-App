import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Booklist from './Booklist'

class Bookshelf extends Component {
	
	render() {
		
		const { type, bookList } = this.props
		
		return(
		
				<div className="bookshelf">
                  <h2 className="bookshelf-title">{type}</h2>
                  <div className="bookshelf-books">
                    <Booklist bookList={bookList} />
                  </div>
                </div>
		
		)	
	}	
}

export default Bookshelf