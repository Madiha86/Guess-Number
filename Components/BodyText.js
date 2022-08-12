import React from 'react';
import { Text,StyleSheet} from 'react-native';
import Colors from '../Constants/Colors';

const BodyText = props =>
 <Text style= {{...styles.body, ...props.style}}>{props.children}</Text>;

const styles = StyleSheet.create({
        body:{
  //    fontFamily:'bold',
      color:'black',
     // marginTop:25,
      fontFamily:'bold',
      backgroundColor:'white',
      padding:10,
      
    //  borderWidth:3,
    //  borderColor:Colors.accent

        }
});


export default BodyText;