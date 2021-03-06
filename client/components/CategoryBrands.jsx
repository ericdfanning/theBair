import React from 'react';
import ReactDOM from 'react-dom';
import Title from './Titles.jsx';
import Main from './Main.jsx';
import { Link, Redirect } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getBrands } from '../actions/womensFashion/getWomensBrands.js';

class CategoryBrands extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
      pageNumTags: [],
      pageNumTagIndex: 0,
      page: 0,
      morePages: true,
      lessPages: false,
      categoryPicked: '',
      loading: true 
		}
	}

  componentWillMount() {

    // remove this and call the categories from categories.js once the catsObj is set up
    const categories = {
      dresses: 'Dresses',
      tshirts: 'T-Shirts',
      topsAndBlouses: 'Tops & Blouses',
      flats: 'Flats',
      sweaters: 'Sweaters',
      jeans: 'Jeans', 
      womansCoatsJackets: 'Coats & Jackets',
      heels: 'Heels',
      womansSandals: 'Woman\'s Sandals',
      mensJeans: 'Men\'s Jeans',
      mensSweaters: 'Men\'s Sweaters',
      mensDressShirts: 'Men\'s Dress Shirts',
      mensCasualShirts: 'Mens Casual Shirts',
      mensTshirts: 'Men\'s T-Shirts',
      mensBlazors: 'Mens Blazors & Sport Coats',
      ties: 'Ties',
      mensDressFormalShoes: 'Men\'s Dress & Formal Shoes',
      mensCasualShoes: 'Men\'s Casual Shoes'
    }
    
    this.setState({categoryPicked: categories[this.props.match.params.category]})
    this.props.getBrands(this.props.match.params.category)
      .then(()=>{this.createPageButtons()}) 
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

  gatherPageData(index) {
      this.setState({
        page: index,
      })
  }

  createPageButtons() {
    var tags = []
    var buttons = []
    for (var i = 0; i < this.props.pageCount; i++) {
      var tag = <span key={i} className="pageButton" onClick={this.gatherPageData.bind(this, i)}> {i + 1} </span>
      buttons.push(tag)
      if ((i%10 === 0 && i !== 0) || i === this.props.pageCount - 1) {
        tags.push(buttons)
        buttons = []
      }
    }
    this.setState({pageNumTags: tags.slice(), loading: false})
  }

  renderPageButtons() {
    return (
      <div style={{fontFamily: "Open Sans"}}> Pages
        {this.state.lessPages &&
          <span className="pageButton" onClick={this.decreasePageRange.bind(this)}><i className="fa fa-chevron-left fa-fw chevron" aria-hidden="true"></i></span>
        }

        {this.state.pageNumTags[this.state.pageNumTagIndex].map(v => v)}

        {this.state.morePages && this.state.pageNumTags.length > 1 &&
          <span className="pageButton" onClick={this.increasePageRange.bind(this)}><i className="fa fa-chevron-right fa-fw chevron" aria-hidden="true"></i></span>
        }
      </div>
    )
  }

	render () {
		return (
			<div>
        <div className="container-fluid">
          <div className="row col-12"> 
          {this.state.pageNumTags.length !== 0 && 
            <div className="paginationAndBrandCount">
            <div style={{fontFamily: "Open Sans"}} className="col-12">{this.state.categoryPicked}</div>
              <div style={{fontFamily: "Open Sans"}} className="col-12"> {this.props.brandsCount} total brands </div><br/>  

              <div className="col-12"> {this.renderPageButtons()} </div>
            </div>
          }
          {this.state.loading && <div className="paginationAndBrandCount"><img src="https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif" /></div>}
          </div>
        </div>
        {this.props.data && this.state.pageNumTags.length !== 0 && <Title data={this.props.data[this.state.page]}/>}
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    data: state.womensBrands && state.womensBrands.data,
    pageCount: state.womensBrands && state.womensBrands.pageCount,
    brandsCount: state.womensBrands && state.womensBrands.brandsCount,
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getBrands}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBrands)

