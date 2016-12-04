import React, {PropTypes} from 'react'
import {
  View,
  Text,
  Picker,
  TextInput,
  StatusBar,
  Dimensions,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  AsyncStorage,
  TouchableOpacity,
  DatePickerAndroid
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'
import {API_ROOT} from '../middleware/api'

import {updateProfiles} from '../actions'
import {Avatar, Constellation} from '../components'

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
  dispatch => bindActionCreators({updateProfiles}, dispatch)
)
export default class Profiles extends React.Component {
  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      avatar: null,
      gender: null,
      birthday: null,
      website: null,
      signature: null
    }
  }

  handleUpLoadAvatar = async() => {
    const {user:{token}} = this.props

    const images = await ImagePicker.openPicker({
      width: 900,
      height: 900,
      cropping: true,
    })

    const {path, mime, width, height} = images
    const upload = await RNFetchBlob.fetch('PUT', `${API_ROOT}/media/upload_image`, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },[{ name:'image', filename: 'image.png',type: mime, data: RNFetchBlob.wrap(path)}])
    .then((res) => res.json())
    if(Array.isArray(upload)){
      const [image] = upload
      this.setState({ avatar: `http://${image.url}`})
    }
  }

  saveAndUpdate = async () => {
    const {avatar, gender, website, signature, birthday} = this.state
    const {updateProfiles, user:{token}} = this.props
    const result = await updateProfiles({avatar, gender, website, signature, birthday})
    if(result.type === 'UPDATE_PROFILES_SUCCESS'){
      ToastAndroid.show('修改成功',ToastAndroid.SHORT)
      const {response:{ result:{user}, entities:{ users } }} = result
      const me = users[user]
      await AsyncStorage.setItem('user', JSON.stringify({...me, token}))
    }
  }

  setDate = async() => {
    const {action, year, month, day} = await DatePickerAndroid.open({

      date: new Date(this.props.user.date || Date.now() - 630720000000)
    })

    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({ birthday: new Date(Date.parse(`${year}/${month + 1}/${day}`)).toISOString() })
    }
  }

  render() {
    const {isChangeAvatar} = this.state
    const { themeColor, user} = this.props
    const {avatar, username, gender, birthday, website, signature} = user

    return (
      <ScrollView style={{backgroundColor: 'rgb(230,234,244)', flex: 1}}>
        <StatusBar backgroundColor={`rgb(${themeColor})`} animated={true}/>
          <View style={{position: 'absolute', height: 50, width:screen.width, backgroundColor: `rgb(${themeColor})`}}></View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10,}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="arrow-back" color="white" size={25} style={{marginHorizontal:10}} onPress={() => {this.context.app.navigator.pop()}}/>
              <Text style={{color: 'white'}}>资料设置</Text>
            </View>
            <TouchableOpacity onPress={() => this.saveAndUpdate()}>
              <Text style={{color: 'white', marginHorizontal: 10}}>保存</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginHorizontal: 10, marginTop: 10}}>
            <Ul>
              <TouchableOpacity style={[styles.paper, {height: 80}]} onPress={() => this.handleUpLoadAvatar()}>
                <Text style={{color: 'rgb(174,173,183)'}}>头像设置</Text>
                  <Avatar source={{uri: this.state.avatar || avatar}} size={30}/>
              </TouchableOpacity>
              <View style={[styles.paper, {borderBottomWidth: 0}]}>
                <Text style={{color: 'rgb(174,173,183)'}}>昵称</Text>
                <Text>{username}</Text>
              </View>
            </Ul>
            <Ul>
              <View style={styles.paper}>
                <Text style={{color: 'rgb(174,173,183)'}}>性别</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>{this.state.gender || gender || '不知道'}</Text>
                  <Picker
                    mode="dropdown"
                    style={{width: 50}}
                    selectedValue={this.state.gender || gender || '不知道'}
                    onValueChange={value => this.setState({gender: value})}>
                    <Picker.Item label="男" value="男" />
                    <Picker.Item label="不知道" value="不知道" />
                    <Picker.Item label="女" value="女" />
                  </Picker>
                </View>
              </View>
              <TouchableOpacity style={styles.paper} onPress={() => this.setDate()}>
                <Text style={{color: 'rgb(174,173,183)'}}>星座</Text>
                <Constellation language="zh" date={this.state.birthday || birthday} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.paper]}>
                <Text style={{color: 'rgb(174,173,183)'}}>个人网站</Text>
                <TextInput
                  onChangeText={website => this.setState({website})}
                  style={{flex: 1,textAlign: 'right', color: 'rgba(0,0,0,.5)'}} underlineColorAndroid='transparent'>{website || '不知道'}</TextInput>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paper}>
                <Text style={{color: 'rgb(174,173,183)'}}>个人签名</Text>
                <TextInput
                  onChangeText={signature => this.setState({signature})}
                  style={{flex: 1,textAlign: 'right', color: 'rgba(0,0,0,.5)'}} underlineColorAndroid='transparent'>{signature || '不知道'}</TextInput>
              </TouchableOpacity>
            </Ul>
          </View>
      </ScrollView>
    )
  }
}


const Ul = ({children, style}) => (
  <View style={[{marginVertical: 8, backgroundColor: 'white', elevation: 3, borderRadius: 2, paddingHorizontal: 10},style]}>
    {children}
  </View>
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, height: 70, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgb(239,239,239)'
  }
})
