import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

// Components
import {HomeShots, StatusBar} from '../components';

const styles = StyleSheet.create({
  toolbar: {
    height: 55,
    justifyContent: 'center',
  }
});

@connect(
  state => {
    const {theme: {activeTheme}} = state
    return {
      activeTheme
    }
  }
)
export default class Home extends Component {
  render() {
    const {activeTheme} = this.props
    return (
      <View style={{flex: 1}}>
        <StatusBar/>
        <HomeShots />
      </View>
    );
  }
}
