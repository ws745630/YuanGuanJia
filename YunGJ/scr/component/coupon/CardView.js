/*
 * 优惠券建券模板 
 * 
 * Create 2018-09-14 
 * describe  
 */

import React, { Component } from 'react'
import { View, StyleSheet, Text, ImageBackground, ScrollView } from 'react-native'
import { DeviceInfo, Theme, ScaleSize, ScaleText } from '../../public/FileReference'
import { Button } from 'react-native-elements'


const cash_bg_img = require('../../images/coupon/template_cash.png')
const rebate_bg_img = require('../../images/coupon/template_rebate.png')
const voucher_bg_img = require('../../images/coupon/template_voucher.png')

export default class CardView extends Component {
    render() {
        var image = null
        if (this.props.data.type == 'cash') {
            image = cash_bg_img
        } else if (this.props.data.type == 'vouther') {
            image = voucher_bg_img
        } else {
            image = rebate_bg_img
        }
        return (
            <View>
                <ImageBackground style={styles.bgImage} imageStyle={{ borderRadius: 15 }} resizeMode='stretch' source={image}>
                    <View style={styles.temp_title_container}>
                        <Text style={styles.title}>{this.props.data.title}</Text>
                        <Text style={styles.sub_title}>选择心意的优惠券方案，方便、快捷、有效建券</Text>
                    </View>
                    <ScrollView style={styles.coupon_content}>
                        {this._createCouponItem()}
                    </ScrollView>
                    <Button buttonStyle={styles.buttonStyle}
                        titleStyle={styles.titleStyle}
                        title='使用模板'
                        onPress={this.useTempCreateCouponClick.bind(this)} />
                </ImageBackground>
            </View>
        )
    }

    /* 优惠券Item*/
    _createCouponItem() {
        var couponItems = []
        var list = this.props.data
        var leftTitles = list.leftTitles
        var rightTitles = list.rightTitles
        leftTitles.map((item, index) => {
            couponItems.push(<View key={index} style={styles.coupon_item}>
                <Text style={styles.left_title}>{item}</Text>
                <Text style={styles.right_title}>{rightTitles[index]}</Text>
            </View>)
        })
        return couponItems
    }

    /* 使用优惠券按钮点击 */
    useTempCreateCouponClick() {
        var key = this.props.data.key
        //  通过Props data设置key取优惠券信息
        var couponInfo = getTemplateData(key)
        Actions.AddAndEditCoupon({ couponInfo: couponInfo, handletype: 'template' })
    }




}

/** 样式表 */
const styles = StyleSheet.create({
    bgImage: {
        width: ScaleSize(300),
        height: DeviceInfo.height - ScaleSize(200),
    },
    temp_title_container: {
        height: ScaleSize(100),
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: ScaleText(23),
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333333',
        paddingTop: ScaleSize(10),
        paddingBottom: ScaleSize(10)
    },
    sub_title: {
        fontSize: 12,
        color: '#333333',
        textAlign: 'center',
    },
    coupon_content: {
        marginTop: ScaleSize(20),
        marginLeft: ScaleSize(10),
        marginRight: ScaleSize(10),
        marginBottom: ScaleSize(10),
    },
    coupon_item: {
        flexDirection: 'row',
        paddingTop: ScaleSize(5),
        paddingBottom: ScaleSize(5),
    },
    left_title: {
        flex: 1,
        fontSize: 13,
    },
    right_title: {
        flex: 1,
        textAlign: 'right',
        fontSize: 13,
    },
    buttonStyle: {
        paddingTop: ScaleSize(5),
        paddingBottom: ScaleSize(5),
        backgroundColor: 'white',
        borderBottomLeftRadius: ScaleSize(15),
        borderBottomRightRadius: ScaleSize(15),
    },
    titleStyle: {
        color: Theme.mainColor,
    },
})