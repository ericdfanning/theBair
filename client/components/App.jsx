import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Title from './Titles.jsx';
import Main from './Main.jsx';
import Dresses from './Dresses.jsx';
import Accessories from './Accessories.jsx'

class App extends React.Component {

	render () {
		return (
			<div>
			<main>
			  <Switch>
			    <Route exact path='/' component={Dresses} />
			    <Route exact path='/dresses' component={Main} />
			    <Route exact path='/dresses/accessories' component={Accessories} />
			  </Switch>
			</main>
			</div>
		)
	}
}

export default App;
