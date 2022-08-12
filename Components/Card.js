import React from 'react';
import { View, StyleSheet} from 'react-native';
import Colors from '../Constants/Colors';


const Card = props => {
    return (
    <View style={{...styles.Card, ...props.style}}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    Card:{
    shadowColor:'black',
    shadowOffset:{width: 0, height: 2},
    shadowRadius: 8,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor:'white',
    borderWidth:3,
    borderColor:Colors.primary,
    padding: 10,
    borderRadius: 10
    }
});

export default Card;