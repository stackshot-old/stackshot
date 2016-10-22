import React, {PropTypes, Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import {connect} from 'react-redux'

@connect(
  state => {
    const {theme: {activeTheme}} = state
    return {
      activeTheme
    }
  }
)
export default class Button extends Component {
  static propTypes = {
    active: PropTypes.bool,
    icon: PropTypes.node,
    label: PropTypes.string,
    onPress: PropTypes.func,
  }

  render() {
    const {active, icon, label, onPress, activeTheme} = this.props
    const color = active ? `rgb(${activeTheme})` : 'rgb(153, 157, 175)'
    return (
      <TouchableOpacity onPress={() => onPress()} style={[styles.container,{borderColor: color}]}>
        {React.cloneElement(icon, {color})}
        <Text style={[styles.label, {color}]}>{label}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginLeft: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 100
  },
  label: {
    fontSize: 12,
    paddingHorizontal: 2
  }
})
