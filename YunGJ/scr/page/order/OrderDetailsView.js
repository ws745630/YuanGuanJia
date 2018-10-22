/*
 * 订单详情 
 * Create 2018-09-21 
 * describe  
 */
import React, { Component } from 'react' 
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native' 
import DateUtil from '../../utils/DateUtil' 
import LeftRightLabel from './LeftRightLabel' 
import {Theme,DeviceInfo} from '../../utils/FileReference'

export default class OrderDetailsView extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.boxView}>
                    {this.allcontentViews(this.props.orderModel)}
                </View>
            </ScrollView>
        )
    }

    allcontentViews(model) {
        var deskNLabel, ramadStateLabel, orderDateLabel, lineView1, tenHView, tipIcon, couponNameView, couponVauleView, lineView2, tenHView2, yPrepayIdLabel, yOrderIdLabel, yOrderTimeLabel, yOrderstateLabel, elseamtLabel, elsenoSlaeLabel, elsecouponAmtLabel, yOrderdeskLabel, ypayTypeLabel, ytrlLabel, tenHView3

        deskNLabel = <Text style={styles.deskLabel}>{'#' + model.order.deskNum + '桌 '}</Text>
        ramadStateLabel = <Text style={styles.ramadStateLabel}> {getRamadStateStr(model)}</Text>

        orderDateLabel = <Text style={styles.dateLabel}> {DateUtil.subDate(model.order.orderDate, 'YMDHMS')}</Text>
        lineView1 = <View style={styles.lineView} />
        tenHView = <View style={styles.tenHView} />
        if (Boolean(model.seqNo)) {
            yPrepayIdLabel = <LeftRightLabel leftname='交易流水号:' rightValue={model.seqNo} ></LeftRightLabel>
        }
        yOrderIdLabel = <LeftRightLabel leftname='订单编号:' rightValue={model.order.orderId} ></LeftRightLabel>
        yOrderTimeLabel = <LeftRightLabel leftname='订单时间:' rightValue={DateUtil.subDate(model.order.orderDate, 'YMDHMS')} ></LeftRightLabel>
        yOrderstateLabel = <LeftRightLabel leftname='订单状态:' rightValue={getRamadStateStr(model)} ></LeftRightLabel>
        elseamtLabel = <LeftRightLabel leftname='消费总金额:' rightValue={model.order.amt + '元'} ></LeftRightLabel>
        elsenoSlaeLabel = <LeftRightLabel leftname='实付总金额:' rightValue={model.realamt + '元'} ></LeftRightLabel>
        elsecouponAmtLabel = <LeftRightLabel leftname='优惠券抵扣金额:' rightValue={model.order.couponAmt + '元'} ></LeftRightLabel>

        yOrderdeskLabel = <LeftRightLabel leftname='桌号:' rightValue={'#' + model.order.deskNum + '桌 '} ></LeftRightLabel>
        if (Boolean(model.order.payType)) {
            let payTypeStr = model.order.payType 
            var payTypeStrT = '' 
            if (payTypeStr === 'wechat') {
                stateT = '微信支付' 
            } else if (payTypeStr === 'paytrain') {
                stateT = '收付直通车' 
            } else if (payTypeStr === 'union') {
                stateT = '银联' 
            } else if (payTypeStr === 'alipay') {
                stateT = '支付宝' 
            } else if (payTypeStr === 'line') {
                stateT = '线下' 
            } else {
                stateT = '其他' 
            }


            ypayTypeLabel = <LeftRightLabel leftname='交易介质:' rightValue={payTypeStrT} ></LeftRightLabel>

        }
        if (Boolean(model.order.trl)) {
            let trlStr = model.order.trl 
            var trlStrT = '' 
            if (trlStr === 'wechat') {
                stateT = '微信' 
            } else if (trlStr === 'website') {
                stateT = '网站' 
            } else if (trlStr === 'app') {
                stateT = 'APP' 
            } else if (trlStr === 'ebj') {
                stateT = 'ebj点餐' 
            } else {
                stateT = '其他' 
            }
            ytrlLabel = <LeftRightLabel leftname='交易渠道:' rightValue={trlStrT} ></LeftRightLabel>

        }

        tenHView3 = <View style={styles.tenHView} />
        return (
            <View style={styles.allView}>
                {deskNLabel}
                {ramadStateLabel}
                {orderDateLabel}
                {lineView1}
                {tenHView}
                {tipIcon}
                {couponNameView}
                {couponVauleView}
                {lineView2}
                {tenHView2}
                {yPrepayIdLabel}
                {yOrderIdLabel}
                {yOrderTimeLabel}
                {yOrderstateLabel}
                {elseamtLabel}
                {elsenoSlaeLabel}
                {elsecouponAmtLabel}
                {yOrderdeskLabel}
                {ypayTypeLabel}
                {ytrlLabel}
                {tenHView3}


            </View>
        )
    }


}
const getRamadStateStr = Info => {
    let orderTypeStr = Info.order.orderState 
    var stateT = '' 
    if (orderTypeStr === 'normal') {
        stateT = '初始状态' 
    } else if (orderTypeStr === 'placed') {
        stateT = '已下单' 
    } else if (orderTypeStr === 'payed') {
        stateT = '已支付' 
    } else if (orderTypeStr === 'revoke') {
        stateT = '已撤销' 
    } else if (orderTypeStr === 'expire') {
        stateT = '已过期' 
    } else if (orderTypeStr === 'putup') {
        stateT = '挂单' 
    }

    return stateT 
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.contentColor,
    },
    boxView: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        width: DeviceInfo.width,
        backgroundColor: 'white',

    },
    allView: {
        marginLeft: 10,
        marginRight: 10,
        width: DeviceInfo.width - 20,
        backgroundColor: 'white',
    },
    deskLabel: {
        fontSize: 20,
        height: 30,
        textAlign: 'left',
        lineHeight: 30,
        marginTop: 20,
        color: 'rgb(36, 161, 54)',
    },
    ramadStateLabel: {
        position: 'absolute',
        fontSize: 20,
        height: 30,
        textAlign: 'right',
        lineHeight: 30,
        top: 45,
        right: 0,
        color: 'rgb(36, 161, 54)',
    },
    dateLabel: {
        fontSize: 15,
        height: 20,
        textAlign: 'left',
        lineHeight: 20,
        marginTop: 10,
        color: Theme.blackColor,
    },
    lineView: {
        marginLeft: -10,
        marginRight: -10,
        marginTop: 15,
        backgroundColor: Theme.contentColor,
        height: 2,
    },
    tenHView: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        backgroundColor: Theme.whiteColor,
        height: 10,
    },
})