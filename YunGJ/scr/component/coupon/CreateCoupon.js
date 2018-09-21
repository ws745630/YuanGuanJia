/*
 *  新建优惠券弹框
 */
import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import BackIcon from 'react-native-vector-icons/EvilIcons'
import NetWorkTool from '../../public/network/NetWorkTool'
import BusiInfo from '../../public/BusiInfo'
import { DeviceInfo, Theme, Toast, ScaleSize, ScaleText } from '../../public/FileReference'
import CouponDetail from './TicketDetail'


export default class CreateCoupon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Num: 1000, //创建优惠券的数据
            surNum: this.props.couponInfo.surplusnum - 1, //剩余数量
        }
    }
    componentDidMount(){
        if (BusiInfo.vote) {
            /** 如果有活动就调用接口，重新获取电子券剩余张数 */
            var parmars = {
                couponId: this.props.couponInfo.couponId,
                mchtId: this.props.couponInfo.mchtId,
            }
            NetWorkTool.getGrantAccreditNum(parmars, (result => {
                this.setState({ surNum: result.surplusnum - 1 });
            }))

        } else {
            NetWorkTool.qureyCouponSurplus(parmars, (result => {
                this.setState({ surNum: result });
            }))
        }
    }
    render() {
        var topTextStr, numTextStr, sureBtnText;
        if (this.props.inFoType === 'codePackage') {
            topTextStr = '生成优惠券包';
            numTextStr = '打包数量';
            sureBtnText = '生成优惠券二维码包';
            
        } else {
            topTextStr = '生成优惠券';
            numTextStr = '生成优惠券数量';
            sureBtnText = '生成优惠券';

        }
       
        return (
            <View style={styles.container}>

                {/* 优惠券标题 */}
                <View style={styles.createTitle}>
                    <BackIcon name={'chevron-left'} size={30} ></BackIcon>
                    <Text style={styles.title}>{topTextStr}</Text>
                </View>
                {/* 优惠券信息 */}
                <CouponDetail couponInfo={this.props.couponInfo} type={this.props.inFoType === 'codePackage'?'':'create'}/>
                {/* 优惠券增加/减少 */}
                <View style={styles.coupon_count_bg}>
                    <Text style={{ fontSize: 16 }}>{numTextStr}</Text>
                    <View style={styles.coupon_right}>
                        <Text style={styles.coupon_change} onPress={() => { this.subCouponCount() }}>-</Text>
                        <TextInput style={styles.coupon_count} onChange={() => { }}>{this.state.Num.toString()}</TextInput>
                        <Text style={styles.coupon_change} onPress={() => { this.addCouponCount() }}>+</Text>
                    </View>
                </View>
                {/* 剩余数量 */}
                <View style={styles.surplus_coupon_bg}>
                    <Text style={styles.surplus_coupon}>剩余数量:{this.state.surNum.toString()}</Text>
                </View>
                {/* 确定按钮 */}
                <TouchableOpacity onPress={this.sureBtnClick1.bind(this)}>
                    <View style={styles.sureBtn_bg}>
                        <Text style={styles.sureBtn}>{sureBtnText}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    // 确定创建/修改优惠券
    sureBtnClick1() {
        if (this.props.sureBtnClick) {
            this.props.sureBtnClick(this.state.Num)
        }
    }

    // 减少优惠券张数
    subCouponCount() {

        var nM = this.state.Num;
        if (nM == 1) {
            Toast.show('已达最小数量');
            return;
        }
        this.setState({ Num: this.state.Num - 1, surNum: this.state.surNum + 1 });
    }

    // 增加优惠券张数
    addCouponCount() {

        var ssnM = this.state.surNum;
        if (ssnM == 0) {
            Toast.show('已达最大数量');
            return;
        }
        this.setState({ Num: this.state.Num + 1, surNum: this.state.surNum - 1 });
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
    },
    createTitle: {
        flexDirection: 'row',
        paddingTop: ScaleSize(10),
        paddingBottom: ScaleSize(10),
    },
    title: {
        flex: 1,
        fontSize: ScaleText(19),
        textAlign: 'center',
    },
    coupon_count_bg: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: ScaleSize(10),
        paddingBottom: ScaleSize(10),
    },
    coupon_right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    create_coupon: {
        fontSize: ScaleText(16),
        color: 'red',
    },
    coupon_change: {
        width: ScaleSize(30),
        height: ScaleSize(30),
        backgroundColor: '#f2f2f2',
        color: '#a5a4a5',
        fontSize: ScaleText(20),
        lineHeight: ScaleSize(30),
        textAlign: 'center',
        marginLeft: ScaleSize(10),
        marginRight: ScaleSize(10),
    },
    coupon_count: {
        backgroundColor: '#f2f2f2',
        width: ScaleSize(50),
        height: ScaleSize(30),
        fontSize: ScaleText(18),
        textAlign: 'center'
    },
    surplus_coupon_bg: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: ScaleSize(10),
        paddingRight: ScaleSize(10),
    },
    surplus_coupon: {
        fontSize: ScaleText(15),
        color: '#bcbcbc',
    },
    sureBtn_bg: {
        marginLeft: ScaleSize(20),
        marginRight: ScaleSize(20),
        marginBottom: ScaleSize(20),
        paddingTop: ScaleSize(10),
        paddingBottom: ScaleSize(10),
        backgroundColor: Theme.mainColor,
        borderRadius: 5,
        justifyContent: 'center'
    },
    sureBtn: {
        fontSize: ScaleText(18),
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center'
    }
})