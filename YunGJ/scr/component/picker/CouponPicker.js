/*
 *  新增和修改电子券
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import DeviceInfo from '../../utils/DeviceInfo'
import { Actions } from 'react-native-router-flux'
import Picker from 'react-native-picker'

export default class CouponPicker extends Component
{
    //   选择器数据   选择器标题  默认选中的值  选择回调
    static showPicker(pickerData,selectValue,pickerTitle,callBack){

        Picker.init({
            pickerData: pickerData,
            selectedValue:selectValue,
            pickerFontColor: [0, 0, 0, 1],
            pickerConfirmBtnText: '确认',
            pickerConfirmBtnColor: [55, 171, 80, 1],
            pickerCancelBtnText: '取消',
            pickerCancelBtnColor: [55, 171, 80, 1],
            pickerTitleText: pickerTitle,
            pickerBg: [255, 255, 255, 1],
            pickerToolBarFontSize:22,
            pickerToolBarBg: [255, 255, 255, 1],
            pickerRowHeight:50,
            pickerFontSize:30,
            onPickerConfirm: (pickedValue, pickedIndex) => {
               return callBack(pickedValue);
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            }
        })
        Picker.show();
    }

    static hidePicker(){
        Picker.hide();
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width:DeviceInfo.width,
        height:deviceInfo.height,
        backgroundColor:'red'
    }
})