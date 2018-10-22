import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
// import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import {Theme,DeviceInfo,ScaleSize,ScaleText,Toast} from '../../utils/FileReference'
import OrderCell from './cell/OrderCell';
import NetWorkTool from '../../utils/network/NetWorkTool'
import BusiInfo from '../../utils/BusiInfo'

export default class OrderView extends Component {

    constructor(props) {
        super(props)
        //在这里定义json返回的key
        this.state = {
            page: 1,
            dataList: [],
            beginTime: '',
            endTime: '',
            orderType: '0',//0, /** 全部订单 */1, /** 交易订单 */2, /** 已发货订单 */3, /** 待发货单 */4 /** 验券订单 */
            refreshState: RefreshState.HeaderRefreshing,

        }
    }
    componentDidMount() {
        this.onHeaderRefresh()
    }
    // 获取数据
    getOrderList() {
        let currentPage = this.state.page;
        let beginTimeSty = this.state.beginTime;
        let endTimeSty = this.state.endTime;
        let orderTypeSty = this.state.orderType;
        var aodata = '[{"name":"iDisplayStart","value":' + currentPage + '},{"name":"iDisplayLength","value":10}]'
        var parmas = {
            aoData: aodata,
            mchtId: Number(BusiInfo.userInfo.usr.mchtId),
            beginTime: beginTimeSty,
            endTime: endTimeSty,
            orderType: orderTypeSty
        };
        // var that = this;
        NetWorkTool.MchtorderListQuery(parmas, (result => {
            var refreshState = RefreshState.Idle;
            var total = result.total;
            if(total == 0){
                this.setState({
                    dataList: [],
                    refreshState: refreshState,
                }) 
            }else{
                var list = result.mchtOrderList;
                if (currentPage === 1) {
                } else {
                    list = this.state.dataList.concat(list)
                }
                if (list.length === total) {
                    refreshState = RefreshState.NoMoreData
                }
                this.setState({
                    dataList: list,
                    refreshState: refreshState,
                })
            }
            
        }))
    }

    onHeaderRefresh = () => {
        this.setState({ refreshState: RefreshState.HeaderRefreshing, page:1})
        this.getOrderList()
    }

    onFooterRefresh = () => {
        this.setState({ refreshState: RefreshState.FooterRefreshing, page:this.state.page++})
        this.getOrderList()
        
    }
    onHeaderTypeRefresh = (typeStr) => {
        this.setState({ refreshState: RefreshState.HeaderRefreshing, page: 1, orderType: typeStr })
        this.getOrderList()

    }

    //FlatList的key
    _keyExtractor = (item, index) => index.toString()

    _renderCell({ item, index }) {

        return (<View>
            <OrderCell orderModel={item} indexkey={index}  indexkey={index} />
        </View>)
    }

    /*tabType*/
    _headerTabView() {
        return (
            <View></View>
                /*<ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar />}
                    tabBarBackgroundColor={Theme.whiteColor}
                    tabBarActiveTextColor={Theme.mainColor}
                    tabBarInactiveTextColor={Theme.blackColor}
                    tabBarUnderlineStyle={{ backgroundColor: Theme.mainColor }}
                    tabBarTextStyle={{ fontSize: 15 }}
                    // page={Number(this.state.orderType)}
                    onChangeTab={(obj) => {
                        this.onHeaderTypeRefresh(obj.i.toString());

                    }}
                >
                    <Text tabLabel='全部订单' />
                    <Text tabLabel='交易订单' />
                    <Text tabLabel='已发货' />
                    <Text tabLabel='待发货' />
                    <Text tabLabel='验券' />
                </ScrollableTabView>*/
        )

    }
    render() {

        return (
            <RefreshListView
                data={this.state.dataList}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderCell}
                refreshState={this.state.refreshState}
                onHeaderRefresh={this.onHeaderRefresh}
                onFooterRefresh={this.onFooterRefresh}
                ListHeaderComponent={this._headerTabView()}
                // 可选
                footerRefreshingText='玩命加载中 >.<'
                footerFailureText='我擦嘞，居然失败了 =.=!'
                footerNoMoreDataText='没有数据了'
                footerEmptyDataText='-好像什么东西都没有-'
            />

        )
    }


}

const styles = StyleSheet.create({
    text: {
        marginTop: 20
    },
    subTitle: {
        marginTop: 10,
        color: '#666666',
        fontSize: 12,
        flex: 1
    },
    imgStyle: {
        width: DeviceInfo.screenWidth * 0.3,
        height: 80
    },
    footer: {
        flexDirection: 'row',
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    }
})