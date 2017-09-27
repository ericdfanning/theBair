import React from 'react';
import ReactDOM from 'react-dom';
import Title from './Titles.jsx';
import Main from './Main.jsx';
import { Link, Redirect } from 'react-router-dom'
import * as Ebay from '../model/ebayData.js';

class Dresses extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: [],
      currentData: [],
      brandsCount: '',
			showSidebar: false,
      pageCount: 0,
      pageNumTags: [],
      pageNumTagIndex: 0,
      page: 0,
      morePages: true,
      lessPages: false,
		}
	}

	componentWillMount() {
    console.log('componentWillMount is mounting')
    Ebay.gatherData('dresses', (err, res) => {
      this.setState({
        data: res.data,
        currentData: res.data[0],
        pageCount: res.pageCount,
        brandsCount: res.brandsCount
      }, () => {
        this.createPageButtons()
      })
    })
	}

  callAjax() {
  	Ebay.getData((err, res) => {
  		console.log('I just finished running')
  	})
  }

  increasePageRange() {

    if (this.state.pageNumTagIndex >= this.state.pageNumTags.length - 2) {
      this.setState({morePages: false, pageNumTagIndex: (this.state.pageNumTagIndex + 1)})
    } else {
      this.setState({lessPages: true, pageNumTagIndex: (this.state.pageNumTagIndex + 1)})
    }
    
  }

  decreasePageRange() {
    if (this.state.pageNumTagIndex <= 1) {
      this.setState({lessPages: false, pageNumTagIndex: (this.state.pageNumTagIndex - 1)})
    } else {
      this.setState({morePages: true, pageNumTagIndex: (this.state.pageNumTagIndex - 1)})
    }
  }

  gatherData(index) {
      this.setState({
        currentData: this.state.data[index],
      }, () => {console.log('mounted', index, this.state.currentData)})
  }

  createPageButtons() {
    var tags = []
    var buttons = []
    for (var i = 0; i < this.state.pageCount; i++) {
      if ((i%10 === 0 && i !== 0) || i === this.state.pageCount - 1) {
        tags.push(buttons)
        buttons = []
      }
      var tag = <span className="pageButton" onClick={this.gatherData.bind(this, i)}> {i + 1} </span>
      buttons.push(tag)
    }

    this.setState({pageNumTags: tags.slice()})
  }

  renderPageButtons() {

    return (
      <div> Pages
        {this.state.lessPages &&
          <span className="pageButton" onClick={this.decreasePageRange.bind(this)}> {'<<'} </span>
        }

        {this.state.pageNumTags[this.state.pageNumTagIndex].map(v => v)}

        {this.state.morePages &&
          <span className="pageButton" onClick={this.increasePageRange.bind(this)}> {'>>'} </span>
        }
      </div>
    )
  }

	render () {
		return (
			<div>
			    <button className="btn btn-secondary" onClick={this.callAjax.bind(this)}> Make server Call </button>
			    <button className="btn btn-secondary" onClick={this.gatherData.bind(this)}> Gather the Data </button>
          <div className="container-fluid">
            <div className="row col-12"> 
              {this.state.pageNumTags.length !== 0 && 
                <div className="paginationAndBrandCount">
                  <div className="col-12"> {this.state.brandsCount} different brands </div>   

                  <div className="col-12"> {this.renderPageButtons()} </div>
                </div>
              }
            </div>
          </div>
          
          <Title data={this.state.currentData}/>
			</div>
		)
	}
}

export default Dresses;

