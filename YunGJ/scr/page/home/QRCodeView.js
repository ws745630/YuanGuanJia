import React, { Component } from 'react'
import QRCode from 'react-native-qrcode'
import { Theme, DeviceInfo, ScaleSize, ScaleText } from '../../utils/FileReference'


import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    AsyncStorage
} from 'react-native'

//定义一些全局的变量
var cols = 2
var boxW = 80
var vMargin = (DeviceInfo.width - cols * boxW) / (cols + 1)
var hMargin = 30
let Sudoku = [{ title: '二维码', image: require('../../images/home/paycode_qrcode.png') },
{ title: '收款码', image: require('../../images/home/paycode_payment.png') }
]

const CODE_URL = 'http://yq.s2clouds.com/evt.html#!'

export default class QRCodeView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            codetext: '',
        }
    }

    componentWillMount() {
        AsyncStorage.getItem("userInfo").then(json => {
            var userInfo = JSON.parse(json)
            this.setState({
                codetext: CODE_URL + 'afterLogin=/positiveScan?t=' + userInfo.usr.tlrNo + '&m=' + userInfo.usr.mchtId,
            })
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <MildItem codetext={this.state.codetext}></MildItem>
                <Text style={styles.otherinfotext}>如扫描失败,请尝试其他收款方式</Text>
                <View style={styles.lineView}></View>
                {/* 底部布局 */}
                <View style={styles.bottomContainr}>{this.bottomView()}</View>
            </View>)
    }
    bottomView() {
        // 定义数组装所有的子组件
        var allBadge = []
        for (var i = 0 ; i < Sudoku.length;i++) {
            // 取出每一个数据对象
            var badge = Sudoku[i]
            allBadge.push(
                <Item key={i}
                    title={badge.title}
                    image={badge.image}
                    ItemClick={(this.ItemClick.bind(this, badge))}
                />
            )
        }
        // 返回数组
        return allBadge
    }

    // 功能菜单点击事件
    ItemClick(data) {
        // Alert.alert(data.title)
        var title = data.title
        console.log(title)
        if (title == '收款码') {
            const { navigate } = this.props.navigation
            navigate('Payment')
        }
    }
}

class MildItem extends Component {


    render() {
        return (
            <View style={styles.mildView}>
                <View style={styles.topView}>
                    <Text style={styles.topText}>商户账号码</Text>
                </View>
                <View style={styles.codeview}>
                    <QRCode
                        value={this.props.codetext}
                        size={(DeviceInfo.width - 50) / 2}
                        bgColor='black'
                        fgColor='white' />

                </View>
                <Text style={styles.infotext}>扫此二维码,用户可轻松完成扣款付款</Text>
                <TouchableOpacity onPress={() => { Alert.alert(this.props.codetext) }}>
                    <Text style={styles.savetext}>保存此二维码</Text>
                </TouchableOpacity>



            </View>
        )
    }
}

class Item extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.ItemClick}>
                <View style={styles.outViewStyle}>
                    <Image style={styles.iconStyle} source={this.props.image}></Image>
                    <Text style={styles.mainTitleStyle}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#37a920',
    },
    mildView: {
        flexDirection: 'column',
        width: DeviceInfo.width - ScaleSize(50),
        height: DeviceInfo.width,
        marginLeft: ScaleSize(25),
        marginTop: ScaleSize(30),
        alignItems: 'center',
        backgroundColor: Theme.whiteColor,
        borderRadius: ScaleSize(5),
    },
    topView: {
        width: DeviceInfo.width - ScaleSize(50),
        height: ScaleSize(50),
        marginTop: 0,
        alignItems: 'center',
        backgroundColor: '#EBEBEB',
        borderTopLeftRadius: ScaleSize(5),
        borderTopRightRadius: ScaleSize(5),
    },
    topText: {
        height: ScaleSize(50),
        fontSize: ScaleText(17),
        color: 'black',
        backgroundColor: '#EBEBEB',
        textAlign: 'center',
        lineHeight: ScaleSize(50),
    },
    codeview: {
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
        marginTop: ScaleSize(30),
        width: (DeviceInfo.width - ScaleSize(50)) / 2,
        height: (DeviceInfo.width - ScaleSize(50)) / 2,
    },
    infotext: {
        marginTop: ScaleSize(10),
        height: ScaleSize(50),
        fontSize: ScaleText(15),
        color: '#666666',
        textAlign: 'center',
        lineHeight: ScaleSize(50),
    },

    savetext: {
        height: ScaleSize(50),
        fontSize: ScaleText(17),
        color: '#37a920',
        textAlign: 'center',
        lineHeight: ScaleSize(50),
        marginBottom: 0,
    },
    otherinfotext: {
        marginTop: ScaleSize(10),
        height: ScaleSize(50),
        fontSize: ScaleText(17),
        color: Theme.whiteColor,
        textAlign: 'center',
        lineHeight: ScaleSize(50),
    },
    lineView: {
        width: DeviceInfo.width - ScaleSize(50),
        height: 1,
        marginLeft: ScaleSize(25),
        marginTop: 0,
        alignItems: 'center',
        backgroundColor: Theme.whiteColor,
    },
    bottomContainr: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    outViewStyle: {
        alignItems: 'center',
        width: boxW,
        height: boxW,
        marginLeft: vMargin,
        marginTop: hMargin
    },
    iconStyle: {
        width: ScaleSize(40),
        height: ScaleSize(40),
        marginBottom: ScaleSize(10)
    },
    mainTitleStyle: {
        color: Theme.whiteColor,
    },
})

