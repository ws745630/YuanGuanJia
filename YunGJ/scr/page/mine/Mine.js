/*
 * 设置 
 * Create 2018-09-21 
 * describe  
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,Alert} from 'react-native';
import BackIcon from 'react-native-vector-icons/EvilIcons'

import NetWorkTool from '../../public/network/NetWorkTool';
import { Actions } from 'react-native-router-flux';
import {Theme,DeviceInfo,ScaleSize,ScaleText} from '../../public/FileReference'

export default class Mine extends Component
{
    render(){
        return (
        <View style={styles.container}>
        {/* 个人信息 */}
           <View style={styles.perInfocontainer}>
           {/* 头像 */}
             <Image
             style={styles.headSize} 
             source={require('../../images/home/home_follow.png')}>
             </Image>
             {/* 个人信息 */}
              <View style={styles.perInfo_Bg}>
                <Text style={styles.perInfoTop}>店长(1001)</Text>
                <Text style={styles.perInfoBottom}>工号(1001)</Text>
              </View>
              <BackIcon style={styles.arrowRight} name='chevron-right' size={40} color='#bbb'></BackIcon>
           </View>
           {/* 店员信息 */}
           <View style={styles.staffcontainer}>
             {/* 店员标签 */}
              <View style={styles.staffTop}>
                <Text style={styles.staff}>店员</Text>
                <Text style={styles.look_AllStaff}>查看全部店员</Text>
                <BackIcon name='chevron-right' size={40} color='#bbb'></BackIcon>
              </View>
              {/* 添加店员 */}
              <View style={styles.addStaffcontainer}>
                 <BackIcon name='plus' size={40} color='#bbb'></BackIcon>
                 <Text>添加员工</Text>
                 <BackIcon style={styles.arrowRight} name='chevron-right' size={40} color='#bbb'></BackIcon>
              </View>
              {/* 删除员工 */}
              <View style={styles.removeStaffcontainer}>
                 <Text style={styles.removeStaff_Text}>移除员工</Text>
                 <BackIcon style={styles.arrowRight} name='chevron-right' size={40} color='#bbb'></BackIcon>
              </View>

              <View style={styles.otherItem}>
                 <Text style={styles.removeStaff_Text}>修改密码</Text>
                 <BackIcon style={styles.arrowRight} name='chevron-right' size={40} color='#bbb'></BackIcon>
              </View>
          
              <View style={styles.otherItem}>
                 <Text style={styles.removeStaff_Text}>消息</Text>
                 <BackIcon style={styles.arrowRight} name='chevron-right' size={40} color='#bbb'></BackIcon>
              </View>

               <View style={styles.otherItem}>
                 <Text style={styles.removeStaff_Text}>关于我们</Text>
                 <BackIcon style={styles.arrowRight} name='chevron-right' size={40} color='#bbb'></BackIcon>
              </View>
           </View>
           <Text style={styles.lognOut} onPress={this.loginOutClick.bind(this)}>退出登录</Text>
        </View>);
    }

    loginOutClick(){
        Alert.alert('是否退出当前账号', '', [{
            text: "取消",
            style:'cancel'
        },{
            text:'确定',
            style:'default',
            onPress:()=>{
                NetWorkTool.matchLoginOut(result=>{
                    Actions.popTo('Login')
                })
            }
        }]);
        
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#eee',
    },
    perInfocontainer:{
        backgroundColor:'white',
        width:DeviceInfo.deviceWidth,
        height:ScaleSize(100),
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },
    headSize:{
        width:ScaleSize(60),
        height:ScaleSize(60),
        marginLeft:ScaleSize(15),
        marginRight:ScaleSize(16),
    },
    perInfoTop:{
       fontSize:ScaleText(16),
       marginBottom:ScaleSize(10),
    },
    perInfoBottom:{
        fontSize:ScaleText(16),
        color:'#ccc',
    },
    arrowRight:{
        position:'absolute',
        right:0,
    },
    staffcontainer:{
        flex:1,
        backgroundColor:'white',
    },
    staffTop:{
        width:DeviceInfo.deviceWidth,
        height:ScaleSize(50),
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        marginTop:ScaleSize(50),
        alignItems:'center',
    },
    staff:{
        fontSize:ScaleText(16),
        flex:1,
        marginLeft:ScaleSize(10),
    },
    look_AllStaff:{
        fontSize:ScaleText(16),
        flex:1,
        textAlign:'right'
    },
    addStaffcontainer:{
        backgroundColor:'white',
        width:DeviceInfo.deviceWidth,
        height:ScaleSize(45),
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
    },
    removeStaffcontainer:{
        backgroundColor:'white',
        justifyContent:'center',
        width:DeviceInfo.deviceWidth,
        height:ScaleSize(60),
        borderBottomWidth:ScaleSize(10),
        borderBottomColor:'#eee',   
    },
    removeStaff_Text:{
        marginLeft:ScaleSize(10),
        fontSize:ScaleText(16),
    },
    otherItem:{
        justifyContent:'center',
        width:DeviceInfo.deviceWidth,
        height:ScaleSize(50),
        borderBottomWidth:1,
        borderBottomColor:'#eee', 
    },
    lognOut:{
        backgroundColor:Theme.mainColor,
        width:DeviceInfo.width,
        height:ScaleSize(44),
        position:'absolute',
        bottom:0,
        textAlign:'center',
        lineHeight:ScaleSize(44),
        color:'white',
        fontSize:ScaleText(17),
    }

})