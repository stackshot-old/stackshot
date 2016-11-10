import React, {PropTypes} from 'react'
import {
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native'

export default class LazyList extends React.Component {
  static propTypes = {
    datas: PropTypes.array.isRequired,
    loadmoreLabel: PropTypes.string,
    limit: PropTypes.number,
    children: PropTypes.node,
  }
  static defaultProps = {
    datas: [],
    limit: 3,
    showEmpty: false,
    loadmoreLabel: '更多评论'
  }

  constructor(props) {
    super(props)
    this.state = {
      page: 1,
    }
  }

  nextPage = () => {
    this.setState({page: ++this.state.page})
  }

  renderItem = () => {
    const {page} = this.state
    const {children, datas, limit} = this.props
    if(React.isValidElement(children)) {
      return datas.map((o,i) => {
        if(i < page * limit) {
          return React.cloneElement(children, {item: o, key: i})
        }
      })
    } else {
      throw new Error('children must be a valid Component')
    }
  }

  render() {
    const {page} = this.state
    const {datas, limit, loadMore, loadmoreLabel, showEmpty, style} = this.props
    const overCount = datas.length - limit * page
    const isEmpty = datas.length === 0


    if(showEmpty && isEmpty){
      if(this.props.onEmpty){return onEmpty}
      return (
        <View style={{flexDirection:'row', flex: 1, justifyContent: 'center'}}>
          <Text style={{color:"rgb(153, 157, 175)"}}>啊嘞，好像没有数据..</Text>
        </View>
      )
    }

    return (
      <View style={{...styles.container, ...style}}>
        {this.renderItem()}
        {overCount > 0 && ( loadMore ? loadMore({overCount, next: this.nextPage}) :
          <View stlye={{backgroundColor: this.props.style.backgroundColor}}>
            <Text style={{paddingVertical: 10, color:"rgb(153, 157, 175)", alignSelf: 'center'}} onPress={() => this.nextPage()}>{loadmoreLabel}({overCount})</Text>
          </View>)
        }
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
  },
}
