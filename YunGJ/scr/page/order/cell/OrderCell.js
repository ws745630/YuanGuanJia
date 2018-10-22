/*
 * 订单Cell 
 * Create 2018-09-21 
 * describe  
 */
import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    DeviceEventEmitter,
    ImageBackground,
} from 'react-native'
import DateUtil from '../../../utils/DateUtil'
import { Actions } from 'react-native-router-flux'
import LeftRightLabel from '../LeftRightLabel'
import {Theme,DeviceInfo,ScaleSize,ScaleText} from '../../../utils/FileReference'

export default class OrderCell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tensile: false,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.boxView}>
                    {this.contentViews(this.props.orderModel)}
                </View>
            </View>
        )
    }

    contentViews(model) {
        var ramadStateLabel, orderDateLabel, lineView1, tenHView, tipIcon, couponNameView, couponVauleView, lineView2, tenHView2, yPrepayIdLabel, yOrderIdLabel, yPeopleLabel, tenHView3, FHBtn,
            elseorderIdLabel, elseamtLabel, elsenoSlaeLabel, elsecouponAmtLabel, elseprepayIdLabel, elseusrIdLabel, handerArrow, orderDetils, tensileArrow, CourierPrepayId, CourierorderId, CourieexpressNum,
            CourieexpressCompany, CourtlrNo, CourPeople, CourreceName, CourMobile, CourAddress,
            ramadStateLabel = <Text style={styles.ramadStateLabel}> {getRamadStateText(model)}</Text>
        orderDateLabel = <Text style={styles.dateLabel}> {DateUtil.subDate(model.order.orderDate, 'YMDHMS')}</Text>
        lineView1 = <View style={styles.lineView} />
        tenHView = <View style={styles.tenHView} />
        let orderStateStr = model.order.orderState
        if (orderStateStr === 'success' || orderStateStr === 'unship') {
            if (orderStateStr === 'success') { 
                tipIcon = <ImageBackground style={styles.tipIcon} source={require('../../../images/order/Offlinecoupons.png')} />
            } else {
                FHBtn = <Text style={styles.fhbtn}>发货</Text>
            }
            if (model.couponList.length > 0) {
                couponNameView = <LeftRightLabel leftname={model.couponList[0].couponName} rightValue={model.couponList[0].couponNoNum + '张'} ></LeftRightLabel>
                var value = ''
                if (model.couponList[0].couponType === 'rebate') {
                    value = '价值:' + model.couponList[0].denomination / 10.0 + '折'
                } else {
                    value = '价值:' + model.couponList[0].denomination + '元'
                }
                couponVauleView = <LeftRightLabel leftname={value} ></LeftRightLabel>
                lineView2 = <View style={styles.lineView2} />
                tenHView2 = <View style={styles.tenHView} />
            }
            if (Boolean(model.seqNo)) {
                yPrepayIdLabel = <LeftRightLabel leftname='交易流水号:' rightValue={model.seqNo} ></LeftRightLabel>
            }

            yOrderIdLabel = <LeftRightLabel leftname='订单号:' rightValue={model.order.orderId} ></LeftRightLabel>
            yPeopleLabel = <LeftRightLabel leftname='验券用户:' rightValue={model.usrName} ></LeftRightLabel>


        } else if (orderStateStr === 'shipped' || orderStateStr === 'receive') {
            if (orderStateStr === 'receive') {
                tipIcon = <ImageBackground style={styles.tipIcon} source={require('../../../images/order/onlinecoupons.png')} />
            } else {
                FHBtn = <Text style={styles.fhbtn2}>已发货</Text>
            }
            orderDetils = <Text style={styles.orderDe}>订单详情</Text>
            if (!this.state.tensile) {
                tensileArrow = <TouchableOpacity style={styles.arrowView2} onPress={() => {
                    this.setState({ tensile: true })
                }} >
                    <ImageBackground style={styles.arrowIcon} source={require('../../../images/order/popDown.png')} />
                </TouchableOpacity>
            } else {
                tensileArrow = <TouchableOpacity style={styles.arrowView2} onPress={() => {
                    this.setState({ tensile: false })
                }} >
                    <ImageBackground style={styles.arrowIcon} source={require('../../../images/order/popUp.png')} />
                </TouchableOpacity>
                if (Boolean(model.seqNo)) {
                    CourierPrepayId = <LeftRightLabel leftname='交易流水号:' rightValue={model.seqNo} ></LeftRightLabel>
                }
                CourierorderId = <LeftRightLabel leftname='订单号:' rightValue={model.order.orderId} ></LeftRightLabel>
                CourieexpressNum = <LeftRightLabel leftname='快递单号:' rightValue={model.order.expressNum} ></LeftRightLabel>
                CourieexpressCompany = <LeftRightLabel leftname='快递公司:' rightValue={model.order.expressCompany} ></LeftRightLabel>
                CourtlrNo = <LeftRightLabel leftname='操作员工:' rightValue={model.order.tlrNo} ></LeftRightLabel>
                CourPeople = <LeftRightLabel leftname='验券用户:' rightValue={model.usrName + '昵称'} ></LeftRightLabel>
                CourreceName = <LeftRightLabel leftname='收货人:' rightValue={model.order.receName} ></LeftRightLabel>
                CourMobile = <LeftRightLabel leftname='联系电话:' rightValue={model.order.receMobile} ></LeftRightLabel>
                CourAddress = <LeftRightLabel leftname='收货地址:' rightValue={model.order.receAddress} ></LeftRightLabel>


            }




        } else {

            handerArrow = <TouchableOpacity style={styles.arrowView} onPress={() => {
                Actions.OrderDetailsView({orderModel:model})
            }} >
                <ImageBackground style={styles.arrowIcon} source={require('../../../images/order/rightArrow.png')} />
            </TouchableOpacity>

            elseorderIdLabel = <LeftRightLabel leftname='订单编号:' rightValue={model.order.orderId} ></LeftRightLabel>
            elseamtLabel = <LeftRightLabel leftname='消费总金额:' rightValue={model.order.amt+'元'} ></LeftRightLabel>
            elsenoSlaeLabel = <LeftRightLabel leftname='实付总金额:' rightValue={model.realamt+'元'} ></LeftRightLabel>
            elsecouponAmtLabel = <LeftRightLabel leftname='优惠券抵扣金额:' rightValue={model.order.couponAmt+'元'} ></LeftRightLabel>
            if (Boolean(model.seqNo)) {
                elseprepayIdLabel = <LeftRightLabel leftname='交易流水号:' rightValue={model.seqNo} ></LeftRightLabel>
            }
            if (Boolean(model.order.usrId)) {
                elseusrIdLabel = <LeftRightLabel leftname='交易用户号:' rightValue={model.order.usrId} ></LeftRightLabel>
            }



        }
        tenHView3 = <View style={styles.tenHView} />
        return (
            <View style={styles.allView}>
                {ramadStateLabel}
                {orderDateLabel}
                {lineView1}
                {tenHView}
                {tipIcon}
                {FHBtn}
                {couponNameView}
                {couponVauleView}
                {lineView2}
                {tenHView2}
                {yPrepayIdLabel}
                {yOrderIdLabel}
                {yPeopleLabel}

                {handerArrow}
                {elseorderIdLabel}
                {elseamtLabel}
                {elsenoSlaeLabel}
                {elsecouponAmtLabel}
                {elseprepayIdLabel}
                {elseusrIdLabel}

                {orderDetils}
                {tensileArrow}
                {CourierPrepayId}
                {CourierorderId}
                {CourieexpressNum}
                {CourieexpressCompany}
                {CourtlrNo}
                {CourPeople}
                {CourreceName}
                {CourMobile}
                {CourAddress}
                {tenHView3}



            </View>
        )
    }

}


const getRamadStateText = orderInfo => {
    var deskN = ''
    var stateT = ''
    if (Boolean(orderInfo.order.deskNum)) {
        deskN = '# ' + orderInfo.order.deskNum + '桌 '
    } else {
        deskN = ''

    }
    let orderTypeStr = orderInfo.order.orderState
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
    } else {

        if (orderTypeStr === 'unship' || orderTypeStr === 'shipped' || orderTypeStr === 'success' || orderTypeStr === 'receive') {
            if (orderInfo.couponList.length > 0) {
                let couponType = orderInfo.couponList[0].couponType
                if (couponType === 'present') {
                    stateT = '验礼品券'
                } else if (couponType === 'ticket') {
                    stateT = '验票务'
                } else if (couponType === 'voucher') {
                    stateT = '验抵用券'
                } else if (couponType === 'cash') {
                    stateT = '验代金券'
                } else if (couponType === 'rebate') {
                    stateT = '验折扣券'
                }

            } else {
                stateT = '未知'
            }
        }


    }


    return deskN + stateT
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.contentColor,
    },
    boxView: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        width: DeviceInfo.width - 20,
        backgroundColor: 'white',

    },
    allView: {
        marginLeft: 10,
        marginRight: 10,
        width: DeviceInfo.width - 40,
        backgroundColor: 'white',
    },
    ramadStateLabel: {
        fontSize: 25,
        height: 30,
        textAlign: 'left',
        lineHeight: 30,
        marginTop: 20,
        color: 'rgb(36, 161, 54)',
    },
    dateLabel: {
        fontSize: 15,
        height: 20,
        textAlign: 'left',
        lineHeight: 20,
        marginTop: 15,
        color: 'rgb(83, 83, 83)',
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
    lineView2: {
        marginLeft: -10,
        marginRight: -10,
        marginTop: 10,
        backgroundColor: Theme.contentColor,
        height: 2,
    },
    tipIcon: {
        position: 'absolute',
        height: ScaleSize(80),
        width: ScaleSize(112),
        top: ScaleSize(5),
        right: -10,
    },
    fhbtn: {
        position: 'absolute',
        height: ScaleSize(40),
        width: ScaleSize(80),
        top: ScaleSize(20),
        right: 0,
        color: Theme.whiteColor,
        fontSize: 17,
        textAlign: 'center',
        lineHeight: ScaleSize(40),
        backgroundColor: 'rgb(36, 161, 54)',
        borderRadius: 3,

    },
    fhbtn2: {
        position: 'absolute',
        height: ScaleSize(40),
        width: ScaleSize(80),
        top: ScaleSize(20),
        right: 0,
        color: Theme.blackColor,
        fontSize: 17,
        textAlign: 'center',
        lineHeight: ScaleSize(40),

    },
    orderDe: {
        height: ScaleSize(40),
        color: Theme.blackColor,
        fontSize: 20,
        textAlign: 'left',
        lineHeight: ScaleSize(40),
        fontWeight: 'bold',

    },
    arrowView2: {
        position: 'absolute',
        height: ScaleSize(25),
        width: ScaleSize(25),
        top: ScaleSize(120),
        right: 5,
    },
    arrowView: {
        position: 'absolute',
        height: ScaleSize(25),
        width: ScaleSize(25),
        top: ScaleSize(40),
        right: 5,
    },
    arrowIcon: {
        flex: 1,
    },
    bottomView: {
        backgroundColor: Theme.contentColor,
        height: 10,
    },


})