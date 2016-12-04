import React, {PropTypes} from 'react'
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Avatar} from '../components'
const screen = Dimensions.get('window')


@connect(
  (state, props) => {
    const {
      theme: {themeColor},
      auth: {user},
    } = state
    return {
      themeColor,
      user
    }
  },
  dispatch => bindActionCreators({})
)
export default class Setting extends React.Component {
  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { themeColor, user} = this.props
    const {avatar, username, gender, date, website, signature} = user
    return (
      <View style={{backgroundColor: 'rgb(230,234,244)', flex: 1,}}>
        <StatusBar backgroundColor={`rgb(${themeColor})`} animated={true}/>
          <View style={{position: 'absolute', height: 50, width:screen.width, backgroundColor: `rgb(${themeColor})`}}></View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10,}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="arrow-back" color="white" size={25} style={{marginHorizontal:10}} onPress={() => {this.context.app.navigator.pop()}}/>
              <Text style={{color: 'white'}}>系统设置</Text>
            </View>
          </View>
          <View style={{marginHorizontal: 10, marginTop: 10}}>
            <Ul>
              <Li style={{borderBottomWidth: 0}} onPress={() => {alert('啊！被发现了。其实这个功能还有没有写orz，')}}>
                <Text style={{color: 'rgb(174,173,183)'}}>消息推送</Text>
                <Icon name="navigate-next" color="rgb(174,173,183)" size={20} />
              </Li>
            </Ul>
            <Ul>
              <Li style={{borderBottomWidth: 0}} onPress={() => {alert('啊！被发现了。其实这个功能还有没有写orz，')}}>
                <Text style={{color: 'rgb(174,173,183)'}}>昵称</Text>
                <Icon name="navigate-next" color="rgb(174,173,183)" size={20} />
              </Li>
            </Ul>
            <Ul>
              <Li onPress={() => {alert('啊！被发现了。其实这个功能还有没有写orz，')}}>
                <Text style={{color: 'rgb(174,173,183)'}}>黑名单</Text>
                <Icon name="navigate-next" color="rgb(174,173,183)" size={20} />
              </Li>
              <Li style={{borderBottomWidth: 0}} onPress={() => {alert('啊！被发现了。其实这个功能还有没有写orz，')}}>
                <Text style={{color: 'rgb(174,173,183)'}}>消除缓存</Text>
                <Text>124.3M</Text>
              </Li>
            </Ul>
          </View>
          <TouchableOpacity
            onPress={() => {alert('啊！被发现了。其实这个功能还有没有写orz，')}}
            style={{backgroundColor: `rgb(${themeColor})`, alignItems: 'center', paddingVertical: 15, borderRadius:50, position: 'absolute', bottom: 50, left: 10, width: screen.width - 20}}>
            <Text style={{color: 'white' , fontSize: 14}}>退出登陆</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const Ul = ({children, style}) => (
  <View style={[{marginVertical: 8, backgroundColor: 'white', elevation: 3, borderRadius: 2, paddingHorizontal: 10},style]}>
    {children}
  </View>
)

const Li = ({children, style, onPress}) => (
  <TouchableOpacity
    onPress={() => onPress && onPress()}
    style={[{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, height: 70, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgb(239,239,239)'}, style]}>
    {children}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
