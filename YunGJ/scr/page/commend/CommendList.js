
/*
 * 评论列表
 *  
 * Create 2018-09-14 
 * describe  
 */
import React, { Component } from 'react' 
import {View,StyleSheet,Text} from 'react-native'  
import Carousel from 'react-native-snap-carousel'
import {DeviceInfo,Theme}  from '../../public/FileReference'

export default class  extends Component { 
 constructor(props) {
  super(props) 
   this.state = {
       data:["张三","王三","李三","白三","徐三","啊三","季三","柯三",]
   }
  } 

 render(){
   return(
    <View style={{flex:1}}>
        <Carousel 
                data={this.state.data}
                renderItem={this._renderItem}
                sliderWidth={DeviceInfo.width}
                itemWidth={300}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                />
    </View>  
    )
 }
 _renderItem({item,index}){
     return (
         <View style={styles.contariner}> 
             <Text style={{color:'red',fontSize:40}}>{item}</Text>
         </View>
     )
 }
}
/** 样式表 */ 
const styles = StyleSheet.create({
      contariner:{
        width:300,
        height:200,
        backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
      } 
})