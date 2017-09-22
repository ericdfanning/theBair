import React from 'react';
import ReactDOM from 'react-dom';
import Title from './Titles.jsx';
import Main from './Main.jsx';
import * as Ebay from '../model/ebayData.js';

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: [],
			showSidebar: false,

		}
	}

	componentDidMount() {

	}

  callAjax() {

  	Ebay.getData((err, res) => {
  		console.log('I just finished running')
  	})
  }

  gatherData() {

  	Ebay.gatherData({page: 1}, (err, res) => {
	  	this.setState({
	  		data: res
	  	}, () => {console.log('gathered end of set State')})
  	})
  }

  // showSide() {
  // 	console.log('clicked')
  // 	if (this.state.showSidebar) {
  // 	  this.setState({showSidebar: !this.state.showSidebar, size: "col-12-lg"})
  // 	} else {
  // 		this.setState({showSidebar: !this.state.showSidebar, size: "col-9-lg"})
  // 	}
  // } <button onClick={this.showSide.bind(this)}> show sidebar </button>

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

