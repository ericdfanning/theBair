import React from 'react';
import ReactDOM from 'react-dom';
import Title from './Titles.jsx';
import * as Ebay from '../model/ebayData.js';

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: []
		}
	}

	componentDidMount() {

	}

	// add calendar picker for date range
  // output is number of items sold by a particular brand name w/in that time frame
  // also make it so that specific brands can be used to narrow down that search
    // within that given time frame. This can be used for checking on how items
    // are doing that she already has or to specifically search a new one. 

  // this has to be cross category specific 

  // Allow user to pick from same table of categories ebay has. Make default
    // set to most common searches i.e. clothes

  // create algorithm that checks for frequency of names (like using an object)
    // to see how much of an item appears (by brand name) in any given cateogry
    // that is searched by the user.

  callAjax() {

  	Ebay.getData((err, res) => {
  		console.log('I just finished running')
  	})
  }

  gatherData() {

  	Ebay.gatherData((err, res) => {
	  	this.setState({
	  		data: res
	  	})
  	})
  }

	render () {
		return (
			<div>
			  Make ajax call
			    <button className="btn btn-secondary" onClick={this.callAjax.bind(this)}> Make server Call </button>
			    <button className="btn btn-secondary" onClick={this.gatherData.bind(this)}> Gather the Data </button>
			    <Title data={this.state.data}/>
			    
			</div>
		)
	}
}

export default App;

