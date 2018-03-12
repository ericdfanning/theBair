import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setCategories } from '../actions/setCategories.js';
import SearchBox from './SearchBox.jsx';

class HeaderMain extends React.Component {
	constructor() {
		super()

	}

	handleCategoryClick(category) {
		this.props.setCategories(category)
	}

	render () {
		return (
			<div>
			<div id="headerBanner"> 
			  <Link id="logo" to="/"> The Bair Data </Link>
			  <Link className="bannerItems" to="/contactInfo">Contact Us</Link>
			  <Link className="bannerItems" to="/about">About</Link>
			  {!this.props.isMobile && 
				  <SearchBox />
			 	}
			</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    isMobile: state.isMobile
  }
}

export default connect(mapStateToProps)(HeaderMain)
