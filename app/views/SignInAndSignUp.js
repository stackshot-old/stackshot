import React, {PropTypes} from 'react'
import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  AsyncStorage,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {signin, signup} from '../actions'
import Icon from 'react-native-vector-icons/MaterialIcons';
const screen = Dimensions.get('window')

@connect(
  state => {
    const {
      theme: {themeColor},
    } = state
    return {
      themeColor
    }
  },
  dispatch => bindActionCreators({signin}, dispatch)
)
export default class MyComponent extends React.Component {
  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      status: 'signin'
    }
  }

  componentWillMount(){
    const {status} = this.props
    if(status){
      this.setState({status})
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.status !== this.props.status){
      this.setState({
        status: nextProps.status
      })
    }
  }

  setStatus = (value) => {
    this.setState({
      status: value
    })
  }

  render() {
    const {status} = this.state
    const {themeColor} = this.props
    LayoutAnimation.configureNext( LayoutAnimation.create(300, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY ) )
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={`rgb(${themeColor})`} animated={true}/>
        <View style={{position: 'absolute', height: 200, width:screen.width, backgroundColor: `rgb(${themeColor})`}}></View>
        <View>
          <SwitchCase>
          {() => {
            switch (status) {
              case 'signup-2':
                return (
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 30}}>
                    <Text style={{color: 'white' , marginHorizontal: 10, fontSize: 17}}>注册·第二步</Text>
                  </View>
                )
              default:
                return (
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 30}}>
                      <TouchableOpacity onPress={() => { this.context.app.navigator.replace({ name: 'signin'})}}>
                        <Text style={{color: status === 'signin' ? 'white' : 'rgba(255,255,255, 0.6)', marginHorizontal: 10, fontSize: 17}}>登录</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { this.context.app.navigator.replace({ name: 'signup', params:{status:'signup-1'}})}}>
                        <Text style={{color: status === 'signup-1' ? 'white' : 'rgba(255,255,255, 0.6)', marginHorizontal: 10, fontSize: 17}}>注册</Text>
                      </TouchableOpacity>
                  </View>
                )
              }
            }
          }
          </SwitchCase>
        </View>
        <View>
          <SwitchCase>
            {() => {
                switch (status) {
                  case 'signin':
                    return <SignIn status={status} />
                  case 'signup-2':
                  case 'signup-1':
                    return <SignUp status={status} setStatus={this.setStatus}/>
                  default:
                    return <View></View>
                }
              }
            }
          </SwitchCase>
        </View>
        <View style={{ width: screen.width, position: 'absolute', bottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{ fontSize: 10, color: 'rgb(153, 157, 175)'}}>©2016图槽委员会</Text>
        </View>
      </View>
    )
  }
}

const SwitchCase = (props) => {
  const {children} = props
  if(typeof children === 'function'){
    return (
      children()
    )
  }
}


@connect(
  state => {
    const {
      theme: {themeColor},
    } = state
    return {
      themeColor
    }
  },
  dispatch => bindActionCreators({signin}, dispatch)
)
export class SignIn extends React.Component {
  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      password: ''
    }
  }

  handleSignIn = async (data) => {
    const {navigator} = this.context.app
    const {signin} = this.props
    const result = await signin(data)
    if(result.type === "SIGNIN_SUCCESS"){
      const {response:{entities:{users}, result:{user, token}}} = result
      const me = users[user]
      const saved = await AsyncStorage.setItem('user', JSON.stringify({...me, token}))
      if(!saved){
        navigator.resetTo({
          name: 'home'
        })
        ToastAndroid.show('登录成功',ToastAndroid.SHORT)
      }
    }else {
      ToastAndroid.show('登录失败，请稍后再试试～', ToastAndroid.SHORT)
    }
  }

  render() {
    const {account, password} = this.state
    const {themeColor} = this.props
    const inputStyle= (value) => {
      if(value) {
        return {
          borderWidth: 1,
          borderColor: `rgb(${themeColor})`
        }
      }else {
        return {
          backgroundColor: 'rgb(241,243,250)'
        }
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 10}}>
            <Text style={{fontSize: 18}}>登录图槽</Text>
          </View>
          <TextInput
            style={[{borderRadius: 100, lineHeight: 10, paddingHorizontal: 20, marginVertical: 10}, inputStyle(account.length > 0)]}
            onChangeText={(text)=> {this.setState({ account: text})} } placeholder={"用户名或者邮箱"} underlineColorAndroid={'transparent'}/>
          <TextInput
            style={[{borderRadius: 100, paddingHorizontal: 20, marginVertical: 10}, inputStyle(password.length > 0)]}
            onChangeText={(text)=> {this.setState({ password: text})}} placeholder={"密码"} secureTextEntry={true} underlineColorAndroid={'transparent'} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 10, alignItems: 'center'}}>
            <TouchableOpacity onPress={()=> {alert('啊！被发现了。其实这个功能还有没有写orz，')}} >
              <Text style={{color: `rgb(${themeColor})`}}>忘记密码</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.handleSignIn({account, password})} disabled={(!account && !password)}>
              <Icon name="arrow-forward" color={ (account && password ) ? `rgb(${themeColor})` : 'rgb(241,243,250)'}  size={30} style={{marginHorizontal:10}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

@connect(
  state => {
    const {
      theme: {themeColor},
    } = state
    return {
      themeColor
    }
  },
  dispatch => bindActionCreators({signup}, dispatch)
)
export class SignUp extends React.Component {
  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      verifyPassword: '',
    }
  }

  handleSignUp = async () => {
    const {navigator} = this.context.app
    const {signup} = this.props
    const {password, verifyPassword, email, username} = this.state
    if(password !== verifyPassword){
      alert('两次输入的密码不匹配哟～')
      return
    }

    const result = await signup({password, email, username})
    if(result.type === "SIGNUP_SUCCESS"){
      const {response:{entities:{users}, result:{user, token}}} = result
      const me = users[user]
      const saved = await AsyncStorage.setItem('user', JSON.stringify({...me, token}))
      if(!saved){
        navigator.resetTo({
          name: 'home'
        })
        ToastAndroid.show('注册成功',ToastAndroid.SHORT)
      }
    }
    if(result.type === "SIGNIN_FAILURE"){
      const {details:[error]} = result
      const {message} = error

      ToastAndroid.show(message,ToastAndroid.SHORT)
    }
  }

  render() {
    const {username, password, email, verifyPassword} = this.state
    const {themeColor, status, setStatus} = this.props

    const inputStyle= (value) => {
      if(value) {
        return {
          borderWidth: 1,
          borderColor: `rgb(${themeColor})`
        }
      }else {
        return {
          backgroundColor: 'rgb(241,243,250)'
        }
      }
    }
    if(status === 'signup-1'){
      return (
        <View style={styles.container}>
          <View style={styles.body}>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 10}}>
              <Text style={{fontSize: 18}}>注册图槽</Text>
            </View>
            <TextInput
              value={username}
              style={[{borderRadius: 100, lineHeight: 10, paddingHorizontal: 20, marginVertical: 10}, inputStyle(username.length > 0)]}
              onChangeText={(text)=> {this.setState({ username: text})} } placeholder={"请输入用户名"} underlineColorAndroid={'transparent'}/>
            <TextInput
              value={email}
              style={[{borderRadius: 100, paddingHorizontal: 20, marginVertical: 10}, inputStyle(email.length > 0)]}
              onChangeText={(text)=> {this.setState({ email: text})}} placeholder={"请输入邮箱"} underlineColorAndroid={'transparent'} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 10, alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> {alert('啊！被发现了。其实这个功能还有没有写orz，')}} >
                <Text style={{color: `rgb(${themeColor})`}}>《用户协议》</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> setStatus('signup-2')} disabled={(!email && !username)}>
                <Icon name="arrow-forward" color={ (username && email ) ? `rgb(${themeColor})` : 'rgb(241,243,250)'}  size={30} style={{marginHorizontal:10}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
    if(status === 'signup-2'){
      return (
        <View style={styles.container}>
          <View style={styles.body}>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 10}}>
              <Text style={{fontSize: 18}}>大功即将告成</Text>
            </View>
            <TextInput
              value={password}
              style={[{borderRadius: 100, lineHeight: 10, paddingHorizontal: 20, marginVertical: 10}, inputStyle(password.length > 0)]}
              onChangeText={(text)=> {this.setState({ password: text})} } placeholder={"请输入密码"} secureTextEntry={true} underlineColorAndroid={'transparent'}/>
            <TextInput
              value={verifyPassword}
              style={[{borderRadius: 100, paddingHorizontal: 20, marginVertical: 10}, inputStyle(verifyPassword.length > 0)]}
              onChangeText={(text)=> {this.setState({ verifyPassword: text})}} placeholder={"请再次输入密码"} secureTextEntry={true} underlineColorAndroid={'transparent'} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 10, alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> setStatus('signup-1') }>
                <Text style={{color: `rgb(${themeColor})`}}>上一步</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.handleSignUp()} disabled={(!password && !verifyPassword)}>
                <Icon name="arrow-forward" color={ (password && verifyPassword ) ? `rgb(${themeColor})` : 'rgb(241,243,250)'}  size={30} style={{marginHorizontal:10}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 5,
    borderRadius: 4
  },
  body: {
    flex: 1,
  }
})
