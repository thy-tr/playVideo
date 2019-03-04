import React, {Component, Fragment} from 'react'
import store from './store/'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Ripples from 'components/ripples'
import Home from 'pages/home'
import Details from 'pages/details'


class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <Fragment>
              <Ripples/>
              <Route path='/' exact component={Home}></Route>
              <Route path='/details/:name' component={Details}></Route>
            </Fragment>
          </Router>
        </Provider>
    )
  }
}


export default App
