import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import { setCategories } from '../actions/setCategories.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
			<div>
			{!this.props.mobile ?
				<div>
				  <div className="headerMainTop">Are you an eBay reseller? Then this site's for you!</div><br></br>
				  <div className="headerMain">"Finding top selling brands on eBay is tough.
				  <div >The Bair Data makes it easy."</div></div>
				</div>
				:
				<div className="headerMain">
				  "Finding top selling brands on eBay is tough. <div>The Bair Data makes it easy."</div>
				</div>
			}
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
