import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import dressesImage from '../../images/dresses.jpeg'
import tshirts from '../../images/tshirts.jpeg'
import topsAndBlouses from '../../images/topsAndBlouses.jpeg'

class Main extends React.Component {

	render () {
		return (
			<div>
			{!this.props.mobile ?
				<div>
				  <div className="headerMainTop">Are you an eBay reseller? Then this site's for you!</div>
				  <div className="headerMain">"Finding top selling brands on eBay is tough. <br/>The Bair Data makes it easy."</div>
				</div>
				:
				<div>
				  <div className="headerMainTop">Are you an eBay reseller? Then this site's for you!</div>
				  <div className="headerMain">"Finding top selling brands on eBay is tough. <br/>The Bair Data makes it easy."</div>
				</div>
			}
        <div className="container-fluid">
          <div className="row">
	          <div id="mainScreen">
	          	<span className="span-homegal">
	              <a href="/womensFashion">
	                  <div className="polaroid">
	                      <img className="mainImage" src={dressesImage}/>
	                      <h2><span>Dresses</span></h2>
	                  </div>
	              </a>
	            </span>
		        </div>
		        <div id="mainScreen">
				   	  <span className="span-homegal">
				        <a href="/womensFashion">
			            <div className="polaroid">
		                <img className="mainImage" src={tshirts}/>
		                <h2><span>T-Shirts</span></h2>
			            </div>
				        </a>
				      </span>	
					  </div>
					  <div id="mainScreen">
    		   	  <span className="span-homegal">
    		        <a href="/womensFashion">
    	            <div className="polaroid">
                    <img className="mainImage" src={topsAndBlouses}/>
                    <h2><span>Tops & Blouses</span></h2>
    	            </div>
    		        </a>
    		      </span>
	    		  </div>
  			  </div>
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

export default connect(mapStateToProps)(Main)


