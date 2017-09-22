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
      pageCount: 0
		}
	}

	componentWillMount() {
    Ebay.gatherData({page: 1}, (err, res) => {
      this.setState({
        data: res.data
      })
    })
	}

  callAjax() {

  	Ebay.getData((err, res) => {
  		console.log('I just finished running')
  	})
  }

  gatherData(index) {

    Ebay.gatherData({page: Number(index)}, (err, res) => {
      this.setState({
        data: res.data,
        pageCount: res.pageCount
      }, () => {console.log('page count is ', this.state.pageCount)})
    })
  }

  renderPageButtons() {
    var buttons = []
    for (var i = 0; i < this.state.pageCount; i++) {
      buttons.push(<a ref="value" name={i} href="#" onClick={this.gatherData.bind(this, i)}> {i + 1} </a>)
    }

    return (
      <div style={{width: "50%", textAlign: "center", overflow: "ellipsis"}}>
        {buttons.map(v => v)}
      </div>
    )
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
          <div className="container">
            <div classsName="row">    
              <div style={{border: "100%", textAlign: "center", overflow: "ellipsis"}} className="col-xm-12">
                {this.state.pageCount > 0 && this.renderPageButtons()}
              </div>
            </div>
          </div>
          <Title data={this.state.data}/>
			    
			</div>
		)
	}
}

export default App;

