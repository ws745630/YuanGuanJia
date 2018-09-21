/** 基于fetch 封装的网络请求工具类 **/

import { Component } from 'react'
import { Alert, AsyncStorage } from 'react-native'
import BusiInfo from '../BusiInfo';
import {Actions} from 'react-native-router-flux'
import Toast from '../../component/toast/Toast'
import {Loading} from '../../component/toast/Loading'

/**
 * fetch 网络请求的header，可自定义header
 */
const  jointHeader = url => {
  
  // let usrId = '';
  // let token = '';
  // let accessToken = '';
  let dic = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'appId': '3585751FCCBF7574E266BF4AC5E14485',
     accessToken:BusiInfo.accessToken,
     usrId:BusiInfo.usrId,
     token:BusiInfo.token,
  }
  let urlString = url.toString();
  let IsWeb =  urlString.indexOf('web');
  // console.log(IsWeb);
  return dic;
}

/**
* GET 请求时，拼接请求URL
* @param url 请求URL
* @param params 请求参数
* @returns {*}
*/
const handleUrl = url => params => {
  if (params) {
    let paramsArray = []
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
    if (url.search(/\?/) === -1) {
      typeof (params) === 'object' ? url += '?' + paramsArray.join('&') : url
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return url
}

/**
* fetch 网络请求超时处理
* @param original_promise 原始的fetch
* @param timeout 超时时间 20s
* @returns {Promise.<*>}
*/
const timeoutFetch = (original_fetch, timeout = 20000) => {
  let timeoutBlock = () => { }
  let timeout_promise = new Promise((resolve, reject) => {
    timeoutBlock = () => {
      // 请求超时处理
      Loading.hidden()
      reject('timeout promise请求超时')
    }
  })

  // Promise.race(iterable)方法返回一个promise
  // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
  let abortable_promise = Promise.race([
    original_fetch,
    timeout_promise
  ])

  setTimeout(() => {
    timeoutBlock()
  }, timeout)

  return abortable_promise
}

/**
 * 网络请求工具类
 */
export default class HttpUtils extends Component {
  /**
   * 基于fetch 封装的GET 网络请求
   * @param url 请求URL
   * @param params 请求参数
   * @returns {Promise}
   */
  static getRequest = (url, params = {}) => {
    Loading.show();
    return timeoutFetch(fetch(handleUrl(url)(params), {
      method: 'GET',
      headers: jointHeader(url)
    })).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        if(response.status === '401'){
          Actions.Login();
          Toast.show('登录异常，重新登录')
        }else{
          Toast.show('服务器繁忙，请稍后再试')
        }
      }
    }).then(response => {
      Loading.hidden();
      // response.code：是与服务器端约定code：200表示请求成功，非200表示请求失败，message：请求失败内容
      if (response) {
        return response
      } else {
        // 非 200，错误处理
        return response
      }
    }).catch(error => {
      Loading.hidden();
      Alert.alert(error)
    })
  }

  /**
   * 基于fetch 的 POST 请求
   * @param url 请求的URL
   * @param params 请求参数
   * @returns {Promise}
   */
  static postRequrst = (url, params = {}) => {
    Loading.show();
    return timeoutFetch(fetch(url, {
      method: 'POST',
      headers: jointHeader(url),
      body: JSON.stringify(params)
    })).then(response => {
     
      if (response.ok) {
        return response.json()
      } else {
        Loading.hidden();
        if(response.status == 401){
          Actions.Login();
          Toast.show('登录异常，重新登录')
        }else{
          Toast.show('服务器繁忙，请稍后再试')
        }
      }
    }).then(response => {
      Loading.hidden();
      console.log('hidden-------------' + url)
      // response.code：是与服务器端约定code：200表示请求成功，非200表示请求失败，message：请求失败内容
      return response;
    }).catch(error => {
      Loading.hidden();
      console.log('hidden-------------' + url)
      Alert.alert(error)
    })
  }

  /**
   * 基于fetch 的 PUT 请求
   * @param url 请求的URL
   * @param params 请求参数
   * @returns {Promise}
   */
  static putRequrst = (url, params = {}) => {
    Loading.show();
    return timeoutFetch(fetch(url, {
      method: 'PUT',
      headers: jointHeader(url),
      body: JSON.stringify(params)
    })).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        Alert.alert('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
      }
    }).then(response => {
      Loading.hidden();
      console.log('hidden-------------' + url)
      // response.code：是与服务器端约定code：200表示请求成功，非200表示请求失败，message：请求失败内容
      return response;
    }).catch(error => {
      Loading.hidden();
      console.log('hidden-------------' + url)
      Alert.alert(error)
    })
  }

  /**
   * 基于fetch 的 -DELETE 请求
   * @param url 请求的URL
   * @param params 请求参数
   * @returns {Promise}
   */
  static deleteRequrst = (url, params = {}) => {
    Loading.show();
    return timeoutFetch(fetch(url, {
      method: 'DELETE',
      headers: jointHeader(url),
      body: JSON.stringify(params)
    })).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        Alert.alert('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
      }
    }).then(response => {
      Loading.hidden();
      console.log('hidden-------------' + url)
      // response.code：是与服务器端约定code：200表示请求成功，非200表示请求失败，message：请求失败内容
      return response;
    }).catch(error => {
      Loading.hidden();
      console.log('hidden-------------' + url)
      Alert.alert(error)
    })
  }




}

