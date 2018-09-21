/*
 *  优惠券功能列表
 */
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, TouchableOpacity, Alert, Dimensions, ImageBackground } from 'react-native';
import BusiInfo  from '../../public/BusiInfo'
import { Actions } from 'react-native-router-flux';
import {Theme,ScaleSize,ScaleText,Toast,DeviceInfo} from '../../public/FileReference'

//定义一些全局的变量
var cols = 2;
var boxW = (DeviceInfo.width-ScaleSize(60))/2;
var vMargin = ScaleSize(20);
var hMargin = ScaleSize(20);

var Sudoku = [{ title: '优惠券列表', image: require('../../images/coupon/couponBox/coupon_couponList.png') },
{ title: '新增优惠券', image: require('../../images/coupon/couponBox/coupon_addCoupon.png') },
{ title: '授权管理', image: require('../../images/coupon/couponBox/coupon_authorization.png') },
{ title: '营销规则查询', image: require('../../images/coupon/couponBox/coupon_marketquery.png') },
{ title: '数据统计', image: require('../../images/coupon/couponBox/coupon_datastatistics.png') }
]

export default class CouponBox extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>{this.bottomView()}</View>
        );
    }

    bottomView() {
        if(BusiInfo.userInfo.usrType === '03'){
            Sudoku.splice(1,1); 
        }else{
           
        }
       
        // 定义数组装所有的子组件
        var allBadge = [];
        for (var i = 0; i < Sudoku.length; i++) {
            // 取出每一个数据对象
            var badge = Sudoku[i];
            allBadge.push(
                <Item key={i}
                    title={badge.title}
                    image={badge.image}
                    ItemClick={(this.ItemClick.bind(this, badge))}
                />
            );
        }
        // 返回数组
        return allBadge;
    }

    // 功能菜单点击事件
    ItemClick(data) {
        var title = data.title;
        console.log(title);
        if (title == '优惠券列表') {
            Actions.CouponList();
        }else if(title == '新增优惠券'){
            //Actions.AddAndEditCoupon();
            Actions.CouponTemplate();
        }
    }

}

class Item extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.ItemClick}>
                <View style={styles.outViewStyle}>
                    <Image style={styles.iconStyle} source={this.props.image}></Image>
                    <Text style={styles.mainTitleStyle}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.contentColor,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    outViewStyle: {
        alignItems: 'center',
        width: boxW,
        height: boxW,
        marginLeft: vMargin,
        marginTop: hMargin,
        backgroundColor: Theme.whiteColor,
    },
    iconStyle: {
        marginTop: hMargin*2,
        width: ScaleSize(40),
        height: ScaleSize(40),
       
    },
    mainTitleStyle: {
        marginTop: ScaleSize(10),
    }

})
