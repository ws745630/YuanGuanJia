/*
 * 商品列表 
 * Create 2018-09-30 
 * describe  
 */

import React, { Component } from 'react'
import { 
    View, 
    StyleSheet,
    Text 
} from 'react-native'
import { Actions } from 'react-native-router-flux'



export default class extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <View style={styles.container}>
                 <Text onPress={()=>{Actions.AddCommodityType()}}>商品列表</Text>
            </View>
        )
    }
   /* 创建商品菜单 */
    _createCommodityMeun(){
        var list = ['商品管理','商品']
    }
}

/** 样式表 */ 
const styles = StyleSheet.create({
       container:{
          flex:1,
       },
       commodityMeun:{
           flex:1,
           flexDirection:'row',
       }
})