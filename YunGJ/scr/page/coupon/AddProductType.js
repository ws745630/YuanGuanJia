import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import NetWorkTool from '../../public/network/NetWorkTool'
import {Theme,ScaleSize,ScaleText,Toast} from '../../public/FileReference'
import BusiInfo from '../../public/BusiInfo'

export default class AddProductType extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productName: '',
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.product}>
                    <Text style={styles.product_left}>商品类型名称</Text>
                    <TextInput style={styles.product_right}
                        placeholder='请输入商品类型名称'
                        onChangeText={(text) => {
                            this.setState({ productName: text })
                        }}>
                    </TextInput>
                </View>
                <TouchableOpacity style={styles.save_container} onPress={() => { this.saveBtnClick() }}>
                    <View style={styles.saveBtn}>
                        <Text style={styles.saveBtn_text}>保存</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    // 保存按钮
    saveBtnClick() {
        if (this.state.productName) {
            var name = this.state.productName;
            
            var params = {
                mchtId: BusiInfo.userInfo.usr.mchtId,
                typeName: name,
            }
            NetWorkTool.addProductType(params,(result)=>{
                Actions.pop();
            })
        } else {
            Toast.show('商品名称不能为空')
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    product: {
        flexDirection: 'row',
        paddingTop: ScaleSize(15),
        paddingBottom: ScaleSize(15),
        marginTop: ScaleSize(10),
        backgroundColor: 'white'
    },
    product_left: {
        fontSize: ScaleText(18),
        paddingLeft: ScaleSize(10),
    },
    product_right: {
        flex: 1,
        fontSize: ScaleText(17),
        paddingRight: ScaleSize(20),
        textAlign: 'right'
    },
    save_container: {
        position: 'absolute',
        left: ScaleSize(19),
        right: ScaleSize(10),
        bottom: ScaleSize(20),
    },
    saveBtn: {
        flex: 1,
        height: ScaleSize(44),
        borderRadius: ScaleSize(5),
        backgroundColor: Theme.mainColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveBtn_text: {
        fontSize: ScaleText(17),
        color: 'white'
    }


})