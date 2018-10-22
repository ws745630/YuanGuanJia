/** 网络请求工具类的拓展类，便于后期网络层修改维护 **/

import HttpUtils from './HttpUtils'
import {dataCache} from './cache'

const API_URL = 'http://116.62.243.178/';

/**
 * GET
 * 从缓存中读取数据
 * @param isCache: 是否缓存
 * @param url 请求url
 * @param params 请求参数
 * @param isCache 是否缓存
 * @param callback 是否有回调函数
 * @returns {value\promise}
 * 返回的值如果从缓存中取到数据就直接换行数据，或则返回promise对象
 */
const fetchData = (isCache, type) => (url, params, callback)  => {

  url = `${API_URL}${url}`

  const fetchFunc = () => {

    var promise;
    if(type === 'put'){
      promise= HttpUtils.putRequrst(url, params)
    }else if(type === 'get'){
      promise= HttpUtils.getRequest(url, params)
    }else if(type === 'post'){
      promise= HttpUtils.postRequrst(url, params)
    }else if(type === 'delete'){
      promise= HttpUtils.deleteRequrst(url, params)
    }
    if (callback && typeof callback === 'function') {
      promise.then(response => {
        return callback(response)
      })
    }
    return promise
  }
  return dataCache(url, fetchFunc, isCache)
}

/**
 * GET 请求
 * @param url
 * @param params
 * @param source
 * @param callback
 * @returns {{promise: Promise}}
 */
const getFetch = fetchData(false, 'get')

/**
 * POST 请求
 * @param url
 * @param params
 * @param callback
 * @returns {{promise: Promise}}
 */
const postFetch = fetchData(false, 'post')


/**
 * PUT 请求
 * @param url
 * @param params
 * @param callback
 * @returns {{promise: Promise}}
 */
const putFetch = fetchData(false, 'put')


/**
 * DELETE 请求
 * @param url
 * @param params
 * @param callback
 * @returns {{promise: Promise}}
 */
const deleteFetch = fetchData(false, 'delete')



/**
 * GET 请求，带缓存策略
 * @param url
 * @param params
 * @param callback
 * @returns {{promise: Promise}}
 */
const getFetchFromCache = fetchData(true, 'get')

export {getFetch, postFetch,putFetch,deleteFetch,getFetchFromCache}