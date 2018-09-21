import { Dimensions, Platform } from 'react-native';
import DeviceInfo from './DeviceInfo'

export default
    {
        // 主布局颜色
        contentColor:'#e5e5ea',

        whiteColor: 'white',

        blackColor: 'black',
        // 主题色
        mainColor: '#30ac4b',
        // 导航栏颜色
        navBarColor: '#232323',
        // 线颜色
        lineColor: '#E6E6E6',
        // 导航栏标题颜色
        navTitleColor:'white',
        /** space **/
        // 上边距
        marginTop: 10,
        // 左边距
        marginLeft: 10,
        // 下边距
        marginBotton: 10,
        // 右边距
        marginRight: 10,
        // 内边距
        padding: 10,
        // 导航的leftItem的左间距
        navMarginLeft: 15,
        // 导航的rightItem的右间距
        navMarginRight: 15,

        /** width **/
        // 导航栏左右按钮image宽度
        navImageWidth: 25,
        // 边框线宽度
        borderWidth: 1,
        // 分割线高度
        lineWidth: 0.8,

        /** height **/
        // 导航栏的高度
        navHeight: Platform.OS === 'ios' ? (DeviceInfo.isIphoneX ? 88 : 64) : 56,
        // 导航栏顶部的状态栏高度
        navStatusBarHeight: Platform.OS === 'ios' ? (DeviceInfo.isIphoneX ? 44 : 20) : 0,
        // 导航栏除掉状态栏的高度
        navContentHeight: Platform.OS === 'ios' ? 44 : 56,
        // tabBar的高度
        tabBarHeight: Platform.OS === 'ios' ? (DeviceInfo.isIphoneX ? 83 : 49) : 49,
        // 底部按钮高度
        bottonBtnHeight: 44,
        // 通用列表cell高度
        cellHeight: 44,
        // 导航栏左右按钮image高度
        navImageHeight: 25,

        /** font **/
        // 默认文字字体
        textFont: 14,
        // 默认按钮文字字体
        btnFont: 15,
        btnFontSmall: 13,
        // 导航title字体
        navTitleFont: 17,
        // tabBar文字字体
        barBarTitleFont: 12,
        // 占位符的默认字体大小
        placeholderFont: 13,
        // 导航左按钮的字体
        navRightTitleFont: 16,
        // 导航右按钮字体
        navLeftTitleFont: 16,

        /** opacity **/
        // mask
        modalOpacity: 0.3,
        // touchableOpacity
        taOpacity: 0.1,

        /** 定位 **/
        absolute: 'absolute',

        /** flex **/
        around: 'space-around',
        between: 'space-between',
        center: 'center',
        row: 'row',

    }
