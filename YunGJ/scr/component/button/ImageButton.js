
import React, { Component } from 'react' 
import {View,TouchableOpacity,Text,StyleSheet}  from 'react-native'
import BusiIcon from '../icon/BusiIcon'
import { ScaleSize, ScaleText } from '../../public/Fit'
export default class ImageButton  extends Component { 
 render(){
   return(
            <View style={[styles.coupon_tool,this.props.imageBtnStles]}>
                <TouchableOpacity onPress={this.props.ItemClick}>
                    <View style={styles.coupon_tool}>
                        <BusiIcon name={this.props.iconName} size={19}></BusiIcon>
                        <Text style={styles.coupon_tool_text}>{this.props.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>)
 }
 ItemClick(){
     this.props.ImageBtnClick()
 }
}
/** 样式表 */ 
const styles = StyleSheet.create({
    coupon_tool: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingTop: ScaleSize(5),
        paddingBottom: ScaleSize(5),
        backgroundColor: 'white'
    },
    coupon_tool_text: {
        fontSize: ScaleText(15),
        marginLeft: ScaleSize(5),
    },
 })
