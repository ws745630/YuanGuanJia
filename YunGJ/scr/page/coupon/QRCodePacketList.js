/*
 *  二维码包列表
 */

import React, { Component } from 'react'  
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ImageBackground,
    TouchableOpacity
} from 'react-native'  
import {Actions} from 'react-native-router-flux'
import { BaseComponent } from '../../component/base/BaseComponent'
import {Theme,DeviceInfo,ScaleSize,ScaleText} from '../../utils/FileReference'
import QRCode from 'react-native-qrcode'  
import NetWorkTool from '../../utils/network/NetWorkTool'  
import BusiInfo from '../../utils/BusiInfo'  

export default class QRCodePacketList extends BaseComponent {

    navigationBarProps() {
        return {
            rightTitle: '管理',
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
            PacketList:[],
        }
    }
    componentWillMount() {
        var parmars = {
            couponId: this.props.couponInfo.couponId,
            mchtId: this.props.couponInfo.mchtId,
            agent: BusiInfo.userInfo.usr.mchtId,
            flag: '0',
        }
        NetWorkTool.ScanAgentQRList(parmars, (result => {
this.setState({PacketList:this.state.PacketList.concat(result)})

        }))

    }


    _render() {
        return (
            <View style={styles.container}>
            <FlatList style={styles.FlatListView}
            data={this.state.PacketList}
            keyExtractor={(item, index) => index}
            renderItem={this.renderLikeItem}
            numColumns={2}
        />
                <View style={styles.bottonView}>
                    <Text style={styles.creattext}>新建二维码</Text>
                </View>
            </View>
        )
    }

    renderLikeItem = ({ item }) => {

        return (
            <View style={styles.likeItem}>
            <Text style={styles.tlrNoText}>员工号{item.tlrNo}</Text>
            <TouchableOpacity onPress={() => { Actions.QRcodePacket({qrID: item.qr.qrId}) }}>
            <ImageBackground style={styles.ImageBackground} source={require('../../images/coupon/QRCodePakeBg.png')}>
            <View style={styles.mildView}>
            <View style={styles.codeview}>
                <QRCode
                    value={item.link}
                    size={DeviceInfo.width/2 -ScaleSize(70)}
                    bgColor='black'
                    fgColor='white' />
            </View>
            <Text style={styles.typetext}>{item.qr.num}张 </Text>
        </View>
            </ImageBackground>
            </TouchableOpacity>
               
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.contentColor,
    },
    FlatListView:{
       marginBottom:ScaleSize(80)
    },
    //底部新建按钮布局
    bottonView: {
        backgroundColor: Theme.contentColor,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: ScaleSize(80),
    },
    creattext: {
        marginLeft: ScaleSize(20),
        marginRight: ScaleSize(20),
        marginTop: ScaleSize(20),
        color: 'white',
        width: DeviceInfo.width - ScaleSize(40),
        height: ScaleSize(44),
        fontSize: ScaleText(16),
        textAlign: 'center',
        lineHeight: ScaleSize(44),
        backgroundColor: '#27AD46',
        borderRadius: ScaleSize(14),
    },
    likeItem:{
        width:DeviceInfo.width/2 -ScaleSize(15),
        marginLeft:ScaleSize(5),
        marginRight:ScaleSize(5),
        marginBottom:ScaleSize(15),
    },
    tlrNoText: {
        marginTop:ScaleSize(20),
        height: ScaleSize(30),
        fontSize: ScaleText(17),
        color: 'black',
        textAlign: 'center',
        lineHeight: ScaleSize(30),
    },
    ImageBackground: {
        marginLeft: ScaleSize(10),
        marginRight: ScaleSize(10),
        height: (DeviceInfo.width/2 -ScaleSize(35)) / 0.76,
        // alignItems: 'center',
    },
    mildView: {
        flex: 1,
        width: DeviceInfo.width/2 -ScaleSize(35),
        marginTop: ScaleSize(40),
        // backgroundColor: 'red',
    },
    codeview: {
        marginLeft: ScaleSize(15),
        backgroundColor: Theme.whiteColor,
        justifyContent: 'center',
        width: DeviceInfo.width/2 -ScaleSize(70),
        height: DeviceInfo.width/2 -ScaleSize(70),
        opacity: 1,
    },
    typetext: {
        position: 'absolute',
        bottom: ScaleSize(10),
        left: ScaleSize(20),
        color: 'black',
        height: ScaleSize(20),
        fontSize: ScaleText(15),
        textAlign: 'left',
        lineHeight: ScaleSize(20),
    },
    likeImg:{
        width: DeviceInfo.width/2 -ScaleSize(15),
        height: DeviceInfo.width/2 -ScaleSize(15),
        backgroundColor:'#f4f4f4'
    },
    likeDesc:{
        backgroundColor:'#F1ECE2',
        color:'#9F8A60',
        paddingTop:ScaleSize(8),
        paddingBottom:ScaleSize(8),
        paddingLeft:ScaleSize(4),
        paddingRight:ScaleSize(4),
    },
    likeTitle:{
        fontSize:ScaleText(14),
        color:'#666',
        marginTop:ScaleSize(8),
        marginBottom:ScaleSize(4),
    },
    likePrice:{
        fontSize:ScaleText(14),
        color:'#b4282d',
    }

})