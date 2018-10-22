import React, { Component } from 'react'
import { View, StyleSheet, Text} from 'react-native'
import { Button } from 'react-native-elements'
import { BaseComponent } from '../../component/base/BaseComponent'
import { Theme, DeviceInfo, ScaleSize } from '../../utils/FileReference'
import { getTemplateData, getTemplateTitleData } from '../../utils/json/templateData'
import CardView from '../../component/coupon/CardView'
import Carousel from 'react-native-snap-carousel'
import { Actions } from 'react-native-router-flux'
import IndicatorView from '../../component/IndicatorView/IndicatorView'


export default class CouponTemplate extends BaseComponent {
    constructor(props) {
        super(props)

    }
    navigationBarProps() {
        return {
            title: '新增优惠券'
        }
    }
    _render() {
        return (
            <View style={styles.conatiner}>
                <View style={styles.carousel_conatiner}>
                    <Carousel
                        data={getTemplateTitleData()}
                        renderItem={this._renderItem}
                        sliderWidth={DeviceInfo.width}
                        itemWidth={300}
                        inactiveSlideScale={0.94}
                        inactiveSlideOpacity={0.7}
                        onSnapToItem={(index) => {
                            this.indicator.setCurrPage(index)
                        }}

                    />
                     <Text style={styles.flagTitle}>选择心意的优惠券方案，方便、快捷、有效建券</Text>
                     <IndicatorView ref={(ref)=>this.indicator=ref}
                          count={getTemplateTitleData().length}
                          position={this.currIndicator}
                          selectedColor='#83a391'
                          unselectColor='gray'
            />
                </View>
                <View style={{position:'absolute',bottom:0,width:DeviceInfo.width}}>
                <Button buttonStyle={styles.create_buttonStyle}
                    titleStyle={{ color: Theme.mainColor }}
                    title="新建优惠券"
                    onPress={() => { Actions.AddAndEditCoupon() }} />
                </View>
            </View>
        )
    }

    _renderItem({ item, index }) {
        return (<CardView data={item} />
        )
    }


}


/** 样式表 */
const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: '#232323',
    },
    carousel_conatiner: {
        paddingTop:20,
        paddingBottom:20
    },
    flagTitle:{
        marginBottom:10,
        marginTop:10,
        color:'#606165',
        textAlign:'center',
    },
    create_buttonStyle: {
        backgroundColor: '#404042',
        paddingTop: 5,
        paddingBottom: 5,
    }
})
