import React, {PropTypes} from 'react'
import {
  View,
  Text,
  Image
} from 'react-native'
import {Avatar} from '../components'

export default class MyComponent extends React.Component {
  render() {
    const {item, themeColor} = this.props
    const {comments, shot} = item
    const {content, images} = shot
    const [image] = images
    const {url} = image
    return (
      <View style={{flexDirection: 'column', borderRadius: 4}}>
        <View style={{elevation: 4, borderTopRightRadius: 4, borderTopLeftRadius: 4, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 20, paddingHorizontal: 20, paddingVertical: 10 }}>
          { url && <Image source={{uri: url}} resizeMode="cover" style={{height: 50, width: 50, marginRight: 10}}/>}
          <Text>{content}</Text>
        </View>
        <View style={{ borderRadius: 4, elevation: 5, backgroundColor: 'white', marginHorizontal: 10, paddingHorizontal: 10}}>
          <CommentList comments={comments} themeColor={themeColor}/>
        </View>
      </View>
    )
  }
}

const CommentList = (props) => {
  const {comments, themeColor} = props
  if(comments && comments.length > 0){
    return (
      <View>
        {
          comments.map((o,i) => {
            const {user, content} = o
            return (
              <View key={i} style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
                <Avatar source={{uri: user.avatar}} size={30}/>

                <View style={{marginHorizontal: 10}}>
                  <Text style={{color: `rgb(${themeColor})`}}>{user.username}</Text>
                  <Text>{content}</Text>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  } else {
    return(
      <View></View>
    )
  }
}
