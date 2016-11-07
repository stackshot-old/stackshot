import React, {PropTypes, Component} from 'react';
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

import {obj2query} from '../utils'
import Icon from 'react-native-vector-icons/MaterialIcons';

import { FloatButton, Modal, LazyList} from '../components';
import {handleActionChange, getSearchs, resetSearch, toggleSearch} from '../actions'

const screen = Dimensions.get('window')

@connect(
  state => {
    const {
      theme: {activeTheme},
      search: {isSearch, content}
    } = state
    const query = obj2query({
      content
    })

    return {
      activeTheme,
      isSearch,
      content,
      query,
    }
  },
  dispatch => bindActionCreators({handleActionChange, getSearchs, resetSearch, toggleSearch},dispatch)
)
export default class CommentModal extends Component {

  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  handleToggle = () => {
    const {toggleSearch} = this.props
    LayoutAnimation.configureNext( LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY ) )
    toggleSearch()
  }


  handleSearch = async () => {
    const {getSearchs} = this.props
    const result = await getSearchs()
    if(result.type === 'SEARCH_SUCCESS'){
        ToastAndroid.show('发送成功～～～～', ToastAndroid.SHORT)
        this.handleToggle()
        resetUpload()
      }
  }

  navigateToSearch = () => {
    const {query} = this.props
    const {navigator} = this.context.app
    this.handleToggle()
    navigator.push({
      name: 'search',
      params:{
        query
      }
    })
  }

  render() {
    const {activeTheme, content, isSearch, handleActionChange} = this.props
    return (
      <Modal isopen={isSearch}>
        <View style={styles.container}>
          <View style={{marginTop: 20, paddingHorizontal: 10, marginHorizontal: 10,height: 50, borderRadius: 5, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <TextInput onChangeText={(text) => handleActionChange('search',{content: text})} style={{flex: 1, color: 'rgb(114,122,126)'}} underlineColorAndroid={'transparent'} autoFocus={true}/>
            <Icon name="search" color={`rgb(${activeTheme})`} size={25} style={styles.Search}/>
          </View>
          <LazyList
            limit={3}
            datas={mock}
            showEmpty={true}
            loadMore={() => { return (<View style={{ flex: 1, alignItems: 'center', paddingVertical: 10, justifyContent: 'center'}}><Text onPress={()=> this.navigateToSearch()} style={{color: 'rgb(197,198,204)'}}>更多图槽</Text></View>)}}
            style={{marginTop: 10, backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 20, marginHorizontal: 10, borderRadius: 5, }}>
            <Item match={content} activeTheme={activeTheme}/>
          </LazyList>
        </View>
      </Modal>
    );
  }
}

const Item = (props) => {
  const {match, activeTheme} = props
  const {content} = props.item
  const index = content.indexOf(match)
  console.log(index, match.length)
  if(index > 0){
    return (
      <View style={{ paddingVertical: 10 }}>
        <Text style={{flex: 1, color: 'rgb(114,122,126)'}}>
          {content.substring(0, index)}
          <Text style={{color: `rgb(${activeTheme})` }}>{content.substring(index, index + match.length)}</Text>
          {content.substring(index+ match.length, 20)}
          {content.length > 20 && '...'}
        </Text>
      </View>
    )
  }
  return(
    <View style={{ paddingVertical: 10 }}>
      <Text style={{flex: 1, color: 'rgb(114,122,126)'}}>{content.substring(0,20)} {content.length > 20 && '...'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

let mock = [
  {content: '没有别的意思，我只是想看看最高可以打多少个字，'},
  {content: '前方高能'},
  {content: '弹幕护体'},
  {content: '记数菌已阵亡'},
  {content: '以上企业均已破产'}
]
