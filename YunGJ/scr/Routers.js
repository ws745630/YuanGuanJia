import React, { Component } from 'react'
import { StyleSheet, View} from 'react-native'
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux'

import Login from './page/login/Login'

import Home from './page/home/Home'
import QRCodeView from './page/home/QRCodeView'
import Payment from './page/home/Payment'
import MchtCode from './page/home/MchtCode'

import CouponList from './page/coupon/CouponList'
import CouponBox from './page/coupon/CouponBox'
import CouponDetailPage from './page/coupon/CouponDetailPage'
import QRCodePacketList from './page/coupon/QRCodePacketList'
import QRcodePacket from './page/coupon/QRcodePacket'
import AddAndEditCoupon from './page/coupon/AddAndEditCoupon'
import CouponDataSelcted from './page/coupon/CouponDataSelcted'
import AddProductType from './page/coupon/AddProductType'
import CouponTemplate from './page/coupon/CouponTemplate'

import Mine from './page/mine/Mine'
import Message from './page/mine/Message'

import CommodityList from './page/commodity/CommodityList'
import AddCommodityType from './page/commodity/AddCommodityType'

import OrderView from './page/order/OrderView'
import OrderDetailsView from './page/order/OrderDetailsView'

import MchtInfo from './page/mchtInfo/MchtInfo'

import Activity from './page/activity/Activity'
import ActivityDetail from './page/activity/ActivityDetail'

import DefaultScreen from './page/qrscanner/DefaultScreen'

import CommendList from './page/commend/CommendList'


import theme from './utils/Theme'
 
const reducerCreate = params => {
    const defaultReducer = new Reducer(params)
    return (state, action) => {
        // console.log('ACTION:',action,Actions.currentScene)
        // console.log('Actions:', Actions)
        return defaultReducer(state, action)
    }
}

const onBackPress = () => {
    console.log(Actions.state)
    if (Actions.state.index !== 0) {
        return false
    }
    Actions.pop()
    return true
}

const getSceneStyle = () => ({
    backgroundColor: 'red',
})

export default class Routers extends Component {
    render() {
        return (
            <Router>
                <Modal hideNavBar>
                    <Stack key="root" 
                        navigationBarStyle={{ backgroundColor: '#232323' }}
                        backButtonTextStyle={{ color: 'white' }}
                        backTitle='返回' 
                        backButtonTintColor='white'
                        titleStyle={{ color: 'white' }}
                        rightButtonTextStyle={{ color: theme.mainColor }}
                        
                        >
                            <Scene key="Login" component={Login} title="Login" initial hideNavBar />
                            <Scene key="Home" renderLeftButton={<View></View>} component={Home} title="芸管家"  />
                            <Scene key="CouponBox" component={CouponBox} title="优惠券" />
                            <Scene key="Mine" component={Mine} title="设置" />
                            <Scene key="CouponList" component={CouponList} title="优惠券"  />
                            <Scene key="QRCodeView" component={QRCodeView} title="商户收款码" />
                            <Scene key="Payment" component={Payment} title="收款" />
                            <Scene key="QRCodeView" component={QRCodeView} title="电子券详情" />
                            <Scene key="Payment" component={Payment} title="付款" />
                            <Scene key="MchtInfo" component={MchtInfo} title="商户信息" />
                            <Scene key="CouponDetailPage" component={CouponDetailPage} title="电子券详情" />
                            <Scene key="QRCodePacketList" component={QRCodePacketList} title="二维码包列表" hideNavBar/>
                            <Scene key="AddAndEditCoupon" component={AddAndEditCoupon} hideNavBar/>
                            <Scene key="CouponTemplate" component={CouponTemplate} hideNavBar/>
                            <Scene key="Activity" component={Activity} title="活动" />
                            <Scene key="ActivityDetail" component={ActivityDetail} title="活动详情" />
                            <Scene key="MchtCode" component={MchtCode} title="收款码" />
                            <Scene key="AddProductType" component={AddProductType} title="新增商品类型" rightTitle="取消" onRight={() => {Actions.pop()}}/>
                            <Scene key="CouponDataSelcted" component={CouponDataSelcted} hideNavBar/>
                            <Scene key="DefaultScreen" component={DefaultScreen} hideNavBar/>
                            <Scene key="QRcodePacket" component={QRcodePacket} title="优惠券二维码包" hideNavBar/>
                            <Scene key="OrderView" component={OrderView} title='订单' />
                            <Scene key="Message" component={Message} title='消息' />
                            <Scene key="CommendList" component={CommendList} title='商户评论' />
                            <Scene key="OrderDetailsView" component={OrderDetailsView} title='订单详情' />
                            <Scene key="CommodityList" component={CommodityList} title='商品' />
                            <Scene key="AddCommodityType" component={AddCommodityType} title='新增商品' />
                            
                        
                    </Stack>
                </Modal>
            </Router>
        )
    }
}




