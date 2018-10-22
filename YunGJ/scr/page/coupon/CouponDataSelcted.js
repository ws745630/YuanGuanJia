/*
 *  优惠券不可用日期
 */
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import SelectedIconText from '../../component/iconText/SelectedIconText'
import {Actions} from 'react-native-router-flux'
import { BaseComponent } from '../../component/base/BaseComponent'
import {Theme,ScaleSize,ScaleText,Toast} from '../../utils/FileReference'

export default class CouponNoDateSelcted extends BaseComponent 
{
    constructor(props){
        super(props)
        this.state={
            weeklist:this.props.list,
            selectList:[],
            title:this.props.list.title
        }
    }
    navigationBarProps() {
        return {
          title: this.state.title,
          rightTitle: '确认',
          titleStyle: {
            color: 'white'
          },
          rightTitleStyle: {
            color: Theme.mainColor
          },
          
        }
      }
    
      onRightPress() {
        this.onRightClick()
      }
     _render(){
         return(
         <ScrollView style={styles.container}>
            {this.createItem(this.state.weeklist)}
            <View style={styles.btn_container}>
              <TextButton style={[styles.textBtn]} title='全选' textBtnClick={()=>{this.allSelectedClick()}}/>
              <TextButton style={styles.textBtn} title='取消' textBtnClick={()=>{this.cancelSelectedClick()}}/>
            </View>
         </ScrollView>
         )
     }
    //  创建Item
     createItem(weekList){
        var list = [];
        for(var  i = 0,len = weekList.length;i < len;i++){
            var item = weekList[i];
            list.push(
                <SelectedIconText key={i} text={item.week||item.typeName||item.mchtName} index={i} selected={item.selected}
                selectedAtText={(text,index,selected)=>{this.selectedAtItem(text,index,selected)}}/>
            )
        }
        return list
     }  

    //  点击Iitem
     selectedAtItem(text,index,selected){
        var item = this.state.weeklist[index];
        item.selected = selected;
     } 

    //  全选按钮
    allSelectedClick(){
        var list = this.state.weeklist;
        list.map((item)=>{
            item.selected = true;
        })
        this.setState({weeklist:list,})
    }
    // 取消按钮
    cancelSelectedClick(){
        var list = this.state.weeklist;
        list.map((item)=>{
            item.selected = false;
        })
        this.setState({weeklist:list,})
    }
    // 确认按钮
    onRightClick(){
        var list = [];
        this.state.weeklist.map((data)=>{
            if(data.selected === true){
                list.push(data);
            }
        })
        if(list.length < 0){
            Toast.show('请至少选择一项')
            return ;
        }
        this.props.callBack(list);
        Actions.pop()
    }
}

class TextButton extends Component
{
    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.textBtnClick}>
                    <View style={styles.textBtn_bg}>
                        <Text style={styles.textBtn_text}>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    selIcon_container: {
        height: ScaleSize(60),
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    icon: {
        paddingLeft: ScaleSize(10),
    },
    selIcon_text: {
        fontSize: ScaleText(20),
        paddingLeft: ScaleSize(10),
    },
    btn_container: {
        flexDirection: 'row',
        marginTop: ScaleSize(20),
    },
    textBtn: {
        marginLeft: ScaleSize(20),
        marginRight: ScaleSize(20),
    },
    textBtn_bg: {
        marginRight: ScaleSize(20),
        marginLeft: ScaleSize(20),
        backgroundColor: Theme.mainColor,
        borderRadius: ScaleSize(6),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn_text: {
        fontSize: ScaleText(15),
        color: 'white',
        paddingTop: ScaleSize(15),
        paddingBottom: ScaleSize(15),
    }
})