import React, {PropTypes} from 'react'
import {
  View
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

@connect(
  state => ({}),
  dispatch => bindActionCreators({})
)
export default class DashBoard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>

      </View>
    )
  }
}
