import {View,Platform,StatusBar} from 'react-native';
import React from 'react'
export default function CustomStatusBar(props){
    if(Platform.OS=='ios'){
        return(
            <View style={{height:35,width:'100%',backgroundColor:props.color}}>

            </View>
        )
    }else{
        return(
        <StatusBar backgroundColor={props.color}/>
        )
    }
}