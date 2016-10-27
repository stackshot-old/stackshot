import React, {PropTypes, Component} from 'react'
import {
  StatusBar
} from 'react-native'
import {connect} from 'react-redux'

@connect(
  state => {
    const {theme: {activeTheme}} = state
    return {
      activeTheme
    }
  }
)
export default class MyComponent extends Component {
  static propTypes = {
    activeTheme: PropTypes.string
  }
  constructor(props) {
    super(props)
  }

  render() {
    const {activeTheme, backgroundColor} = this.props
    return <StatusBar backgroundColor={backgroundColor || '#fff'} animated={true}/>
  }
}
