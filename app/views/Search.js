import React, {PropTypes} from 'react'
import {
  View,
  Text,
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

import { LazyList, Card} from '../components';
import {handleActionChange, getSearchs, resetSearch, toggleSearch} from '../actions'
import {obj2query} from '../utils'

@connect(
  (state, props) => {
    const {
      entities:{shots},
      pagination: { allsearchs },
      theme: {themeColor},
      search: {isSearch}
    } = state
    const {query, content} = props
    const searchPagination = allsearchs[query] || { ids: [] }
    const relatedShot  = searchPagination.ids.map(id => shots[id]);
    return {
      relatedShot,
      themeColor,
      isSearch,
      content,
      query,
    }
  },
  dispatch => bindActionCreators({handleActionChange, getSearchs, resetSearch, toggleSearch},dispatch)
)
export default class Search extends React.Component {

  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  onEndReached = () => {
    const {getSearchs, query} = this.props
    InteractionManager.runAfterInteractions(() => {
      getSearchs({query, next: true})
    })
  }

  handleSearch = () => {
    const {toggleSearch} = this.props
    LayoutAnimation.configureNext( LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY ) )
    toggleSearch()
  }

  render() {
    const {relatedShot, themeColor, content} = this.props
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
            <Icon name="arrow-back" color="white" size={25} style={{marginHorizontal:10}} onPress={() => {this.context.app.navigator.pop()}}/><Text style={{color: 'white'}}>{` “${content}” 的搜索结果`}</Text>
          </View>
          <Icon name="search" color="white" size={25} style={{marginHorizontal:10}} onPress={() => this.handleSearch()}/>
        </View>
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          onEndReachedThreshold={30}
          contentContainerStyle={{paddingHorizontal: 10, paddingTop: 10}}
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
