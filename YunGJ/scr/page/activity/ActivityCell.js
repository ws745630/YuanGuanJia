import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import DateUtil from '../../public/DateUtil'
import ShowTicket from '../../component/coupon/ShowTicket'
import { Actions } from 'react-native-router-flux';
import BusiInfo from '../../public/BusiInfo';
import NetWorkTool from '../../public/network/NetWorkTool'
import {ScaleSize,ScaleText,DeviceInfo} from '../../public/FileReference'

export default class ActivityCell extends Component {

    constructor(props) {
        super(props);

        this.state = {
            actStat: this.props.ActivityModel.actStat,
        }
    }

    render() {
        var ActivityModel = this.props.ActivityModel;
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
            <TouchableOpacity onPress={() => {
                this._actInfoHander();
            }}>
                <View style={styles.container}>
                    <View style={styles.bgview}>
                        <Text style={styles.topText}>{ActivityModel.actName}</Text>
                        <View style={{ height: 130, marginLeft: 0, marginRight: 0 }}></View>
                        <View style={{ height: 30, marginLeft: 10, marginRight: 10, flexDirection: 'row', }}>
                            <Text style={styles.time1Text}>开始时间:{DateUtil.subDate(ActivityModel.actBegDate, 'YMD')}</Text>
                            <Text style={styles.time2Text}>结束时间:{DateUtil.subDate(ActivityModel.actEndDate, 'YMD')}</Text>
                        </View>
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
                </View>
            </TouchableOpacity>
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
        NetWorkTool.ActChange(this.props.ActivityModel.actId, params, (response => {
            this.props.ActivityModel.actStat = statAct;
            this.setState({ actStat: statAct });

        }))

    }
    _actInfoHander() {

        Actions.ActivityDetail({
            actModel: this.props.ActivityModel, actStat: this.state.actStat, callback: ((info) => {
                this.setState({ actStat: info });
            })
        })

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
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        borderBottomColor: '#F2F2F2',
        borderBottomWidth: ScaleSize(20),
    },
    bgview: {
        borderRadius: 5,
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
    time1Text: {
        fontSize: ScaleText(16),
        height: ScaleSize(30),
        lineHeight: ScaleSize(30),
        width: (DeviceInfo.deviceWidth - ScaleSize(60)) / 2,
        textAlign: 'left',
        color: '#535353',
    },
    time2Text: {
        fontSize: ScaleText(16),
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