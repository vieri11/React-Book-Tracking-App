import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NoMatch extends Component {
	
	render() {
		return(
		<div>
			<h1>Page Not Found</h1>
			<p>Sorry, but the page you were trying to view does not exist.</p>
		</div>	
		)	
	}	
}

export default NoMatch