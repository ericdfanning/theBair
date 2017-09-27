import React, { Component } from 'react';
import Modal from 'react-modal';
import Details from './Details.jsx';

const customStyles = {
  content : {
    top             : '50%',
    left            : '50%',
    right           : '70%',
    bottom          : 'auto',
    marginRight     : '-50%',
    transform       : 'translate(-50%, -50%)',
    maxHeight       : '500px', // This sets the max height
    maxWidth        : '700px',
    overflow        : 'scroll', // This tells the modal to scroll
    border          : '1px solid black',
    //borderBottom          : '1px solid black', // for some reason the bottom border was being cut off, so made it a little thicker
    borderRadius    : '0px'
  }
};

let topBrand = '';
let topCount = 0;

export default class Titles extends Component {

	constructor(props) {
		super(props)

		this.state = {
		  modalIsOpen: false,
		  itemClicked: {},
		  averageData: '',
		  topBrand: '',
		  page: 1,
		  mobile: false,
		  mobileDetails: false

		}

		this.renderItem = this.renderItem.bind(this)
	}

	componentDidMount() {
		var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    var mobile = false
    if (x < 481) {
    	mobile = true
    }
		this.setState({mobile: mobile})
	}

	openModal(item) {
		  	var keysArr = Object.keys(item.avgs)
		  	var avgs = item.avgs
		  	var div = (
		  		<div>
		  			{keysArr.map(v => {
		  				return <div style={{width: "100%", borderBottom: "1px solid lightgray"}}><h5 style={{paddingLeft: "20px"}}>{avgs[v]}<span style={{float: "right", marginRight: "20px"}}>{'$' + (Number(v) - 4) + ' - ' + '$' + Number(v)}</span></h5></div>
		  			})}
		  		</div>
		  	)
		!this.state.mobile ?
		  	this.setState({
		  		averageData: div,
		  		itemClicked: item,
		  		modalIsOpen: true,
		  	})
	  :
		  this.setState({
		  	averageData: div,
		  	itemClicked: item,
		  	mobileDetails: true
		  })
	  
	}

	closeModal() {
	  this.setState({modalIsOpen: false});
	}


	renderItem(brand, i, last) {

		brand.price[0] = brand.price[0].toString().split('').slice(-2).includes('.') ? brand.price[0] + '0': brand.price[0]
		brand.price[1] = brand.price[1].toString().split('').slice(-2).includes('.') ? brand.price[1] + '0': brand.price[1]
		var price = brand.val !== 1 ? '$' + brand.price[0] + ' - ' + '$' + brand.price[1]: '$' + brand.price[1]

		return (
      <div className="row dataRows" onClick={this.openModal.bind(this, brand)}> 
			  <div className="col-md-4 col-sm-6 col-8">Brand: 
			  	<h3>{brand.name}</h3> 
			  </div>
			  <div className="col-md-2 col-sm-6 col-4">
			  		Occurance: 
			  	<h3> {brand.val} </h3>
			  </div>
			  <div className="col-md-3 col-sm-6 col-6">
			  	  Sold Since:
			  	<h3>{brand.endTime}</h3>
			  </div>
			  <div className="col-md-3 col-sm-6 col-6">
			  	  Price Range:
			  	<h3 className="detailPrice"> {price}</h3>
			  	
			  </div>
			</div>
	  )
	}

	toggleDetails() {
		this.setState({mobileDetails: !this.state.mobileDetails})
	}

	render() {
		return (
			<div >
			{this.state.mobileDetails ?
				<Details itemClicked={this.state.itemClicked} averageData={this.state.averageData} toggle={this.toggleDetails.bind(this)}/>
				: 
				<div>
			  <div className="brandsInfo container-fluid">
			  {this.props.data && this.props.data.map((brand, i) => {
			  	  return this.renderItem(brand, i)
			    }
			  )}
			  </div>
				  <Modal
				    isOpen={this.state.modalIsOpen}
				    onRequestClose={this.closeModal.bind(this)}
				    style={customStyles}
				    contentLabel="Payment Modal"
				  > 
				   <div className="brandsInfo">
				     <h4 style={{paddingLeft: "20px"}}>Name: {this.state.itemClicked.name}</h4>
				     <h4 style={{paddingLeft: "20px"}}>Number Sold: {this.state.itemClicked.val}</h4>
				     <h5 style={{paddingLeft: "20px"}}>Sold between: {this.state.itemClicked.endTime}</h5>
				     {this.state.itemClicked.price &&
				       <h5 style={{paddingLeft: "20px"}}>Price Range: ${this.state.itemClicked.price[0]} - ${this.state.itemClicked.price[1]}</h5>
				     }
				     <div>
				      {this.state.averageData}
				     </div>
				   </div>

				  </Modal>
				  </div>
			  }
			</div>
		)
	}
}