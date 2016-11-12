import React, {PropTypes, Component} from 'react';
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

import {obj2query} from '../utils'
import Icon from 'react-native-vector-icons/MaterialIcons';

import { FloatButton, Modal, LazyList} from '../components';
import {handleActionChange, getSearchs, resetSearch, toggleSearch} from '../actions'

const screen = Dimensions.get('window')

@connect(
  state => {
    const {
      entities:{shots},
      pagination: { allsearchs },
      theme: {activeTheme},
      search: {isSearch, content}
    } = state
    const query = obj2query({
      content: content
    })
    const searchPagination = allsearchs[query] || { ids: [] }
    const relatedShot  = searchPagination.ids.map(id => shots[id]);
    const {isFetching} = searchPagination
    return {
      relatedShot,
      activeTheme,
      isFetching,
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
    const {getSearchs, query} = this.props
    const result = await getSearchs({query})
  }

  navigateToSearch = () => {
    const {query, content} = this.props
    const {navigator} = this.context.app
    this.handleToggle()
    navigator.push({
      name: 'search',
      params:{
        query,
        content
      }
    })
  }

  render() {
    const {activeTheme, content, isSearch, isFetching, handleActionChange, relatedShot} = this.props

    return (
      <Modal isopen={isSearch}>
        <View style={styles.container}>
          <View style={{marginTop: 20, paddingHorizontal: 10, marginHorizontal: 10,height: 50, borderRadius: 5, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <TextInput onChangeText={(text) => {handleActionChange('search',{content: text})}} style={{flex: 1, color: 'rgb(114,122,126)'}} underlineColorAndroid={'transparent'} autoFocus={true}/>
            <Icon onPress={() => this.handleSearch()} name="search" color={`rgb(${activeTheme})`} size={25} style={styles.Search}/>
          </View>
          <LazyList
            limit={3}
            show={isFetching === false ? true : false}
            showEmpty={true}
            datas={relatedShot}
            loadMore={() => { return (<View style={{ flex: 1, alignItems: 'center', paddingVertical: 10, justifyContent: 'center'}}><Text onPress={()=> this.navigateToSearch()} style={{color: 'rgb(197,198,204)'}}>更多图槽</Text></View>)}}
            style={{flex: 0 , justifyContent: 'space-between', marginTop: 10, backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 20, marginHorizontal: 10, borderRadius: 5, }}>
            <Item match={content} activeTheme={activeTheme} onPress={this.handleToggle}/>
          </LazyList>
        </View>
      </Modal>
    );
  }
}

const Item = (props, context) => {
  const {match, activeTheme, onPress} = props
  const {app:{navigator}} = context
  const {content, id, images} = props.item
  const index = content.indexOf(match)
  if(index > 0){
    return (
      <TouchableOpacity style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
          onPress()
          navigator.push({ name: 'shot', params:{id}})}}>
        <Text style={{flex: 1, color: 'rgb(114,122,126)'}}>
          {content.substring(0, index)}
          <Text style={{color: `rgb(${activeTheme})` }}>{content.substring(index, index + match.length)}</Text>
          {content.substring(index+ match.length, 20)}
          {content.length > 20 && '...'}
        </Text>
        { images.length > 0 && <Image source={{uri: images[0].url}} style={{width: 80, height: 50, borderRadius: 4,}} resizeMode="cover"/> }
      </TouchableOpacity>
    )
  }
  return(
    <View style={{ paddingVertical: 10 }}>
      <Text style={{flex: 1, color: 'rgb(114,122,126)'}}>{content.substring(0,20)} {content.length > 20 && '...'}</Text>
    </View>
  )
}
Item.contextTypes = {
  app: PropTypes.object.isRequired,
}

const styles = {
  container: {
    flex: 1,
  }
}
