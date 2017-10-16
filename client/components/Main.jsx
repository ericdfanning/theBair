import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom'

import dressesImage from '../../images/dresses.jpeg'
import tshirts from '../../images/tshirts.jpeg'
import topsAndBlouses from '../../images/topsAndBlouses.jpeg'

class Main extends React.Component {

	render () {
		return (
			<div>
      	Accessories Main
      	<Link to="/womensFashion">Categories</Link>
        <div className="container-fluid">
          <div className="row">
	          <div id="mainScreen" className="col-4-lg">
	          	<span className="span-homegal">
	              <a href="/womensFashion">
	                  <div className="polaroid">
	                      <img className="mainImage" src={dressesImage}/>
	                      <h2><span>Dresses</span></h2>
	                  </div>
	              </a>
	            </span>
		        </div>
		        <div id="mainScreen" className="col-4-lg">
				   	  <span className="span-homegal">
				        <a href="/womensFashion">
			            <div className="polaroid">
		                <img className="mainImage" src={tshirts}/>
		                <h2><span>T-Shirts</span></h2>
			            </div>
				        </a>
				      </span>	
					  </div>
					  <div id="mainScreen" className="col-4-md">
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

export default Main;


