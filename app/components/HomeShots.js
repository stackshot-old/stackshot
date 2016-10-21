import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {loadGithubList} from '../actions'

import fetch from 'axios';

const width = Dimensions.get('window').width;

@connect(
  state => {
    const {
      pagination: { allimages },
      entities: {images}
    } = state
    const query = 'egoist/703a7691cbaabb6349707ef51497764b/raw/b033d130300dca2ead3179d6144e3dfc0bcf7692/fake.json'
    const postsPagination = allimages[query] || { ids: [] }
    const relatedImage  = postsPagination.ids.map(id => images[id]);

    return {
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
    // try {
    //   const res = await fetch.get('https://gist.githubusercontent.com/egoist/703a7691cbaabb6349707ef51497764b/raw/b033d130300dca2ead3179d6144e3dfc0bcf7692/fake.json');
    //   this.setState({
    //     list: res.data
    //   });
    // } catch (err) {
    //   console.log(err.stack);
    // }
  }

  render() {
    const {relatedImage} = this.props

    const Loading = ({text}) => <Text>{text}</Text>
    const List = ({images}) => (
      <View style={styles.list}>
        {images.map((item, index) =>
        <View style={styles.card} key={index}>
          <View style={styles.cardHeader}>
            <Image source={{uri: item.uper.avatar}} style={styles.avatar} />
            <Text>{item.uper.name}</Text>
          </View>
          <Image
            source={{uri: item.image}}
            style={{width, height: width / (item.width / item.height) }}
          />
        </View>
        )}
      </View>
    )
    return (
      <ScrollView>
        {relatedImage.length > 0 ? <List images={relatedImage}/> : <Loading text={'图片加载中...'}/> }
      </ScrollView>
    )
  }
}

const styles = {
  card: {
    flex: 1,
    marginBottom: 10
  },
  cardHeader: {
    height: 40,
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row'
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 33,
    marginRight: 5
  }
}
