import React, {PropTypes} from 'react'
import {
  View,
  Text,
  ListView,
  StyleSheet,
  InteractionManager
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {getMessages} from '../actions'
import {ToolBar, MessageItem} from '../components'
import {obj2query} from '../utils'

@connect(
  (state, props) => {
    const {
      pagination: { allmessages },
      entities:{messages, shots},
      theme: {themeColor},
    } = state
    const query = obj2query({
      limit: 5
    })
    const messagesPagination = allmessages[query] || { ids: [] }
    const relatedMessages  = messagesPagination.ids.map(id => messages[id])
    const {isFetching} = messagesPagination

    return {
      relatedMessages,
      isFetching,
      themeColor,
      query,
    }
  },
  dispatch => bindActionCreators({getMessages}, dispatch)
)
export default class Message extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount(){
    const {getMessages,query} = this.props
    getMessages({query})
  }

  onEndReached = () => {
    const {getMessages, query} = this.props
    InteractionManager.runAfterInteractions(() => {
      getMessages({query, next: true})
    })
  }

  render() {
    const {relatedMessages, themeColor} = this.props
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    let dataSource = ds.cloneWithRows(relatedMessages)
    return (
      <View style={styles.container}>
        <ToolBar />
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          onEndReachedThreshold={30}
          onEndReached={()=> this.onEndReached()}
          renderRow={item => <MessageItem item={item} themeColor={themeColor}/>}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
