import React, {PropTypes,Component } from 'react'
import {
  Alert,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  LayoutAnimation,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {Button, Avatar, List, LazyList, TimeAgo} from '../components'
import {handleActionChange, like} from '../actions'

@connect(
  (state, props) => {
    const {
      entities: {users, comments},
      theme: {activeTheme}
    } = state
    const {item, item:{user, images}} = props
    return {
      user: users[user],
      activeTheme,
      image: images[0],
      comments,
      item
    }
  },
  dispatch => bindActionCreators({handleActionChange, like}, dispatch)
)
export default class Card extends Component {

  constructor(props) {
    super(props)
  }

  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  static defaultProps = {
    showList: true
  }

  CommentOnShot = () => {
    const {handleActionChange, item:{id}} = this.props
    LayoutAnimation.configureNext( LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY ) )
    handleActionChange('comment',{ isComment: true, shot: id})
  }

  CommentOnUser = (user) => {
    const {handleActionChange, item:{id}} = this.props
    LayoutAnimation.configureNext( LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY ) )
    handleActionChange('comment',{ isComment: true, shot: id, replyTo: user.id, placeholder: `@${user.username}`})
  }

  handleLike = async() => {
    const {item:{liked, id}, like} = this.props
    const result = await like({id, liked})
  }

  handlePressAvatar = () => {
    const {navigator} = this.context.app
    navigator.push({
      name: 'user'
    })
  }

  handlePressShot = () => {
    if(this.props.stopNavigator){
      return
    }
    const {item: {id}} = this.props
    const {navigator} = this.context.app
    navigator.push({
      name: 'shot',
      params: {
        id
      }
    })
  }

  render() {
    const {user, activeTheme, image, item, comments, showList} = this.props
    const {content, latestComment, likesCount, liked, commentsCount, createdAt} = item

    const latestCommentData = latestComment.map(id => comments[id])

    const { username, avatar } = user
    let ScreenWidth = Dimensions.get('window').width
    let imgWidth = ScreenWidth - 20

    return (
      <View style={[styles.card, this.props.style]}>
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
          <View style={styles.cardMDHD}>
            <Text numberOfLines={4}>{content}</Text>
          </View>
          <View style={styles.cardMDMD}>
            <TouchableOpacity onPress={()=> this.handlePressAvatar()} style={{ flexDirection: 'row', justifyContent: 'center'}}>
              <Avatar source={{uri: avatar}} style={styles.avatar} size={35}/>
              <Text style={[{color: `rgb(${activeTheme})`}]}>{username}</Text>
            </TouchableOpacity>
            <View style={styles.cardMDMDRG}>
              <Button active={liked} icon={<Icon name="favorite"/>} label="点赞" onPress={() => this.handleLike()}/>
              <Button active={commentsCount > 0} icon={<Icon name="mode-comment"/>} label="评论" onPress={() => this.CommentOnShot()}/>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="favorite" size={8} color="white" style={{ borderRadius: 10, padding: 2, marginRight:4,  backgroundColor: 'rgb(153, 157, 175)',}}/>
                <Text style={[{fontSize: 12,color: 'rgb(153, 157, 175)'}]}>{likesCount}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                <Icon name="remove-red-eye" size={8} color="white" style={{ borderRadius: 10, padding: 2, marginRight:4,  backgroundColor: 'rgb(153, 157, 175)',}}/>
                <Text style={[{fontSize: 12,color: 'rgb(153, 157, 175)'}]}>
                  {commentsCount}
                </Text>
              </View>
            </View>
            <TimeAgo time={createdAt} language="zh" style={{fontSize: 12, color: 'rgb(153, 157, 175)'}}/>
          </View>
        </View>
        {showList &&
          <View stlye={styles.cardFT}>
          <LazyList
            datas={latestCommentData}
            limit={3}
            style={{backgroundColor:'rgb(242,244,252)', paddingHorizontal: 10}}>
            <CommentItem CommentOnUser={(user) => this.CommentOnUser(user)} activeTheme={activeTheme}/>
          </LazyList>
        </View>}
      </View>
    )
  }
}

const CommentItem = (props) => {
  const {CommentOnUser, activeTheme} = props
  const {content, user, replyTo} = props.item || {}
  const {username, avatar, id} = user || {}
  return (
    <View style={{flexDirection: 'row', flex: 1, paddingVertical: 10, alignItems: 'center', height: 50}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Avatar source={{uri: avatar}} size={25}/>
        <Text style={{color: `rgb(${activeTheme})`, fontSize: 14}}>{username}</Text>
      </View>
      <TouchableOpacity style={{flexDirection: 'row', flex: 1, marginLeft: 5}} onPress={() => CommentOnUser(user)}>
        <View>
          <Text style={{fontSize: 14}}>{replyTo && `@${replyTo.username}`}:{content}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 4,
    elevation: 5
  },
  avatar: {
    borderRadius: 100,
    marginRight: 5
  },
  cardMD: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardMDHD: {
    flex: 1,
    paddingVertical: 20
  },
  cardMDMD: {
    flex: 1,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40
  },
  cardMDMDRG: {
    flexDirection: 'row'
  },
  cardFT: {

  }
})
