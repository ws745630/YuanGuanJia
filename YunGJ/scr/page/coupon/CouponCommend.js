
import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Button, ButtonGroup } from 'react-native-elements'
import ArrowIcon from 'react-native-vector-icons/EvilIcons'
import { Theme, DeviceInfo, Toast, ScaleSize, ScaleText } from '../../public/FileReference'
import BusiInfo from '../../public/BusiInfo'
import CommendCell from './cell/CommendCell'
import NetWorkTool from '../../public/network/NetWorkTool'

export default class extends Component {

    constructor(props) {
        super(props)
        this.state = {
            expand: true,
            selectedIndex: 0,
            com_start: '',
            commendList: [],
            currentPage:1,
        }
    }

    /** 组件加载完成 */
    componentDidMount() {
        this._qureyCommendList()
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { this._expandClick() }}>
                    <View style={styles.top_container}>
                        <Text style={styles.top_title}>关于电子券评论</Text>
                        <ArrowIcon name={this.state.expand ? 'chevron-up' : 'chevron-down'} size={35}></ArrowIcon>
                    </View>
                </TouchableOpacity>
                {this.state.expand ? this._renderCommendView() : null}
            </View>
        )
    }

    /* 渲染评论View */
    _renderCommendView() {
        var commendList = this.state.commendList.commList
        var allCount = 0,satisCount = 0,ordinary = 0,noSatis = 0
        if(this.state.commendList.couponComNum){
            allCount = this.state.commendList.couponComNum
        }
        if(this.state.commendList.couponComStar3Num){
            satisCount = this.state.commendList.couponComStar3Num
        }
        if(this.state.commendList.couponComStar12Num){
            ordinary = this.state.commendList.couponComStar12Num
        }
        if(this.state.commendList.couponComStar45Num){
            noSatis = this.state.commendList.couponComStar45Num
        }
        var all = "全部(" + allCount + ")"
        var satis = '满意(' + satisCount + ")"
        var ordinary = "一般(" + ordinary + ")"
        var noSatis = "不满意(" + noSatis + ")"
        var buttons = [all, satis, ordinary, noSatis]
        return (
            <View style={styles.commend_container}>
                <ButtonGroup
                    onPress={this._commendBtnClick.bind(this)}
                    selectedIndex={this.state.selectedIndex}
                    buttons={buttons}
                    containerStyle={styles.containerStyle}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.titleStyle}
                    selectedButtonStyle={styles.selectedButtonStyle}
                    innerBorderStyle={styles.innerBorderStyle}
                />
                <FlatList data={commendList}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>

        )
    }

    // 渲染列表Item
    _renderItem(item){
        return (<CommendCell commendModel={item} />)
    }

    // 设置Key
    _keyExtractor = (item, index) => {
        return index.toString()
    }

    _qureyCommendList(){
        var couponId = this.props.couponId
        var page = this.state.currentPage
        var aoData = '[{"name":"iDisplayStart","value":' + page + '},{"name":"iDisplayLength","value":10}]'
        var params = {
            aoData: aoData,
            mchtId: BusiInfo.userInfo.usr.mchtId,
            commStar: this.state.com_start,
            hasPic: ''
        }
        NetWorkTool.queryCommendList(couponId, params, result => {
            console.log('评论列表' + JSON.stringify(result));
            this.setState({ commendList: result })
        })
    }

    /* 评论视图展开 */
    _expandClick() {
        this.setState({ expand: !this.state.expand })
    }

    /* 评论按钮点击 */
    _commendBtnClick(selIndex) {
        var comStart = ''
        if(selIndex == 1){
            comStart = '0'
        }else if(selIndex == 2){
            comStart = '1'
        }else if(selIndex == 3){
            comStart = '2'
        }
        this.setState({ 
            selectedIndex: selIndex,
            com_start:comStart
        })
    }
}
/** 样式表 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: ScaleSize(10),
        backgroundColor: 'white',
        marginBottom:ScaleSize(10)
    },
    top_container: {
        flexDirection: 'row',
        height: ScaleSize(40),
        borderBottomWidth: 1,
        borderBottomColor: Theme.lineColor,
        alignItems: 'center'
    },
    top_title: {
        flex: 1,
        paddingLeft: ScaleSize(10),
        fontSize: ScaleText(17),
    },
    commend_container: {
        flex: 1,
    },
    containerStyle: {
        backgroundColor: 'white',
        height: 40,
        borderWidth: 0,
    },
    // 内部分割线
    innerBorderStyle: {
        // 隐藏内部分割线
        color: 'white'
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: Theme.mainColor,
        backgroundColor: '#f4fff7',
        marginLeft: ScaleSize(5),
        marginRight: ScaleSize(5),
        borderRadius: 5,
    },
    textStyle: {
        fontSize: 15,
        color: 'black'
    },
    selectedButtonStyle: {
        backgroundColor: Theme.mainColor,
        color: 'white'
    }


})