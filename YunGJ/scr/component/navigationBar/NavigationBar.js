/**
 * Created by guangqiang on 2018/9/5.
 */
import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Theme from '../../public/Theme'
import Icon from '../icon/BusiIcon'
const barBtnWidth = 40
const defaultNavigationBarProps = {
  hiddenNav: false,
  hiddenLeftItem: false,
  hiddenRightItem: false,
}

/**
 * NavigationBar 配置项
 * @type {{navigationBarProps: (*), onLeftPress: *, onRightPress: *, hiddenNav: (*), navBarStyle, navContentStyle, hiddenLeftItem: (*), leftIcon, leftTitle, leftTitleStyle, leftItemStyle, titleStyle, title, subTitleStyle, subTitle, hiddenRightItem: (*), rightIcon, rightTitle, rightTitleStyle, rightItemStyle}}
 */
const navBarConfig = {
  navigationBarProps: PropTypes.Object,
  onLeftPress: PropTypes.fun,
  onRightPress: PropTypes.fun,
  hiddenNav: PropTypes.bool,
  navBarStyle: PropTypes.Object,
  navContentStyle: PropTypes.Object,
  hiddenLeftItem: PropTypes.bool,
  leftIcon: PropTypes.Object,
  leftTitle: PropTypes.string,
  leftTitleStyle: PropTypes.Object,
  leftItemStyle: PropTypes.Object,
  titleStyle: PropTypes.Object,
  title: PropTypes.string,
  subTitleStyle: PropTypes.Object,
  subTitle: PropTypes.string,
  hiddenRightItem: PropTypes.bool,
  rightIcon: PropTypes.Object,
  rightTitle: PropTypes.string,
  rightTitleStyle: PropTypes.Object,
  rightItemStyle: PropTypes.Object
}

export default class NavigationBar extends Component {

  constructor(props) {
    super(props)
    this.navigationBarProps = Object.assign({}, defaultNavigationBarProps, props.navigationBarProps)
  }

  componentWillReceiveProps(nextProps) {
    this.navigationBarProps = Object.assign({}, defaultNavigationBarProps, nextProps.navigationBarProps)
  }

  renderLeftItem() {
    let tempComponent
    if (this.navigationBarProps.hiddenLeftItem) {
      return <View style={{width: barBtnWidth}}/>
    }
    const {onLeftPress} = this.props
    if (this.navigationBarProps.leftIcon) {
      let icon = this.navigationBarProps.leftIcon
      tempComponent = (
        <Icon name={`arrow-left|${icon.name}`} size={icon.size} color={icon.color}/>
      )
    } else if (this.navigationBarProps.leftTitle && this.navigationBarProps.leftTitle !== '') {
      tempComponent = (
        <Text numberOfLines={1} style={[styles.leftTitleStyle, this.navigationBarProps.leftTitleStyle]}>{this.navigationBarProps.leftTitle}</Text>
      )
    } else {
      tempComponent = (
        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
          <Icon name={'arrow-left'} size={25} color={Theme.whiteColor}/>
          <Text style={{fontSize:17,color:'white'}}>返回</Text>
        </View>
        
      )
    }
    return (
      <TouchableOpacity
        style={[styles.leftItemStyle, this.navigationBarProps.leftItemStyle]}
        onPress={onLeftPress}>
        {tempComponent}
      </TouchableOpacity>
    )
  }

  renderTitle() {
    return (
      <View style={[styles.titleContainer]}>
        <Text style={[styles.titleStyle, this.navigationBarProps.titleStyle]}>{this.navigationBarProps.title}</Text>
        {
          this.navigationBarProps.subTitle ? <Text style={[styles.subTitleStyle, this.navigationBarProps.subTitleStyle]}>{this.navigationBarProps.subTitle}</Text> : null
        }
      </View>
    )
  }

  renderRightItem() {
    let tempComponent
    if (this.navigationBarProps.hiddenRightItem) {
      return <View style={{width: barBtnWidth}}/>
    }
    const {onRightPress} = this.props
    if (this.navigationBarProps.rightIcon) {
      let icon = this.navigationBarProps.rightIcon
      tempComponent = (
        <Icon name={`chevron-left|${icon.name}`} size={icon.size} color={icon.color}/>
      )
    } else if (this.navigationBarProps.rightTitle && this.navigationBarProps.rightTitle !== '') {
      tempComponent = (
        <Text numberOfLines={1} style={[styles.rightTitleStyle, this.navigationBarProps.rightTitleStyle]}>{this.navigationBarProps.rightTitle}</Text>
      )
    } else {
      tempComponent = (
        <View style={{width: barBtnWidth}}/>
      )
    }
    return (
      <TouchableOpacity
        style={[styles.rightItemStyle, this.navigationBarProps.rightItemStyle]}
        onPress={onRightPress}>
        {tempComponent}
      </TouchableOpacity>
    )
  }

  render() {
    if (this.navigationBarProps.hiddenNav) {
      return <View/>
    }
    return (
      <View style={[styles.navBarStyle, this.navigationBarProps.navBarStyle]}>
        <View style={[styles.navContentStyle, this.navigationBarProps.navContentStyle]}>
          {this.renderLeftItem()}
          {this.renderTitle()}
          {this.renderRightItem()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navBarStyle: {
    height: Theme.navHeight,
    backgroundColor: Theme.navBarColor,
  },
  navContentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Theme.navStatusBarHeight,
    height: Theme.navContentHeight,
    marginHorizontal: 10,
  },
  leftImageStyle: {
    width: Theme.navImageWidth,
    height: Theme.navImageHeight,
  },
  leftItemStyle: {
    justifyContent: 'center',
    width: 70,
  },
  leftTitleStyle: {
    fontSize: Theme.navLeftTitleFont,
    color: Theme.navLeftTitleColor
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  titleStyle: {
    fontSize: Theme.navTitleFont,
    color: Theme.navTitleColor,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subTitleStyle: {
    fontSize: 11,
    marginTop: 5
  },
  rightImageStyle: {
    width: Theme.navImageWidth,
    height: Theme.navImageHeight
  },
  rightItemStyle: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: barBtnWidth,
  },
  rightTitleStyle: {
    fontSize: Theme.navRightTitleFont,
    color: Theme.navRightTitleColor
  }
})