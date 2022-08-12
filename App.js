import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View ,SafeAreaView} from 'react-native';
import { useFonts } from 'expo-font';

import Header from './Components/Header';
import StartGameScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';
import GameOverScreen from './Screens/GameOverScreen';



export default function App() 

{
  const [userNumber, setUserNumber] = useState();
  const [GuessRounds, setGuessRounds] = useState(0);
 // const [dataLoaded, setdataLoaded] = useState(false);

  const [loaded] = useFonts({
    bold :require('./assets/fonts/Bold.ttf')
  });
  
  if (!loaded) {
    return null;
  }
  

  //if (!dataLoaded) {
  //  return (
  //    <AppLoading 
   //   startAsync={fetchFonts}
   //     onFinish={() => setdataLoaded(true)}
   //    onError={(err) => console.log(err)}/>
  //  );
 // }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);

  };

  const GameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if (userNumber && GuessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={GameOverHandler} />
  }
  else if (GuessRounds > 0) {
    content = <GameOverScreen roundsNumber={GuessRounds} UserNumber={userNumber} onRestart={configureNewGameHandler} />;
  }

  return (
    <SafeAreaView style={styles.screen}>
        <Header title="Guess a Number"/>
      {content}
  
    </SafeAreaView>
  );

  }
const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
 
});
