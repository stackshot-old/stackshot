import React, {PropTypes, Component} from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class FloatButton extends Component {
  static defaultProps = {
    size: 40
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {icon, size, right, left, top, bottom, color, onPress, style} = this.props
    const defaultStyle = {
      width: size,
      height: size,
      position: 'absolute',
      right: right,
      left: left,
      top: top,
      bottom: bottom,
      backgroundColor: color
    }
    return (
      <TouchableOpacity style={[styles.container, defaultStyle, style]} onPress={()=> onPress()}>
        {React.isValidElement(icon) && React.cloneElement(icon)}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    elevation: 2
  },
})
