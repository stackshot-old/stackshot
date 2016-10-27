import React, {PropTypes} from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

@connect(
  state => ({}),
  dispatch => bindActionCreators({})
)
export default class Message extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>图槽详情页</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
