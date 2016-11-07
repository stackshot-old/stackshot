import React, {PropTypes, Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {toggleToolbar, toggleSearch} from '../actions'

import {Avatar} from '../components'


@connect(
  state => {
    const {
      auth:{ user},
      theme: {activeTheme},
      common: {toolbar:{ activeIndex }}
    } = state
    return {
      activeIndex,
      activeTheme,
      user
    }
  },
  dispatch => bindActionCreators({toggleToolbar, toggleSearch}, dispatch)
)
export default class ToolBar extends Component {
  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  handlePressAvatar = () => {
    const {drawer} = this.context.app
    drawer.openDrawer()
  }

  handleSelected = (index) => {
    const {navigator} = this.context.app
    const {toggleToolbar} = this.props
    toggleToolbar({activeIndex: index})
    switch (index) {
      case 0:
        navigator.replace({ name: 'home'})
        break
      case 1:
        navigator.replace({ name: 'found'})
        break
      case 2:
        navigator.replace({ name: 'message'})
        break
      default:
        return
    }
  }

  handleSearch = () => {
    const {toggleSearch} = this.props
    LayoutAnimation.configureNext( LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY ) )
    toggleSearch()
  }

  render() {
    const {activeTheme, activeIndex, user} = this.props
    const { username, avatar } = user
    return (
      <View style={styles.Container}>
        <TouchableOpacity onPress={()=> this.handlePressAvatar()}>
          <Avatar source={{uri: avatar ? avatar : 'http://p1.bpimg.com/4851/e7e901c31ded46ed.jpg'}} size={40} style={{marginLeft: 10}}/>
        </TouchableOpacity>
        <View style={styles.List}>
          <Item icon='home' text="首页" handleSelected={this.handleSelected} activeIndex={activeIndex} index={0} activeTheme={activeTheme}/>
          <Item icon='explore' text="发现" handleSelected={this.handleSelected} activeIndex={activeIndex} index={1} activeTheme={activeTheme}/>
          <Item icon='textsms' text="消息" handleSelected={this.handleSelected} activeIndex={activeIndex} index={2} activeTheme={activeTheme}/>
        </View>
        <Icon name="search" color="rgb(151,176,200)" size={25} style={styles.Search} onPress={() => this.handleSearch()}/>
      </View>
    )
  }
}


class Item extends Component {
  onPress = () => {
    const {index, handleSelected} = this.props
    handleSelected(index)
  }

  render() {
    const {icon, text, ouTouch, index, activeIndex, activeTheme} = this.props
    return (
      <TouchableOpacity
        style={[styles.TouchItem]}
        onPress={() => this.onPress()}>
        <View style={[styles.ItemView,{backgroundColor: activeIndex === index ? `rgb(${activeTheme})` : 'transparent'}]}>
          <Icon name={icon} size={20} color={activeIndex === index ? `#fff`  : 'rgb(151,176,200)'}/>
          <Text style={[styles.ItemText, { color: activeIndex === index ? `#fff` : 'rgb(151,176,200)'}]}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(208,214,226)'
  },
  List: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  TouchItem:{
    borderRadius: 20,
  },
  ItemView: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Search: {
    position: 'absolute',
    right: 10,
    top: 16
  }
})
