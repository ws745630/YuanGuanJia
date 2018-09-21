/*
 *  文本分割显示
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    Dimensions
} from 'react-native';

/**
 *处理文字 
 *
 * @export
 * @number 传入数字 必须为小数点如8.8
 * @firstSize 小数点前文字大小
 * @secondSize  小数点后文字大小
 */
export default class Texts extends Component {
    render() {
        // 处理文字
        let number = this.props.number;
        // 第一个字体大小
        let firstSize = this.props.firstSize;
        // 第一个字体大小
        let secondSize = this.props.secondSize;

        var dealStr = number.toString();
        if (dealStr.indexOf('.')) {
            var array = dealStr.split('.');
            return (
                <View style={{flexDirection: 'row'}}>
                    <Text style={{ color: 'white', fontSize: firstSize }}>{array[0]}.</Text>
                    <Text style={{ color: 'white', fontSize: secondSize }}>{array[1]}</Text>
                </View>
            )
        } else {
            return (
                <View><Text style={{ color: 'white', fontSize: firstSize }}>dealStr</Text></View>
            )
        }

    }
}