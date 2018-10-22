/**
 * 自定义打二维码包组件
 */
'use strict'
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Modal,
    TouchableOpacity
} from 'react-native';

export default class DefaultModal extends Component {


    constructor(props) {
        super(props)
         //通过这句代码屏蔽 YellowBox
    }
    render() {
        return (
            <Modal
                visible={this.props.visibility}
                transparent={true}
                animationType={'slide'}//none slide fade
                onRequestClose={() => this.setState({ visibility: false })}
                bottomMenuHeight={this.props.bottomMenuHeight}
            >
                {/*绘制view*/}
               
                    <TouchableOpacity style={styles.container} onPress={this.props.DismissPress}>
                    
                        <View style={[styles.buttonsContainer, this.props.bottomMenuStyle]}>
                       
                            {this.props.renderBottomMenuView()}
                        </View>
                      
                       
                    </TouchableOpacity>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsContainer: {
        position: 'absolute',
        height: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
    }
})