import React, {PropTypes, Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

export default class Avatar extends Component {
  static propTypes = {
    size: PropTypes.number,
    source: PropTypes.object
  }

  static defaultProps = {
    size: 60,
    mode: 'contain'
  }

  handlePress = () => {
    const {checkAuth} = this.context.app
    checkAuth()
  }

  render() {
    const {source, size, mode, style} = this.props
    let Size = {
      width: size,
      height: size,
    }
    return (
      <Image source={source} style={[styles.image, Size, style]} resizeMode={mode}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  image: {
    borderRadius: 100
  }
})
