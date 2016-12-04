import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {
  Alert,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  ToastAndroid,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-crop-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import {API_ROOT} from '../middleware/api'
// Components
import { FloatButton, Modal} from '../components'
import {handleActionChange, addImage, addShot, resetUpload} from '../actions'

const screen = Dimensions.get('window')

@connect(
  state => {
    const {
      auth:{user},
      theme: {themeColor},
      shot: {isShot, images, content}
    } = state
    return {
      themeColor,
      isShot,
      images,
      content,
      user,
    }
  },
  dispatch => bindActionCreators({handleActionChange, addImage, addShot, resetUpload},dispatch)
)
export default class ShotModal extends Component {

  handleToggle = () => {
    const {handleActionChange, isShot} = this.props
    LayoutAnimation.configureNext( LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY ) )
    handleActionChange('shot', {isShot: !isShot})
  }

  handleSend = async() =>{
    const {addShot, images, resetUpload, content} = this.props
    if(content){
      const result = await addShot({images, content, type:'image'})
      if(result.type === 'ADD_SHOT_SUCCESS'){
        ToastAndroid.show('发送成功～～～～', ToastAndroid.SHORT)
        this.handleToggle()
        resetUpload()
      }
    }
    if(!content){
      ToastAndroid.show('请输入内容哟～ԅ(¯﹃¯ԅ)  ',ToastAndroid.SHORT)
    }
  }

  handleUpLoad = async() => {
    const {user:{token}, addImage, resetUpload, images} = this.props
    if(images.length > 0) {
      resetUpload()
    }
    const image = await ImagePicker.openPicker({
      width: 1600,
      height: 900,
      cropping: true,
    })
    const {path, mime, width, height} = image
    const upload = await RNFetchBlob.fetch('PUT', `${API_ROOT}/media/upload_image`, {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },[{ name:'image', filename: 'image.png',type: mime, data: RNFetchBlob.wrap(path)}])
    .then((res) => res.json())
    if(Array.isArray(upload)){
      upload.map(o=> {
        const url = o.url.includes('http://') ? o.url : `http://${o.url}`
        addImage({url: url, width: width, height: height})
      })
    }
  }

  render() {
    const {themeColor, isShot, images, handleActionChange} = this.props
    return (
      <Modal isopen={isShot}>
        <View style={{marginTop: 60, marginHorizontal: 10}}>
          <Uploader images={images} themeColor={themeColor} handleToggle={() => this.handleToggle()} handleUpLoad={() => this.handleUpLoad()} handleSend={() => this.handleSend()}/>
          <View style={{backgroundColor: `white`, borderBottomLeftRadius: 4, borderBottomRightRadius:4, paddingVertical: 5, paddingHorizontal: 10,}}>
            <TextInput onChangeText={(text) => handleActionChange('shot',{content: text})} placeholder={"图槽来一发～"} multiline={true} autoFocus={true} style={{lineHeight: 20}} textAlignVertical={'top'} numberOfLines={3} underlineColorAndroid={'transparent'}/>
          </View>
        </View>
      </Modal>
    )
  }
}

const Uploader = (props) => {
  const {images, themeColor, handleToggle, handleSend, handleUpLoad} = props
  console.log(images)
  if(images.length === 0){
    return(
      <View style={{backgroundColor: `rgb(${themeColor})`, minHeight: 200, borderTopLeftRadius: 4, borderTopRightRadius:4, paddingHorizontal: 10, paddingVertical: 10}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={handleToggle}>
            <Icon name="close" color={'white'} size={30}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {alert('请先上传图片哟～')}}>
            <Icon name="send" color={'white'} size={30} style={{transform:[{rotate:"-35deg"}]}}/>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleUpLoad}
            style={{borderWidth: 1, borderColor: 'white', borderRadius: 20, paddingVertical: 4, paddingHorizontal: 20}}>
            <Text style={{color: 'white'}}>上传</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }else {
    const [image] = images
    return (
      <View style={{minHeight: 200, borderTopLeftRadius: 4, borderTopRightRadius:4}}>
        <Image source={{uri: image.url}} style={{width: screen.width - 20, height: 200, left: 0, position: 'absolute', borderTopLeftRadius: 4, borderTopRightRadius:4 }} resizeMode="cover"/>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',width: screen.width- 20, paddingHorizontal: 10, paddingVertical: 10}}>
          <TouchableOpacity onPress={handleToggle} style={{ width:30, height: 30, borderRadius: 30}}>
            <Icon name="close" color={'white'} size={30}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUpLoad}
            style={{ borderWidth: 1, borderColor: 'white', borderRadius: 20, backgroundColor: 'transparent', paddingVertical: 4, paddingHorizontal: 20,height: 30, borderRadius: 100}}>
            <Text style={{color: 'white', backgroundColor: 'transparent',}}>重新上传</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSend} style={{ width:30, height: 30, borderRadius: 30}}>
            <Icon name="send" color={'white'} size={30} style={{transform:[{rotate:"-35deg"}]}}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
