/*
 * 新增商品类型 
 * Create 2018-09-30 
 * describe  
 */
import React, { Component } from 'react'
import { View, StyleSheet,Text,Image,TextInput,TouchableOpacity} from 'react-native'
import { Actions } from 'react-native-router-flux'
import ArrowIcon from 'react-native-vector-icons/EvilIcons'
import {DeviceInfo,ScaleSize,ScaleText,Toast,Theme}  from '../../utils/FileReference'
import { Button } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker'


//图片选择器参数设置
const options = {
    title: '请选择图片',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'相册图片',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class AddCommodityType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comImage:null,//商品图片
            comname:'',//商品名称
            commoney:0,//商品价格
            comtype:'', //商品类型
        }
       
    }

    render() {
        return (
            <View style={styles.constainer}>
                <View style={styles.top_constainer}>
                    <TouchableOpacity onPress={()=>{this.selectedImage()}}>
                    <Image style={styles.headImg} source={this.props.comImage}></Image>
                    </TouchableOpacity>
                   <Text style={styles.addCommodityPic}>添加商品照片</Text>
                </View>
                <View style={styles.bottom_constainer}>
                    <TitleTextInput leftText='商品名称' placeholder='请输入商品名称' onChangeText={(text)=>{this.setState({comname:text})}} />
                    <TitleTextInput leftText='商品价格' placeholder='请输入商品价格' onChangeText={(text)=>{this.setState({comname:text})}} />
                    <TitleTextInput leftText='商品类型' placeholder='请输入商品类型' onChangeText={(text)=>{}}/>
                </View>
                
                <Button buttonStyle={styles.create_buttonStyle}
                    containerStyle={styles.containerStyle}
                    titleStyle={{ color: 'white' }}
                    title="保存"
                    onPress={() => { Actions.AddAndEditCoupon() }} />
            </View>
            )
    }

    // 事件 
    // 选择商品图片
    selectedImage(){
       ImagePicker.showImagePicker(options,(response)=>{
        if(response.didCancel) {
            console.log('用户取消了选择！');
        } else if (response.error) {
            alert("ImagePicker发生错误：" + response.error);
        } else if (response.customButton){
            alert("自定义按钮点击：" + response.customButton)
        } else {
            let source = {uri:response.uri};
            this.setState({comImage:source});
        }
       })
    }
    
}


class TitleTextInput extends Component {
    render() {
        return (
            <View style={styles.titleInput_contanint}>
                <Text style={styles.titleInput_letfText}>{this.props.leftText}</Text>
                <TextInput style={styles.titleInput_rightText}
                    placeholder={this.props.placeholder}
                    keyboardType={this.props.keyboardType}
                    onChangeText={(text) => this.props.onChangeText(text)}>
                </TextInput>
                <ArrowIcon name='chevron-right' size={30} color='#909090'></ArrowIcon>
            </View>
        )
    }
}

/** 样式表 */ 
const styles = StyleSheet.create({
        constainer:{
            backgroundColor:'red',
            width:DeviceInfo.width,
            height:DeviceInfo.height,
        },
        top_constainer:{
            backgroundColor:'white',
            alignItems:'center',
            borderBottomWidth:ScaleSize(10),
            borderBottomColor:'#f2f2f2',
            paddingTop:ScaleSize(40),
            paddingBottom:ScaleSize(20),
        },
        headImg:{
            width:ScaleSize(80),
            height:ScaleSize(80),
            borderRadius:ScaleSize(40),
            backgroundColor:'#f2f2f2',
            marginBottom:ScaleSize(20),
        },
        addCommodityPic:{
            color:Theme.mainColor,
            fontSize:ScaleText(15),
        },
        bottom_constainer:{
            
        },
        titleInput_contanint: {
            flexDirection: 'row',
            width: DeviceInfo.width,
            height: ScaleSize(44),
            paddingLeft: ScaleSize(20),
            paddingRight: ScaleSize(20),
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 1,
            alignItems: 'center',
            backgroundColor: 'white',
        },
        titleInput_letfText: {
            fontSize: ScaleText(17),
        },
        titleInput_rightText: {
            fontSize: ScaleText(16),
            flex: 1,
            textAlign: 'right',
        },
        containerStyle:{
            position:'absolute',
            bottom:10,
            left:10,
        },
        create_buttonStyle: {
            
            backgroundColor:'white',
            backgroundColor: Theme.mainColor,
            marginLeft: ScaleSize(15),
            marginRight: ScaleSize(15),
            height:ScaleSize(44),
            borderRadius:ScaleSize(10),
        }
})