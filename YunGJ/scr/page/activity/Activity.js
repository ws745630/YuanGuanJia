import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import ActivityCell from '../activity/ActivityCell'
import NetWorkTool from '../../utils/network/NetWorkTool'
import BusiInfo from '../../utils/BusiInfo'
import {ScaleSize,ScaleText} from '../../utils/Fit'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'


export default class Activity extends Component {
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
    }

    keyExtractor = (item, index) => {
        return index.toString()
    }
    renderCell({item}){
        return <ActivityCell  ActivityModel={item} />
    }

    onHeaderRefresh = () => {
        this.setState({ refreshState: RefreshState.HeaderRefreshing,page:1})
        this.getActList()
      }
    
      onFooterRefresh = () => {
        this.setState({ refreshState: RefreshState.FooterRefreshing,page:this.state.page++})
        this.getActList()
      }
      // 获取数据
      getActList() {
        let currentPage = this.state.page;
        console.log('当前页数为'+currentPage);
        var aodata = '[{"name":"iDisplayStart","value":' + currentPage +'},{"name":"iDisplayLength","value":10}]'
        var parmas = {"aoData":aodata,
                    "mchtId":BusiInfo.userInfo.usr.mchtId,
                    "actStat":""};
        var that = this;
        NetWorkTool.ActQuery(parmas,(result=>{
            var list = result.actLists;
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
                    renderItem={this.renderCell}
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
        backgroundColor: '#F2F2F2',
    },
    coupon_bg: {
        width: window.width,
        height: ScaleSize(120),
    },
    coupon_image: {
        width: window.width,
        height: ScaleSize(110),
        flexDirection: 'row',
    },
    coupon_left: {
        width: ScaleSize(80),
        height: ScaleSize(100),
        marginLeft: ScaleSize(10),
        marginTop: ScaleSize(10),
        justifyContent: 'center',
        alignItems: 'center',

    },
    coupon_flag: {
        fontWeight: 'bold',
        fontSize: ScaleText(13),
        color: 'white',
        marginBottom: ScaleSize(5),
    },
    coupon_num: {
        fontSize: ScaleText(30),
        color: 'white',
        marginBottom: ScaleSize(5),
    },
    coupon_type: {
        fontSize: ScaleText(14),
        color: 'white',
        marginBottom: ScaleSize(5),
    },
    coupon_right: {
        flex: 1,
        marginLeft: ScaleSize(10),
        justifyContent: 'center',
    },
    coupon_name: {
        fontSize: ScaleText(17),
        marginTop: ScaleSize(10),
        marginBottom: ScaleSize(10),
    },
    coupon_date: {
        fontSize: ScaleSize(13),
        color: '#505152',
        marginBottom: ScaleSize(5),
    },
    coupon_info: {
        flexDirection: 'row',

    },
    coupon_info_content: {
        fontSize: ScaleText(13),
        color: '#505152',
        marginRight: ScaleSize(10)
    }

})

