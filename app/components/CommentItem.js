import React, {PropTypes, Component} from 'react'
import {
  View,
  Text,
  StatusBar
} from 'react-native'
import {connect} from 'react-redux'
import {Avatar, TimeAgo} from '../components'

@connect(
  (state, props) => {
    const {
      entities: {users},
      theme: {themeColor}
    } = state
    const {item} = props
    const userId = item.user

    return {
      user: users[userId],
      themeColor
    }
  }
)
export default class CommentItem extends Component {

  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  render() {
    const {themeColor, user, item} = this.props
    const {content, createdAt} = item
    const {avatar, username} = user

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10}}>
        <Avatar source={{uri: avatar}} size={25}/>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginLeft: 10}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: `rgb(${themeColor})`}}>{username}</Text>
            <TimeAgo time={createdAt} language="zh" style={{fontSize: 12, color: 'rgb(153, 157, 175)'}}/>
          </View>
          <Text style={{color: 'rgb(153, 157, 175)'}}>{content}</Text>
        </View>
      </View>
    )
  }
}
