import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  View,
  Text,
  Navigator,
  UIManager,
  BackAndroid,
  ToastAndroid,
  AsyncStorage,
  DrawerLayoutAndroid
} from 'react-native';

// views
import {Home, Signin, User, ShotDetail, Message, Found, Signup} from '../views'
import {SliderScreen, StatusBar} from '../components'
import {handleActionChange, connectWebScoket} from '../actions'
import {API_ROOT} from '../middleware/api'

@connect(
  state => {
    const {
      auth:{ user },
      comment:{isComment},
      shot: {isShot}
    } = state
    return {
      isComment,
      isShot,
      user
    }
  },
  dispatch => bindActionCreators({handleActionChange, connectWebScoket},dispatch)
)
export default class Routes extends Component {

  componentWillMount() {
    this.initAuthUser()
    this.props.connectWebScoket()
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
		BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid)
	}

  initAuthUser = async() => {
    const {handleActionChange} = this.props
    const user = await AsyncStorage.getItem('user')
    if(user) {
      handleActionChange('auth',{user: JSON.parse(user)})
    }
  }

  onBackAndroid = () => {
    const {isComment, isShot, handleActionChange} = this.props
    if(isComment){
      handleActionChange('comment', {isComment: false})
      return true
    }
    if(isShot) {
      handleActionChange('shot', {isShot: false})
      return true
    }


    if(this.navigator){
      const navigator = this.navigator
      const routes = navigator ? navigator.getCurrentRoutes() : []

      if (routes.length > 1) {
        navigator.pop()
        return true
      } else if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        // 最近2秒内按过back键，可以退出应用。
        return false
      }

      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
      this.lastBackPressed = Date.now()

      return true
    }
  }

  renderScene = (route, navigator) => {
    if (route.name) {
      switch (route.name) {
        case 'home' :
          return <Home {...route.params} />
        case 'signin':
          return <Signin {...route.params}/>
        case 'signup':
          return <Signup {...route.params}/>
        case 'user':
          return <User {...route.params}/>
        case 'shot':
          return <ShotDetail {...route.params}/>
        case 'message':
          return <Message {...route.params}/>
        case 'found':
         return <Found {...route.params}/>
        default:
          return <View />;
      }
    }
    return <View />;
  }


  checkAuth = () => {
    const {user} = this.props
    if(!Object.keys(user).length > 0) {
      this.drawer.closeDrawer()
      this.navigator.push({
        name: 'signin'
      })
      return
    }
    return true
  }


  render() {
    return (
      <Provider context={{app: this}}>
        <StatusBar/>
        <DrawerLayoutAndroid
          ref={drawer=> {this.drawer = drawer}}
          drawerWidth={260}
          drawerPosition={DrawerLayoutAndroid.positions.left}
          renderNavigationView={() => <SliderScreen/>}>
          <Navigator
            ref={navigator => {this.navigator = navigator}} // eslint-disable-line
            renderScene={this.renderScene}
            configureScene={() => Navigator.SceneConfigs.FadeAndroid}
            initialRoute={{
              name: 'home'
            }} />
        </DrawerLayoutAndroid>
      </Provider>
    );
  }
}


class Provider extends Component {

  constructor(props, context) {
    super(props, context)
    this.ContextType = {}
    this.Context = {}
  }

  getChildContext = () => {
    Provider.childContextTypes = this.ContextType
    return this.Context
  }

  componentWillMount = () => {
    const {context}  = this.props
    Object.keys(context).map(o=> {
      if(typeof context[o] === 'object'){
        this.Context[o] = context[o]
        this.ContextType[o] = PropTypes.object
      }
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.children}
      </View>
    )
  }
}
