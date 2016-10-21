import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
  View,
  Text,
  Navigator,
  DrawerLayoutAndroid
} from 'react-native';

// views
import Home from './Home';
import {SliderScreen} from '../components'

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
      <DrawerLayoutAndroid
        ref={drawer=> {this.drawer = drawer}}
        drawerWidth={260}
        drawerPosition={DrawerLayoutAndroid.positions.left}
        renderNavigationView={() => <SliderScreen navigator={this.navigator}/>}>
        <Navigator
          ref={navigator => {this.navigator = navigator;}} // eslint-disable-line
          renderScene={this.renderScene}
          configureScene={this.renderConfigure}
          initialRoute={{
            name: 'home'
          }} />
      </DrawerLayoutAndroid>
    );
  }
}
