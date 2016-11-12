import React, {PropTypes} from 'react'
import {
  View,
  Text,
  ListView,
  StatusBar,
  Dimensions,
  ScrollView,
  StyleSheet,
  LayoutAnimation,
  InteractionManager
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
const screen = Dimensions.get('window')

import { LazyList, Card, CommentItem} from '../components';
import {handleActionChange, getComments} from '../actions'
import {obj2query} from '../utils'

@connect(
  (state, props) => {
    const {
      pagination: { allcomments },
      entities:{comments, shots},
      theme: {activeTheme},
    } = state
    const {id} = props
    const query = obj2query({
      shot: id
    })
    const commentsPagination = allcomments[query] || { ids: [] }
    const relatedComments  = commentsPagination.ids.map(id => comments[id]);
    const {isFetching} = commentsPagination

    return {
      relatedComments,
      isFetching,
      activeTheme,
      shot: shots[id],
      query,
      id,
    }
  },
  dispatch => bindActionCreators({handleActionChange, getComments},dispatch)
)
export default class Message extends React.Component {

  static contextTypes = {
    app: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {getComments,query} = this.props
    getComments({query})
  }

  onEndReached = () => {
    const {getComments, query} = this.props
    InteractionManager.runAfterInteractions(() => {
      getComments({query, next: true})
    })
  }

  render() {
    const {relatedComments, activeTheme, content, shot} = this.props
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    let dataSource = ds.cloneWithRows(relatedComments)
    return (
      <View style={{flex: 1}}>
          <View style={{position: 'absolute', height: 300, width:screen.width, backgroundColor: `rgb(${activeTheme})`}}></View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10,}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="arrow-back" color="white" size={25} style={{marginHorizontal:10}} onPress={() => {this.context.app.navigator.pop()}}/><Text style={{color: 'white'}}></Text>
            </View>
            <Icon name="search" color="white" size={25} style={{marginHorizontal:10}}/>
          </View>
        <View style={{flex: 1, marginHorizontal: 10, marginTop: 10}}>
          <ScrollView style={{elevation: 20, backgroundColor:'rgb(242,244,252)'}} showsVerticalScrollIndicator={false}>
            <ListView
              renderHeader={() => <Card style={{elevation: 0}} item={shot} activeTheme={activeTheme} showList={false} stopNavigator={true}/>}
              dataSource={dataSource}
              showsVerticalScrollIndicator={false}
              enableEmptySections={true}
              onEndReachedThreshold={30}
              contentContainerStyle={{backgroundColor:'rgb(242,244,252)', elevation: 10, paddingBottom: 20}}
              onEndReached={()=> this.onEndReached()}
              renderRow={item => <CommentItem item={item}/>}/>
          </ScrollView>
        </View>
        <StatusBar backgroundColor={`rgb(${activeTheme})`} animated={true}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
