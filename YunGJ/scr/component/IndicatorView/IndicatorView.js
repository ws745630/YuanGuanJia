/*
 * 指示器 
 * Create 2018-09-14 
 * describe  
 */
import React,{Component}from 'react'
import PropTypes from 'prop-types'
import {
    View,
    StyleSheet
}from 'react-native';
import {DeviceInfo,ScaleSize,Theme} from '../../public/FileReference'
const INDICATOR_LEFT = 5;
const INDICATOR_WIDTH = 8;
export default class IndicatorView extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        position: PropTypes.number.isRequired,
        selectedColor:PropTypes.string,
        unselectColor:PropTypes.string,
        selectedStyle:PropTypes.string,
        unselectStyle:PropTypes.string
    }
    static defaultProps = {
        position: 0,
        unselectColor:'black',
        selectedColor:'red',
    }
    // 构造
    constructor(props) {
        super(props);
        this.currIndicator = this.props.position;
    }

    renderSecondView(index){
        let style = [this.props.unselectStyle?this.props.unselectStyle:styles.circle];
        if (index != 0) {
            style.push({marginLeft: ScaleSize(INDICATOR_LEFT)});
        }
        style.push({backgroundColor:this.props.unselectColor});
        return (
            <View
                key={index}
                style={style}
            />
        );
    }
    renderView(){
        let views=[];
        for (var index = 0; index< this.props.count; index++) {
            views.push(this.renderSecondView(index));
        }
        return views;
    }

    render() {
        let self = this;
        let translateX = self._computeOffset();
        return (
            <View style={styles.indicatorStyle}>
                {this.renderView()}
                <View ref={(ref)=>this.indicatorBall=ref}
                    style={[
                        this.props.selectedStyle?this.props.selectedStyle:styles.circleIndicator,
                        {
                            transform:[{translateX:-translateX}],
                            backgroundColor: this.props.selectedColor
                        }
                    ]}
                />
            </View>
        );
    }

    setCurrPage(nextPage) {
        this.currIndicator = nextPage;
        let translateX = this._computeOffset();
        if (this.indicatorBall != null) {
            this.indicatorBall.setNativeProps({
                style: {
                    transform: [
                        {
                            translateX: -translateX
                        }
                    ]
                }
            });
        }
    }
    _computeOffset() {
        let count = this.props.count;
        let translateX = (count - this.currIndicator) * ScaleSize(INDICATOR_WIDTH) + (count - this.currIndicator - 1) * ScaleSize(INDICATOR_LEFT);
        return translateX;
    }
}
const styles = StyleSheet.create({
    indicatorStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: ScaleSize(5),
    },
    circle: {
        width: ScaleSize(INDICATOR_WIDTH),
        height: ScaleSize(INDICATOR_WIDTH),
        borderRadius: ScaleSize(INDICATOR_WIDTH / 2),
        backgroundColor: 'gray'
    },
    circleIndicator: {
        width: ScaleSize(INDICATOR_WIDTH),
        height: ScaleSize(INDICATOR_WIDTH),
        borderRadius: ScaleSize(INDICATOR_WIDTH / 2),
        backgroundColor: 'red'
    },
})