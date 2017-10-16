import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom'

class Main extends React.Component {

	render () {
		return (
			<div>
      Accessories Main
      <Link to="/womensFashion">Categories</Link>
			    
			</div>
		)
	}
}

export default Main;
