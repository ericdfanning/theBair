import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Title from './Titles.jsx';
import Main from './Main.jsx';
import Dresses from './Dresses.jsx';
import Accessories from './Accessories.jsx'
import Navbar from './Navbar.jsx'
import Details from './Details.jsx'

class App extends React.Component {

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
