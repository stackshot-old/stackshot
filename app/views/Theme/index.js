import React, {PropTypes, Children} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  ListView,
  PanResponder,
  TouchableOpacity,
  LayoutAnimation,
  TouchableNativeFeedback
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {handleThemeChange} from '../../actions'
import {SwiperView} from '../../components'

const config = [
  {key:'night', img: require("./night.png"), color: '57,61,74', baseColor: '57,61,74', themeColor: '33,33,33'},
  {key:'pink', img: require("./pink.png"), color: '250,119,134', baseColor: '255,255,255', themeColor: '250,119,134'},
  {key:'blue', img: require("./blue.png"), color: '98,137,250', baseColor: '255,255,255', themeColor: '98,137,250'},
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

  onScroll = (select) => {
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
          <SwiperView props={{ style: { flex: 1}}} onScroll={(value) => this.onScroll(value)} >
            <Item theme={night} select={select}/>
            <Item theme={pink} select={select}/>
            <Item theme={blue} select={select}/>
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


const Item = (props) => {
  const {theme, changeTheme,name, index, offsetX, isSelected} = props
  const {color, baseColor, themeColor, img} = theme

  const baesStyle={ width: screen.width - offsetX}
  const activeStyle = { width: screen.width - offsetX - 40}

  return (
    <View style={[styles.TouchItem, baesStyle]}>
      <Image source={img} resizeMode='contain' style={{width: isSelected ? screen.width - ( offsetX / 2) - 30  : screen.width - ( offsetX / 2) - 60}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TouchItem: {
    flex: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ItemText: {
    marginLeft: 10
  }
})
