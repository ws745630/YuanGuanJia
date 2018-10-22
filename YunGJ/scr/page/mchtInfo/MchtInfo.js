import React, { Component } from 'react'  
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native'  
import NetWorkTool from '../../utils/network/NetWorkTool'  
import BusiInfo from '../../utils/BusiInfo'  
import Swiper from 'react-native-swiper'  
import ShowTicket from '../../component/coupon/ShowTicket'
import { Theme,DeviceInfo,ScaleSize,ScaleText} from '../../utils/FileReference'


let H = 200  
//定义一些全局的变量
var cols = 6  
var boxW = 50  
var vMargin = (DeviceInfo.width - cols * boxW) / (cols + 1)  
var hMargin = 10  

export default class MchtInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false,
            items: [],
            mcht:{},
            weekStr:'',
            FacilArr:[],
            couponList:{},

        }
    }
    componentDidMount() {
        

        NetWorkTool.getMchtcontrolMchtId(response=> {

            var parmars = {
                "mchtId": BusiInfo.userInfo.usr.mchtId,
            }
            NetWorkTool.MchtBannerQuery(parmars, (response => {
                var response = response  
                var item  
    
                for (let i = 0;i < response.list.length;i++) {
                    item = response.list[i].picUrl  
                    this.state.items.push(item)  
                }
                this.setState({
                    isShow: true,
                    items: this.state.items
                })
            }))

            var mcht = response.mcht
            var weekArr=response.mcht.mchtBusDay.split(",")//营业日
           
            let mchtBusDayStr = '营业时间:星期'  
            for (var i = 0;i <= weekArr.length;i++) {
                if(weekArr[i] === '1'){
                    mchtBusDayStr =mchtBusDayStr+'一,'
                }else if(weekArr[i] === '2'){
                    mchtBusDayStr = mchtBusDayStr+'二,'
                }else if(weekArr[i] === '3'){
                    mchtBusDayStr = mchtBusDayStr+'三,'
                } else if(weekArr[i] === '4'){
                    mchtBusDayStr = mchtBusDayStr+'四,'
                } else if(weekArr[i] === '5'){
                    mchtBusDayStr = mchtBusDayStr+'五,'
                } else if(weekArr[i] === '6'){
                    mchtBusDayStr = mchtBusDayStr+'六,'
                } else if(weekArr[i] === '7'){
                    mchtBusDayStr = mchtBusDayStr+'日,'
                }  
            }
            var mchtFacilArr = response.mcht.mchtFacil.split("")//服务设施
            let facilArr = []
            if(mchtFacilArr[0] === '1'){
                facilArr.push({ title: 'WIFI', image: require('../../images/mchtInfo/facilities_WiFi.png') })
            }
            if(mchtFacilArr[1] === '1'){
                facilArr.push({ title: '可停车', image: require('../../images/mchtInfo/facilities_park.png') })
            }
            if(mchtFacilArr[2] === '1'){
                facilArr.push({ title: '刷卡', image: require('../../images/mchtInfo/facilities_shuaka.png') })
            }
            if(mchtFacilArr[3] === '1'){
                facilArr.push({ title: '卡座', image: require('../../images/mchtInfo/facilities_kazuo.png') })
            }
            if(mchtFacilArr[4] === '1'){
                facilArr.push({ title: '包间', image: require('../../images/mchtInfo/facilities_baojian.png') })
            }
            if(mchtFacilArr[5] === '1'){
                facilArr.push({ title: '宝宝椅', image: require('../../images/mchtInfo/facilities_baobaoyi.png') })
            }
            if(mchtFacilArr[6] === '1'){
                facilArr.push({ title: '无烟区', image: require('../../images/mchtInfo/facilities_nosmoking.png') })
            }
            if(mchtFacilArr[7] === '1'){
                facilArr.push({ title: '吸烟区', image: require('../../images/mchtInfo/facilities_smoking.png') })
            }
            if(mchtFacilArr[8] === '1'){
                facilArr.push({ title: '沙发位', image: require('../../images/mchtInfo/facilities_safa.png') })
            }
            if(mchtFacilArr[9] === '1'){
                facilArr.push({ title: '露天位', image: require('../../images/mchtInfo/facilities_loutian.png') })
            }
            if(mchtFacilArr[10] === '1'){
                facilArr.push({ title: '表演', image: require('../../images/mchtInfo/facilities_yanchu.png') })
            }
            if(mchtFacilArr[11] === '1'){
                facilArr.push({ title: '景观位', image: require('../../images/mchtInfo/facilities_jingguan.png') })
            }

           

            this.setState({
                mcht:response.mcht,
                currentScore:response.mcht.mchtComNum,
                weekStr:mchtBusDayStr+'\n'+response.mcht.mchtBusTime+'  '+response.mcht.mchtBusTime2,
                FacilArr:facilArr,
                couponList:response.couponList,
            })
            
        })

    }


    render() {

        if (this.state.isShow) {
            return (
                <ScrollView style={styles.container}>

                    <Swiper autoplay={true} height={H} showsPagination={true} dotColor="white"
                        activeDotColor='yellow' horizontal={true} >
                        {
                            this.state.items.map((item, index) => {
                                console.log(item, index)
                                //cover: 等比例放大   center:不变   contain:不变   stretch:填充  
                                return (<Image style={{ height: H - 20, width: DeviceInfo.width - 20, marginLeft: 10, marginTop: 10, marginRight: 10 }} key={index} resizeMode='cover' source={{ uri: item }} />)
                            })
                        }
                    </Swiper>
                    <Text style = {styles.mchtText}>{this.state.mcht.mchtName}</Text>
                    <View style = {styles.starView}>
                    {this._renderBody()}
                    <Text style = {styles.mchtCommentNum}>{this.state.mcht.mchtComNum}条</Text>
                    </View>
                    <Text style = {styles.mchtCommentNum}>¥{this.state.mcht.mchtPer}/人   {this.state.mcht.mchtTypeValue?this.state.mcht.mchtTypeValue:''}</Text>
                    <View style = {styles.line1View}></View>
                    <View style = {styles.boxView}>
                    <Image style = {styles.iconView} source={require('../../images/mchtInfo/address_icon.png')}/>
                    <Text style = {styles.mchtAddressorPhone}>{this.state.mcht.mchtAddr}</Text>
                    </View>
                    <View style = {styles.line2View}></View>
                    <View style = {styles.boxView}>
                    <Image style = {styles.iconView} source={require('../../images/mchtInfo/phone_icon.png')}/>
                    <Text style = {styles.mchtAddressorPhone}>{this.state.mcht.mchtTel1}</Text>
                    </View>
                    <View style = {styles.line3View}></View>
                    <Text style = {{ height:40, width: DeviceInfo.width, marginLeft: 10,lineHeight:40,fontSize:17}} >电子优惠券信息</Text>

                    <View>{this.renderCell(this.state.couponList)}</View>
                    <Text style={{ height:30, width: DeviceInfo.width, marginLeft: 10,lineHeight:30}}>服务信息</Text>
                    <View style = {styles.boxView}>
                    <Image style = {{height:20,width:20,marginLeft:10,marginTop:12}} source={require('../../images/mchtInfo/mchttime_icon.png')}/>
                    <Text style = {styles.mchttime}>{this.state.weekStr}</Text>
                    </View>
                    <View style = {styles.line1View}></View>
                    <View style = {styles.boxView}>
                    <Image style = {{height:20,width:20,marginLeft:10,marginTop:12}} source={require('../../images/mchtInfo/mchtss_icon.png')}/>
                    <Text style = {styles.mchtAddressorPhone}>服务设施</Text>
                    </View>
                    {/* 设施布局 */}
                    <View style={styles.ssContainr}>{this.bottomView(this.state.FacilArr)}</View>
                    <View style = {styles.line1View}></View>
                    <View style = {styles.boxView}>
                    <Image style = {styles.iconView} source={require('../../images/mchtInfo/address_icon.png')}/>
                    <Text style = {styles.mchtAddressorPhone}>其他分店</Text>
                    </View>
                    <View style = {styles.line3View}></View>
                    <View style = {styles.boxView}>
                    <Text style = {styles.mchtAddressorPhone}>查看关于商家的评论</Text>
                    </View>
                    <View style = {styles.line3View}></View>
                    
                </ScrollView>
            )  
        } else {

            return (
                <ScrollView style={styles.container}>
                    <View style={{ height: H, width: DeviceInfo.width, backgroundColor:  Theme.whiteColor}} />
                </ScrollView>
            )  
        }
    }

    renderCell(arr){
        //  定义数组装所有的子组件
       var cellBadge = []  
       for (var i = 0; i < arr.length;i++) {
           var item = arr[i]  
           cellBadge.push(
            <View style ={{borderBottomColor: Theme.whiteColor,borderBottomWidth:10}}>
            <ShowTicket couponInfo={item} key={i}/>
            </View>

           )  
       }
        return  cellBadge    
    }

    bottomView(arr) {
        // 定义数组装所有的子组件
        var allBadge = []  
        for (var i = 0 ;i < arr.length;i++) {
            // 取出每一个数据对象
            var badge = arr[i]  
            allBadge.push(
                <Item key={i}
                    title={badge.title}
                    image={badge.image}
                />
            )  
        }
        // 返回数组
        return allBadge  
    }




    _renderBody() {
        let images = []  
        for (var i = 1;i <= 5;i++) {
            let currentCount = i  
            images.push(
                <View key={"i" + i}>
                    <TouchableOpacity onPress={(i) => {this._score(this.props.mcht.mchtComNum)}}>
                        <Image source={require('../../images/mchtInfo/starnoselect_icon.png')} style={{width: 15, height: 15}}/>
                        {this._renderYellowStart(i)}
                    </TouchableOpacity>
                </View>
            )  
        }
        return images  
    }
 
    _renderYellowStart(count) {
        if (count <= this.state.currentScore) {
            return (
                <Image source={require('../../images/mchtInfo/starselect_icon.png')} style={{width: 15, height: 15, position: 'absolute'}}/>
            )  
        }
    }
 
    _score(i) {
        this.setState({
            currentScore: i
        })  
        this.props.selectIndex(i)  
    }
  

}

class Item extends Component {
    render() {
        return (
            
                <View style={styles.outViewStyle}>
                    <Image style={styles.iconStyle} source={this.props.image}></Image>
                    <Text style={styles.mainTitleStyle}>{this.props.title}</Text>
                </View>
           
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:  Theme.whiteColor,
    },
    mchtText: {
        height: 30,
        fontSize: 16,
        textAlign: 'left',
        lineHeight: 30,
        marginLeft: 10,
    },
    starView: {
        flexDirection: 'row', 
        width: DeviceInfo.width, 
        backgroundColor:  Theme.whiteColor,
        height: 20,
        marginLeft: 10,
    },
    mchtCommentNum: {
        height: 20,
        fontSize: 13,
        textAlign: 'left',
        lineHeight: 20,
        marginLeft: 10,
        color:'#A9A9A9'
    },
    boxView: {
        height: 44,
        backgroundColor:  Theme.whiteColorColor,
        flexDirection: 'row', 
        width: DeviceInfo.width, 
    },
    iconView: {
        width: 20,
        height: 26,
        alignItems: 'center',
        marginLeft: 10,
        marginTop:9,
    },

    mchtAddressorPhone: {
        height: 44,
        fontSize: 16,
        textAlign: 'left',
        lineHeight: 44,
        marginLeft: 10,
        color:'#A9A9A9'
    },
    mchttime: {
        height: 44,
        fontSize: 16,
        textAlign: 'left',
        lineHeight: 22,
        marginLeft: 10,
        color:'#A9A9A9'
    },
    line1View: {
        width: DeviceInfo.width-20,
        height: 2,
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        marginLeft: 10,
        marginRight:10,
        marginTop:8,
    },
    line2View: {
        width: DeviceInfo.width-20,
        height: 2,
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        marginLeft: 10,
        marginRight:10,
    },
    line3View: {
        width: DeviceInfo.width,
        height: 6,
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
    },
    ssContainr: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 30,
        marginRight:30,

    },
    
    topview: {
        width: DeviceInfo.width,
        height: 30,
        flexDirection: 'row',
        backgroundColor: '#FCF1BA',
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginLeft: 10,
        marginTop: 5,

    },
    tiptext: {
        height: 30,
        fontSize: 15,
        color: '#666666',
        textAlign: 'left',
        lineHeight: 30,
        marginLeft: 10,
    },
    inputview: {
        width: DeviceInfo.width,
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
   
  
    lefttext: {
        marginLeft: 16,
        height: 45,
        fontSize: 17,
        color:  Theme.blackColor,
        textAlign: 'left',
        lineHeight: 45,
    },
    txtInput: {
        flex: 1,
        marginLeft: 10,
        right: 16,
        width: DeviceInfo.width / 2,
        height: 45,
        fontSize: 17,
        textAlign: 'right',
        lineHeight: 45,
    },
    suretext: {
        color: 'white',
        marginLeft: 20,
        marginTop: 40,
        width: DeviceInfo.width - 40,
        height: 45,
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 45,
        backgroundColor: '#27AD46',
        borderRadius: ScaleSize(5),
    },
    outViewStyle: {
        alignItems: 'center',
        width: boxW,
        height: boxW,
        marginLeft: vMargin,
        marginTop: hMargin
    },
    iconStyle: {
        width: 30,
        height: 30,
        marginBottom: 5
    },
    mainTitleStyle: {
        fontSize: 12,
    },

})  

