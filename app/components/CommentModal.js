import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {handleActionChange} from '../actions'
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

import Icon from 'react-native-vector-icons/MaterialIcons';


// Components
import { FloatButton, Modal} from '../components';

const screen = Dimensions.get('window')

@connect(
  state => {
    const {
      theme: {activeTheme},
      comment: {isComment}
    } = state
    return {
      activeTheme,
      isComment
    }
  },
  dispatch => bindActionCreators({handleActionChange},dispatch)
)
export default class CommentModal extends Component {

  handleToggle(){
    const {handleActionChange, isComment} = this.props
    LayoutAnimation.configureNext( LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY ) )
    handleActionChange('comment', {isComment: !isComment})
  }

  handleSend(){
    alert('sending.....')
  }

  handleUpLoad(){
    alert('uploading....')
  }

  render() {
    const {activeTheme, isComment} = this.props
    return (
      <Modal isopen={isComment}>
        <View style={{marginTop: 60, marginHorizontal: 10}}>
          <View style={{backgroundColor:'white' , minHeight: 10, borderTopLeftRadius: 4, borderTopRightRadius:4, paddingHorizontal: 10, paddingVertical: 10}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={::this.handleToggle}>
                <Icon name="close" color={`rgb(${activeTheme})`} size={30}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={::this.handleSend}>
                <Icon name="send" color={`rgb(${activeTheme})`} size={30} style={{transform:[{rotate:"-35deg"}]}}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{backgroundColor: `white`, minHeight: 200, borderBottomLeftRadius: 4, borderBottomRightRadius:4, paddingVertical: 5, paddingHorizontal: 10,}}>
            <TextInput placeholder={"评论来一发～"} multiline={true} autoFocus={true} style={{lineHeight: 20}} textAlignVertical={'top'} numberOfLines={3} underlineColorAndroid={'transparent'}/>
          </View>
        </View>
      </Modal>
    );
  }
}
