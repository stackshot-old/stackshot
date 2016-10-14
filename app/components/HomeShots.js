import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

import fetch from 'axios';

const width = Dimensions.get('window').width;

export default class HomeShots extends Component {
  constructor() {
    super();

    this.state = {
      list: []
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch.get('https://gist.githubusercontent.com/egoist/703a7691cbaabb6349707ef51497764b/raw/b033d130300dca2ead3179d6144e3dfc0bcf7692/fake.json');
      this.setState({
        list: res.data
      });
    } catch (err) {
      console.log(err.stack);
    }
  }

  render() {
    console.log(this.state.list)
    const Loading = <Text>加载中...</Text>;

    const List = this.state.list.map((item, index) => (
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
    ));

    return (
      <ScrollView>
        {this.state.list.length === 0 ? Loading : List}
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
