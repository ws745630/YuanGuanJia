/**
 * Created by guangqiang on 2017/9/5.
 */
import React from 'react'

export default class DateUtil extends React.Component {

/**
 * 时间字符串截取
 * date: 传入时间
 * format：截取的分割符 如串-  Y M D 
 * part 分割符  
*/
  static subDate = (date, format,part='.') => {
    let year, month, day, hour, minute, second;
    year = date.substr(0, 4);
    month = date.substr(4, 2);
    day = date.substr(6, 2);
    if (format == "YMD") {
      return year + part + month + part + day;
    } else if (format == "YMDHM") {
      hour = date.substr(8, 2);
      minute = date.substr(10, 2);
      return year + part + month + part + day + " " + hour + ":" + minute;
    } else {
      hour = date.substr(8, 2);
      minute = date.substr(10, 2);
      second = date.substr(12, 2);
      return year + part + month + part + day + " " + hour + ":" + minute + ":" + second;
    }
    return year + part + month + part + day;
  }

  /* 获取当前年份 */
  static getCurYear = () => {
    var date = new Date();
    var year = date.getFullYear();
    return year;
  }

  /* 获取当前月份 */
  static getCurMonth = () => {
    var date = new Date();
    var month = date.getMonth() + 1;
    if(month < 10){month = '0'+ month}
    return month;
  }

  /* 获取当前今天多少号 */
  static getCurDay = () => {
    var date = new Date();
    var day = date.getDay();
    if(day < 10){day = '0'+ day}
    return day;
  }

  /* 获取当前星期几 */
  static getCurWeek = () => {
    var date = new Date();
    let weeks = ['日', '一', '二', '三', '四', '五', '六'];
   //getDay获取当前月份为星期几
    let date1 = weeks[date.getDay()];
    var week = '星期'+date1;
    return week;
  }


  /**  截取 时 分 秒 */
  static subTimeSr = (timeSr) => {
    let hour, minute, second;
    hour = timeSr.substr(0, 2);
    minute = timeSr.substr(2, 2);
    second = timeSr.substr(4, 2);
    return hour + ":" + minute + ":" + second;
  }

  /**
   * 获取当前时间
   *
   * @format 时间格式  如传“-” 返回 1999-01-11
   * @memberof DateUtil
   */
  static getTodayDate=(format)=> {
    let now = new Date()
    let yy = now.getFullYear()
    let mm = now.getMonth() + 1
    let month = mm < 10 ? '0'+ mm : mm
    let dd = now.getDate()
    let day = dd < 10 ? '0'+ dd : dd
    return( yy + format + month + format + day)    
  }

  /**
   * 获取当前时间加天数后的时间
   * 
   * @day   加的天数
   * @format 时间格式  如传“-” 返回 1999-01-11
   * @memberof DateUtil
   */
  static getWillDate=(day,format)=>{
    let now = new Date()
    now.setDate(now.getDate()+ parseInt(day)); 
    let yy = now.getFullYear()
    let mm = now.getMonth() + 1
    let month = mm < 10 ? '0'+ mm : mm
    let dd = now.getDate()
    let oneDay = dd < 10 ? '0'+ dd : dd
    return( yy + format + month + format + oneDay)
  }
   
  
  /**
   *时间戳转换
   * @timestamp 时间戳
   * @format 转换格式  如yyyy-mm-dd hh:mm:ss
   */
  static convertTimestamp = (timestamp,format)=>{

    var date = new Date(timestamp);
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;  
    second = second < 10 ? ('0' + second) : second; 
    if(format === 'yyyy-mm-dd'){
      return y + '-' + m + '-' + d
    }else if(format === 'yyyy-mm-dd hh:mm'){
      return y + '-' + m + '-' + d+' '+h+':'+minute;
    }else if(format === 'yyyy-mm-dd hh:mm:ss'){
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    }
    return y + '-' + m + '-' + d
  }
  
  
}

