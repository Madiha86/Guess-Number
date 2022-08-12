import React,{useState} from 'react';
import { Text,View, StyleSheet,Modal} from 'react-native';
import Colors from '../Constants/Colors';

const model = props =>{

        const [setAlert,setshowAlert] = useState(false);
<View style = {styles.screen}>
<Modal 
visible={setAlert}
transparent
onRequestClose = {() =>
   setshowAlert(false)
}
animationType='fade'
>
        <View style= {styles.warning_body}>
                <Text style={styles.text}>'Don\'t lie!', 'You know that this is wrong...'</Text>
        </View>

</Modal>
</View>
        

}

const styles = StyleSheet.create({
        screen:{
       flex:1,
       justifyContent:'center',
       alignItems:'center'
        },
        warning_body:{
                backgroundColor:Colors.accent,
                height:300,
                color:'white',
                width:300,
                borderWidth:1,
                borderColor:'white'

        }
});



export default model;