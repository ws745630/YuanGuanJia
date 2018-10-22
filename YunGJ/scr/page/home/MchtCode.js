import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import {Theme,DeviceInfo,ScaleSize,ScaleText} from '../../utils/FileReference'

import {
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    Image,
    Alert,
    AsyncStorage
} from 'react-native';

const CODE_URL = 'http://yq.s2clouds.com/evt.html#!';

export default class MchtCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codetext: '',
            address: '',
            orderSr:'',
        };
    }

    componentWillMount() {
        AsyncStorage.getItem("userInfo").then(json => {
            var userInfo = JSON.parse(json);
            this.setState({
                codetext: CODE_URL + 'afterLogin=/payIndex?o=' + this.props.navigation.state.params.orderIdStr + '&m=' + userInfo.usr.mchtId + '&t' + userInfo.usr.tlrNo,
                address:userInfo.mchtAddr,
                orderSr:this.props.navigation.state.params.orderIdStr,
                
            })
        });
    }
    render() {
        return (
            <ImageBackground style={styles.ImageBackground} source={require('../../images/home/payment_code_bg.png')}>
                <MildItem codetext={this.state.codetext} address ={this.state.address} orderSr = {this.state.orderSr}></MildItem>
            </ImageBackground>
            
        );
    }
}

class MildItem extends Component {

    render() {
        return (
            <View style={styles.mildView}>
                <View style={styles.topView}>
                    <Text style={styles.topText}>商家收款</Text>
                </View>
                <View style={styles.codeview}>
                    <QRCode
                        value={this.props.codetext}
                        size={DeviceInfo.width - 140}
                        bgColor='black'
                        fgColor='white' />
                </View>
                <View style={styles.whiteview}>
                    <Text style={styles.infotext}>订单号:{this.props.orderSr}</Text>
                    <Text style={styles.addresstext}>地址:{this.props.address}</Text>
                </View>



            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    ImageBackground: {
        flex: 1,
    },
    mildView: {
        flex: 1,
        width: DeviceInfo.width - 50,
        marginLeft: 25,
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center',
        backgroundColor: 'rgba(242, 242, 242, 0.8)',
        borderRadius: ScaleSize(5),

    },
    topView: {
        width: DeviceInfo.width - 50,
        height: 50,
        marginTop: 0,
        alignItems: 'center',
        backgroundColor: 'rgba(222, 231, 239, 0.8)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    topText: {
        height: 50,
        fontSize: 17,
        color: 'black',
        backgroundColor: '#EBEBEB',
        textAlign: 'center',
        lineHeight: 50,
    },
    codeview: {
        backgroundColor: Theme.whiteColor,
        justifyContent: 'center',
        marginTop: 30,
        width: DeviceInfo.width - 140,
        height: DeviceInfo.width - 140,
        opacity: 1,
    },

    whiteview: {
        marginLeft: 10,
        marginTop: 50,
        backgroundColor: Theme.whiteColor,
        width: DeviceInfo.width - 20,
        height: 80,
        opacity: 1,
    },
    infotext: {
        marginLeft: 30,
        height: 40,
        fontSize: 15,
        color: '#666666',
        textAlign: 'left',
        lineHeight: 40,
    },

    addresstext: {
        marginLeft: 30,
        height: 40,
        fontSize: 15,
        color: '#37a920',
        textAlign: 'left',
        lineHeight: 40,
        marginBottom: 0,
    },


})

