import React, {PropTypes, Component} from 'react'
import {
  StatusBar
} from 'react-native'
import {connect} from 'react-redux'

@connect(
  state => {
    const {theme: {baseColor}} = state
    return {
      baseColor
    }
  }
)
export default class MyComponent extends Component {
  static propTypes = {
    baseColor: PropTypes.string
  }
  constructor(props) {
    super(props)
  }

  render() {
    const {baseColor, backgroundColor} = this.props
    return <StatusBar backgroundColor={`rgb(${baseColor})` || '#fff'} animated={true}/>
  }
}
