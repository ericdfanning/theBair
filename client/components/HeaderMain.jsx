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

	render () {
		return (
			<div className="landingBanner">
			<div id="headerBanner"> 
			  <Link id="logo" to="/"> The Bair Data </Link>
			  <Link className="bannerItems" to="/contactInfo">Contact Us</Link>
			  <Link className="bannerItems" to="/about">About</Link>
			  <Link className="bannerItems" to="/womensFashion">Categories</Link>
			</div>
			</div>
		)
	}
}

export default HeaderMain;
