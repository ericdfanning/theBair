import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Title from './Titles.jsx';
import Main from './Main.jsx';
import Dresses from './Dresses.jsx';
import Accessories from './Accessories.jsx'
import Navbar from './Navbar.jsx'
import Details from './Details.jsx'

class App extends React.Component {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		dresses: [],
 //      currentData: [],
 //      brandsCount: '',
	// 		showSidebar: false,
 //      pageCount: 0,
 //      pageNumTags: [],
 //      pageNumTagIndex: 0,
 //      page: 0,
 //      morePages: true,
 //      lessPages: false,
	// 	}
	// }

	// componentWillMount() {
 //    console.log('componentWillMount is mounting')
 //    Ebay.gatherData('dresses', (err, res) => {
 //      this.setState({
 //        dresses: res.dresses.data,
 //        firstSetDresses: res.dresses.data[0],
 //        dressesPageCount: res.pageCount,
 //        brandsCount: res.brandsCount
 //      }, () => {
 //        this.createPageButtons()
 //      })
 //    })
	// }

	render () {
		return (
			<div className="headerLinks">

				<Navbar />

				<main className="mainBody">
				  <Switch>
				    <Route exact path='/' component={Dresses} />
				    <Route exact path='/dresses' component={Dresses} />
				    <Route exact path='/details' component={Details} />
				    <Route exact path='/accessories' component={Accessories} />
				  </Switch>
				</main>
			</div>
		)
	}
}

export default App;
