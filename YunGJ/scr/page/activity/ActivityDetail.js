import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import NetWorkTool from '../../utils/network/NetWorkTool'
import DateUtil from '../../utils/DateUtil'
import ShowTicket from '../../component/coupon/ShowTicket'
import BusiInfo from '../../utils/BusiInfo'
import {Theme,DeviceInfo,ScaleSize,ScaleText} from '../../utils/FileReference'


export default class ActivityDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            actStat: this.props.actStat,
        }
    }

    render() {
        var ActivityModel = this.props.actModel;
        var couponModel = {};
        couponModel.type = ActivityModel.a0.couponType;
        couponModel.couponId = ActivityModel.a0.couponId;
        couponModel.denomination = ActivityModel.a0.denomination;
        couponModel.num = ActivityModel.a0.num;
        couponModel.soldnum = ActivityModel.a0.soldnum;
        couponModel.usednum = ActivityModel.a0.usednum;
        couponModel.validatyBegin = ActivityModel.a0.validatyBegin;
        couponModel.validatyEnd = ActivityModel.a0.validatyEnd;
        couponModel.name = ActivityModel.a0.couponName;



        return (
            <ScrollView style={styles.container}>
                <View style={styles.bgview}>
                    <Text style={styles.topText}>{ActivityModel.actName}</Text>
                    <View style={{ height: 130, marginLeft: 0, marginRight: 0 }}></View>
                    {this.mildViews(ActivityModel)}
                    <View style={{ height: 1.5, marginLeft: 0, marginRight: 0, marginTop: 3, backgroundColor: '#F2F2F2' }}></View>
                    <Text style={{ color: '#535353', marginTop: 10, height: 20, marginLeft: 10, fontSize: 14 }}>{ActivityModel.actDsc
                    }</Text>
                    <View style={{ height: 1.5, marginLeft: 0, marginRight: 0, marginTop: 5, backgroundColor: '#F2F2F2' }}></View>
                    <TouchableOpacity onPress={() => {
                        this._actStatHander();
                    }}>
                        {this.bottomMenu(this.state.actStat)}
                    </TouchableOpacity>

                </View>
                <View style={styles.couponView}>
                    <ShowTicket couponInfo={couponModel}></ShowTicket>
                </View>
            </ScrollView>
        )
    }
    _actStatHander() {
        let statAct = '';
        if (this.state.actStat === 'OVER') return;
        if (this.state.actStat === 'IN') {
            statAct = 'RELEASE';
        } else if (this.state.actStat === 'RELEASE' || this.state.actStat === 'NORMAL') {
            statAct = 'IN';
        }
        var params = {
            "actStat": statAct,
            "mchtId": BusiInfo.userInfo.usr.mchtId
        };
        //更改活动状态      
        NetWorkTool.ActChange(this.props.actModel.actId, params, (response => {

            this.props.actModel.actStat = statAct;
            this.setState({ actStat: statAct });
            if (this.props.navigation.state.params.callback) {
                this.props.navigation.state.params.callback(statAct)
            }
        }))
    }


    bottomMenu(actStat) {
        var bottomText;
        //actStat;//normal初始release待发布in进行中over已结
        if (actStat === 'RELEASE') {
            bottomText = '启动活动';
        } else if (actStat === 'IN') {
            bottomText = '暂停活动';
        } else if (actStat === 'NORMAL') {
            bottomText = '开启活动';
        } else if (actStat === 'OVER') {
            bottomText = '活动已结束';
        }
        return (
            <View>
                <Text style={styles.bottomText}>{bottomText}</Text>
            </View>
        )
    }
    mildViews(Info) {
        var actNoView, actTypeView, actBegDateView, actEndDateView, paytimeView, actValueView, payTypeView, mactTypeView;
        var typeStr;
        if (Info.actType === '00') {
            typeStr = '打折';
        } else if (Info.actType === '01') {
            typeStr = '优惠券';
        } else {
            typeStr = '储值卡';
        }
        var actNoStr = 'No.' + Info.actId;
        var txn_timeArr = Info.a0.txn_time.split(",");//交易时间

        var txn_timeStr = DateUtil.subTimeSr(txn_timeArr[0]) + '-' + DateUtil.subTimeSr(txn_timeArr[1]);



        actNoView = <Allitems leftname='活动编号' rightValue={actNoStr}></Allitems>;
        actTypeView = <Allitems leftname='活动类型' rightValue={typeStr}></Allitems>;
        actBegDateView = <Allitems leftname='活动开始时间' rightValue={DateUtil.subDate(Info.actBegDate, 'YMD')}></Allitems>;
        actEndDateView = <Allitems leftname='活动结束时间' rightValue={DateUtil.subDate(Info.actEndDate, 'YMD')}></Allitems>;
        if (Info.a0.typeName.left > 0) {
            mactTypeView = <Allitems leftname='商品类型' rightValue={Info.a0.typeName}></Allitems>;
        }
        paytimeView = <Allitems leftname='交易时间' rightValue={txn_timeStr}></Allitems>;
        actValueView = <Allitems leftname='活动金额大于等于' rightValue={Info.a0.txn_amount}></Allitems>;
        // chnl_no
        var chnl_noArr = Info.a0.chnl_no.split(",")//支付方式
        let chnl_noStrArr = [];
        for (var i = 0; i < chnl_noArr.length; i++) {
            if (chnl_noArr[i] === "wechat") {
                chnl_noStrArr.push('微信支付');
            } else if (chnl_noArr[i] === "paytrain") {
                chnl_noStrArr.push('收付直通车');
            } else if (chnl_noArr[i] === "union") {
                chnl_noStrArr.push('银联');
            } else if (chnl_noArr[i] === "alipay") {
                chnl_noStrArr.push('支付宝');
            } else if (chnl_noArr[i] === "line") {
                chnl_noStrArr.push('线下');
            }
        }
        var chnl_noStr = '';
        for (var i = 0; i < chnl_noStrArr.length; i++) {
            chnl_noStr += chnl_noStrArr[i];
        }


        payTypeView = <Allitems leftname='支付方式' rightValue={chnl_noStr}></Allitems>;

        return (
            <View style={styles.milditemsview}>
                {actNoView}
                {actTypeView}
                {actBegDateView}
                {actEndDateView}
                {mactTypeView}
                {paytimeView}
                {actValueView}
                {payTypeView}

            </View>
        )
    }

}

class Allitems extends Component {
    render() {
        return (
            <View style={styles.itemView}>
                <Text style={styles.itemleftText}>{this.props.leftname}</Text>
                <Text style={styles.itemrightText}>{this.props.rightValue}</Text>
            </View>)
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        borderBottomColor: '#F2F2F2',
        borderBottomWidth: ScaleSize(20),
    },
    bgview: {
        borderRadius: ScaleSize(5),
        marginLeft: ScaleSize(20),
        marginRight: ScaleSize(20),
        marginTop: ScaleSize(20),
        width: DeviceInfo.deviceWidth - ScaleSize(40),
        backgroundColor: 'white',

    },
    couponView: {
        position: 'absolute',
        top: ScaleSize(70),
        left: 0,
        right: 0,
    },
    topText: {
        marginLeft: ScaleSize(10),
        fontSize: ScaleText(16),
        textAlign: 'left',
        height: ScaleSize(50),
        lineHeight: ScaleSize(50),
    },
    milditemsview: {
        flexDirection: 'column',
        marginLeft: ScaleSize(10),
        marginRight: ScaleSize(10),
        marginTop: 0,
        width: DeviceInfo.deviceWidth - ScaleSize(60),
        backgroundColor: 'white',

    },
    itemView: {
        flexDirection: 'row',
        marginLeft: 0,
        width: DeviceInfo.deviceWidth - ScaleSize(60),
        height: ScaleSize(30),
        lineHeight: ScaleSize(30),
        backgroundColor: 'white',

    },
    itemleftText: {
        marginLeft: 0,
        fontSize: ScaleText(15),
        height: ScaleSize(30),
        lineHeight: ScaleSize(30),
        width: (DeviceInfo.deviceWidth - ScaleSize(60)) / 2,
        textAlign: 'left',
        color: '#535353',
    },
    itemrightText: {
        marginLeft: 0,
        fontSize: ScaleText(15),
        height: ScaleSize(30),
        lineHeight: ScaleSize(30),
        width: (DeviceInfo.deviceWidth - ScaleSize(60)) / 2,
        textAlign: 'right',
        color: '#535353',

    },
    bottomText: {
        fontSize: ScaleText(16),
        textAlign: 'center',
        height: ScaleSize(44),
        lineHeight: ScaleSize(44),
        color: '#535353',
    }

})