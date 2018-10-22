import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, TouchableOpacity, Alert, Dimensions, ImageBackground, Modal
} from 'react-native';
import {Actions,Scene} from 'react-native-router-flux';
import BusiInfo from '../../public/BusiInfo';
import NetWorkTool from '../../public/network/NetWorkTool'
import {ScaleSize,ScaleText} from '../../public/Fit'
import DateUtil from '../../public/DateUtil'

const window = Dimensions.get('window')

//定义一些全局的变量
var cols = 4;
var boxW = ScaleSize(85);
var vMargin = (window.width - cols * boxW) / (cols + 1);
var hMargin = ScaleSize(20);
let Sudoku = [{ title: '收款', image: require('../../images/home/home_money.png') },
{ title: '验券', image: require('../../images/home/home_checkQuan.png') },
{ title: '优惠券', image: require('../../images/home/home_coupon.png') },
{ title: '订单', image: require('../../images/home/home_order.png') },
{ title: '商户信息', image: require('../../images/home/home_busiInfo.png') },
{ title: '数据统计', image: require('../../images/home/home_datacount.png') },
{ title: '商品', image: require('../../images/home/home_foodmenu.png') },
{ title: '活动', image: require('../../images/home/home_money.png') },
{ title: '评论', image: require('../../images/home/home_command.png') },
{ title: '钱包', image: require('../../images/home/home_wallet.png') },
{ title: '广告二维码', image: require('../../images/home/staffhelp_staff.png') },
{ title: '消息', image: require('../../images/home/home_message.png') },]


export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            animationType: 'slide',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
          };
      
    }
    render() {
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.3)' : 'black'
          };
          let innerContainerTransparentStyle = this.state.transparent
            ? { backgroundColor: 'rgba(0, 0, 0, 0.3)' }
            : null;
        const userInfo = this.props.navigation.state.params.userInfo;
        return (
            <View style={styles.container}>
            <Modal
            animationType={this.state.animationType}
            transparent={this.state.transparent}
            visible={this.state.modalVisible}
            onRequestClose={() => { this._setModalVisible(false) } }
            onShow={this.startShow}
            >
            <View style={[styles.container, modalBackgroundStyle]}>
              <View style={[styles.innerContainer,innerContainerTransparentStyle]}>
              <TouchableOpacity onPress={this._setModalVisible.bind(this,false)}>
              <Image style={styles.closeicon}  source={require('../../images/home/home_close.png')}  ></Image>  
              </TouchableOpacity>
              <ImageBackground style={styles.GZIcon} resizeMode={'contain'} source={require('../../images/home/home_follow_QRCode.png')}  ></ImageBackground>  
              </View>
            </View>
          </Modal>
            <ImageBackground style={styles.ImageBackground} source={require('../../images/home/yun_bg.png')}> 
                {/* 上部View */}
                <View style={styles.topView}>
                    <View style={styles.leftContainer}>
                        <TouchableOpacity onPress={() => {
                            Actions.Mine();
                        }}>
                            <View style={styles.cusButton}>
                                <Image style={styles.buttonImage} source={require('../../images/home/home_sutep.png')} resizeMode={'contain'} />
                                <Text style={styles.buttonTitle}>设置</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => { 
                            this._QRCodeHander();
                         }}>
                            <View style={styles.cusButton}>
                                <Image style={styles.buttonImage} source={require('../../images/home/home_qrcode.png')} resizeMode={'contain'} />
                                <Text style={styles.buttonTitle}>二维码</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.matchName}>{userInfo.mchtName}</Text>
                        <Text style={styles.address}>{userInfo.mchtAddr}</Text>
                        <View style={styles.dateContainer}>
                            <View style={styles.dateItem}>
                                <Text style={styles.weak}>{DateUtil.getCurWeek()}</Text>
                                <Text style={styles.date}>{DateUtil.getCurYear()}/{DateUtil.getCurMonth()}</Text>
                            </View>
                            <Text style={styles.day}>{DateUtil.getCurDay()}</Text>
                        </View>
                        <TouchableOpacity onPress={this._setModalVisible.bind(this, true) }>
                            <Image style={styles.follow} source={require('../../images/home/home_follow.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* 底部布局 */}
                <View style={styles.bottomContainr}>{this.bottomView()}</View>
            </ImageBackground>
          </View>
        );
    }

    bottomView() {
        // 定义数组装所有的子组件
        var allBadge = [];
        for (var i = 0; i < Sudoku.length; i++) {
            // 取出每一个数据对象
            var badge = Sudoku[i];
            allBadge.push(
                <Item key={i}
                    title={badge.title}
                    image={badge.image}
                    ItemClick={(this.ItemClick.bind(this, badge))}
                />
            );
        }
        // 返回数组
        return allBadge;
    }

    // 功能菜单点击事件
    ItemClick(data) {
        var title = data.title;
        console.log(title);
        if (title == '优惠券') {
            Actions.CouponBox();
        }else if(title == '收款'){
            Actions.Payment();
        }else if(title == '订单'){
            Actions.OrderView();
        }else if(title == '商户信息'){
            Actions.MchtInfo();
        }else if(title == '活动'){
            Actions.Activity();
        }else if(title == '验券'){
            console.log('验券。。。');
            this._destroyCoupon()
        }else if(title == '消息'){
            Actions.Message({
                callback: (data)=>{
                    alert(data);
                }
            });
        }else if(title == '评论'){
            Actions.CommendList();
        }else if(title == '商品'){
            Actions.CommodityList()
        }
    }


    /* 核销电子券 */
    _destroyCoupon(){
        Actions.DefaultScreen({screenType:'yanquan',callback: ((Codeinfo) => {
            if(Codeinfo.couponId.length>0){
                var params = {
                    couNo:Codeinfo.couNo,
                    couponId:Codeinfo.couponId,
                    couponMchtId:Number(Codeinfo.couponMchtId),
                    usrId:Number(Codeinfo.userId),
                    mchtId:Number(BusiInfo.userInfo.usr.mchtId),
                    tlrNo:BusiInfo.userInfo.usr.tlrNo,

                };
                NetWorkTool.destroyCoupon(params,(result => {
                    Alert.alert(JSON.stringify(result));
                    var couPonModel  =   getConvertModel(result)
                    return;
                }))
            }else{
                Alert.alert('此二维码无效')
            }   
        })
     });
    }

_QRCodeHander(){
    Actions.QRCodeView({userInfo:this.props.navigation.state.params.userInfo});
}

_setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
 
  startShow=()=>{
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
        justifyContent: 'center',
      },
    
    topcontainer: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'red',

    },
    ImageBackground: {
        flex: 1,
        // position:'absolute',
        // top: 0,
        // left:0,
        // right:0,
        // bottom:0,
        // marginTop: 0,
    },
    topView: {
        width: window.width,
        flexDirection: 'row',
        height: ScaleSize(260),
    },
    leftContainer: {
        marginTop: ScaleSize(40),
        width: window.width / 2,
    },
    cusButton: {
        marginBottom: ScaleSize(20),
        marginLeft: ScaleSize(15),
    },
    buttonImage: {
        width: ScaleSize(22),
        height: ScaleSize(22),
        marginLeft: ScaleSize(5),
    },
    buttonTitle: {
        color: '#404040',
        marginTop: ScaleSize(6),
        fontSize: ScaleText(14),
    },

    rightContainer: {
        marginTop: ScaleSize(40),
        width: window.width / 2 - ScaleSize(20),
        alignItems: 'flex-end',
    },
    matchName: {
        fontSize: ScaleText(23),
    },
    address: {
        color: '#777',
        marginTop: ScaleSize(20),
    },
    dateContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: ScaleSize(20),
    },
    dateItem: {
        marginRight: ScaleSize(20),
    },
    weak: {
        fontSize: ScaleText(16),
        color: '#777',
        marginBottom: ScaleSize(10),
    },
    date: {
        fontSize: ScaleText(14),
        color: '#777',
    },
    day: {
        fontSize: ScaleText(42),
        color: '#777',
    },
    follow: {
        width: ScaleSize(70),
        height: ScaleSize(70),
    },
    bottomContainr: {
        // position:'absolute',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // bottom: 60,
        // backgroundColor:'red'
    },
    outViewStyle: {
        alignItems: 'center',
        width: boxW,
        height: boxW,
        marginLeft: vMargin,
        marginTop: hMargin
    },
    iconStyle: {
        width: ScaleSize(60),
        height: ScaleSize(60),
        marginBottom: ScaleSize(5)
    },
    mainTitleStyle: {

    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
      },
      
      closeicon: {
        width: ScaleSize(45),
        height: ScaleSize(45),
        position:'absolute',
        top: ScaleSize(100),
        right:ScaleSize(40),
    },
    GZIcon: {
        position:'absolute',
        top: ScaleSize(160),
        left:ScaleSize(20),
        right:ScaleSize(20),
        height:ScaleSize(400) 
    },
})

const getConvertModel = VerificationModel => {

    var convertModel = {
        validatyBegin:VerificationModel.validatyBegin,
        validatyEnd:VerificationModel.validatyEnd,
        name:VerificationModel.couponName,
        denomination:VerificationModel.denomination,
        type:VerificationModel.type,
        num:VerificationModel.num,
        soldnum:VerificationModel.soldnum,
        usednum:VerificationModel.usednum,
        restricted:VerificationModel.restricted,
    };
    return convertModel;
    
}
