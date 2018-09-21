/*
 * 消息 
 * Create 2018-09-21 
 * describe  
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';
import {Theme,DeviceInfo,ScaleSize,ScaleText} from '../../public/FileReference'
import {Actions,Scene} from 'react-native-router-flux'

export default class Message extends Component
{
    render(){
        return (
            <View styles={styles.mask_container}>
              <View style={styles.container}>
                <Text onPress={()=>{
                        this.goBack();
                    }}>返回</Text>
                    <Text onPress={()=>{
                        this.goBackRefresh();
                    }}>返回refresh</Text>
                </View>
            </View>
        )
    }
    goBack(){
        this.props.callback('回调参数111');
        Actions.pop();

    };
    goBackRefresh=()=>{
        Actions.pop();
        Actions.refresh({msg:'使用PopTo返回到Login页面中props属性'});

    };
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#eee',
        justifyContent:'center'
    },
    mask_container:{
        width:DeviceInfo.width,
        height:DeviceInfo.height,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'flex-end'
    }
})