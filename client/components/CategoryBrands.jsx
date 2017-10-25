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
			showSidebar: false,
      pageNumTags: [],
      pageNumTagIndex: 0,
      page: 0,
      morePages: true,
      lessPages: false,
      categoryPicked: ''
		}
	}

  componentWillMount() {
    const categories = {
      dresses: 'Dresses',
      tshirts: 'T-Shirts',
      topsAndBlouses: 'Tops & Blouses',
      flats: 'Flats',
      sweaters: 'Sweaters',
      jeans: 'Jeans'
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

  gatherData(index) {
      this.setState({
        page: index,
      })
  }

  createPageButtons() {
    var tags = []
    var buttons = []
    for (var i = 0; i < this.props.pageCount; i++) {
      var tag = <span key={i} className="pageButton" onClick={this.gatherData.bind(this, i)}> {i + 1} </span>
      buttons.push(tag)
      if ((i%10 === 0 && i !== 0) || i === this.props.pageCount - 1) {
        tags.push(buttons)
        buttons = []
      }
    }
    this.setState({pageNumTags: tags.slice()})
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

  handleCategoryPicked(category) {

    this.props.getBrands(category)
      .then(() => {
        this.createPageButtons()
        this.setState({categoryPicked: category, page: 0})
      })
  }

  handleCategoryPickedMobile(e) {
    e.preventDefault()

    this.props.getBrands(e.target.userType.value)
      .then(() => this.createPageButtons())

    this.setState({categoryPicked: e.target.userType.value, page: 0})

  }

	render () {
		return (
			<div>

        <div className="container-fluid">
          <div className="row col-12"> 
            {this.props.isMobile &&
              <div className="col-12 selectCategoryMobile">
                <form onSubmit={this.handleCategoryPickedMobile.bind(this)}>
                  <select className="selectpicker" name="userType">
                    <option selected hidden>Choose Category</option> 
                    <option value="Dresses">Dresses</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Tops/Blouses">Tops/Blouses</option>
                  </select>
                  <button className="selectCatBtnMobile btn btn-secondary" type="submit">Go</button>
                </form>
              </div>
            }

            {this.state.pageNumTags.length !== 0 && 
              <div className="paginationAndBrandCount">
              <div style={{fontFamily: "Open Sans"}} className="col-12">{this.state.categoryPicked}</div>
                <div style={{fontFamily: "Open Sans"}} className="col-12"> {this.props.brandsCount} total brands </div><br/>  

                <div className="col-12"> {this.renderPageButtons()} </div>
              </div>
            }
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
    categories: state.categories,
    isMobile: state.isMobile
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getBrands}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBrands)

