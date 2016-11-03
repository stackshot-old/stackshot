import React, {PropTypes, Component} from 'react'
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  ToastAndroid,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {Avatar} from '../components'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {logout} from '../actions'

@connect(
  state => {
    const {
      auth: {user},
      theme: {activeTheme}
    } = state
    return {
      activeTheme,
      user
    }
  },
  dispatch => bindActionCreators({logout}, dispatch)
)
export default class SliderScreen extends Component {
  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  handleSelected = (index) => {
    const {navigator, drawer} = this.context.app
    this.setState({ activeIndex: index })
    switch (index) {
      case 0:
        navigator.push({name: 'home'})
        break
      case 2:
        navigator.push({name: 'theme'})
        break
      default:
        return
    }
    drawer.closeDrawer()
  }

  handlePressAvatar = () => {
    const {checkAuth, navigator, drawer} = this.context.app
    if(checkAuth()){
      drawer.closeDrawer()
      navigator.push({
        name: 'user'
      })
    }
  }

  handleLogOut = () => {
    const {checkAuth, navigator} = this.context.app
    if(checkAuth()){
      Alert.alert(null,'乃确定不是点错了?％＊?@＃¥',[
        {text: '点错了', onPress: () => {}},
        {text: '退出', onPress: ()=> this.logOut()}
      ])
    } else {
      Alert.alert(null,'骚年你还没登录呢～～',[
        {text: 'ok', onPress:() => {}},
        {text: '注册', onPress: ()=> {navigator.push({name: 'signup'})}},
      ])
    }
  }

  logOut = async () => {
    const {logout} = this.props
    const result = await AsyncStorage.removeItem('user')
    if(result == null){
      logout()
      this.context.app.navigator.resetTo({name: 'home'})
      this.context.app.drawer.closeDrawer()
    }
  }

  render() {
    const {activeIndex} = this.state
    const {activeTheme, user} = this.props
    const {username, avatar} = user
    return (
      <ScrollView>
      <View style={styles.Container}>
        <View style={styles.SliderHD}>
          <TouchableOpacity onPress={() => this.handlePressAvatar()}>
            <Avatar source={{uri: avatar ? avatar : 'http://p1.bpimg.com/4851/e7e901c31ded46ed.jpg'}} size={100} style={{marginTop: 50}}/>
          </TouchableOpacity>
          <Text>{username ? username : 'Miku'}</Text>
        </View>
        <View style={styles.SliderMD}>
          <Item icon='favorite' text="我的图槽" handleSelected={this.handleSelected} activeIndex={activeIndex} index={0} activeTheme={activeTheme}/>
          <Item icon='person' text="资料设置" handleSelected={this.handleSelected} activeIndex={activeIndex} index={1} activeTheme={activeTheme}/>
          <Item icon='color-lens' text="主题切换" handleSelected={this.handleSelected} activeIndex={activeIndex} index={2} activeTheme={activeTheme}/>
          <Item icon='settings' text="系统设置" handleSelected={this.handleSelected} activeIndex={activeIndex} index={3} activeTheme={activeTheme}/>
          <Item icon='info' text="关于图槽" handleSelected={this.handleSelected} activeIndex={activeIndex} index={4} activeTheme={activeTheme}/>
        </View>
        <View style={styles.SliderFT}>
          <TouchableOpacity
            onPress={() => this.handleLogOut()}>
            <Text style={{color: `rgb(${activeTheme})`}}>登出</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
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
      <TouchableNativeFeedback
        delayPressIn={50}
        background={TouchableNativeFeedback.Ripple(`rgb(${activeTheme})`)}
        style={[styles.TouchItem]}
        onPress={() => this.onPress()}>
        <View style={[styles.ItemView,{backgroundColor: activeIndex === index ? `rgba(${activeTheme}, 0.1)` : 'transparent'}]}>
          <Icon name={icon} size={20} color={activeIndex === index ? `rgb(${activeTheme})` : 'rgb(151,176,200)'}/>
          <Text style={[styles.ItemText, { color: activeIndex === index ? `rgb(${activeTheme})` : 'rgb(151,176,200)'}]}>{text}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}




const styles = StyleSheet.create({
  Container:{
    flex: 1,
  },
  SliderHD:{
    flexDirection: 'column',
    alignItems: 'center'
  },
  SliderMD: {
    flexDirection: 'column',
    marginTop: 20
  },
  SliderFT:{
    padding: 15,
    flexDirection: 'column',
    marginTop: 150
  },
  TouchItem: {
    flex: 1,
		height: 45,
		justifyContent: "center"
  },
  ItemView:{
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  ItemText: {
    marginLeft: 10
  }
})
