/*
 *  二维码包详情页
 */
import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Image,
    Alert,
    AsyncStorage,
    Button
} from 'react-native' 
import NetWorkTool from '../../public/network/NetWorkTool' 
import { BaseComponent } from '../../component/base/BaseComponent'
import {Actions} from 'react-native-router-flux' 
import QRCode from 'react-native-qrcode'
import BusiInfo from '../../public/BusiInfo'
import {Theme,DeviceInfo,ScaleSize,ScaleText} from '../../public/FileReference'

 

export default class QRcodePacket extends BaseComponent {

    navigationBarProps() {
        return {
            rightTitle: '分享',
            rightTitleStyle: {
                color: Theme.mainColor
            },
        }
    }
    // 导航栏右按钮点击
    onRightPress() {
        alert('123') 
    }

    constructor(props) {
        super(props) 
        this.state = {
            QRDetailModel: {},
            qwer:'1234',

        } 
    }

    componentWillMount() {
        var parmars = {
            qrId: this.props.qrID,
        }
        NetWorkTool.ScanDetail(parmars, (result => {

            var couponQrArr = result.couponQr 
            var model = couponQrArr[0] 
            this.setState({ QRDetailModel: model }) 

        }))

    }
   

    _render() {
      
        return (
            <View style={styles.container}>
                <Text style={styles.tlrNoText}>员工号:{BusiInfo.userInfo.usr.tlrNo} </Text>
                <CodePacket QRDetailModel={this.state.QRDetailModel}></CodePacket>
                <TouchableOpacity onPress={() => {this._clerncodePacket()}}>
                    <Text style={styles.removeText}>清除二维码包 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.suretext}  onPress={() => {this._savetophone()}}>
                    <Text style={styles.suretext2}>将二维码包保存到手机 </Text>
                </TouchableOpacity>
            </View>

        ) 
    }
    _clerncodePacket() {
      
        Alert.alert('清除') 
    }
    _savetophone() {
        Alert.alert('保存') 
    }
    onRight(){
        Alert.alert('保存')   
    }


}
const getreultStr = (denomination,type) => {
    var reultStr='' 
    
    if (type === 'rebate')
    {
        reultStr = denomination*0.1.toString()+'折扣券' 

       
    }else if (type === 'voucher')
    {
        reultStr = denomination.toString()+'抵用券' 
        
    }else if (type==='cash')
    {
        reultStr = denomination.toString()+'代金券' 
        
    }else if (type === 'present')
    {
        reultStr = denomination.toString()+'礼品券' 
       
    }else if (type==='ticket')
    {
        reultStr = denomination.toString()+'票务' 
    }
    return reultStr 
}


class CodePacket extends Component {

    render() {
        return (
            <ImageBackground style={styles.ImageBackground} source={require('../../images/coupon/QRCodePakeBg.png')}>
                <View style={styles.mildView}>
                    <Text style={styles.mchtText}>{this.props.QRDetailModel.mchtName} </Text>
                    <View style={styles.codeview}>
                        <QRCode
                            value={this.props.QRDetailModel.link}
                            size={DeviceInfo.width - ScaleSize(180)}
                            bgColor='black'
                            fgColor='white' />
                    </View>
                    <Text style={styles.mchtText}>{this.props.QRDetailModel.name} </Text>
                    <Text style={styles.typetext}>{getreultStr(this.props.QRDetailModel.denomination,this.props.QRDetailModel.type)} </Text>
                    <Text style={styles.numtext}>{this.props.QRDetailModel.num}张 </Text>
                </View>


            </ImageBackground>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.contentColor,
    },
    tlrNoText: {
        height: ScaleSize(50),
        fontSize: ScaleText(17),
        color: 'black',
        textAlign: 'center',
        lineHeight: ScaleSize(50),
    },
    removeText: {
        marginTop: ScaleSize(20),
        height: ScaleSize(20),
        fontSize: ScaleText(13),
        color: Theme.mainColor,
        textAlign: 'center',
        lineHeight: ScaleSize(20),
    },
    suretext: {
        position: 'absolute',
        bottom: ScaleSize(20),
        left: ScaleSize(20),
        right: ScaleSize(20),
        color: 'white',
        width: DeviceInfo.width - ScaleSize(40),
        height: ScaleSize(45),
        fontSize: ScaleText(15),
        textAlign: 'center',
        lineHeight: ScaleSize(45),
        backgroundColor: '#27AD46',
        borderRadius: ScaleSize(5),
    },
    suretext2: {
        flex:1,
        color: 'white',
        height: ScaleSize(45),
        fontSize: ScaleText(15),
        textAlign: 'center',
        lineHeight: ScaleSize(45),
      
    },

    ImageBackground: {
        marginLeft: ScaleSize(50),
        marginRight: ScaleSize(50),
        height: (DeviceInfo.width - ScaleText(100)) / 0.76,
        alignItems: 'center',
    },
    //商户名字
    mchtText: {
        marginLeft: ScaleSize(20),
        height: ScaleSize(30),
        fontSize: ScaleText(17),
        color: 'black',
        textAlign: 'left',
        lineHeight: ScaleSize(30),
    },
    mildView: {
        flex: 1,
        width: DeviceInfo.width - ScaleSize(100),
        marginTop: ScaleSize(50),
        // backgroundColor: 'red',
    },
    codeview: {
        marginLeft: ScaleSize(40),
        backgroundColor: Theme.whiteColor,
        justifyContent: 'center',
        width: DeviceInfo.width - ScaleSize(180),
        height: DeviceInfo.width - ScaleSize(180),
        opacity: 1,
    },
    typetext: {
        position: 'absolute',
        bottom: ScaleSize(10),
        left: ScaleSize(20),
        color: 'black',
        height: ScaleSize(30),
        fontSize: ScaleText(15),
        textAlign: 'left',
        lineHeight: ScaleSize(30),
    },
    numtext: {
        position: 'absolute',
        bottom: ScaleSize(10),
        right: ScaleSize(20),
        color: 'black',
        height: ScaleSize(30),
        fontSize: ScaleText(15),
        textAlign: 'right',
        lineHeight: ScaleSize(30),
    },

})

