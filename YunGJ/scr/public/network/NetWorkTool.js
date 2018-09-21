import React, { Component } from 'react';
import { postFetch, getFetch, putFetch, deleteFetch, getFetchFromCache } from './HttpExtension'
import { Alert} from 'react-native'
import MD5 from 'react-native-md5'
import BusiInfo from '../BusiInfo'

export default class NetWorkTool extends Component {
    
    /**
     *获取AccessToken
     *
     * @static
     * @param {*} callBack
     * @memberof NetWorkTool
     */
     static getAccessToken(callBack) {
        let url = "v1/token?grantId=client&appId=3585751FCCBF7574E266BF4AC5E14485&appSecret=b1d15c9da94d748d46056297c1864234d178c4b1ad4a05941dd213aa37fa192e" 
        getFetch(url).then(response => {
            return callBack(response.content) 
        })
    }

    /**
     * 商户登录接口
     * @static 
     * @param {*} parmas  
     * @param {*} callBack 回调
     * @memberof NetWorkTool
     */
     static matchLogin(parmas, callBack) {
        parmas.loginPwd = MD5.hex_md5(parmas.loginPwd) 
        let url = 'v3/entrance/usr/clerkLogin' 
        postFetch(url, parmas).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }


    /**
     * 商户退出登录
     * @static
     * @param {*} parmas  参数
     * @param {*} callBack 回调
     * @memberof NetWorkTool
     */
     static matchLoginOut(callBack) {
        let url = 'v3/entrance/usr/clerkLoginOut/' + BusiInfo.usrId 
        postFetch(url, null).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }

    /**
     * 创建订单
     * @static
     * @param {*} parmas  参数
     * @param {*} callBack 回调
     * @memberof NetWorkTool
     */
     static TxnCreateOrder(parmas, callBack) {
        let url = 'v2/web/txn/createOrder' 
        postFetch(url, parmas).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }

    /* ------------------优惠券相关接口--------------------- */

    /**
     * 商户扫码:单张发券
     * @static
     * @param {*} parmas  参数
     * @param {*} callBack 回调
     * @memberof NetWorkTool
     */
     static sendCoupon(parmas, callBack) {
        let url = 'v2/web/issue/single' 
        postFetch(url, parmas).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }
    /**
     ** 核销验券
     * @static v2/web/txn/scancancel
     * @param {*} parmas 优惠券券码"couNo","优惠券Id couponId","用户Id usrId","电子券所属商户Id couponMchtId","商户Id mchtId","员工号tlrNo"
     * @param {*} callBack
     * @memberof NetWorkTool
     */
     static destroyCoupon(params, callBack) {
        let url = 'v2/web/txn/scancancel' 
        postFetch(url, params).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }

    /**
     *查询优惠券列表
     *
     * @static
     * @param {*} parmas
     * @param {*} callBack
     * @memberof NetWorkTool
     */
     static queryCouponList(parmas, callBack) {
        let url = 'v2/web/couponcontrol/query'
        postFetch(url, parmas).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }

    /**
    *查询优惠券详情
    *
    * @static
    * @param {电子券Id} couponId
    * @param {成功回调} callBack
    * @memberof NetWorkTool
    */
     static queryCouponDetail(couponId, callBack) {
        let url = 'v2/web/couponcontrol/' + BusiInfo.userInfo.usr.mchtId + '/' + couponId
        getFetch(url, null).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }

    /**
     *查询优惠券剩余数量
     *
     * @static
     * @param {*} parmas 
     * @param {*} callBack
     * @memberof NetWorkTool
     */
     static qureyCouponSurplus(parmas, callBack) {
        let url = 'v2/web/issue/' + BusiInfo.userInfo.usr.mchtId  
        postFetch(url, parmas).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }

    /**
     *创建优惠券
     *
     * @static
     * @param {*} parmas
     * @param {*} callBack
     * @memberof NetWorkTool
    */
      static createCoupon(params, callBack) {
        let url = 'v2/web/couponcontrol/add' 
        postFetch(url, params).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }
    /**
     *修改优惠券
     *
     * @static
     * @param {*} couponId 优惠券ID
     * @param {*} parmas
     * @param {*} callBack
     * @memberof NetWorkTool
     */
     static editCoupon(couponId, params, callBack) {
        let url = 'v2/web/couponcontrol/' + couponId 
        putFetch(url, params).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }

    /**
     * 获取除去活动的电子券剩余张数
     *
     * @static
     * @param {*} parmas 
     * @param {*} callBack
     * @memberof NetWorkTool
     */
      static getGrantAccreditNum(parmas, callBack) {
        let url = 'v2/web/grant/accreditNum' 
        postFetch(url, parmas).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }


    /**
     * 电子券删除
     * 
     * @static
     * @param {*} mchtId 商户ID
     * @param {*} couponId 电子券ID
     * @param {*} callBack 成功回调
     * @memberof NetWorkTool
     */
     static DeleteCouponcontrol(mchtId, couponId, callBack) {
        let url = 'v2/web/couponcontrol/' + mchtId + '/' + couponId 
        deleteFetch(url, null).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }


    /* ------------------商户相关接口--------------------- */

    /**
     * 商户广告查询
     * @static
     * @param {*} parmas  参数
     * @param {*} callBack 回调
     * @memberof NetWorkTool
     */
     static MchtBannerQuery(parmas, callBack) {
        let url = 'v2/web/mchtBanner/query' 
        postFetch(url, parmas).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    } 
    /**
     * 商户详情
     * @static
     * @param {*} callBack 回调
     * @memberof NetWorkTool
     */
     static getMchtcontrolMchtId(callBack) {
        let url = "v2/web/mchtcontrol/" + BusiInfo.userInfo.usr.mchtId 
        getFetch(url).then(response => {
            return callBack(response.content) 
        })
    }

    /**
     *查询适用商户
     *
     * @static
     * @param {*} parmas
     * @param {*} callBack
     * @memberof NetWorkTool
     */
     static qureyApplyBusiness(callBack) {
        let url = 'v2/web/mcht/getmchtname/' + BusiInfo.userInfo.usr.mchtId 
        getFetch(url).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }

    /* ------------------活动相关接口--------------------- */
    
    /**
     *活动查询
     *
     * @static
     * @param {*} parmas
     * @param {*} callBack
     * @memberof NetWorkTool
     */
     static ActQuery(parmas, callBack) {
        let url = 'v2/web/act/query' 
        postFetch(url, parmas).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }

    /**
     * 活动发布和暂停
     *
     * @static
     * @param {*} actId
     * @param {*} parmas
     * @param {*} callBack
     * @memberof NetWorkTool
     */
     static ActChange(actId, parmas, callBack) {
        let url = 'v2/web/act/change/' + actId 
        putFetch(url, parmas).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }


    /* ------------------商品相关接口--------------------- */

    /**
     *查询商品名称
     *
     * @static
     * @param {*} parmas
     * @param {*} callBack
     * @memberof NetWorkTool
     */
     static qureyProductName(callBack) {
        let url = 'v2/web/dishType/querylow/' + BusiInfo.userInfo.usr.mchtId 
        getFetch(url).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }


    /* ------------------二维码包关接口--------------------- */

    /**
     *生成二维码包
     *
     * @static
     * @param {*} parmas
     * @param {*} callBack
     * @memberof NetWorkTool
     */
     static ScanGenerateQR(parmas, callBack) {
        let url = 'v2/web/scan/generateQR' 
        postFetch(url, parmas).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }



    /**
     * 获取二维码包详情
     * @static v2/web/scan/detail
     * @param {*} parmas
     * @param {*} callBack
     * @memberof NetWorkTool
     */
     static ScanDetail(params, callBack) {
        let url = 'v2/web/scan/detail' 
        postFetch(url, params).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }


    /**
     ** 获取二维码包列表
     * @static v2/web/scan/agentQRList
     * @param {*} parmas
     * @param {*} callBack
     * @memberof NetWorkTool
     */
     static ScanAgentQRList(params, callBack) {
        let url = 'v2/web/scan/agentQRList' 
        postFetch(url, params).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }




    /* ------------------评论接口--------------------- */


    /**
     *查询评论列表
        *
        * @static
        * @param {*} couponId 电子券Id 
        * @param {*} params  aoData:分页 mchtId:商户ID commStar:评论星级 hasPic：是否有图片
        * @param {*} callBack 回调
        * @memberof NetWorkTool
        */
     static queryCommendList(couponId, params, callBack) {
        let url = 'v2/web/comment/querycoupon/' + couponId
        postFetch(url, params).then(response => {
            if (response.respCode === '00') {
                return callBack(response.content) 
            } else {
                Alert.alert(response.errorInfo) 
            }
        })
    }



    /**
     *POST /web/mchtorder/query 商户订单查询
     *
     * @static
     * @param {*} 
     * @param {*} params  aoData:分页 beginTime:开始时间 endTime:结束时间 mchtId:,orderType:类型
     * @param {*} callBack 回调
     * @memberof NetWorkTol
     */
    static MchtorderListQuery(params,callBack){
        let url = 'v2/web/mchtorder/query'
        postFetch(url,params).then(response=>{
            if(response.respCode === '00'){
                return callBack(response.content);
            } else {
                Alert.alert(response.errorInfo);
            }
        })
    }
    
}

