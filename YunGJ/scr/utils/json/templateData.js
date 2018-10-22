import BusiInfo  from '../BusiInfo'
import DateUtil from '../DateUtil'

/* 获取模板Title数据 */
export const getTemplateTitleData = (couponType) => {

    var list = getTemplateData()
    var tempData = []
    var types = ["cash1","cash2","rebate1","rebate2","vouther1","vouther2"]
    var beginDate = DateUtil.getTodayDate('.')
    var endDate = DateUtil.getWillDate(30,'.')
    types.map(item =>{
        var model = {}
        var leftArray = []
        var rightArray = []
        var useRoot = " "
        var title = " "
        var type = " "
        if(item.indexOf('cash') == 0){
            type = "cash"
            useRoot = (item == 'cash1') ? '出售、分享、使用' : "分享、使用"
            title =  (item == 'cash1') ? '代金券 建券方案一' : "代金券 建券方案二"
            leftArray = ["电子券名称","类型","发券途径","电子券使用状态","不可用日期","面值",
                      "总数量","使用规则","叠加张数","使用开始时间","使用结束日期","有效期"]
            rightArray = ["50元代金券","代金券",'普通券',useRoot,"星期六、星期天",
                           "50","1000","叠加使用","2",beginDate,endDate,
                           "09:00-21:00"]

        }else if(item.indexOf('rebate') == 0){
            type = "rebate"
            useRoot = (item == 'rebate1')?'出售、分享、使用':"分享、使用"
            title =  (item == 'rebate2') ? '折扣券 建券方案一' : "折扣券 建券方案二"
            leftArray = ["电子券名称","类型","发券途径","电子券使用状态",
                          "不可用日期","折扣","总数量","使用开始时间",
                          "使用结束日期","有效期"];
            rightArray = ["8.8折优惠券","折扣券",'普通券',useRoot,"星期六、星期天",
                           "8.8","1000",beginDate,endDate,"09:00-21:00"]
        }else if(item.indexOf('vouther') == 0){
            type = "voucher"
            useRoot = (item == 'voucher1')?'出售、分享、使用':"分享、使用"
            title =  (item == 'voucher1') ? '抵用券 建券方案一' : "抵用券 建券方案二"
            leftArray = ["电子券名称","类型","抵用券限制金额","发券途径","电子券使用状态",
                          "不可用日期","面值","总数量","使用规则","叠加张数","使用开始时间",
                          "使用结束日期","有效期"];
            rightArray = ["满200减30抵用券","抵用券","200",'普通券',useRoot,"星期六、星期天",
                           "30","1000","叠加使用","2",beginDate,endDate,
                           "09:00-21:00"]
        }
        model["type"] = type
        model["title"] = title
        model["key"] = item
        model["leftTitles"] = leftArray
        model["rightTitles"] = rightArray
        tempData.push(model)
    })
    
    return tempData

}

/* 获取模板建券需要的数据 */
export const getTemplateData = (key) => {
    var couponTypes = ["cash","voucher","rebate"];
    // "50元代金券","满200减30抵用券","8.8折优惠券"
    var couponInfo = {}
    couponTypes.map((item,index) =>{
        var model1 = createCouponModel(item,'default')
        var model2 = createCouponModel(item,'share')
        if(item == 'cash'){
            couponInfo["cash1"] = model1
            couponInfo["cash2"] = model2
        }else if(item == 'rebate'){
            couponInfo["rebate1"] = model1
            couponInfo["rebate2"] = model2
        }else if(item == 'voucher'){
            couponInfo["voucher1"] = model1
            couponInfo["voucher2"] = model2
        }
    })
    return couponInfo[key]
}

/* 返回一个优惠券数据模型 */
const createCouponModel = (type,useRoot)=>{
    var couponInfo = {}
    couponInfo["mchtId"] = BusiInfo.userInfo.usr.mchtId
    couponInfo["type"] = type
    couponInfo["promAppro"] = 'general'
    couponInfo["num"] = 1000
    couponInfo["disableDate"] = '6,7'
    var beginDate = DateUtil.getTodayDate("")
    var endDate = DateUtil.getWillDate(30,"")
    couponInfo["validatyBegin"] = beginDate
    couponInfo["validatyEnd"] = endDate
    couponInfo["useTime"] = "09:00-21:00"
    couponInfo["scpoe"] = ''
    couponInfo["type2"] = useRoot
    if (type == "rebate") {
        couponInfo["name"] = '8.8折优惠券'
        couponInfo["denomination"] = "88"
    }else if (type == "voucher"){
        couponInfo["name"] = "满200减30抵用券"
        couponInfo["restricted"] = 200;
        couponInfo["denomination"] = 30;
        couponInfo["useNum"] = 2;
        couponInfo["useRule"] = "M";
    }else if (type == "cash"){
        couponInfo["name"] = "50元代金券"
        couponInfo["denomination"] = 50
        couponInfo["useNum"] = 2
        couponInfo["useRule"] = "M"
    }
    return couponInfo
}
