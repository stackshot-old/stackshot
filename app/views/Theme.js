import React, {PropTypes, Children} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  ListView,
  TouchableOpacity,
  LayoutAnimation,
  TouchableNativeFeedback
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {handleThemeChange} from '../actions'
import {List} from '../components'
import {genRgb} from '../utils'

const config = [
  {key:'night', color: '57,61,74', baseColor: '57,61,74', themeColor: '33,33,33'},
  {key:'pink', color: '250,119,134', baseColor: '255,255,255', themeColor: '250,119,134'},
  {key:'pink', color: '98,137,250', baseColor: '255,255,255', themeColor: '98,137,250'},
]

const screen = Dimensions.get('window')
@connect(
  state => {
    const {
      theme: { baseColor, themeColor}
    } = state
    return {
      baseColor,
      themeColor
    }
  },
  dispatch => bindActionCreators({handleThemeChange}, dispatch)
)
export default class Theme extends React.Component {
  static defaultProps = {
    config: config
  }
  constructor(props) {
    super(props)
    this.state = {
      select: 0,
    }
  }

  changeTheme(index){
    const {config} = this.props
    const {select} = this.state
    const {handleThemeChange} = this.props
    const {baseColor, themeColor} = config[select]

    handleThemeChange({baseColor, themeColor})
  }

  onScroll = (value) => {
    const select = Math.round(value)
    if(select >= 0 ){
      LayoutAnimation.configureNext( LayoutAnimation.create(200, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.scaleXY ) )
      this.setState({ select})
    }
  }

  render() {
    const {select} = this.state
    const {config} = this.props
    const [night, pink, blue] = config
    const {baseColor, themeColor} = this.props
    const selectColor = config[select]
    const isSelected = selectColor.color === themeColor

    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
          <SwiperView props={{ style: { flex: 1}}} containerWidth={ (screen.width - 80)} onScroll={(value) => this.onScroll(value)} select={select}>
            <Item theme={night} label='夜间模式'/>
            <Item theme={pink} label='少女粉'/>
            <Item theme={blue} label='沉稳蓝'/>
          </SwiperView>
        </View>
        <View style={{ position: 'relative', bottom: 0, width:screen.width, height: 150, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => this.changeTheme()}
            style={{backgroundColor: isSelected ? `rgba(${config[select].color}, 0.2)` : `rgb(${themeColor})`, width: 200, alignItems: 'center', paddingVertical: 20, borderRadius:50}}>
            <Text style={{color: isSelected ? `rgb(${selectColor.color})` : 'white' , fontSize: 20}}>应用</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


class SwiperView extends React.Component {
  static defaultProps = {
    containerWidth: Dimensions.get('window').width,
    initialPage: 0,
    onScroll: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      currentPage: {},
      scrollValue: new Animated.Value(this.props.initialPage)
    }
  }

  updateScrollValue = (value) => {
    this.state.scrollValue.setValue(value)
    this.props.onScroll(value)
  }


  render() {
    const {props, select} = this.props

    const children = Children.toArray(this.props.children)
    return (
      <ScrollView
        {...props}
        horizontal
        pagingEnable
        showsHorizontalScrollIndicator={false}
        ref={scrollView => {this.scrollView = scrollView}}
        onScroll={e => {
          const offsetX = e.nativeEvent.contentOffset.x
          this.updateScrollValue(offsetX / this.props.containerWidth)
        }}>
        {Children.map(children, (child, i) => {
          const isSelected = select === i
          return React.cloneElement(child, {isSelected})
        })}
      </ScrollView>
    )
  }
}


const Item = (props) => {
  const {theme, changeTheme,label, isSelected} = props
  const {color, baseColor, themeColor} = theme

  return (
    <View
      delayPressIn={50}
      style={[styles.TouchItem, {backgroundColor: `rgba(${color}, 1)`}, isSelected && { width: screen.width - 60, height: 420}]}>
      <View>
        <Text style={{ color: 'white', fontSize: 20}}>{label}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TouchItem: {
    flex: 1,
		height: 400,
    borderRadius: 20,
    width: screen.width - 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
		justifyContent: "center",
  },
  ItemText: {
    marginLeft: 10
  }
})
