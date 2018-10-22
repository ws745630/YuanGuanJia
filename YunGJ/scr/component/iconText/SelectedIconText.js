
/*
 *  创建一个可选择ICon选择的Item
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import SelIcon from 'react-native-vector-icons/EvilIcons'
import UnSelIcon from 'react-native-vector-icons/Feather'
import {ScaleSize,ScaleText} from '../../utils/Fit'

export default class SelectedIconItem extends Component
{
    constructor(props){
        super(props)
        this.state = {
            select:false
        }
    }
    componentWillReceiveProps(nextProps){
      this.setState({select:nextProps.selected})
    }
    render(){
        var unIcon = <UnSelIcon style={styles.icon} name='circle' size={25} color='#dadadd' />;
        var selIcon = <SelIcon style={styles.icon} name='check' size={32} color='#37ab50'/>;
        var Icon = this.state.select ? selIcon : unIcon;
        return (
            <TouchableOpacity onPress={()=>(this.selectedIconItem())}>
                <View style={styles.selIcon_container}>
                    {Icon}
                    <Text style={styles.selIcon_text}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>  
        );
    }
    
    // 点击事件
    selectedIconItem(){
        let text = this.props.text;
        let index = this.props.index;
        let selected = !this.state.select;
        this.setState({select:selected})
        this.props.selectedAtText(text,index,selected);
    }


}
const styles = StyleSheet.create({
    selIcon_container:{
        height:ScaleSize(60),
        flexDirection:'row',
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        alignItems:'center',
        backgroundColor:'white'
    },
    icon:{
      paddingLeft:ScaleSize(10),
    },
    selIcon_text:{
        fontSize:ScaleText(20),
        paddingLeft:ScaleSize(10),
    }
})