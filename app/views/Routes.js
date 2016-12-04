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
import {Home, User, ShotDetail, Message, Found, SignInAndSignUp, Theme, Search, Profiles, Setting} from '../views'
import {SliderScreen, StatusBar, SearchModal, CommentModal} from '../components'
import {handleActionChange, startConnect, onNewShot, connectSuccess, connectFailed, disConnect} from '../actions'
import {API_ROOT} from '../middleware/api'
import io from "socket.io-client/socket.io"

window.navigator.userAgent = 'react-native'



@connect(
  state => {
    const {
      auth:{ user },
      comment:{isComment},
      shot: {isShot},
      search: {isSearch}
    } = state
    return {
      isComment,
      isSearch,
      isShot,
      user
    }
  },
  dispatch => bindActionCreators({handleActionChange, startConnect, onNewShot, connectSuccess, connectFailed, disConnect},dispatch)
)
export default class Routes extends Component {

  componentWillMount = async () => {
    this.socket = io(`${API_ROOT}`,{transports: ['websocket'], jsonp: false})
    const user = await this.initAuthUser()
    if(user){
      this.socket.emit('channel', {uid: user.id})
    }
    await this.initTheme()
    await this.connectWebScoket()
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
		BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid)
	}

  initAuthUser = async() => {
    const {handleActionChange} = this.props
    const user = await AsyncStorage.getItem('user')
    if(user) {
      handleActionChange('auth',{user: JSON.parse(user)})
      return JSON.parse(user)
    }
  }

  connectWebScoket = () => {
    const {onNewShot, startConnect, connectSuccess, connectFailed, disConnect} = this.props
  	this.socket.connect()
  	this.socket.on('new-shot', (data) => {
  		onNewShot(data)
  	})
    this.socket.on('connect', () => {
      connectSuccess()
    })
    this.socket.on('error',(err) => {
      connectFailed(err)
    })
    this.socket.on('connect_error',(err) => {
      connectFailed(err)
    })
    this.socket.on('disconnect',() => {
      disConnect()
    })
    this.socket.on('message', (data)=> {
      alert(data)
    })

  }

  initTheme = async () => {
    const {handleActionChange} = this.props
    const theme = await AsyncStorage.getItem('storeTheme')
    if(theme) {
      const {baseColor, themeColor} = JSON.parse(theme)
      handleActionChange('theme',{themeColor, baseColor})
    }
  }

  onBackAndroid = () => {
    const {isComment, isShot, isSearch, handleActionChange} = this.props
    if(isComment){
      handleActionChange('comment', {isComment: false})
      return true
    }
    if(isShot) {
      handleActionChange('shot', {isShot: false})
      return true
    }
    if(isSearch) {
      handleActionChange('search', {isSearch: false})
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
        case 'signup':
          return <SignInAndSignUp {...route.params}/>
        case 'user':
          return <User {...route.params}/>
        case 'shot':
          return <ShotDetail {...route.params}/>
        case 'message':
          return <Message {...route.params}/>
        case 'found':
          return <Found {...route.params}/>
        case 'theme':
          return <Theme {...route.params}/>
        case 'search':
          return <Search {...route.params}/>
        case 'profiles':
          return <Profiles {...route.params}/>
        case 'setting':
          return <Setting {...route.params}/>
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
        <SearchModal/>
        <CommentModal />
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
