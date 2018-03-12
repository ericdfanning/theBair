import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { setSearchedItem } from '../actions/setSearchedItem';

class Search extends React.Component {
	constructor() {
		super()
// [brandName.toUpperCase()]
    this.state = {
    	searchResults: [],
    	searchTerm: ''
    }
	}

	// findItem() {
	// 	let input = document.getElementById('searchBar').value
	// }

	handleSearch(e) {
		e.preventDefault()

		const searchTerm = e.target.text.value.toUpperCase()
		console.log('search submitted', searchTerm, this.props.searchItems[searchTerm])
		const searchResults = []
		for (let key in this.props.searchItems[searchTerm]) {
			searchResults.push({name: key, itemDetails: this.props.searchItems[searchTerm][key]})
		}
		this.setState({ searchTerm, searchResults})
		// this.props.setSearchedItem()
	}

	showSearchResults() {
		return (
			<div className="searchResults"> 
				{this.state.searchResults.map( item => {
					return <div className="searchResultItem"> {`${this.state.searchTerm} in ${item.name}`}</div>
				})}
			</div>
	  )
	}

	render () {
		return (
			<div>
			  {!this.props.isMobile && 
			  	<div>
				  <form className="search" onSubmit={this.handleSearch.bind(this)} autocomplete="false">
				    <span className="fa fa-search"></span>
				    <input type="text" placeholder="Search by brand name" name="text"/>
				 		{this.state.searchResults.length > 0 ? this.showSearchResults(): null}
				 	</form>
				 	</div>
			 	}
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    searchItems: state.searchItems,
    searchedItem: state.searchedItem,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setSearchedItem}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)