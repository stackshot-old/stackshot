import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView
} from 'react-native';
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
      limit: 10
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
    getShots(query)
  }

  render() {
    const {relatedShot, activeTheme} = this.props
    const Loading = ({text}) => <Text>{text}</Text>

    return (
      <ScrollView>
        <List data={relatedShot}>
          <Card activeTheme={activeTheme}/>
        </List>
      </ScrollView>
    )
  }
}
