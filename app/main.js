import React, {Component} from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import Routes from './views/Routes'

let store = configureStore()

export default class Main extends Component {
	render(){
		return (
			<Provider store={store}>
				<Routes/>
			</Provider>
		)
	}
}
