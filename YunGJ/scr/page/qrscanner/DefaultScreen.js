import React, { Component } from 'react';
import { StyleSheet,Text, Alert,View,TouchableOpacity } from 'react-native';
import { QRScannerView } from 'ac-qrcode';
import { Actions } from 'react-native-router-flux';
import BackIcon from 'react-native-vector-icons/EvilIcons'

export default class DefaultScreen extends Component {  

    constructor(props) {
        super(props)
        this.state = {
            index:0,
        }
    }

    render() {
    // var str = 'YQ://P=00&SC=05&V={"a":"5440787467,1,1348,10000317,rebate"}'
    //  var mdel = getVerificationModel(str);
    //  this.props.navigation.state.params.callback(getVerificationModel(str))
        return (
            <View style = {{backgroundColor:'rgb(0,0,0,0)', flex:1}}>
            
            <QRScannerView
                onScanResultReceived={this.barcodeReceived.bind(this)}
                renderTopBarView={() => this._renderTitleBar()}
                renderBottomMenuView={() => this._renderMenu()}
            />

            <BackIcon name={'chevron-left'}  size={80} style={styles.backView} onPress={() => {
                Actions.pop();
            }}></BackIcon>
            
           
          
            </View>
        )
    }

    _renderTitleBar() {
        return (
            <Text></Text>
        );
    }

    _renderMenu() {
        return (
            <Text></Text>
        )
    }

    barcodeReceived(e) {
       
        
        var typeStr = this.props.screenType;
        var codeValue = e.data.toString();
        if (codeValue.length > 0) {
            this.state.index++;
        }
        if (typeStr === 'yanquan') { 

            if (this.props.navigation.state.params.callback && this.state.index === 1) {
                Actions.pop();
                console.log('Type: ' + e.toString() + '\nData: ' + e.data.toString());
                console.log('index: ' + this.state.index.toString());
                this.props.navigation.state.params.callback(getVerificationModel(e.data))
               
            }
        } else if (typeStr === 'sweepSend') {
            if (this.props.navigation.state.params.callback && this.state.index === 1) {
                Actions.pop();
                console.log('Type: ' + e.toString() + '\nData: ' + e.data.toString());
                console.log('index: ' + this.state.index.toString());
                this.props.navigation.state.params.callback(getUserId(e.data))
                
            }
        }

    }
}

const getVerificationModel = codeInfo => {
    
    var verModel = {};
    let codeInfoStr = codeInfo.toString();
    var strArr = codeInfoStr.split("V=");
    var lastOne = strArr[1].toString();
    var obj = JSON.parse(lastOne);
    codeStr = obj.a;
    var strArr2 = codeStr.split(",");

    verModel = {
        couNo:strArr2[0],
        couponId:strArr2[1],
        userId:strArr2[2],
        couponMchtId:strArr2[3],
        couponType:strArr2[4],
    };
    return verModel;

}

const getUserId = codeInfo => {

    var codeStr;
    let codeInfoStr = codeInfo.toString();
    let HeaderStr = codeInfoStr.substr(0, 7);
    if (HeaderStr === 'YQ://P=') {
        let pStr = codeInfoStr.substr(7, 2);
        if (pStr === '00') {
            var strArr = codeInfoStr.split("V=");
            var lastOne = strArr[1].toString();
            var obj = JSON.parse(lastOne);
            codeStr = obj.usrId;
        } else {
            codeStr = "";
        }

    } else {
        codeStr = "";
    }

    return codeStr;
}

const styles = StyleSheet.create({
    backView: {
        position:'absolute',
        left: 20,
        top: 30,
        width:30,
        height:30,
       backgroundColor:'white'
       
    }
})