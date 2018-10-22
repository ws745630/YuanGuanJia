/*
 *  优惠券模板
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import DeviceInfo from '../../utils/DeviceInfo'
import DateUtil from '../../utils/DateUtil'
import {ScaleSize,ScaleText} from '../../utils/Fit'
import Texts from './Texts'
import {Actions} from 'react-native-router-flux'

//rebate折扣 voucher抵用 cash代金 present礼品 ticket票务
const rebateImg = require('../../images/coupon/coupon-rebate.png');
const voucherImg = require('../../images/coupon/coupon-voucher.png');
const cashImg = require('../../images/coupon/conpon-cash.png');
const ticketImg = require('../../images/coupon/coupon-ticket.png');
const presentImg = require('../../images/coupon/coupon-present.png');
const marketImg = require('../../images/coupon/author_market.png');
const buyImg = require('../../images/coupon/cash-icon.png')
const qrcodepacketImg = require('../../images/coupon/qrcode_packet.png')


export default class ShowTicket extends Component {
    render() {
        var info = this.props.couponInfo

        if (info.type === 'cash') {
            info.couponType = '代金券';
            info.imagePath = cashImg;
        } else if (info.type === 'rebate') {
            info.couponType = '折扣券';
            info.imagePath = rebateImg;
        } else if (info.type === 'voucher') {
            info.couponType = '抵用券';
            info.imagePath = voucherImg;
        } else if (info.type === 'present') {
            info.couponType = '礼品券';
            info.imagePath = presentImg;
        } else if (info.type === 'ticket') {
            info.couponType = '票务';
            info.imagePath = ticketImg;
        }
        info.validity = DateUtil.subDate(info.validatyBegin, 'YMD') + '-' + DateUtil.subDate(info.validatyEnd, 'YMD')

        return (
            <View style={styles.container}>

                {this.addBuyCouponFlag(info)}
                <ImageBackground resizeMode='stretch' style={styles.coupon_image} source={info.imagePath}>
                    <View style={styles.coupon_left}>
                        <Text style={styles.coupon_flag}>Coupon</Text>
                        {this.setupCouponMoney(info)}
                        <Text style={styles.coupon_type}>{info.couponType}</Text>
                    </View>
                    <View style={styles.coupon_right}>
                        <Text style={styles.coupon_name} numberOfLines={1}>{info.name}</Text>
                        <Text style={styles.coupon_date}>有效日期:{info.validity}</Text>
                        <View style={styles.coupon_info}>
                            {this.setupCouponUse(info)}
                        </View>
                        {this.addCouponMarketFlag(info)} 
                    </View>
                    {this.addCouponQRCodePackageFlag(info)} 
                    {this.addCouponExpiredFlag(info)} 
                </ImageBackground>
                {this.addVoucheCouponFlag(info)}
            </View>
        )
    }

    // 设置优惠券金额  如果为折扣券金额做特殊处理
    setupCouponMoney(info){
        if(info.type === 'rebate'){
           var num = parseFloat(info.denomination/10.0);
           return (<Texts number={num.toFixed(1)} firstSize={30} secondSize={23} />)
        }else{
            return(<View><Text style={styles.coupon_num}>{info.denomination}</Text></View>)
        }
    }

    // 优惠券使用情况
    setupCouponUse(info){
        var couponText = [];
        if(info.num > 0){
            couponText.push(<Text style={styles.coupon_info_content} key={"总张数"}>总张数:{info.num}</Text>)
        }
        if(this.props.type !== 'create'){
            couponText.push(<Text style={styles.coupon_info_content} key={"已售出"}>已售出:{info.soldnum}</Text>)
            couponText.push(<Text style={styles.coupon_info_content} key={"已使用"} >已使用:{info.usednum}</Text>)
        }
        return couponText;
    }
    // 设置现金券标识
    addBuyCouponFlag(info){
        if(info.promAppro === 'buy' || info.isAgent){
            return (
                <View style={styles.cash_container}>
                    <Image style={styles.cash_image} source={buyImg}></Image>
                    <Text style={styles.cash_text}>现金券 售价{info.cash}元</Text>
                </View>
            )
        }else{
            return null;
        }
       
    }

    // 抵用去满减标识
    addVoucheCouponFlag(info) {
        if (info.type !== 'voucher') {
            return null;
        } else {
            return (
                <View style={styles.voucher_bg}>
                    <Text style={styles.voucher_bg_text}>满消费满{info.restricted}使用抵用券</Text>
                </View>
            )
        }
    }

    // 添加优惠券过期标识
    addCouponExpiredFlag(info) {
        var expiredStr = '';
        if (info.expireTime === '1') {
            expiredStr = '今天过期';
        } else if (info.expireTime === '2') {
            expiredStr = '两天后过期';
        } else if (info.expireTime === '3') {
            expiredStr = '三天后过期';
        } else if (info.expireTime === '-1') {
            expiredStr = '已过期';
        }
        if (expiredStr) {
            return (
                <View style={styles.expiredFlag}>
                    <Text style={styles.expired_time}>{expiredStr}</Text>
                </View>
            )
        } else {
            return null;
        }
    }

    // 添加优惠券授权标识
    addCouponMarketFlag(info) {
        if(info.marketRule || info.settRule){
            return(<Image style={styles.autho_market} source={marketImg}></Image>)
        }else{
            return null;
        }
    }

    // 添加二维码包标识
    addCouponQRCodePackageFlag(info){
        if(info.qr && info.expireTime !== '-1'){
            return(
                <TouchableOpacity onPress={this.props.qrcodeClick}>
                <View style={styles.coupon_qrcode_bg}>
                    <Image style={styles.coupon_qrcodepacket} source={qrcodepacketImg}></Image> 
                </View>
                 
                </TouchableOpacity>
        )
        }else{
            return null;
        }
    }
    qrcodeClick(){
        Actions.QRCodePacketList();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    coupon_image: {
        width: DeviceInfo.width,
        height: ScaleSize(110),
        flexDirection: 'row',
    },

    // 左部分
    coupon_left: {
        width: ScaleSize(80),
        height: ScaleSize(100),
        marginLeft: ScaleSize(10),
        marginTop: ScaleSize(10),
        justifyContent: 'center',
        alignItems: 'center',

    },
    // coupon标识
    coupon_flag: {
        fontWeight: 'bold',
        fontSize: ScaleText(13),
        color: 'white',
        marginBottom: ScaleSize(5),
    },
    coupon_num: {
        fontSize: ScaleText(30),
        color: 'white',
        marginBottom: ScaleSize(5),
    },
    coupon_num_min: {
        fontSize: ScaleText(23),
        color: 'white',
        marginBottom: ScaleSize(5),
    },
    coupon_type: {
        fontSize: ScaleText(14),
        color: 'white',
        marginBottom: ScaleSize(5),
    },

    // 右部分
    coupon_right: {
        flex: 1,
        marginLeft: ScaleSize(10),
        justifyContent: 'center',
    },
    coupon_name: {
        fontSize: ScaleText(17),
        marginTop: ScaleSize(10),
        marginBottom: ScaleSize(10),
    },
    coupon_date: {
        fontSize: ScaleText(13),
        color: '#505152',
        marginBottom: ScaleSize(5),
    },
    coupon_info: {
        flexDirection: 'row',

    },
    coupon_info_content: {
        fontSize: ScaleText(13),
        color: '#505152',
        marginRight: ScaleSize(10)
    },

    // 折扣券底部横幅
    voucher_bg: {
        width: DeviceInfo.width,
        height: ScaleSize(30),
        backgroundColor: '#5c98b2',
    },
    voucher_bg_text: {
        color: 'white',
        fontSize: ScaleText(14),
        textAlign: 'right',
        lineHeight: ScaleSize(30),
        flex: 1,
        marginRight:ScaleSize(10),
    },

    // 过期标识
    expiredFlag: {
        position:'absolute',
        left:0,
        top:ScaleSize(15),
        width: ScaleSize(20),
        height: ScaleSize(80),
        backgroundColor: '#9b2225',
        flexWrap: 'wrap',
        justifyContent:'center',
        alignItems:'center'
    },
    // 过期时间
    expired_time: {
        color: 'white',
        fontSize: ScaleText(12),
    },
    autho_market:{
        position:'absolute',
        right:0,
        bottom:0,
        width:ScaleSize(50),
        height:ScaleSize(50),
    },

    // 现金券
    cash_container:{
        width: DeviceInfo.width,
        height: ScaleSize(30),
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center'
    },
    // 现金券图标
    cash_image:{
        width:ScaleSize(50),
        height:ScaleSize(20),
        marginLeft:ScaleSize(10),
    },
    // 现金券文字
    cash_text:{
       fontSize:14,
       flex:1,
       textAlign:'right',
       marginRight:ScaleSize(10),
    },
    // 二维码包标识
    coupon_qrcode_bg:{
        position:'absolute',
        right:0,
        top:0,
      },
    coupon_qrcodepacket:{
      width:ScaleSize(50),
      height:ScaleSize(50),
    }

})

