import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    DeviceEventEmitter
} from 'react-native';
import ShowTicket from '../../../component/coupon/ShowTicket'
import BusiIcon from '../../../component/icon/BusiIcon'
import { Actions } from 'react-native-router-flux'
import NetWorkTool from '../../../utils/network/NetWorkTool'
import BusiInfo from '../../../utils/BusiInfo'
import DefaultModal from '../../../utils/DefaultModal'
import CreateCoupon from '../../../component/coupon/CreateCoupon'
import Emitter from '../../../utils/EmitterConst'
import {ScaleSize, ScaleText,DeviceInfo} from '../../../utils/FileReference'

export default class CouponCell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisibility: false,
        }

    }
    render() {
        var couponModel = this.props.coucponModel;
        return (

            <View style={styles.container}>
                <DefaultModal key='couponcell' visibility={this.state.modalVisibility}
                    renderBottomMenuView={() => this._renderMenu(couponModel)}
                    DismissPress={() => { this.setState({ modalVisibility: false }) }}>
                </DefaultModal>
                <TouchableOpacity onPress={() => { 
                      NetWorkTool.queryCouponDetail(couponModel.couponId, (result => {
                          var couponModel = result.coupon
                          couponModel.dishTypeNames = result.dishTypeNames
                          Actions.CouponDetailPage({ couponInfo: couponModel })
                      }))
                     
                    }}>
                    <ShowTicket couponInfo={couponModel}
                        qrcodeClick={() => {
                            Actions.QRCodePacketList({ couponInfo: couponModel })
                        }}
                    ></ShowTicket>
                </TouchableOpacity>
                {this.bottomMenu(couponModel)}
            </View>
        )
    }

    bottomMenu(couponInfo) {
        var editBtn, deleteBtn, qrCodeBtn, sweepBtn;
        if (couponInfo.modFlag !== '0' && couponInfo.preset === '0' && !couponInfo.grantFlag && couponInfo.couponThirdType === 'default' && couponInfo.expireTime !== '-1') {
            editBtn = <CouponButton name='修改' iconName='xiugaimima' ItemClick={() => { this.editBtnClick() }} />;
            deleteBtn = <CouponButton name='删除' iconName='tuanduicankaoxian-' ItemClick={() => { this.deleteBtnClick(couponInfo) }} />;
        }
        if (couponInfo.surplusnum != 0 && couponInfo.promAppro === 'general' && couponInfo.expireTime !== '-1') {
            qrCodeBtn = <CouponButton name='二维码' iconName='erweima' ItemClick={() => { this.qrCodeBtnClick(couponInfo) }} />;
            sweepBtn = <CouponButton name='扫码发券' iconName='saoma' ItemClick={() => { this.sweepBtnClick(couponInfo) }} />;
        }
        return (
            <View style={styles.coupon_menu}>
                {deleteBtn}
                {editBtn}
                {qrCodeBtn}
                {sweepBtn}
            </View>
        )
    }

    // 优惠券修改
    editBtnClick() {
        //获取优惠券的适用范围
        NetWorkTool.qureyProductName(result => {
            var couponModel = this.props.coucponModel;
            couponModel.lowTypeNameList = result.lowTypeNameList
            Actions.AddAndEditCoupon({ couponInfo: couponModel,handletype:'edit'})
        })
    }

    // 优惠券删除
    deleteBtnClick(model) {
        Alert.alert(null,
            '是否删除此优惠券',
            [
                { text: '取消' },
                {
                    text: '确定', onPress: () => {
                        NetWorkTool.DeleteCouponcontrol(model.mchtId, model.couponId, (result => {
                            DeviceEventEmitter.emit(Emitter.COUPON_DELETE_SUCCESS,this.props.indexkey)
                        }))
                    }
                },
            ]);
    }

    // 优惠券发券
    qrCodeBtnClick(couponInfo) {
        // Actions.QRcodePacket({qrID: 'ua68q98q029'})
        if (couponInfo.surplusnum == 0) {
            Alert.alert('当前券已经全部售出')
            return;
        }

        this.setState({ modalVisibility: true })

    }
    // 发券
    sweepBtnClick(model) {
        Actions.DefaultScreen({
            screenType: 'sweepSend', callback: ((Codeinfo) => {
                if (Codeinfo.length > 0) {
                    var parmars = {
                        code: 'quanquan',
                        couponId: model.couponId,
                        mchtId: model.mchtId,
                        usrId: Codeinfo,
                        tlrNo: BusiInfo.userInfo.usr.tlrNo,
                        loginMchtId: BusiInfo.userInfo.usr.mchtId,
                        clerkId: BusiInfo.userInfo.usr.usrId,
                        num: 1,
                        flag: '0',
                    }
                    NetWorkTool.sendCoupon(parmars, (result => {
                        Alert.alert('发券成功')
                        return;
                    }))

                } else {
                    Alert.alert('此二维码无效')
                }

            })
        });
    }

    _renderMenu(couponModel) {

        return (
            <View style={styles.buttonsContainer}>
                <CreateCoupon
                    inFoType={'codePackage'}
                    couponInfo={couponModel}
                    sureBtnClick={(num) => {
                        this._upViewSureBtnHander(couponModel, num)
                    }}
                ></CreateCoupon>
            </View>
        )
    }

    //生成二维码包
    _upViewSureBtnHander(itemModel, num) {
        this.setState({ modalVisibility: false });

        var parmars = {
            agent: BusiInfo.userInfo.usr.mchtId,
            agentUsr: BusiInfo.userInfo.usr.usrId,
            couponId: itemModel.couponId,
            mchtId: itemModel.mchtId,
            num: num,
            flag: '0',
        }
        NetWorkTool.ScanGenerateQR(parmars, (result => {
            Actions.QRcodePacket({ qrID: result })
            // this.props.backRefresh();
        }))

    }

}

class CouponButton extends Component {
    render() {
        return (
            <View style={styles.coupon_tool}>
                <TouchableOpacity onPress={this.props.ItemClick}>
                    <View style={styles.coupon_tool}>
                        <BusiIcon name={this.props.iconName} size={19}></BusiIcon>
                        <Text style={styles.coupon_tool_text}>{this.props.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    coupon_menu: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 10,
        borderBottomColor: 'rgba(0,0,0,0)'
    },
    coupon_tool: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingTop: ScaleSize(5),
        paddingBottom: ScaleSize(5),
        backgroundColor: 'white'
    },
    coupon_tool_text: {
        fontSize: ScaleText(15),
        marginLeft: ScaleSize(5),
    },
    createCoupon: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: DeviceInfo.width,
        height: DeviceInfo.height,
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        flexDirection: 'row',
    }
})