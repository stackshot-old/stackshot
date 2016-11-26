import React, {PropTypes} from 'react'
import {
  View,
  Text,
  Image,
  ListView,
  StatusBar,
  Dimensions,
  StyleSheet,
  LayoutAnimation,
  InteractionManager
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
const screen = Dimensions.get('window')

import { LazyList, Card, Avatar, Constellation} from '../components';
import {handleActionChange, getShots} from '../actions'
import {obj2query} from '../utils'

@connect(
  (state, props) => {
    const {
      entities:{shots, users},
      pagination: { allshots },
      theme: {themeColor},
      auth: {user}
    } = state

    const {uid} = props
    const {username} = uid === user.id ? user : users[uid]

    const query = obj2query({ limit: 5})
    const baseUrl = `user/${username}/shots`
    const searchPagination = allshots[`${baseUrl}?${query}`] || { ids: [] }
    const relatedShot  = searchPagination.ids.map(id => shots[id])
    return {
      relatedShot,
      themeColor,
      baseUrl,
      query,
      user: uid === user.id ? user : users[uid]
    }
  },
  dispatch => bindActionCreators({handleActionChange, getShots},dispatch)
)
export default class Search extends React.Component {

  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  componentWillMount(){
    const {query, baseUrl, getShots} = this.props
    getShots({query, baseUrl})
  }

  onEndReached = () => {
    const {getShots, query, baseUrl} = this.props
    InteractionManager.runAfterInteractions(() => {
      getShots({query, baseUrl, next: true})
    })
  }

  render() {
    const {relatedShot, themeColor, content, user} = this.props
    const {username, signature, website, gender, birthday, avatar } = user
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    let dataSource = ds.cloneWithRows(relatedShot)
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={`rgb(${themeColor})`} animated={true}/>
        <View style={{position: 'absolute', height: 300, width:screen.width, backgroundColor: `rgb(${themeColor})`}}></View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10,}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="arrow-back" color="white" size={25} style={{marginHorizontal:10}} onPress={() => {this.context.app.navigator.pop()}}/><Text style={{color: 'white'}}>个人详情</Text>
          </View>
          <Icon name="more-vert" color="white" size={25} style={{marginHorizontal:10}}/>
        </View>
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          onEndReachedThreshold={30}
          renderHeader={() =>
            <View style={{height: 300, flexDirection: 'column', borderRadius: 4, alignItems: 'center', backgroundColor: 'white', elevation: 5, marginVertical: 10}}>
              <View style={{position: 'absolute', flex: 1, height: 150, backgroundColor: 'transparent'}}>
                <Image
                  source={{uri: avatar}}
                  style={{opacity: 0.8, width: screen.width -20, height: 150, borderTopLeftRadius: 4, borderTopRightRadius:4}}
                  resizeMode="cover" />
              </View>
              <Avatar source={{uri: avatar}} style={{marginVertical: 25}} size={100}/>
              <View style={{ flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 24, marginVertical: 5}}>{username}</Text>
                <Text style={{color: 'rgb(177,175,194)', marginVertical: 5}}>{signature}</Text>
                <Text style={{color: 'rgb(177,175,194)'}}>{gender}，<Constellation language="zh" date={birthday} /></Text>
                <Text style={{marginVertical: 10, color: 'rgb(174,173,183)'}}>{website}</Text>
              </View>
            </View>
          }
          contentContainerStyle={{paddingHorizontal: 10}}
          onEndReached={()=> this.onEndReached()}
          renderRow={item => <Card item={item} themeColor={themeColor}/>}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
