import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Title from './Titles.jsx';
import Main from './Main.jsx';
import CategoryBrands from './CategoryBrands.jsx';
import Accessories from './Accessories.jsx'
import HeaderMain from './HeaderMain.jsx'
import Details from './Details.jsx'

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { setDevice } from '../actions/setDevice'

class App extends React.Component {

	componentWillMount() {
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
		this.props.setDevice(mobile)
	}

	render () {
		return (
			<div className="headerLinks mainBody">

				<HeaderMain />

				<main>
				  <Switch>
				    <Route exact path='/' component={Main} />
				    <Route exact path='/womensFashion' component={CategoryBrands} />
				    <Route exact path='/details' component={Details} />
				    <Route exact path='/accessories' component={Accessories} />
				  </Switch>
				</main>
			</div>
		)
	}
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({setDevice}, dispatch)
}

export default connect(null, mapDispatchToProps, null, {pure: false})(App)
