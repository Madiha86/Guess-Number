import React,{useState,useEffect} from 'react';
import {Text, View, StyleSheet, Button, Image, ImageBackground, Dimensions,ScrollView} from 'react-native';
import Colors from '../Constants/Colors';
import BodyText from '../Components/BodyText';
import TitleText from '../Components/TitleText';
import MainButton from '../Components/mainButton';

const GameOverScreen = props =>{
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

  useEffect(()=>{
    const updatedLayout = ()=>{
        setAvailableDeviceWidth(Dimensions.get('window').width);
        setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change' , updatedLayout);
  
    return()=>{
         Dimensions.removeEventListener('change',updatedLayout);
    };
      });

useEffect(()=>{
    const updatedLayout = ()=>{
        setButtonWidth(Dimensions.get('window').width / 4);
      }
      Dimensions.addEventListener('change', updatedLayout);

      return() =>{
          Dimensions.removeEventListener('change' , updatedLayout)
      }

          });

  if (availableDeviceHeight < 500  && availableDeviceWidth > 300 ) {
    return(
      <ScrollView>
      <ImageBackground source={require('../assets/smoke.jpg')} style = {styles.screen}>
          <TitleText>The Game is Over!</TitleText>
  
          <View style = {styles.resultContainer}>
          <BodyText style = {styles.resultText}>Your Phone needed{' '}
              <Text style = {styles.highlight}> {props.roundsNumber}</Text> rounds 
              to guess the number{' '}
              <Text style = {styles.highlight}> {props.UserNumber}</Text></BodyText>
          </View>
     
          <View style = {styles.imageContainer}>
          <Image 
          fadeDuration={1000}
          source={require('../assets/over.jpg')}
        //  source={{uri: 'https://wallpapercave.com/wp/D3r6gVH.jpg'}}
          style={styles.image} 
          resizeMode="cover"/>
          </View>
  
        
          <MainButton onPress = {props.onRestart}> New Game</MainButton>
      </ImageBackground>
      </ScrollView>
      );
  };
  if(Dimensions.get('window').height < 400){
    return(
      <ImageBackground source={require('../assets/smoke.jpg')} style = {styles.screen}>
      <TitleText>The Game is Over!</TitleText>

      <View style = {styles.resultContainer}>
      <BodyText style = {styles.resultText}>Your Phone needed{' '}
          <Text style = {styles.highlight}> {props.roundsNumber}</Text> rounds 
          to guess the number{' '}
          <Text style = {styles.highlight}> {props.UserNumber}</Text></BodyText>
      </View>
 
      <View style = {styles.imageContainer}>
      <Image 
      fadeDuration={1000}
      source={require('../assets/over.jpg')}
    //  source={{uri: 'https://wallpapercave.com/wp/D3r6gVH.jpg'}}
      style={styles.image} 
      resizeMode="cover"/>
      </View>

    
      <MainButton onPress = {props.onRestart}> New Game</MainButton>
  </ImageBackground>

  );
};
    
    return(
  
    <ImageBackground source={require('../assets/smoke.jpg')} style = {styles.screen}>
        <TitleText>The Game is Over!</TitleText>

        <View style = {styles.resultContainer}>
        <BodyText style = {styles.resultText}>Your Phone needed{' '}
            <Text style = {styles.highlight}> {props.roundsNumber}</Text> rounds 
            to guess the number{' '}
            <Text style = {styles.highlight}> {props.UserNumber}</Text></BodyText>
        </View>
   
        <View style = {styles.imageContainer}>
        <Image 
        fadeDuration={1000}
        source={require('../assets/over.jpg')}
      //  source={{uri: 'https://wallpapercave.com/wp/D3r6gVH.jpg'}}
        style={styles.image} 
        resizeMode="cover"/>
        </View>

      
        <MainButton onPress = {props.onRestart}> New Game</MainButton>
    </ImageBackground>

    );
};


const styles =  StyleSheet.create({
 screen:{
     flex:1,
     justifyContent:'center',
     alignItems: 'center',
     paddingVertical:10 
 },
 imageContainer:{
   width:Dimensions.get('window').width * 0.7,
   height:Dimensions.get('window').width * 0.7,
   borderRadius:Dimensions.get('window').width * 0.7/ 2,
   borderWidth:3,
   borderColor:Colors.accent,
   overflow:'hidden',
   marginVertical:Dimensions.get('window').height /30
 },
 resultText:{
     textAlign:'center',
     fontSize:Dimensions.get('window').height < 400 ? 16 : 20,
     color:'black'
 },

 resultContainer:{
   marginHorizontal:30,
   marginVertical:Dimensions.get('window').height /60
  },
 image:{
      width:'100%',
      height:'100%'
 },
 highlight:{
     color:Colors.primary,

 }
});


export default GameOverScreen;