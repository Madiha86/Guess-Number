import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, StyleSheet, Button, Alert,
    ImageBackground, Modal, Pressable, ScrollView, FlatList, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import mainButton from '../Components/mainButton';
import NumberContainer from '../Components/NumberContainer';
import Card from '../Components/Card';
import Defaultstyles from '../Constants/default-styles';
import Colors from '../Constants/Colors';
import MainButton from '../Components/mainButton';
import BodyText from '../Components/BodyText';
import * as ScreenOrientation from 'expo-screen-orientation';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listitem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);
const GameScreen = props => {
  //  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
 // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

        const initialGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [showWarning, setShowWarning] = useState(false);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

    const { userChoice, onGameOver } = props;

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

    useEffect(() => {
        if (userChoice === currentGuess) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);


    const nextGuessHandler = direction => {

        if (
            (direction === 'lower' && currentGuess < props.userChoice) || (direction === 'higher' && currentGuess > props.userChoice)) {

            setShowWarning(true);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(rounds+1);
        setPastGuesses([nextNumber.toString(), ...pastGuesses]);
    };

    if (availableDeviceHeight < 500) {
        return (<ImageBackground source={require('../assets/smoke.jpg')} style={styles.screen}>
            <Modal
                visible={showWarning}
                transparent
                onRequestClose={() =>
                    setShowWarning(false)
                }
                animationType='fade'

            >
                <View style={styles.center_view}>
                    <View style={styles.warning_modal}>

                        <View style={styles.warning_body}>
                            <Text style={styles.text1}>Don't lie!, You know that this is wrong...</Text>
                        </View>
                        <Pressable onPress={() => setShowWarning(false)}
                            style={styles.warning_button}
                            android_ripple={{ color: '#fff' }}
                        >
                            <Text style={styles.text}>Ok</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Text style={Defaultstyles.title}>Opponent's Guess</Text>
            <View style={styles.control}>
            <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                <Ionicons name='md-remove' size={24} color='white' />
            </MainButton>
            <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
             <Ionicons name='md-add' size={24} color='white' />
            </MainButton>
</View>
            <View style={styles.listContainer}>
                {/*<ScrollView contentContainerStyle = {styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess,pastGuesses.length-index))}
        </ScrollView>*/}
                <FlatList keyExtractor={(item) => (item)} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list} />

            </View>
        </ImageBackground>
        );
    }
    return (

        <ImageBackground source={require('../assets/smoke.jpg')} style={styles.screen}>
            <Modal
                visible={showWarning}
                transparent
                onRequestClose={() =>
                    setShowWarning(false)
                }
                animationType='fade'

            >
                <View style={styles.center_view}>
                    <View style={styles.warning_modal}>

                        <View style={styles.warning_body}>
                            <Text style={styles.text1}>Don't lie!, You know that this is wrong...</Text>
                        </View>
                        <Pressable onPress={() => setShowWarning(false)}
                            style={styles.warning_button}
                            android_ripple={{ color: '#fff' }}
                        >
                            <Text style={styles.text}>Ok</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Text style={Defaultstyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/*<ScrollView contentContainerStyle = {styles.list}>
              {pastGuesses.map((guess, index) => renderListItem(guess,pastGuesses.length-index))}
            </ScrollView>*/}
                <FlatList keyExtractor={(item) => (item)} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list} />

            </View>
        </ImageBackground>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 7,
        width: 300,
        maxWidth: '80%'
    },
    text: {
        color: 'white',
        fontSize: 20,
        margin: 10,
        textAlign: 'center'
    },
    text1: {
        color: Colors.accent,
        fontSize: 20,
        margin: 10,
        textAlign: 'center'
    },

    control:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:'80%'
    },
    warning_modal: {
        width: Dimensions.get('window').width > 350 ? 300 : 250,
        height: Dimensions.get('window').width > 350 ? 250 : 210,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Colors.accent,
        borderRadius: 20
    },
    center_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    warning_body: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.accent,
        borderWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    warning_button: {
        backgroundColor: Colors.accent,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 50

    },
    listContainer: {
        width: Dimensions.get('window') > 350 ? '60%' : '65%',
        flex: 1
    },
    list: {
        // alignItems:'center',
        justifyContent: 'flex-end',
        flexGrow: 1

    },
    listitem: {
        borderColor: Colors.accent,
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default GameScreen;
