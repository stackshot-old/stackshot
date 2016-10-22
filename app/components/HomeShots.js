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
import {loadGithubList} from '../actions'

import {List, Card} from '../components'

@connect(
  state => {
    const {
      pagination: { allimages },
      entities: {images},
      theme: {activeTheme}
    } = state
    const query = 'egoist/703a7691cbaabb6349707ef51497764b/raw/b033d130300dca2ead3179d6144e3dfc0bcf7692/fake.json'
    const postsPagination = allimages[query] || { ids: [] }
    const relatedImage  = postsPagination.ids.map(id => images[id]);

    return {
      activeTheme,
      relatedImage,
      query
    }
  },
  dispatch => bindActionCreators({loadGithubList}, dispatch)
)
export default class HomeShots extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const {loadGithubList,query} = this.props
    loadGithubList(query)
  }

  render() {
    const {relatedImage, activeTheme} = this.props

    const Loading = ({text}) => <Text>{text}</Text>

    return (
      <ScrollView>
        <List data={relatedImage}>
          <Card activeTheme={activeTheme}/>
        </List>
      </ScrollView>
    )
  }
}
