import React, {PropTypes,Component } from 'react'
import {
  Alert,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {Button, Avatar} from '../components'
import {handleActionChange} from '../actions'

@connect(
  (state, props) => {
    const {
      entities: {users},
      theme: {activeTheme}
    } = state
    const {item:{user, images}} = props
    return {
      user: users[user],
      activeTheme,
      image: images[0]
    }
  },
  dispatch => bindActionCreators({handleActionChange}, dispatch)
)
export default class Card extends Component {

  constructor(props) {
    super(props)
  }

  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  handleComment(){
    const {handleActionChange} = this.props
    LayoutAnimation.configureNext( LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY ) )
    handleActionChange('comment',{ isComment: true})
  }

  handlePressAvatar(){
    const {navigator} = this.context.app
    navigator.push({
      name: 'user'
    })
  }

  handlePressShot(){
    const {navigator} = this.context.app
    navigator.push({
      name: 'shot'
    })
  }

  render() {
    const {user, activeTheme, image} = this.props
    const { username, avatar } = user
    let ScreenWidth = Dimensions.get('window').width
    let imgWidth = ScreenWidth - 20

    return (
      <View style={styles.card}>
        {image &&
          <TouchableWithoutFeedback onPress={() => this.handlePressShot()}>
              <Image
                source={{uri: image.url}}
                style={{width: imgWidth, height: ScreenWidth / (image.width / image.height), borderTopLeftRadius: 4, borderTopRightRadius:4}}
                resizeMode="cover"
              />
          </TouchableWithoutFeedback>
        }
      <View style={styles.cardMD}>
        <TouchableOpacity onPress={()=> this.handlePressAvatar()}>
          <Avatar source={{uri: avatar}} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.cardRG}>
          <View style={styles.cardRGHD}>
            <Text style={[{color: `rgb(${activeTheme})`}]}>{username}</Text>
            <Text style={[{fontSize: 12, color: 'rgb(153, 157, 175)'}]}>刚刚</Text>
            </View>
          <View style={styles.cardRGMD}>
            <Text numberOfLines={4}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
          </View>
          <View style={styles.cardRGFT}>
            <Text style={[{fontSize: 12,color: 'rgb(153, 157, 175)'}]}>0人点赞</Text>
            <View style={styles.cardRGFTRG}>
              <Button icon={<Icon name="favorite"/>} label="点赞" onPress={() => {Alert.alert('点赞')}}/>
              <Button active={true} icon={<Icon name="mode-comment"/>} label="评论" onPress={::this.handleComment}/>
            </View>
          </View>
        </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 4,
    elevation: 10
  },
  cardMD: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 100,
    marginRight: 5
  },
  cardRG: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardRGHD: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between'
  },
  cardRGMD: {
    flex: 9
  },
  cardRGFT: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardRGFTRG: {
    flexDirection: 'row'
  }
})
