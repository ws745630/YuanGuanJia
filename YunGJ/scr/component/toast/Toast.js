import React,{Component} from 'React'
import RootToast from 'react-native-root-toast'

export default class Toast extends Component
{
    static show(message){
       RootToast.show(message,{
           position:0,
           duration:1500,
       })
    }
}