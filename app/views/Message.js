import React, {PropTypes} from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {ToolBar} from '../components'

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
      <View style={styles.container}>
        <ToolBar />
        <Text style={{alignSelf: 'center'}}>消息页</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
