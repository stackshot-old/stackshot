import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {handleActionChange} from '../actions'
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  StatusBar,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'


// Components
import {HomeShots, FloatButton, ToolBar, ShotModal} from '../components';

const screen = Dimensions.get('window')

@connect(
  state => {
    const {
      theme: {themeColor},
      shot: {isShot},
      comment: {isComment},
      socket: {newShot}
    } = state
    return {
      themeColor,
      isComment,
      newShot,
      isShot
    }
  },
  dispatch => bindActionCreators({handleActionChange},dispatch)
)

export default class Home extends Component {

  handleToggle(){
    const {handleActionChange, isShot} = this.props
    LayoutAnimation.configureNext( LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY ) )
    handleActionChange('shot', {isShot: !isShot})
  }

  render() {
    const {themeColor, isShot, isComment, newShot} = this.props
    const {count} = newShot
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={`white`} animated={true}/>
        <ToolBar />
        {count > 0 && <View><Text>{`有新的帖子(${count})`}</Text></View>}
        <HomeShots />
        <ShotModal />
        {(!isShot && !isComment) &&  <FloatButton icon={<Icon name="add" color={'white'} size={30}/>} bottom={20} right={20} size={60} color={`rgb(${themeColor})`} onPress={::this.handleToggle}/>}
      </View>
    );
  }
}
