import React, {PropTypes} from 'react'
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'
import {API_ROOT} from '../middleware/api'

import {updateProfiles} from '../actions'
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
  dispatch => bindActionCreators({updateProfiles}, dispatch)
)
export default class Profiles extends React.Component {
  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isChangeAvatar: false,
      avatar: ''
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
      this.setState({ avatar: `http://${image.url}`, isChangeAvatar: true})
    }
  }

  SaveAndUpdate = async () => {
    const {avatar, username, gender, website, signature} = this.state
    const {updateProfiles} = this.props
    const result = await updateProfiles({avatar, username, gender, website, signature})
    if(result.type === 'UPDATE_PROFILES_SUCCESS'){
      await AsyncStorage.setItem('user', JSON.stringify(result.response.entities.users[result.response.result]))
    }
  }

  render() {
    const {isChangeAvatar} = this.state
    const { themeColor, user} = this.props
    const {avatar, username, gender, date, website, signature} = user
    return (
      <View style={{backgroundColor: 'rgb(230,234,244)', flex: 1}}>
        <StatusBar backgroundColor={`rgb(${themeColor})`} animated={true}/>
          <View style={{position: 'absolute', height: 50, width:screen.width, backgroundColor: `rgb(${themeColor})`}}></View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10,}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="arrow-back" color="white" size={25} style={{marginHorizontal:10}} onPress={() => {this.context.app.navigator.pop()}}/>
              <Text style={{color: 'white'}}>资料设置</Text>
            </View>
            <TouchableOpacity onPress={() => this.SaveAndUpdate()}>
              <Text style={{color: 'white', marginHorizontal: 10}}>保存</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginHorizontal: 10, marginTop: 10}}>
            <Ul>
              <Li style={{height: 80}} onPress={() => this.handleUpLoadAvatar()}>
                <Text style={{color: 'rgb(174,173,183)'}}>头像设置</Text>
                {
                  isChangeAvatar ?
                  <Avatar source={{uri: this.state.avatar}} size={30}/> :
                  <Avatar source={{uri: avatar}} size={30}/>
                }
              </Li>
              <Li style={{borderBottomWidth: 0}}>
                <Text style={{color: 'rgb(174,173,183)'}}>昵称</Text>
                <Text>{username}</Text>
              </Li>
            </Ul>
            <Ul>
              <Li>
                <Text style={{color: 'rgb(174,173,183)'}}>性别</Text>
                <Text>{gender || '不知道'}</Text>
              </Li>
              <Li>
                <Text style={{color: 'rgb(174,173,183)'}}>星座</Text>
                <Text>{date || '不知道'}</Text>
              </Li>
              <Li>
                <Text style={{color: 'rgb(174,173,183)'}}>个人网站</Text>
                <Text>{website || '不知道'}</Text>
              </Li>
              <Li>
                <Text style={{color: 'rgb(174,173,183)'}}>个人签名</Text>
                <Text>{signature || '不知道'}</Text>
              </Li>
            </Ul>
          </View>
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
