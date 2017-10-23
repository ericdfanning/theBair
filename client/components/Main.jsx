import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import dresses from '../../images/dresses.jpeg'
import tshirts from '../../images/tshirts.jpeg'
import topsAndBlouses from '../../images/topsAndBlouses.jpeg'
import flats from '../../images/womensFlats.jpeg'
import sweaters from '../../images/sweater.jpeg'
import jeans from '../../images/jeans.jpeg'

import womansCoatsJackets from '../../images/jeans.jpeg'
import heels from '../../images/jeans.jpeg'
import womansSandals from '../../images/jeans.jpeg'
import mensJeans from '../../images/jeans.jpeg'
import mensSweaters from '../../images/jeans.jpeg'
import mensDressShirts from '../../images/jeans.jpeg'
import mensCasualShirts from '../../images/jeans.jpeg'
import mensTshirts from '../../images/jeans.jpeg'
import mensBlazors from '../../images/jeans.jpeg'
import ties from '../../images/jeans.jpeg'
import mensDressFormalShoes from '../../images/jeans.jpeg'
import mensCasualShoes from '../../images/jeans.jpeg'


import { getBrands } from '../actions/womensFashion/getWomensBrands.js';

const cats = [
  {
  	title: 'Dresses',
  	img: dresses,
  	lwrCase: 'dresses'
  },
    {
  	title: 'T-Shirts',
  	img: tshirts,
  	lwrCase: 'tshirts'
  },
    {
  	title: 'Tops & Blouses',
  	img: topsAndBlouses,
  	lwrCase: 'topsAndBlouses'
  },
    {
  	title: 'Flats',
  	img: flats,
  	lwrCase: 'flats'
  },
    {
  	title: 'Sweaters',
  	img: sweaters,
  	lwrCase: 'sweaters'
  },
    {
  	title: 'Jeans',
  	img: jeans,
  	lwrCase: 'jeans'
  },
    {
  	title: 'Coats & Jackets',
  	img: womansCoatsJackets,
  	lwrCase: 'womansCoatsJackets'
  },
    {
  	title: 'Heels',
  	img: heels,
  	lwrCase: 'heels'
  },
    {
  	title: 'Womans Sandals',
  	img: womansSandals,
  	lwrCase: 'womansSandals'
  },
    {
  	title: 'Mens Jeans',
  	img: mensJeans,
  	lwrCase: 'mensJeans'
  },
    {
  	title: 'Mens Sweaters',
  	img: mensSweaters,
  	lwrCase: 'mensSweaters'
  },
    {
  	title: 'Dress Shirts',
  	img: mensDressShirts,
  	lwrCase: 'mensDressShirts'
  },
    {
  	title: 'Mens Casual Shirts',
  	img: mensCasualShirts,
  	lwrCase: 'mensCasualShirts'
  },
    {
  	title: 'Mens T-Shirts',
  	img: mensTshirts,
  	lwrCase: 'mensTshirts'
  },
    {
  	title: 'Mens Blazors & Sport Coats',
  	img: mensBlazors,
  	lwrCase: 'mensBlazors'
  },
    {
  	title: 'Ties',
  	img: ties,
  	lwrCase: 'ties'
  },
    {
  	title: 'Mens Dress/Formal Shoes',
  	img: mensDressFormalShoes,
  	lwrCase: 'mensDressFormalShoes'
  },
    {
  	title: 'Mens Casual Shoes',
  	img: mensCasualShoes,
  	lwrCase: 'mensCasualShoes'
  }
]

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
			        <Link to={`/womensFashion/${cats[i].lwrCase}`} onClick={this.handleClick.bind(this, `${cats[i].lwrCase}`)}>
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
			{!this.props.mobile ?
				<div>
				  <div className="headerMainTop">Are you an eBay reseller? Then this site's for you!</div>
				  <div className="headerMain">"Finding top selling pre-owned brands on eBay is tough. <br/>The Bair Data makes it easy."</div>
				</div>
				:
				<div>
				  <div className="headerMainTop">Are you an eBay reseller? Then this site's for you!</div>
				  <div className="headerMain">"Finding top selling pre-owned brands on eBay is tough. <br/>The Bair Data makes it easy."</div>
				</div>
			}
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


