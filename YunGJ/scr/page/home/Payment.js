import React, { Component } from 'react'  
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native'  
import NetWorkTool from '../../public/network/NetWorkTool'  
import {Actions} from 'react-native-router-flux'  
import {Theme,DeviceInfo,ScaleSize,ScaleText} from '../../public/FileReference'

export default class Payment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            createAmt: '',
            noDiscountAmt: '',
            deskNum: '',
            mchtId:'',
            mchtName:'',
            tlrNo:'',

        }
    }
    componentWillMount() {
        AsyncStorage.getItem("userInfo").then(json => {
            var userInfo = JSON.parse(json)  
            this.setState({
                mchtId: userInfo.usr.mchtId,
                mchtName: userInfo.mchtName,
                tlrNo: userInfo.usr.tlrNo,
            })
        })  
    }

    render() {
        return (
        
            <View style={styles.container} onPress={() => {
                var dismissKeyboard = require('dismissKeyboard')  
                 dismissKeyboard()  
            }}>
                <View style={styles.topview}>
                    <Image style={styles.iconStyle} source={require('../../images/home/remind_icon.png')}></Image>
                    <Text style={styles.tiptext}>注意: “消费总金额”为全单金额</Text>
                </View>
                <View style={styles.inputview}>
                    <Text style={styles.lefttext}>消费总金额</Text>
                    <TextInput style={styles.txtInput} 
                    placeholder={'输入总金额(元)'} 
                    clearButtonMode={'while-editing'} 
                    keyboardType={'numeric'} 
                    onChangeText={(text) => { this.setState({ createAmt: text }) }} 
                    />
                </View>
                <View style={styles.line1View}>
                </View>
                <View style={styles.inputview}>
                    <Text style={styles.lefttext}>不参与优惠金额</Text>
                    <TextInput style={styles.txtInput} 
                    placeholder={'输入金额(元)'} 
                    clearButtonMode={'while-editing'} 
                    keyboardType={'numeric'}
                    onChangeText={(text) => { this.setState({ noDiscountAmt: text }) }} 
                 />
                </View>
                <View style={styles.line2View}>
                </View>
                <View style={styles.inputview}>
                    <Text style={styles.lefttext}>桌号</Text>
                    <TextInput style={styles.txtInput} 
                    placeholder={'输入桌号，不易遗漏'} 
                    clearButtonMode={'while-editing'} 
                    keyboardType={'number-pad'} 
                    onChangeText={(text) => { this.setState({ deskNum: text }) }} 
                    />
                </View>
                <TouchableOpacity onPress={() => {
                    this._orderHander()  
                }}>
                    <Text style={styles.suretext}>生成订单</Text>
                </TouchableOpacity>
            </View>
           
        )  
    }
    _orderHander(){
        var dismissKeyboard = require('dismissKeyboard')  
        dismissKeyboard()  

        if (!this.state.createAmt) {
            Alert.alert('消费总金额不能为空')
            return  
        }
        if (this.state.createAmt.toString.length < 0) {
            Alert.alert('消费总金额不能为空')
            return  
        }
        if (parseFloat(this.state.createAmt) > 100000.00) {
            Alert.alert('总金额应小于100000')
            return  
        }
        if (parseFloat(this.state.noDiscountAmt) > parseFloat(this.state.createAmt)) {
            Alert.alert('不参与优惠金额不能大于消费总金额')
            return  
        }
        // Alert.alert(this.props.navigation.state.params.textvalue1)  
 // const { navigate } = this.props.navigation  
                    // navigate( 'MchtCode')  
                    /**
 createAmt (number, optional): 创单金额 ,
 deskNum (string, optional): 桌号 ,
 mchtId (integer, optional): 商户id ,
 mchtName (string, optional): 商户名称 ,
 noDiscountAmt (number, optional): 不打折金额 ,
 tlrNo (string, optional): 员工号
 */
        var parmas = {
            createAmt: parseFloat(this.state.createAmt),
            noDiscountAmt: parseFloat(this.state.noDiscountAmt),
            deskNum: this.state.deskNum,
            mchtId:parseInt(this.state.mchtId),
            mchtName:this.state.mchtName,
            tlrNo:this.state.tlrNo,

        }  

        NetWorkTool.TxnCreateOrder(parmas,(result) => {
            Actions.MchtCode({orderIdStr:result})  
            
            // const { navigate } = this.props.navigation  
            // navigate('MchtCode',{orderIdStr:result})  
        })

    }


}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Theme.contentColor,
    },
    topview: {
        width: DeviceInfo.width,
        height: 30,
        flexDirection: 'row',
        backgroundColor: '#FCF1BA',
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginLeft: 10,
        marginTop: 5,

    },
    tiptext: {
        height: 30,
        fontSize: ScaleText(15),
        color: '#666666',
        textAlign: 'left',
        lineHeight: 30,
        marginLeft: 10,
    },
    inputview: {
        width: DeviceInfo.width,
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    line1View: {
        width: DeviceInfo.width,
        height: 2,
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
    },
    line2View: {
        width: DeviceInfo.width,
        height: 4,
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
    },
    lefttext: {
        marginLeft: 16,
        height: 45,
        fontSize: ScaleText(17),
        color: Theme.blackColor,
        textAlign: 'left',
        lineHeight: 45,
    },
    txtInput: {
        flex: 1,
        marginLeft: 10,
        right: 16,
        width: DeviceInfo.width / 2,
        height: 45,
        fontSize: ScaleText(17),
        textAlign: 'right',
        lineHeight: 45,
    },
    suretext: {
        color: 'white',
        marginLeft: 20,
        marginTop: 40,
        width: DeviceInfo.width - 40,
        height: 45,
        fontSize: ScaleText(15),
        textAlign: 'center',
        lineHeight: 45,
        backgroundColor: '#27AD46',
        borderRadius: ScaleSize(5),
    },

})  

