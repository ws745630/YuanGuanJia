/*
 *  新建优惠券弹框
 */
import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Alert, TextInput } from 'react-native';

export default class TextButton extends Component{
    
    render(){
        return (
            <View style={styles.containerer}>
              <Text style={styles.bottom_btn}>{this.props.title}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    containerer:{
        flexDirection:'row',
    },
    bottom_btn:{
        flex:1,
        fontSize:this.props.fontSize,
        color:this.props.color,
        textAlign:'center',
        backgroundColor:this.props.backgroundColor,
        borderRadius:8,
    }
})
