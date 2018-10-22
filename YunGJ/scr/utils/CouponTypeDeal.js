/**
 * 优惠券数据处理
 */

import React from 'react'
import DateUtil from './DateUtil'

/** 将“优惠券类型”转换为服务器可识别的字符 */
const convertCouponType=(type)=> {
    if(type === '代金券'){
        return 'cash';
    }else if(type === '折扣券'){
        return 'rebate';
    }else if(type === '抵用券'){
        return 'voucher';
    }else if(type === '票务'){
        return 'ticket';
    }else if(type === '礼品券'){
        return 'present';
    }else if(type === '普通券'){
        return 'general';
    }else if(type === '现金券'){
        return 'buy';
    }
}

/** 将服务器“优惠券类型”转换为字符串 */
const reconvertCouponType=(type)=>{
    if(type === 'cash'){
        return '代金券';
    }else if(type === 'rebate'){
        return '折扣券';
    }else if(type === 'voucher'){
        return '抵用券';
    }else if(type === 'present'){
        return '礼品券';
    }else if(type === 'ticket'){
        return '票务';
    }else if(type === 'buy'){
        return '现金券';
    }else if(type === 'general'){
        return '普通券';
    }
}


/** 将“优惠券使用权限”转换为服务器可识别的字符 */
const convertCouponUseRoot=(type)=>{
    if(type === '出售,分享,使用'){
        return 'default';
    }else if(type === '分享,使用'){
        return 'share';
    }else if(type === '使用'){
        return 'useonly';
    }
}

/** 将服务器“优惠券使用权限”转换为字符串 */
const reconvertCouponUseRoot=(type)=>{
    if(type === 'default'){
        return '出售,分享,使用';
    }else if(type === 'share'){
        return '分享,使用';
    }else if(type === 'useonly'){
        return '使用';
    }
}


/** 将“优惠券使用规则转”换为服务器可识别的字符 */
const convertCouponUseRule=(type)=>{
    if(type === '叠加使用'){
        return 'M';
    }else if(type === '与其他优惠券共同使用'){
        return 'D';
    }else {
        return 'DM';
    }
}

/** 将服务器“优惠券使用规则转”转换为字符串 */
const reconvertCouponUseRule=(type)=>{
    if(type === 'M'){
        return '叠加使用';
    }else if(type === 'D'){
        return '与其他优惠券共同使用';
    }else {
        return '叠加使用,与其他优惠券共同使用';
    }
}

/** 将“优惠券不可用日期”换为服务器可识别的字符 */
const convertCouponNoDate=(list)=>{
    var weeks = [];
    list.map(data=>{
        if(data === '星期一'){
            weeks.push('1');
        }else if(data === '星期二'){
            weeks.push('2');
        }else if(data === '星期三'){
            weeks.push('3');
        }else if(data === '星期四'){
            weeks.push('4');
        }else if(data === '星期五'){
            weeks.push('5');
        }else if(data === '星期六'){
            weeks.push('6');
        }else if(data === '星期七'){
            weeks.push('7');
        }
    })
    return weeks;
}

/** 将“优惠券不可用日期”换为服务器可识别的字符 */
const reconvertCouponNoDate=(str)=>{
   var list = str.split(',')
    var weeks = [];
    list.map(data=>{
        if(data === '1'){
            weeks.push('星期一');
        }else if(data === '2'){
            weeks.push('星期二');
        }else if(data === '3'){
            weeks.push('星期三');
        }else if(data === '4'){
            weeks.push('星期四');
        }else if(data === '5'){
            weeks.push('星期五');
        }else if(data === '6'){
            weeks.push('星期六');
        }else if(data === '7'){
            weeks.push('星期七');
        }
    })
    return weeks.join(',');
}

/**  创建可用时间段数据 */
const getUseTimeData=()=>{
        var times = [];
        for (var j = 0; j < 24; j++) {
            var time = (j < 10) ? ("0" + j + ":00") : (j + ":00");
            times.push(time);
        }
        return [times, times];
}
/**    时间选择  从1970年-2050年 */
const getDateData=()=> {
    let date = [];
    for (let i = 1990; i < 2050; i++) {
        let month = [];
        for (let j = 1; j < 13; j++) {
            let day = [];
            if (j === 2) {
                for (let k = 1; k < 29; k++) {
                    var num = k < 10 ? '0'+ k : k
                    day.push(num.toString());
                }
                if (i % 4 === 0) {
                    day.push('29');
                }
            }
            else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
                for (let k = 1; k < 32; k++) {
                    var num = k < 10 ? '0'+ k : k
                    day.push(num.toString());
                }
            }
            else {
                for (let k = 1; k < 31; k++) {
                    var num = k < 10 ? '0'+ k : k
                    day.push(num.toString());
                }
            }
            let _month = {};
            var num = j < 10 ? '0'+ j : j
            _month[num] = day;
            month.push(_month);
        }
        let _date = {};
        _date[i] = month;
        date.push(_date);
    }
    return date;
}

/** 获取优惠券数据 */
const getCouponData=(couponInfo,list)=>{
    for(item in couponInfo){
        model = item.toString()
        if(model == 'name'){
            list[0].rightText =  couponInfo.name
            continue;
        }
        if(model == 'mchtNames'){
            list[1].rightText =  couponInfo.mchtNames
            continue;
        }
        if(model == 'type'){
            list[2].rightText = reconvertCouponType(couponInfo.type)
            continue;
        }
        if(model == 'denomination'){
            list[3].rightText =  couponInfo.denomination.toString()
            continue;
        }
        if(model == 'restricted'){
            list[4].rightText =  couponInfo.restricted.toString()
            continue;
        }
        if(model == 'promAppro'){
            list[5].rightText = reconvertCouponType(couponInfo.promAppro)
            continue;
        }
        if(model == 'cash'){
            list[6].rightText = couponInfo.cash.toString()
            continue;
        }
        if(model == 'lowTypeNameList'){
            var typeNames = []
            couponInfo.lowTypeNameList.map(item=>{
                typeNames.push(item.typeName)
            })
            list[7].rightText =  typeNames.join(',')
            continue;
        }
        if(model == 'type2'){
            list[8].rightText =  reconvertCouponUseRoot(couponInfo.type2)
            continue;
        }
        if(model == 'validatyBegin'){
            list[9].rightText =  DateUtil.subDate(couponInfo.validatyBegin,"YMD",'-')
            continue;
        }
        if(model == 'validatyEnd'){
            list[10].rightText =  DateUtil.subDate(couponInfo.validatyEnd,"YMD",'-')
            continue;
        }
        if(model == 'useTime'){
            var times =  couponInfo.useTime.split(',')
            if( times.length >= 2 ){
                list[11].rightText = times[0]
                list[12].rightText = times[1]
                continue;
            }else{
                list[11].rightText =  couponInfo.useTime
                continue;
            }
        }
        if(model == 'disableDate'){
            list[13].rightText = reconvertCouponNoDate(couponInfo.disableDate)
            continue;
        }
        if(model == 'useRule'){
            list[14].rightText = reconvertCouponUseRule(couponInfo.useRule)
            continue;
        }
        if(model == 'useNum'){
            list[15].rightText = couponInfo.useNum
            continue;
        }
    }
    return list;
}


export {
    convertCouponType,
    reconvertCouponType,
    convertCouponUseRoot,
    reconvertCouponUseRoot,
    convertCouponUseRule,
    reconvertCouponUseRule,
    convertCouponNoDate,
    reconvertCouponNoDate,
    getUseTimeData,
    getDateData,
    getCouponData
}