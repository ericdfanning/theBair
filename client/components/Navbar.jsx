import React from 'react';
import { Link, Redirect } from 'react-router-dom'

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

	render () {
		return (
			<div className="navbarMain">
			{!this.state.mobile ?
				<div className="navbarMain">
					<Link to="/dresses" className="navbarButton">Dresses</Link>
					<Link to="/accessories" className="navbarButton">Accessories</Link>
					<input id="searchBar" className="searchBar" type="text" name="input" placeholder="SEARCH CURRENTLY DISABLED" onKeyPress={this.findItem.bind(this)}/>
				</div>
				:
				<div className="container-fluid">
				  <div className="row-fluid"> 
					  <div className="col-12">
					  	<Link to="/dresses" className="navbarButton">Dresses</Link>
					  </div>
					  <div className="col-12">
					    <Link to="/accessories" className="navbarButton">Accessories</Link>
					  </div>
						<input className="scol-12 searchBar" type="text" name="input" placeholder="SEARCH CURRENTLY DISABLED" />
					</div>
				</div>
			}
			</div>
		)
	}
}

export default Navbar;