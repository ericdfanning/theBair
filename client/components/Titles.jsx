import React, { Component } from 'react';
import Modal from 'react-modal';
import Details from './Details.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

class Titles extends Component {

	constructor(props) {
		super(props)

		this.state = {
		  modalIsOpen: false,
		  itemClicked: {},
		  averageData: '',
		  topBrand: '',
		  page: 1,
		  mobileDetails: false,
		  showPics: false,
		  pics: []
		}

		this.renderItem = this.renderItem.bind(this)
	}

	openModal(item) {
		let picsArr = []
		for (let key in item.pics) {
			picsArr.push(item.pics[key])
		}
		// console.log('PICS ARRAY', picsArr)
  	var keysArr = Object.keys(item.avgs)
  	var avgs = item.avgs
  	var picsButton = (<button onClick={()=>{this.setState({showPics: true})}}> See Pics </button>)
  	var div = (
  		<div>
  			{keysArr.map((v, i) => {
  				return <div key={i} style={{width: "100%", borderBottom: "1px solid lightgray"}}><h5 style={{paddingLeft: "20px"}}>{avgs[v]} {picsArr[i] ? picsButton: null}<span className="moneyFont" style={{float: "right", marginRight: "20px"}}>{'$' + (Number(v) - 4) + ' - ' + '$' + Number(v)}</span></h5></div>
  			})}
  		</div>
  	)

		!this.props.isMobile ?
		  	this.setState({
		  		averageData: div,
		  		itemClicked: item,
		  		modalIsOpen: true,
		  		pics: picsArr
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
      <div key={i} className="row dataRows cursorPointer" onClick={this.openModal.bind(this, brand)}> 
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

	renderPics(picsArr) {
		return (
  		<div>
  			{picsArr.map((arr) => {
  				return (
			  		<div>
			  			{arr.map((p, i) => {
			  				return <div key={i} style={{width: "100%", borderBottom: "1px solid lightgray"}}><img src={p}/></div>
			  			})}
			  		</div>
					)
  			})}
  		</div>
		)
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
				  {this.state.showPics ?
				  	this.renderPics(this.state.pics)
				  	:
				   <div className="brandsInfo">
				     <h4 style={{paddingLeft: "20px"}}>Name: {this.state.itemClicked.name}</h4>
				     <h4 style={{paddingLeft: "20px"}}>Number Sold: {this.state.itemClicked.val}</h4>
				     <h5 style={{paddingLeft: "20px"}}>Sold since: {this.state.itemClicked.endTime}</h5>
				     {this.state.itemClicked.price &&
				       <h5 style={{paddingLeft: "20px"}}>Price Range: ${this.state.itemClicked.price[0]} - ${this.state.itemClicked.price[1]}</h5>
				     }
				     <div>
				      {this.state.averageData}
				     </div>
				   </div>
				 }

				  </Modal>
				  </div>
			  }
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
	  isMobile: state.isMobile
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({getDresses}, dispatch)
// }

export default connect(mapStateToProps)(Titles)

