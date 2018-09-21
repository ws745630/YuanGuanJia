import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'
import { ScaleSize, ScaleText, Theme } from '../../../public/FileReference'
import DateUtil from '../../../public/DateUtil'
import Base64Util from '../../../public/Base64Util'

export default class CommendCell extends Component {

    render() {
        var commendModel = this.props.commendModel.item
        return (
            <View style={styles.container}>
                <Image style={styles.com_image} source={{ uri: commendModel.usrPicUrl }}></Image>
                <View style={styles.com_container}>
                    <View>
                        <View style={styles.com_top}>
                            <Text style={styles.com_title}>{commendModel.usrName}<Text style={styles.comStr}>的评论</Text></Text>
                            <Text style={styles.com_date}>{DateUtil.convertTimestamp(commendModel.crtTime, 'yyyy-mm-dd')}</Text>
                        </View>
                        <Text style={styles.com_content}>{Base64Util.decodeBase64Content(commendModel.comDsc)}</Text>
                    </View>
                    {this._createReplyView(commendModel.replyDsc)}
                </View>

            </View>
        )
    }

    // 创建回复View
    _createReplyView(list) {
        if (!list) return null

        var replyList = list.splice(0, 3)
        var replyViews = []
        replyList.map(item => {
            var reply = <CommendReplyView key = {item.commId}
                            usrName={item.usrName} 
                            replyUsrName={item.replyUsrName} 
                            crtTime={DateUtil.convertTimestamp(item.crtTime, 'yyyy-mm-dd')}
                            content={Base64Util.decodeBase64Content(item.dsc)}/>
            replyViews.push(reply)
        })
        return (
            <View style={styles.reply_views}>
                {replyViews}
                <Text style={styles.look_more}>查看更多</Text>
            </View>)
    }
}


class CommendReplyView extends Component {
    render() {
        return (
            <View style={styles.com_rep_container}>
                <View style={styles.com_rep_top}>
                    <Text style={styles.com_reply}>{this.props.usrName}<Text style={styles.reply}>回复</Text>{this.props.replyUsrName}</Text>
                    <Text style={styles.com_date}>{this.props.crtTime}</Text>
                </View>
                <Text style={styles.com_content}>{this.props.content}</Text>
            </View>
        )
    }
}

/** 样式表 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: ScaleSize(5),
        paddingRight: ScaleSize(5),
        paddingTop: ScaleSize(10),
        paddingBottom: ScaleSize(10),
    },
    // 评论样式表
    com_image: {
        width: ScaleSize(60),
        height: ScaleSize(60)
    },
    com_container: {
        flex: 1,
        paddingLeft: ScaleSize(10),
    },
    com_top: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Theme.lineColor,
        paddingBottom: ScaleSize(10),
    },
    com_title: {
        paddingTop: ScaleSize(5),
        fontSize: ScaleText(16),
    },
    comStr: {
        color: '#404040',
        fontSize: ScaleText(15),
    },
    com_date: {
        position: 'absolute',
        fontSize: ScaleText(11),
        color: '#bbb',
        right: ScaleSize(10),
    },
    com_content: {
        paddingTop: ScaleSize(8),
        color: '#404040',
    },
    look_more:{
        paddingTop:ScaleSize(10),
        color:Theme.mainColor,
        fontSize:ScaleText(13)
    },
    // 回复样式表
    reply_views: {
        marginTop:ScaleSize(10),
        borderTopWidth: 1,
        borderTopColor: Theme.lineColor,
    },
    com_rep_container: {
        flex: 1,
        paddingTop: ScaleSize(5),
        paddingBottom: ScaleSize(5),
    },
    com_rep_top: {
        flexDirection: 'row',
    },
    com_reply: {
        color: Theme.mainColor,
        fontSize: ScaleText(13)
    },
    reply:{
        color: '#404040',
        fontSize: ScaleText(12)
    }
})