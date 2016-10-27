import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-crop-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import {API_ROOT} from '../middleware/api'
// Components
import { FloatButton, Modal} from '../components'
import {handleActionChange, upLoadShot} from '../actions'

const screen = Dimensions.get('window')

@connect(
  state => {
    const {
      auth:{user},
      theme: {activeTheme},
      shot: {isShot}
    } = state
    return {
      activeTheme,
      isShot,
      user
    }
  },
  dispatch => bindActionCreators({handleActionChange, upLoadShot},dispatch)
)
export default class ShotModal extends Component {

  handleToggle(){
    const {handleActionChange, isShot} = this.props
    LayoutAnimation.configureNext( LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY ) )
    handleActionChange('shot', {isShot: !isShot})
  }

  handleSend(){
    alert('sending.....')
  }

  async handleUpLoad(){
    const {user:{token}, upLoadShot} = this.props
    const image = await ImagePicker.openPicker({
      width: 1600,
      height: 900,
      cropping: true,
    })
    const {path, mime} = image
    const upload = await RNFetchBlob.fetch('PUT', `${API_ROOT}/media/upload_image`, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },[{ name:'image', filename: 'image.png',type: mime, data: RNFetchBlob.wrap(path)}])
    .uploadProgress({ interval : 250 }, (written, total) => {

    })
    console.log(upload)
  }

  render() {
    const {activeTheme, isShot} = this.props
    return (
      <Modal isopen={isShot} onBackPress={() => this.handleBackPress()}>
        <View style={{marginTop: 60, marginHorizontal: 10}}>
          <View style={{backgroundColor: `rgb(${activeTheme})`, minHeight: 200, borderTopLeftRadius: 4, borderTopRightRadius:4, paddingHorizontal: 10, paddingVertical: 10}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={::this.handleToggle}>
                <Icon name="close" color={'white'} size={30}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={::this.handleSend}>
                <Icon name="send" color={'white'} size={30} style={{transform:[{rotate:"-35deg"}]}}/>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={::this.handleUpLoad}
                style={{borderWidth: 1, borderColor: 'white', borderRadius: 20, paddingVertical: 4, paddingHorizontal: 20}}>
                <Text style={{color: 'white'}}>上传</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{backgroundColor: `white`, borderBottomLeftRadius: 4, borderBottomRightRadius:4, paddingVertical: 5, paddingHorizontal: 10,}}>
            <TextInput placeholder={"图槽来一发～"} multiline={true} autoFocus={true} style={{lineHeight: 20}} textAlignVertical={'top'} numberOfLines={3} underlineColorAndroid={'transparent'}/>
          </View>
        </View>
      </Modal>
    );
  }
}
