import React, {Component} from 'react';
import {
  View,
  Text,
  ListView,
  Dimensions,
  ScrollView,
} from 'react-native';
import InteractionManager from 'InteractionManager'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getShots} from '../actions'

import {obj2query} from '../utils'
import {List, Card} from '../components'

@connect(
  state => {
    const {
      pagination: { allshots },
      entities: {shots},
      theme: {activeTheme}
    } = state

    const query = obj2query({
      limit: 5
    })
    const postsPagination = allshots[query] || { ids: [] }
    const relatedShot  = postsPagination.ids.map(id => shots[id]);

    return {
      activeTheme,
      relatedShot,
      query
    }
  },
  dispatch => bindActionCreators({getShots}, dispatch)
)
export default class HomeShots extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const {getShots,query} = this.props
    getShots({query})
  }

  onEndReached = () => {
    const {getShots, query} = this.props
    InteractionManager.runAfterInteractions(() => {
      getShots({query, next: true})
    })
  }

  render() {
    const {relatedShot, activeTheme} = this.props
    const Loading = ({text}) => <Text>{text}</Text>
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    let dataSource = ds.cloneWithRows(relatedShot)
    return (
      <View style={{flex: 1}}>
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          onEndReachedThreshold={30}
          contentContainerStyle={{paddingHorizontal: 10, paddingTop: 10}}
          onEndReached={()=> this.onEndReached()}
          renderRow={item => <Card item={item} activeTheme={activeTheme}/>}
          />
      </View>
    )
  }
}
