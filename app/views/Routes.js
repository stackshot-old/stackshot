import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {handleActionChange} from '../actions'
import {
  View,
  Text,
  Navigator,
  UIManager,
  BackAndroid,
  ToastAndroid,
  DrawerLayoutAndroid
} from 'react-native';

// views
import {Home, Login, User, ShotDetail, Message, Found} from '../views'
import {SliderScreen, StatusBar} from '../components'

@connect(
  state => {
    const {
      comment:{isComment},
      shot: {isShot}
    } = state
    return {
      isComment,
      isShot
    }
  },
  dispatch => bindActionCreators({handleActionChange},dispatch)
)
export default class Routes extends Component {

  componentWillMount() {
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
		BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid)
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
          return <Home {...route.params} />;
        case 'login':
          return <Login {...route.params}/>
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
    this.navigator.push({
      name: 'login'
    })
  }


  render() {
    return (
      <Provider context={{app: this}}>
        <StatusBar/>
        <DrawerLayoutAndroid
          ref={drawer=> {this.drawer = drawer}}
          drawerWidth={260}
          drawerPosition={DrawerLayoutAndroid.positions.left}
          renderNavigationView={() => <SliderScreen navigator={this.navigator}/>}>
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
