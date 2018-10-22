import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,

} from 'react-native';
import { ScaleSize, ScaleText } from '../../utils/Fit';

export default class LeftRightLabel extends Component {

    constructor(props) {
        super(props)

    }
    render() {
        return (
            <View style={styles.itemView}>
                <Text style={styles.itemleftText}>{this.props.leftname}</Text>
                <Text style={styles.itemrightText}>{this.props.rightValue}</Text>
            </View>)
    }
}
const styles = StyleSheet.create({
itemView: {
    flex: 1,
    flexDirection: 'row',
    height: ScaleSize(30),
    lineHeight: ScaleSize(30),
    backgroundColor: 'white',
},
itemleftText: {
    position: 'absolute',
    left: 0,
    fontSize: ScaleText(15),
    height: ScaleSize(30),
    lineHeight: ScaleSize(30),
    textAlign: 'left',
    color: 'rgb(83, 83, 83)',
},
itemrightText: {
    position: 'absolute',
    right: 0,
    fontSize: ScaleText(15),
    height: ScaleSize(30),
    lineHeight: ScaleSize(30),
    textAlign: 'right',
    color: 'rgb(83, 83, 83)',

}

})