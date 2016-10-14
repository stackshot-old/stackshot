import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

// Components
import HomeShots from '../components/HomeShots';

const styles = StyleSheet.create({
  toolbar: {
    height: 55,
    backgroundColor: '#f25d8e',
    justifyContent: 'center',
  }
});

export default class Home extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Icon.ToolbarAndroid
          navIconName="menu"
          // onActionSelected={() => this.handleSearch()}
          actions={[
            {title: 'search', iconName: 'search', show: 'always'}
          ]}
          title="图槽"
          titleColor="#fff"
          style={styles.toolbar}
          />
          <HomeShots />
      </View>
    );
  }
}
