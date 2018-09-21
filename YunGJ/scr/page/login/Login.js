import React, { Component } from 'react'
import {
    Alert,
    View,
    Image,
    TextInput,
    StyleSheet,
    Dimensions,
    Button,
    AsyncStorage
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import NetWorkTool from '../../public/network/NetWorkTool'
import BusiInfo from '../../public/BusiInfo'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {ScaleSize,ScaleText,Toast} from '../../public/FileReference'

const window = Dimensions.get('window')

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        //通过这句代码屏蔽 YellowBox
        console.disableYellowBox = true
        this.state = {
            mchtId: '',
            account: '',
            password: '',
            matchType: '0',
        }
    }
    componentWillMount() {
        AsyncStorage.getItem("userInfo").then(json => {
            var userInfo = JSON.parse(json)
            this.setState({
                mchtId: userInfo.usr.mchtId,
                account: userInfo.usr.usrAcc,
                password: userInfo.usr.loginPwd,
            })
            if(this.state.mchtId){
                this._mchtlogin()
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                {/* 商标 */}
                <Image source={require('../../images/login/welcome.png')} style={styles.welcomIocn} resizeMode={'center'} />
                {/* 输入框 */}
                <KeyboardAwareScrollView style={{ width: window.width, height: window.height}}
                                         ref='scroll'
                                         onKeyboardWillShow={(frames) => {
                                             console.log('键盘弹出时，键盘高度改变时：', frames)
                                         }}>
                  <View style={styles.userInfo}>
                    <TextInput style={styles.txtInput} value={this.state.mchtId} placeholder={'商户号'} clearButtonMode={'while-editing'} onChangeText={(text) => { this.setState({ mchtId: text }) }} />
                    <TextInput style={styles.txtInput} value={this.state.account} placeholder={'账号'} clearButtonMode={'while-editing'} onChangeText={(text) => { this.setState({ account: text }) }} />
                    <TextInput style={styles.txtInput} value={this.state.password} placeholder={'密码'} clearButtonMode={'while-editing'} secureTextEntry={true} onChangeText={(text) => { this.setState({ password: text }) }} />
                    {/* 确定按钮 */}
                    <View style={styles.sureButton}>
                        <Button title='确定' color='white' onPress={()=>{
                            this._mchtlogin()
                        }} />
                    </View>
                </View>
               </KeyboardAwareScrollView>
                

                {/* 其他登录 */}
                <Image style={styles.otherLoginFlag} source={require('../../images/login/otherCard.png')} resizeMode={'contain'} />
                <View style={styles.otherLogin}>
                    <Button title='商户身份登录' color='#3dc158' onPress={()=>{
                         this._mchtlogin()
                    }}/>
                </View>
            </View>
        )
    }

    _mchtlogin(){
        if (!this.state.mchtId) {
            Toast.show('商户号不能为空')
            return
        }
        if (!this.state.account) {
            Toast.show('账号不能为空')
            return
        }
        if (!this.state.password) {
            Toast.show('密码不能为空')
            return
        }
        var parmas = {
            mchtId: this.state.mchtId,
            usrAcc: this.state.account,
            loginPwd: this.state.password,
            versionNo: 'ios_4.2.4',
            loginType: '0'
        }
        NetWorkTool.getAccessToken((result) => {
            AsyncStorage.setItem('accessToken', result.accessToken)
            BusiInfo.accessToken = result.accessToken,
            NetWorkTool.matchLogin(parmas, (result) => {
                var userInfo = result
                userInfo.usr.loginPwd = this.state.password
                BusiInfo.usrId =  userInfo.usr.usrId,
                BusiInfo.token = userInfo.token,
                BusiInfo.usrType = userInfo.usr.usrType,
                BusiInfo.userInfo = userInfo
                BusiInfo.vote = userInfo.vote
                AsyncStorage.setItem('userInfo', JSON.stringify(result))
                console.log('用户信息:'+ JSON.stringify(userInfo))
                Toast.show('登录成功')
                Actions.Home({userInfo:userInfo})
            })
        })
    }
    _save
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    welcomIocn: {
        width: window.width - ScaleSize(60),
        height: ScaleSize(100),
        alignSelf: 'center',
        marginTop: ScaleSize(60),
    },
    userInfo: {
        marginTop: ScaleSize(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtInput: {
        height: ScaleSize(44),
        width: window.width - ScaleSize(60),
        alignSelf: 'center',
        borderColor: '#dbdbdb',
        borderWidth: 1,
        borderRadius: ScaleSize(3),
        textAlign: 'center'
    },
    sureButton: {
        marginTop: ScaleSize(30),
        width: window.width - ScaleSize(50),
        height: ScaleSize(44),
        backgroundColor: '#3dc158',
        borderRadius: ScaleSize(5),
        justifyContent: 'center',
    },
    otherLoginFlag: {
        position: 'absolute',
        width: window.width,
        bottom: ScaleSize(100),
        height: ScaleSize(14),
    },
    otherLogin: {
        position: "absolute",
        left: (window.width - ScaleSize(180)) / 2,
        bottom: ScaleSize(30),
        backgroundColor: '#F2F2F2',
        width: ScaleSize(180),
        height:ScaleSize(44),
        borderRadius: ScaleSize(22),
        borderWidth: 1,
        borderColor: '#3dc158',
        justifyContent: 'center',
    },

})