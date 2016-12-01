import React, {PropTypes, Children} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native'

export default class SwiperView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: 0
    }
  }

  static defaultProps = {
    containerWidth: Dimensions.get('window').width,
    containerOffset: 100,
  }

  onSwiper = (e) => {
    const {containerWidth, containerOffset} = this.props
    const offsetX = e.contentOffset.x
    const contentWidth = e.layoutMeasurement.width - containerOffset
    const select = Math.round(offsetX / (containerWidth - containerOffset))
    this.props.onScroll(select)
    if(select !== this.state.select) {
      this.setState({select})
      this.scrollView.scrollTo({x: contentWidth * select , animated: true})
    }
  }


  render() {
    const {props, containerWidth, containerOffset} = this.props

    const children = Children.toArray(this.props.children)
    return (
      <ScrollView
        {...props}
        horizontal
        pagingEnable
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const offsetX = e.nativeEvent
          this.onSwiper(e.nativeEvent)
        }}
        ref={scrollView => {this.scrollView = scrollView}}>
        <View style={{width: containerOffset / 2 }}></View>
        {Children.map(children, (child, i) => {
          return React.cloneElement(child, {isSelected: i === this.state.select, offsetX: containerOffset})
        })}
        <View style={{width: containerOffset / 2}}></View>
      </ScrollView>
    )
  }
}
