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

var topCount = 0;
var topBrand  = '';

export default class Titles extends Component {

	constructor(props) {
		super(props)

		this.state = {
		  modalIsOpen: false,
		  itemClicked: {},
		  averageData: ''
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


	renderItem(brand) {
		if (brand.val > this.state.topCount) {
			topBrand= brand.name + ' with ' + brand.val + ' sold';
			topCount = brand.val
		} 

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
			  	<h3> {brand.val !== 1 ? '$' + brand.price[0] + ' - ' + '$' + brand.price[1]: '$' + brand.price[1]}</h3>
			  	
			  	</td>
			</tr>
	  )
	}

	render() {
		return (
			<table className="table table-hover">
			  <thead>
			    <tr>
			      <th> {this.props.data && this.props.data.length} different brands | Top Brand is: {this.state.topBrand}</th>
			    </tr>
			  </thead>
			  <tbody>
			  {this.props.data && this.props.data.map(this.renderItem)}
			  </tbody>

			  <Modal
			    isOpen={this.state.modalIsOpen}
			    onRequestClose={this.closeModal.bind(this)}
			    style={customStyles}
			    contentLabel="Payment Modal"
			  > 
			   <div>
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