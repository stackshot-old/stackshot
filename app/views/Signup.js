import React, {PropTypes} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ToastAndroid,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {signup} from '../actions'

@connect(
  state => ({}),
  dispatch => bindActionCreators({signup}, dispatch)
)
export default class Signup extends React.Component {
  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }

  handleSignIn = async (data) => {
    const {navigator} = this.context.app
    const {signup} = this.props
    const result = await signup(data)
    if(result.type === "SIGNIN_SUCCESS"){
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
    const {username, password, email} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <TextInput onChangeText={(text)=> {this.setState({ email: text})} } placeholder={"你的邮箱"}/>
          <TextInput onChangeText={(text)=> {this.setState({ username: text})} } placeholder={"你的用户名"}/>
          <TextInput onChangeText={(text)=> {this.setState({ password: text})}} placeholder={"你的密码"} secureTextEntry={true} />
          <TouchableOpacity onPress={()=> this.handleSignIn({username, password, email})} disabled={(!username && !password && !email)}>
            <Text>提交</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    flex: 1,
  }
})
