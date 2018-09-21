/*
 *  新增和修改电子券
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Alert,
    TextInput,
    DeviceEventEmitter,
} from 'react-native';
import Emitter from '../../public/EmitterConst'
import {Theme,DeviceInfo,ScaleSize,ScaleText,Toast} from '../../public/FileReference'
import { Actions } from 'react-native-router-flux'
import NetWorkTool from '../../public/network/NetWorkTool'
import ArrowIcon from 'react-native-vector-icons/EvilIcons'
import ItemList from '../../public/json/createcoupon.json'
import CouponPicker from '../../component/picker/CouponPicker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BaseComponent } from '../../component/base/BaseComponent'

import {
    convertCouponType,
    convertCouponUseRoot,
    convertCouponUseRule,
    getUseTimeData,
    getDateData,
    getCouponData
}
from '../../public/CouponTypeDeal'
import DateUtil from '../../public/DateUtil'
import CreateCoupon from '../../component/coupon/CreateCoupon'
import DefaultModal from '../../public/DefaultModal'
import WeekList from '../../public/json/week.json'
import BusiInfo from '../../public/BusiInfo'

export default class AddAndEditCoupon extends BaseComponent {

    constructor(props) {
        super(props)
        this.state = {
            createCouponList: ItemList,
            modalVisibility: false,
            couponModel: {},
            couponName: '',//电子券名称
            applyBusi: '',//适用商户
            couponType: '',//电子券类型
            money: '',//面值
            restricted: '',//抵用券满额可用
            giveApproach: '',//发放途径
            applyScope: '',//适用范围
            applyScopeId: '',//适用范围ID
            useRoot: '',//使用权限
            beginTime: '',//有效开始时间
            endTime: '',//有效结束时间
            useTime1: '',//可用时间段1
            useTime2: '',//可用时间段2
            noDate: '',//不可用日期
            useRule: '',//使用规则
            addCount: '',//叠加张数
            isEdit: false,//是否为修改优惠券
        }
    }

    /* 设置导航栏 */
    navigationBarProps() {
        return {
            title: (this.props.handletype == 'edit') ? '修改优惠券' : '新增优惠券',
            rightTitle: '重置',
            titleStyle: {
                color: 'white'
            },
            rightTitleStyle: {
                color: Theme.mainColor
            },
        }
    }
    // 导航栏右按钮点击
    onRightPress() {
        this.setState({ createCouponList: ItemList })
    }
    // 组件即将加载
    componentWillMount() {
        if (this.props.couponInfo) {
            console.log('优惠券信息' + JSON.stringify(this.props.couponInfo));
            var list = getCouponData(this.props.couponInfo, ItemList);
            var isEdit = (this.props.handletype == 'edit') ? true : false
            this.setState({
                createCouponList: list,
                isEdit: isEdit,
                couponName: this.props.couponInfo.name,//电子券名称
                applyBusi: this.props.couponInfo.mchtIds,//适用商户
                couponType: this.props.couponInfo.type,//电子券类型
                money: this.props.couponInfo.denomination,//面值
                restricted: this.props.couponInfo.restricted,//抵用券满额可用
                giveApproach: this.props.couponInfo.promAppro,//发放途径
                applyScope: list[7].rightText,//适用范围
                applyScopeId: this.props.couponInfo.scpoe,//适用范围ID
                useRoot: this.props.couponInfo.type2,//使用权限
                beginTime: this.props.couponInfo.validatyBegin,//有效开始时间
                endTime: this.props.couponInfo.validatyEnd,//有效结束时间
                useTime1: this.props.couponInfo.useTime,//可用时间段1
                useTime2: '',//可用时间段2
                noDate: this.props.couponInfo.disableDate,//不可用日期
                useRule: this.props.couponInfo.useRule,//使用规则
                useNum: this.props.couponInfo.useNum,//叠加张数
                cash: this.props.couponInfo.cash //优惠券方放途径 ——————— 购买  购买价值
            })
        }
    }
    /* 组件被销毁 */
    componentWillUnmount() {
        CouponPicker.hidePicker()
    }

    /* 组件渲染 */
    _render() {
        return (
            <View style={styles.containt}>
                <DefaultModal key="createCoupon" visibility={this.state.modalVisibility}
                    renderBottomMenuView={() => this._renderMenu()}
                    DismissPress={() => { this.setState({ modalVisibility: false }) }}>
                </DefaultModal>

                <KeyboardAwareScrollView style={{ width: DeviceInfo.width, height: DeviceInfo.height }}
                    ref='scroll'
                    onKeyboardWillShow={(frames) => { console.log('键盘弹出时，键盘高度改变时：', frames) }}>
                    <ScrollView style={styles.scroll_containt}>
                        {this.renderCreateCouponItem()}
                        <TouchableOpacity onPress={this._createCouponClick.bind(this)}>
                            <View style={styles.create_coupont_containt}>
                                <Text style={styles.create_text}>{this.state.isEdit ? '修改优惠券' : '生成优惠券'}</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View>
        )
    }

    _renderMenu() {
        var couponInfo = {
            name: this.state.couponName,
            type: this.state.couponType,
            denomination: this.state.money,
            promAppro: this.state.giveApproach,
            scpoe: this.state.applyScopeId,
            useTime: this.state.useTime1,
            validatyEnd: this.state.endTime,
            validatyBegin: this.state.beginTime,
            disableDate: this.state.noDate,
            dishTypeNames: this.state.applyScope,
            num: 100,
        }
        return (
            <View style={styles.createCoupon}>
                <CreateCoupon inFoType='createCoupon'
                    couponInfo={couponInfo}
                    sureBtnClick={(num) => { this.createCoupon(num) }
                    } />
            </View>)
    }

    // 创建优惠券Item
    renderCreateCouponItem() {
        var itemList = [];
        for (var i = 0; i < this.state.createCouponList.length; i++) {
            var item = this.state.createCouponList[i];
            var leftText = item.leftText;
            // 折扣券，礼品券，票务  没有"使用规则"和"叠加张数"
            if (this.state.couponType == 'rebate' || this.state.couponType == 'ticket' || this.state.couponType == 'present') {
                if (leftText == '使用规则' || leftText == '叠加张数') continue
            }
            if (this.state.couponType == 'rebate') {
                //折扣券  面值改完折扣
                leftText = (leftText == '面值') ? '折扣' : leftText
            }
            if (this.state.couponType != 'voucher' || !this.state.couponType) {
                //抵用券 增加满额可用(单位:元)   
                if (leftText === '满额可用(单位:元)') continue
            }
            if (this.state.giveApproach != 'buy' || !this.state.couponType) {
                //购买券    
                if (leftText === '购买价值') continue
            }
            if(this.state.useRule == 'D'){
                // 使用规则为"与其他券共同使用"则不显示"叠加张数"
                if(leftText === '叠加张数') continue
            }
            if (item.type === 'button') {
                itemList.push(<TitleButton key={item.id}
                    leftText={leftText}
                    rightText={item.rightText}
                    rightBtnClick={this._rightBtnClick.bind(this, item.id)} />)
            } else {
                itemList.push(<TitleTextInput key={item.id}
                    leftText={leftText}
                    placeholder={item.rightText}
                    value={item.rightText.toString()}
                    keyboardType={item.keyboardType}
                    onChangeText={this._onChangeText.bind(this, item.id)}
                />)
            }
        }
        return itemList;
    }

    // Item按钮点击
    _rightBtnClick(itemID) {
        if (itemID == 2) {
            // 适用商户
            this._couponApplyBusiness(itemID)
        } else if (itemID == 3) {
            // 选择优惠券类型
            this._couponTypeSelected(itemID)
        } else if (itemID == 6) {
            //选择发放途径
            this._couponGiveApproach(itemID)
        } else if (itemID == 8) {
            //选择适用范围
            this._couponApplyScope(itemID);
        } else if (itemID == 9) {
            //选择使用权限 
            this._couponUseRoot(itemID)
        } else if (itemID == 10) {
            //选择有效开始时间
            this._validBeginTime(itemID)
        } else if (itemID == 11) {
            //选择有效结束时间
            this._validEndTime(itemID)
        } else if (itemID == 12) {
            //选择可用时间段1
            this._couponUseTime1(itemID)
        } else if (itemID == 13) {
            //选择可用时间段1
            this._couponUseTime2(itemID)
        } else if (itemID == 14) {
            // 优惠券不可用日期
            this._couponNoDateSelect(itemID)
        } else if (itemID == 15) {
            // 添加使用规则
            this._addUseRule(itemID)
        } else if (itemID == 16) {
            // 添加叠加张数
            this._addCouponCount(itemID)
        }
    }
    // 文本输入监听
    _onChangeText(itemID, text) {
        var name = text.toString();
        if (itemID === 1) {
            // 设置优惠券名称
            this.setState({ couponName: name })
        } else if (itemID === 4) {
            // 设置优惠券面值或折扣
            this.setState({ money: name })
        } else if (itemID === 5) {
            // 设置抵用券满额优惠
            this.setState({ restricted: name })
        } else if (itemID === 6) {
            // 设置购买券面值
            this.setState({ cash: name })
        }
    }
    // 适用商户
    _couponApplyBusiness(index) {
        var item = this.state.createCouponList[index - 1]
        NetWorkTool.qureyApplyBusiness((response => {
            // 选择适用商户
            var list = response.info
            if (list.length > 0) {
                list.title = '适用商户'
                Actions.CouponDataSelcted({
                    list: response.info,
                    callBack: (list) => {
                        var mchtIds = []
                        var mchtNames = []
                        list.map(data => {
                            mchtIds.push(data.mchtId)
                            mchtNames.push(data.mchtName)
                        })
                        if(mchtIds.length > 0){
                            item.rightText = mchtNames.join(',')
                            var businessId = mchtIds.join(',');
                            this.setState({ applyBusi: businessId })
                        }else{
                            item.rightText = "请选择适用商户"
                            this.setState({ applyBusi: "" })
                        }
                        
                    }
                })
            } else {
                Toast.show('此商户没有适用商户')
            }

        }))
    }
    // 优惠券类型选择
    _couponTypeSelected(index) {
        var item = this.state.createCouponList[index - 1]
        var couponTypes = ['代金券', '折扣券', '抵用券', '礼品券', '票务'];
        var selectValue = []
        if (item.rightText !== '请选择优惠券类型') {
            selectValue.push(item.rightText);
        }
        CouponPicker.showPicker(couponTypes, selectValue, '优惠券类型', (result) => {
            item.rightText = result[0];
            var type = convertCouponType(result[0]);
            this.setState({
                createCouponList: this.state.createCouponList,
                couponType: type
            })
        });
    }
    // 优惠券发放途径
    _couponGiveApproach(index) {
        var approachs = ['普通券', '购买'];
        var item = this.state.createCouponList[index - 1]
        var selectValue = []
        if (item.rightText !== '请选择发放途径') {
            selectValue.push(item.rightText);
        }
        CouponPicker.showPicker(approachs, selectValue, '发放途径', (result) => {
            item.rightText = result[0];
            var approach = 'general'
            if (result[0] === '购买') {
                approach = 'buy'
            }
            this.setState({
                createCouponList: this.state.createCouponList,
                giveApproach: approach
            })
        });
    }
    //优惠券适用范围
    _couponApplyScope(index) {
        var item = this.state.createCouponList[index - 1]
        NetWorkTool.qureyProductName(request => {
            var list = request.lowTypeNameList;
            list.title = '适用范围';
            if (list.length > 0) {
                Actions.CouponDataSelcted({
                    list: list,
                    callBack: (list) => {
                        var scopes = [];
                        var names = [];
                        list.map((item => {
                            scopes.push(item.typeId);
                            names.push(item.typeName);
                        }))
                        if(scopes.length > 0){
                            var scope = 'I' + scopes.join(',')
                            item.rightText = names.join(',') + '可用';
                            this.setState({ applyScope: names, applyScopeId: scope })
                        }else{
                            item.rightText = '请选择适用范围';
                            this.setState({ applyScope: "", applyScopeId: "" })
                        }
                        
                    }
                })
            } else {
                Actions.AddProductType()
            }
        })
    }
    // 使用权限
    _couponUseRoot(index) {
        var datas = ['出售,分享,使用', '分享,使用', '使用'];
        var item = this.state.createCouponList[index - 1]
        var selectValue = []
        if (item.rightText !== '请选择使用权限') {
            selectValue.push(item.rightText);
        }
        CouponPicker.showPicker(datas, selectValue, '使用权限', (result) => {
            item.rightText = result[0];
            var useRoot = convertCouponUseRoot(result[0]);
            this.setState({
                createCouponList: this.state.createCouponList,
                useRoot: useRoot,
            })
        });
    }
    // 有效开始时间
    _validBeginTime(index) {
        // 获取选择器数据
        var dates = getDateData()
        var item = this.state.createCouponList[index - 1];
        var selectValue;
        if (item.rightText === '请选择有效开始时间') {
            selectValue = DateUtil.getTodayDate('-').split('-');
        } else {
            selectValue = item.rightText.split('-');
        }
        CouponPicker.showPicker(dates, selectValue, '有效开始日期', (result) => {
            item.rightText = result[0] + '-' + result[1] + '-' + result[2];
            var date = result[0] + result[1] + result[2];
            this.setState({
                createCouponList: this.state.createCouponList,
                beginTime: date,
            })
        });
    }
    // 有效结束时间
    _validEndTime(index) {
        var dates = getDateData()
        var item = this.state.createCouponList[index - 1];
        var selectValue;
        if (item.rightText === '请选择有效结束时间') {
            selectValue = DateUtil.getTodayDate('-').split('-');
        } else {
            selectValue = item.rightText.split('-');
        }
        CouponPicker.showPicker(dates, selectValue, '有效结束日期', (result) => {
            item.rightText = result[0] + '-' + result[1] + '-' + result[2];
            var date = result[0] + result[1] + result[2];
            this.setState({
                createCouponList: this.state.createCouponList,
                endTime: date,
            })
        });
    }
    // 可用时间段1
    _couponUseTime1(index) {
        var datas = getUseTimeData();
        var item = this.state.createCouponList[index - 1]
        var selectValue = item.rightText.split('-');
        CouponPicker.showPicker(datas, selectValue, '可用时间段', (result) => {
            var time = result.join('-');
            item.rightText = time;
            this.setState({
                createCouponList: this.state.createCouponList,
                useTime1: time,
            })
        });
    }
    // 可用时间段2
    _couponUseTime2(index) {
        var datas = getUseTimeData()
        var item = this.state.createCouponList[index - 1]
        var selectValue = item.rightText.split('-');
        CouponPicker.showPicker(datas, selectValue, '可用时间段', (result) => {
            var time = result.join('-');
            item.rightText = time;
            this.setState({
                createCouponList: this.state.createCouponList,
                useTime2: time,
            })
        });
    }

    // 不可用日期
    _couponNoDateSelect(index) {
        var item = this.state.createCouponList[index - 1]
        WeekList.title = '不可用日期'
        Actions.CouponDataSelcted({
            list: WeekList,
            callBack: (list) => {
                var weeks = [];
                var names = [];
                list.map(data => {
                    weeks.push(data.week)
                    names.push(data.value)
                })
                if(weeks.length > 0){
                    item.rightText = weeks.join(',') + '不可用';
                    var week = names.join(',');
                    this.setState({ noDate: week })
                }else{
                    item.rightText = '请选择不用日期'
                    this.setState({ noDate: '' })
                }
                
            }
        })
    }

    // 使用规则
    _addUseRule(index) {
        var datas = ['叠加使用', '与其他优惠券共同使用', '与其他优惠券共同使用,叠加使用'];
        var item = this.state.createCouponList[index - 1];
        var selectValue = [];
        if (item.rightText !== '请选择使用规则') {
            selectValue.push(item.rightText)
        }
        CouponPicker.showPicker(datas, selectValue, '使用规则', (result) => {
            item.rightText = result[0];
            var useRule = convertCouponUseRule(result[0]);
            this.setState({
                createCouponList: this.state.createCouponList,
                useRule: useRule,
            })
        });
    }
    //叠加张数
    _addCouponCount(index) {
        var datas = ['1', '2', '3'];
        var item = this.state.createCouponList[index - 1]
        var selectValue = []
        if (item.rightText !== '请选择叠加张数') {
            selectValue.push(item.rightText)
        }
        CouponPicker.showPicker(datas, selectValue, '叠加张数', (result) => {
            item.rightText = result[0];
            this.setState({
                createCouponList: this.state.createCouponList,
                useNum: result[0],
            })
        });
    }
    // 创建优惠券
    _createCouponClick() {
        let couponCompletion = this._vertifyCouponInfoIsCompletion();
        if (!couponCompletion) return;

        var couponModel = {
            name: this.state.couponName,
            type: this.state.couponType,
            denomination: this.state.money,
            promAppro: this.state.giveApproach,
            scpoe: this.state.applyScopeId,
            usrId: BusiInfo.usrId,
            mchtId: BusiInfo.userInfo.usr.mchtId,
            mchtIds: this.state.applyBusi,
            type2: this.state.useRoot,
            useNum: this.state.useNum,
            useRule: this.state.useRule,
            couponType: 'default',
            preset: '0',
            useTime: this.state.useTime1,
            validatyEnd: this.state.endTime,
            validatyBegin: this.state.beginTime,
            disableDate: this.state.noDate,
            cash: '0',
            restricted: this.state.restricted,
        };


        if (this.state.isEdit) {
            var editModel = Object.assign(couponModel, { couponType: 'default', marketRule: '', marketRule: '', num: this.props.couponInfo.num, })
            let couponId = this.props.couponInfo.couponId
            NetWorkTool.editCoupon(couponId, editModel, (reslut => {
                Alert.alert('修改成功', '', [{
                    text: "我知道了", onPress: () => {
                        DeviceEventEmitter.emit(Emitter.COUPON_EDIT_SUCCESS);
                        Actions.pop()
                    }
                }]);
            }))

        } else {
            this.setState({
                couponModel: couponModel,
                modalVisibility: !this.state.modalVisibility,
            })
        }
    }

     // 创建优惠券
     createCoupon(num) {
        var createModel = Object.assign(
            this.state.couponModel,
            { num: num }
        )
        NetWorkTool.createCoupon(createModel, (reslut => {
            Actions.pop();
        }))
    }

    // 检查优惠券信息是否正确
    _vertifyCouponInfoIsCompletion() {
        if (!this.state.couponName) {
            Toast.show('请输入电子券名称')
            return false
        }
        if (!this.state.couponName.length >= 32) {
            Toast.show('优惠券名称请控制32个长度')
            return false
        }
        if (!this.state.couponType) {
            Toast.show('请选择优惠券类型')
            return false
        }
        if (!this.state.money) {
            if (this.state.couponType == 'rebate') {
                Toast.show('请输入折扣')
            } else {
                Toast.show('请输入面值')
            }
            return false
        }
        if (!this.state.money < 0) {
            Toast.show('面值或折扣必须大于0')
            return false
        }
        if (!this.state.couponType == 'voucher') {
            if (!this.state.restricted) {
                Toast.show('请输入满额额度')
            }
            if (this.state.restricted < this.state.money) {
                Toast.show('满额额度必须大于等于面值')
            }
            return false
        }
        if (!this.state.giveApproach) {
            Toast.show('请选择优惠券发放途经')
            return false
        }
        if (this.state.couponType == 'buy') {
            if (!this.state.cash) {
                Toast.show('请选择优惠券类型')
            } else {
                if (this.state.cash < 0) {
                    Toast.show('购买价值必须大于0')
                }
            }
            return false
        }
        if (this.state.cash > this.state.money) {
            Toast.show('购买价值不能大于面值金额')
            return false
        }
        if (!this.state.applyScopeId) {
            Toast.show('请选择优惠券适用范围');
            return false
        }
        if (!this.state.useRoot) {
            Toast.show('请选择优惠券使用权限')
            return false
        }
        if (!this.state.beginTime) {
            Toast.show('请选择有效期开始时间')
            return false
        }
        if (!this.state.endTime) {
            Toast.show('请选择有效期结束时间')
            return false
        }
        if (this.state.beginTime > this.state.endTime) {
            Toast.show('优惠券有效期结束时间不符合规则')
        }
        if (!this.state.useTime1 && !this.state.useTime2) {
            Toast.show('请选择可用时间段')
            return false
        }
        if (!this.state.useTime1 && !this.state.useTime2) {
            var time1 = this.state.useTime1;
            var time2 = this.state.useTime2;
            var time1Array = time1.split('-');
            var time2Array = time2.split('-');
            if (time1Array[0] <= time1Array[1] && time1Array[1] >= time2Array[0]) {
                Toast.show("两个时间段不能重叠");
                return false
            }
        }

        if (this.state.noDate == "1,2,3,4,5,6,7") {
            Toast.show("请正确选择不可用日期(不可全选)");
            return false;
        }

        if (this.state.couponType == "voucher" || this.state.couponType == "cash") {
            if (!this.state.useRule) {
                Toast.show("请选择使用规则");
                return false;
            }
            if (!this.state.useNum) {
                Toast.show("请选择叠加张数");
                return false;
            }
        }
        return true;
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
                    onChangeText={(text) => { this.props.onChangeText(text) }}>
                </TextInput>
            </View>
        )
    }
}

class TitleButton extends Component {
    render() {
        return (
            <View style={styles.titleInput_contanint}>
                <Text style={styles.titleInput_letfText}>{this.props.leftText}</Text>
                <Text style={styles.titleButton_rightText} onPress={this.props.rightBtnClick}>{this.props.rightText}</Text>
                <ArrowIcon name='chevron-right' size={30} color='#909090'></ArrowIcon>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    containt: {
        flex: 1,
    },
    scroll_containt: {
        flex: 1,
        paddingTop: ScaleSize(20),
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
    titleButton_rightText: {
        flex: 1,
        color: '#d2d2db',
        fontSize: ScaleText(16),
        textAlign: 'right',
    },
    create_coupont_containt: {
        flex: 1,
        height: ScaleSize(44),
        backgroundColor: Theme.mainColor,
        borderRadius: ScaleSize(5),
        marginTop: ScaleSize(20),
        marginLeft: ScaleSize(10),
        marginRight: ScaleSize(10),
        marginBottom: ScaleSize(20),
    },
    create_text: {
        lineHeight: ScaleSize(44),
        fontSize: ScaleText(17),
        color: 'white',
        textAlign: 'center'
    },
    createCoupon: {
        width:DeviceInfo.width,
        height:DeviceInfo.height,
        backgroundColor:'rgba(0,0,0,0.5)'
    }
})