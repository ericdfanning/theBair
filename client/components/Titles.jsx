import React, { Component } from 'react';
import Modal from 'react-modal';
// import { bindActionCreators } from 'redux';
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
		  page: 1

		}

		this.renderItem = this.renderItem.bind(this)
	}

	openModal(item) {
		console.log('item', item)
	  this.setState({
	  	modalIsOpen: true, itemClicked: item
	  }, () => {
	  	var keysArr = Object.keys(this.state.itemClicked.avgs)
	  	var avgs = this.state.itemClicked.avgs
	  	var div = (
	  		<div>
	  			{keysArr.map(v => {
	  				return <div style={{width: "100%", borderBottom: "1px solid lightgray"}}><h5 style={{paddingLeft: "5%"}}>{avgs[v]}<span style={{marginLeft: "25%"}}>{'$' + (Number(v) - 4) + ' - ' + '$' + Number(v)}</span></h5></div>
	  			})}
	  		</div>
	  	)
	  	this.setState({
	  		averageData: div
	  	})
	  });

	}

	closeModal() {
	  this.setState({modalIsOpen: false});
	}


	renderItem(brand, i, last) {

		var lowPrice = brand.price[0].toString().split('').slice(-2).includes('.') ? brand.price[0] + '0': brand.price[0]
		var highPrice = brand.price[1].toString().split('').slice(-2).includes('.') ? brand.price[1] + '0': brand.price[1]
		var price = brand.val !== 1 ? '$' + lowPrice + ' - ' + '$' + highPrice: '$' + highPrice

		return (
			<tr onClick={this.openModal.bind(this, brand)} >
			  <td>Brand: 
			  	<h3>{brand.name}</h3> 
			  </td>
			  <td>
			  		Occurance: 
			  	<h3> {brand.val} </h3>
			  </td>
			  <td>
			  	  Sold Since:
			  	<h3>{brand.endTime}</h3>
			  </td>
			  <td>
			  	  Price Range:
			  	<h3> {price}</h3>
			  	
			  	</td>
			</tr>
	  )
	}

	render() {
		return (
			<table className="table table-hover">

			  <tbody className="brandsInfo">
			  {this.props.data && this.props.data.map((brand, i) => {
			  	  return this.renderItem(brand, i)
			    }
			  )}
			  </tbody>

			  <Modal
			    isOpen={this.state.modalIsOpen}
			    onRequestClose={this.closeModal.bind(this)}
			    style={customStyles}
			    contentLabel="Payment Modal"
			  > 
			   <div className="brandsInfo">
			     <h4>Name: {this.state.itemClicked.name}</h4>
			     <h4>Number Sold: {this.state.itemClicked.val}</h4>
			     <h5>Sold between: {this.state.itemClicked.endTime}</h5>
			     {this.state.itemClicked.price &&
			       <h5>Price Range: ${this.state.itemClicked.price[0]} - ${this.state.itemClicked.price[1]}</h5>
			     }
			     <div>
			      {this.state.averageData}
			     </div>
			   </div>

			  </Modal>
			</table>
		)
	}
}