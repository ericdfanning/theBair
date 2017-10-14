import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import { setCategories } from '../actions/setCategories.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Navbar extends React.Component {
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
			<div className="navbarMain">
			{!this.props.mobile ?
				<div className="navbarMain">
					<a onClick={() => this.handleCategoryClick('womensFashion')} id="categoryNavLink" className="navbarButton">Women's Fashion</a>
					<input id="searchBar" className="searchBar" type="text" name="input" placeholder="SEARCH CURRENTLY DISABLED" onKeyPress={this.findItem.bind(this)}/>
				</div>
				:
				<div className="container-fluid">
				  <div className="row-fluid"> 
					  <div className="col-12">
					  	<a className="navbarButton">Women's Fashion</a>
					  </div>
						<input className="scol-12 searchBar" type="text" name="input" placeholder="SEARCH CURRENTLY DISABLED" />
					</div>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setCategories}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

