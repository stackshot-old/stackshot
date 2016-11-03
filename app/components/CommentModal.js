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
  ToastAndroid,
  LayoutAnimation,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

// Components
import { FloatButton, Modal} from '../components';
import {handleActionChange, addComment, resetComment, toggleComment} from '../actions'

const screen = Dimensions.get('window')

@connect(
  state => {
    const {
      theme: {activeTheme},
      comment: {isComment, content, parent, replyTo, placeholder}
    } = state
    return {
      activeTheme,
      placeholder,
      isComment,
      content,
      replyTo,
      parent
    }
  },
  dispatch => bindActionCreators({handleActionChange, addComment, resetComment, toggleComment},dispatch)
)
export default class CommentModal extends Component {

  handleToggle(){
    const {handleActionChange, isComment, toggleComment} = this.props
    LayoutAnimation.configureNext( LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY ) )
    toggleComment()
  }

  handleSend = async() => {
    const {handleActionChange, resetComment} = this.props
    const result = await this.props.addComment()
    if(result.type="COMMENT_SUCCESS"){
      ToastAndroid.show('评论成功',ToastAndroid.SHORT)
      resetComment()
    }
  }

  render() {
    const {activeTheme, isComment, handleActionChange, placeholder} = this.props
    return (
      <Modal isopen={isComment}>
        <View style={{marginTop: 60, marginHorizontal: 10}}>
          <View style={{backgroundColor:'white' , minHeight: 10, borderTopLeftRadius: 4, borderTopRightRadius:4, paddingHorizontal: 10, paddingVertical: 10}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={::this.handleToggle}>
                <Icon name="close" color={`rgb(${activeTheme})`} size={30}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleSend()}>
                <Icon name="send" color={`rgb(${activeTheme})`} size={30} style={{transform:[{rotate:"-35deg"}]}}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{backgroundColor: `white`, minHeight: 200, borderBottomLeftRadius: 4, borderBottomRightRadius:4, paddingVertical: 5, paddingHorizontal: 10,}}>
            <TextInput onChangeText={(text) => handleActionChange('comment',{content: text})} placeholder={placeholder} multiline={true} autoFocus={true} style={{lineHeight: 20}} textAlignVertical={'top'} numberOfLines={3} underlineColorAndroid={'transparent'}/>
          </View>
        </View>
      </Modal>
    );
  }
}
