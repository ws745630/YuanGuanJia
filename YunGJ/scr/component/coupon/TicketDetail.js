import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import ShowTicket from './ShowTicket'
import DateUtil from '../../public/DateUtil'
import { convertCouponNoDate, reconvertCouponType } from '../../public/CouponTypeDeal'
import {DeviceInfo,Theme,ScaleSize, ScaleText} from '../../public/FileReference'

const qitause = require('../../images/coupon/qitause_icon.png')
const diejia = require('../../images/coupon/diejia_icon.png')

export default class TicketDetail extends Component {
  render() {
    return (
      <View>
        <ShowTicket couponInfo={this.props.couponInfo} type={this.props.type}/>
        <View style={styles.coupon_use_info}>
          <Text style={styles.coupon_type}>优惠券发券途径:{reconvertCouponType(this.props.couponInfo.promAppro)}</Text>
          <Text style={{ fontSize: 19 }}>使用须知</Text>
          {this._renderNoticeUseView(this.props.couponInfo)}
          {this._renderUseRootView(this.props.couponInfo)}
        </View>
      </View>
    )
  }

  // 优惠券使用须知
  _renderNoticeUseView(infoModel) {
    var useView, DateView, timeView, noweekView
    if (infoModel.validatyBegin) {
      var date = '有效期:' + DateUtil.subDate(infoModel.validatyBegin, 'YMD') + '-' + DateUtil.subDate(infoModel.validatyEnd, 'YMD');
      DateView = <NoticeUse useText={date} />
    }
    if (infoModel.dishTypeNames) {
      var typeName = infoModel.dishTypeNames.join(',')
      
      useView = <NoticeUse useText={typeName + '可用'} />
    }
    if (infoModel.useTime) {
      var timeViewrule = '使用时间:' + infoModel.useTime;
      timeView = <NoticeUse useText={timeViewrule} />;
    }
    if (infoModel.disableDate) {
      var disableArr = infoModel.disableDate.split(",")//营业日
      let mchtBusDayStr = convertCouponNoDate(disableArr) + '不可用使用'
      noweekView = <NoticeUse useText={mchtBusDayStr} />
    }
    return (
      <View style={styles.noticeuse_bg}>
        {useView}
        {DateView}
        {timeView}
        {noweekView}
      </View>
    )
  }

  /* 优惠券使用规则 */
  _renderUseRootView(infoModel) {
    if (!infoModel.useRule) return null
    var diejiaUse, togetherUse
    if (infoModel.useRule == 'D') {
      togetherUse = <UseRoot imagePath={qitause} useRoot='可与其他优惠券共同使用' />
    } else if (infoModel.useRule == 'M') {
      diejiaUse = <UseRoot imagePath={diejia} useRoot='叠加使用' />
    } else {
      togetherUse = <UseRoot imagePath={qitause} useRoot='可与其他优惠券共同使用' />
      diejiaUse = <UseRoot imagePath={diejia} useRoot='叠加使用' />
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        {diejiaUse}
        {togetherUse}
      </View>
    )
  }

}

// 使用规则
class UseRoot extends Component {
  render() {
    return (
      <View style={styles.add_use_bg} >
        <Image style={styles.use_icon} source={this.props.imagePath}></Image>
        <Text style={styles.use_icon_text}>{this.props.useRoot}</Text>
      </View >
    )
  }
}

// 使用须知
class NoticeUse extends Component {
  render() {
    return (
      <View style={styles.noticeuse_container}>
        <View style={styles.diamonds}></View>
        <Text style={styles.noticeuse_text}>{this.props.useText}</Text>
      </View>
    )
  }
}


/** 样式表 */
const styles = StyleSheet.create({
  coupon_type: {
    fontSize: ScaleText(15),
    marginTop: ScaleSize(10),
    marginBottom: ScaleSize(10),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  coupon_use_info: {
    paddingLeft: ScaleSize(10),
    backgroundColor: 'white'
  },
  noticeuse_bg: {
    marginLeft: ScaleSize(10),
    marginBottom: ScaleSize(10),
  },
  // 叠加使用
  add_use_bg: {
    flex:1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Theme.lineColor,
    borderBottomWidth: 1,
    borderBottomColor: Theme.lineColor,
    paddingTop: ScaleSize(15),
    paddingBottom: ScaleSize(15),

  },
  use_icon: {
    width: ScaleSize(15),
    height: ScaleSize(15),
    marginRight: ScaleSize(10),
  },
  use_icon_text: {
    fontSize: ScaleText(16),
  },

  noticeuse_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    marginLeft: 10,
  },
  diamonds: {
    backgroundColor: '#e13778',
    width: 8,
    height: 8,
  },
  noticeuse_text: {
    fontSize: 15,
    marginLeft: 10,
    color: '#858585'
  },
})