import React, {PropTypes} from 'react'
import {
  Image,
  View,
  StyleSheet,
} from 'react-native'

export default class List extends React.Component {
  constructor(props) {
    super(props)
  }

  renderItem = () => {
    const {children, data} = this.props
    if(React.isValidElement(children)) {
      return data.map((o,i) => {
        return React.cloneElement(children, {item: o, key: i})
      })
    } else {
      throw new Error('children must be a valid Component')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          {this.renderItem()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(220,224,234)',
    alignItems: 'center'
  },
  list:{
    flexDirection: 'column',
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
  }
})
