import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import { setCategories } from '../actions/setCategories.js';

class HeaderMain extends React.Component {
	constructor() {
		super()

	}

	findItem() {
		let input = document.getElementById('searchBar').value
	}

	handleCategoryClick(category) {
		this.props.setCategories(category)
	}

	handleSearch(e) {
		e.preventDefault()

		console.log('search submitted', e.target.text.value)
	}

	render () {
		return (
			<div className="landingBanner">
			<div id="headerBanner"> 
			  <Link id="logo" to="/"> The Bair Data </Link>
			  <Link className="bannerItems" to="/contactInfo">Contact Us</Link>
			  <Link className="bannerItems" to="/about">About</Link>
			  <form className="search" onSubmit={this.handleSearch.bind(this)}>
			    <span className="fa fa-search"></span>
			    <input type="text" placeholder="Searching is not available, sorry" name="text"/>
			 	</form>
			</div>
			</div>
		)
	}
}

export default HeaderMain;
