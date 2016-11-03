import React, {PropTypes} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableNativeFeedback
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {handleThemeChange} from '../actions'
import {List} from '../components'
import {genRgb} from '../utils'

@connect(
  state => ({}),
  dispatch => bindActionCreators({handleThemeChange}, dispatch)
)
export default class Theme extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      queue: [
      '244, 67, 54','233, 30, 99',
      '156, 39, 176','63, 81, 181',
      '33, 150, 243','3, 169, 244',
      '0, 188, 212','0, 150, 136',
      '139, 195, 74','205, 220, 57',
      '255, 235, 59','255, 193, 7',
      '255, 152, 0','255, 87, 34',
      '121, 85, 72', '158, 158, 158',
      '96, 125, 139', '96, 125, 139']
    }
  }

  changeTheme(value){
    const {handleThemeChange} = this.props
    handleThemeChange(value)
  }

  loadColor = (time, arr = []) => {
    const {queue} = this.state
    for(let i = 0; i < time; i++){
      arr.push(genRgb())
    }
    this.setState({
      queue: [...queue, ...arr]
    })
  }


  render() {
    const {queue} = this.state
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    let dataSource = ds.cloneWithRows(queue)
    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          onEndReached={()=> this.loadColor(10)}
          renderRow={color => <Item color={color} changeTheme={(color) => this.changeTheme(color)}/>}
          />
      </View>
    )
  }
}

const Item = (props) => {
  const {color, changeTheme} = props
  return (
    <TouchableNativeFeedback
      delayPressIn={50}
      background={TouchableNativeFeedback.Ripple(`rgb(${color})`)}
      style={[styles.TouchItem]}
      onPress={() => changeTheme(color)}>
      <View style={[styles.ItemView,{backgroundColor: `rgba(${color}, 1)`}]}>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TouchItem: {
    flex: 1,
		height: 45,
		justifyContent: "center"
  },
  ItemView:{
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  ItemText: {
    marginLeft: 10
  }
})
