/*
 * 优惠券详情 
 * Create 2018-09-10 
 * describe  
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
} from 'react-native';
import TicketDetail from '../../component/coupon/TicketDetail'
import ImageButton  from '../../component/button/ImageButton'
import CouponCommend from './CouponCommend'
import {Theme,DeviceInfo,Toast,ScaleSize,ScaleText} from '../../utils/FileReference'

export default class CouponDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 电子券详情数据模型
            couponModel: this.props.couponInfo
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scollView}>
                    <TicketDetail couponInfo={this.state.couponModel} />
                    <CouponCommend couponId={this.props.couponInfo.couponId}/>
                </ScrollView>
                <View style={styles.bottom_container}>
                    <ImageButton iconName='tuanduicankaoxian-' name='删除' />
                    <ImageButton iconName='xiugaimima' name='修改'/>
                    <ImageButton imageBtnStyle={styles.imageBtnStyle} iconName='saoma' name='扫码发券'/>
                </View>
            </View>

        )
    }
}
/** 样式表 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scollView:{
        marginBottom:ScaleSize(45)
    },
    bottom_container:{
        flexDirection:'row',
        backgroundColor:'red',
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        flex:1,
        height:ScaleSize(45)
    },
    imageBtnStyle:{
        backgroundColor:Theme.mainColor,
        color:'white'
    },
    
})