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
import {signin} from '../actions'

@connect(
  state => ({}),
  dispatch => bindActionCreators({signin}, dispatch)
)
export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      password: ''
    }
  }


  handleSignIn = async (data) => {
    const {signin, navigator} = this.props
    const result = await signin(data)
    if(result.type === "SIGNIN_SUCCESS"){
      const {response:{entities:{users}, result:{user, token}}} = result
      const me = users[user]
      const saved = await AsyncStorage.multiSet([['user', JSON.stringify(me)], ['token', JSON.stringify(token)]])
      if(!saved){
        navigator.push({
          name: 'home'
        })
        ToastAndroid.show('登录成功',ToastAndroid.SHORT)
      }
    }
  }

  render() {
    const {account, password} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <TextInput onChangeText={(text)=> {this.setState({ account: text})} } placeholder={"你的用户名或者邮箱"}/>
          <TextInput onChangeText={(text)=> {this.setState({ password: text})}} placeholder={"你的密码"} secureTextEntry={true} />
          <TouchableOpacity onPress={()=> this.handleSignIn({account, password})} disabled={(!account && !password)}>
            <Text>登录</Text>
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
