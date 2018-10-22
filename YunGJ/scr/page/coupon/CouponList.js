/*
 *  优惠券列表
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    DeviceEventEmitter,
    Alert
    
} from 'react-native';
import CouponCell from './cell/CouponCell'
import NetWorkTool from '../../utils/network/NetWorkTool'
import BusiInfo from '../../utils/BusiInfo'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import Emitter from '../../utils/EmitterConst'

export default class Coupon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: [],
            page:1,
            refreshState: RefreshState.Idle,
        }
    }

    componentDidMount() {
        this.onHeaderRefresh()
        // 接受通知
        this.couponEditSuccess  =  DeviceEventEmitter.addListener(Emitter.COUPON_EDIT_SUCCESS,()=>{
            this.onHeaderRefresh()
        });
         // 接受通知
         this.couponDeleteSuccess = DeviceEventEmitter.addListener(Emitter.COUPON_DELETE_SUCCESS,(index)=>{
             var list = this.state.dataList
             list.splice(index,1)
            this.setState({dataList:list})
        });
    }
    componentWillUnmount(){
        this.couponEditSuccess.remove();
        this.couponDeleteSuccess.remove();
        // 释放通知
      
    }

    
    keyExtractor = (item, index) => {
        return index.toString()
    }
    renderCell({item,index}){
      
        
        return (<View>
              <CouponCell coucponModel={item} indexkey={index}/>
        </View>)
    }
    _refreshList(){
        this.setState({ refreshState: RefreshState.HeaderRefreshing,page:1})
        this.getCouponList() 
    }

     onHeaderRefresh = () => {
        this.setState({ refreshState: RefreshState.HeaderRefreshing,page:1})
        this.getCouponList()
      }
    // 下拉加载
      onFooterRefresh = () => {
        this.setState({ refreshState: RefreshState.FooterRefreshing,page:this.state.page++})
        this.getCouponList()
      }
      // 获取数据
      getCouponList() {
        let currentPage = this.state.page;
        console.log('当前页数为'+currentPage);
        var aodata = '[{"name":"iDisplayStart","value":' + currentPage +'},{"name":"iDisplayLength","value":30}]'
        var parmas = {"aoData":aodata,
                    "mchtId":BusiInfo.userInfo.usr.mchtId,
                    "name":"",
                    "type":"",
                    "type2":"",
                    "promAppro":"",
                    "accredit":"1"};
        var that = this;
        NetWorkTool.queryCouponList(parmas,(result=>{
            var list = result.couponList;
            var total = result.total;
            var current = result.current;
            var refreshState = RefreshState.Idle;
            if(current === 1){
                
            }else{
                list = that.state.dataList.concat(list)
            }
            if(total < 10){
                refreshState = RefreshState.NoMoreData
            }
            that.setState({
                dataList:list,
                total:result.total,
                refreshState: refreshState,
            })
        }))
      }

    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={this.state.dataList}
                    keyExtractor={this.keyExtractor}
                    extraData={this.state}
                    renderItem={this.renderCell}
                    extraData={this.state}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}
                    // 可选
                    footerRefreshingText='玩命加载中 >.<'
                    footerFailureText='我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText='没有数据了'
                    footerEmptyDataText='-好像什么东西都没有-'
                />
            </View>);
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    }
})

