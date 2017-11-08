import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cats from '../categories'

import { getBrands } from '../actions/womensFashion/getWomensBrands.js';



class Main extends React.Component {

	handleClick(category) {
		this.props.getBrands(category)
	}

	renderCategories() {

		return (
			<div className="row">
		  {cats.map((v, i) => {
				return (
					<div key={i} id="mainScreen">
			   	  <span className="span-homegal">
			        <Link to={`/womensFashion/${cats[i].path}`} onClick={this.handleClick.bind(this, `${cats[i].path}`)}>
		            <div className="polaroid">
		              <img className="mainImage" src={`${cats[i].img}`}/>
		              <h2><span>{cats[i].title}</span></h2>
		            </div>
			        </Link>
			      </span>
				  </div>)
			  })
		  }
		  </div>
	  )
	}

	render () {
		return (
			<div>
				<div>
				  <div className="headerMainTop">Are you an eBay reseller? Then this site's for you!</div>
				  <div className="headerMain">"Finding top selling pre-owned brands on eBay is tough. <br/>The Bair Data makes it easy."</div>
				</div>
        <div className="container-fluid">
            {this.renderCategories()}
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getBrands}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)


