import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Booklist from './Booklist'

class Bookshelf extends Component {
	
	render() {
		
		const { type } = this.props
		
		return(
		
				<div className="bookshelf">
                  <h2 className="bookshelf-title">{type}</h2>
                  <div className="bookshelf-books">
                    <Booklist />
                  </div>
                </div>
		
		)	
	}	
}

export default Bookshelf