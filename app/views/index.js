import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
  View,
  Text,
  Navigator
} from 'react-native';

// views
import Home from './Home';

@connect(
  state => ({})
)
export default class Routes extends Component {
  renderScene = (route, navigator) => {
    if (route.name) {
      switch (route.name) {
        case 'home' :
          return <Home navigator={navigator} {...route.param} />;
        default:
          return <View />;
      }
    }
    return <View />;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator
          ref={navigator => {this.navigator = navigator;}} // eslint-disable-line
          renderScene={this.renderScene}
          configureScene={this.renderConfigure}
          initialRoute={{
            name: 'home'
          }} />
      </View>
    );
  }
}
