/**
 * Created by guangqiang on 2018/8/23.
 * HUD组件
 */ 
import React, {Component} from 'react'
import {View, StyleSheet, ActivityIndicator,Text, Dimensions} from 'react-native'
import RootSiblings from 'react-native-root-siblings'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height-88;

let sibling = undefined

const Loading = {
  // 不带遮罩的Loading
  show: () => {
    sibling = new RootSiblings(
      <View style={styles.container}>
        <View style={styles.backViewStyle}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.backText}>请稍后...</Text>
        </View>
      </View>
    )
  },

  // 带遮罩的Loading
  showMask:()=>{
    sibling = new RootSiblings(
      <View style={styles.maskStyle}>
        <View style={styles.backViewStyle}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </View>
    )
  },

  hidden: ()=> {
    if (sibling instanceof RootSiblings) {
      sibling.destroy()
    }
  }

}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      width: width,
      height: height,
      top:88,
      alignItems: 'center',
      justifyContent: 'center',
    },
    maskStyle: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent: 'center'
    },
    backText:{
      marginTop:10,
      color:'white',
      fontSize:14,
    },
    backViewStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      width: 110,
      height: 90,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    }
  }
)

export {Loading}