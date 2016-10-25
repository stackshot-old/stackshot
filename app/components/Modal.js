import React, {PropTypes, Component} from 'react'
import {
  View,
  Text,
  Animated,
  StatusBar,
  StyleSheet,
  Dimensions,
  BackAndroid,
  PanResponder,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

import {FloatButton} from '../components'

const screen = Dimensions.get('window')


@connect(
  state => {
    const {theme: {activeTheme}} = state
    return {
      activeTheme
    }
  }
)
export default class Modal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {isopen, activeTheme, children, style, } = this.props

    const size = {width: screen.width, height: screen.height}

    return (
      <View style={[styles.transparent, styles.absolute]} pointerEvents={'box-none'}>
        { isopen &&
          <View style={[styles.wrap, size, style]}>
            { isopen && <StatusBar backgroundColor={'rgba(0,0,0,0.8)'} animated={true}/>}
              { children }
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  transparent: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  absolute: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  },
  wrap:{
    backgroundColor: 'rgba(0,0,0,0.8)'
  }
})
