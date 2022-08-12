import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
import Colors from '../Constants/Colors';
const NumberContainer = props =>{
    return(
    <View style = {styles.Container}>
        <Text style = {styles.number}>{props.children}</Text>
    </View>
    );
};

const styles  = StyleSheet.create({
    Container:{
        borderWidth:3,
        borderRadius:10,
        padding:5,
        marginVertical:10,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'white'

    },
    number:
    {
        color:'#46D0EA',
        fontSize:22
    }

})

export default NumberContainer;