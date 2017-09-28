import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import { setCategories } from '../actions/setCategories.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Navbar extends React.Component {
	constructor() {
		super()

		this.state = {
			mobile: false
		}
	}

	componentDidMount() {
		var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    var mobile = false
    if (x < 481) {
    	mobile = true
    }
		this.setState({mobile: mobile})
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
			{!this.state.mobile ?
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setCategories}, dispatch)
}

export default connect(null, mapDispatchToProps)(Navbar)

