import React, { useState,useEffect } from 'react';
import {
    View, StyleSheet, Text, Button,
    TouchableWithoutFeedback, Keyboard,
    Alert, ImageBackground, Modal, Pressable,Dimensions,ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import Card from '../Components/Card';
import Input from '../Components/Input';
import NumberContainer from '../Components/NumberContainer';
import Colors from '../Constants/Colors';
import BodyText from '../Components/BodyText';
import TitleText from '../Components/TitleText';
import MainButton from '../Components/mainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState(' ');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [buttonWidth , setButtonWidth] = useState(Dimensions.get('window').width / 4);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)


    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
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
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            setShowWarning(true);
            return;
        }


        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <BodyText>You Selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME</MainButton>
            </Card>
    }
    if (availableDeviceHeight < 400  && availableDeviceWidth > 300 ) {
        return(
            <ScrollView>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30} >
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
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
                                    <View style={styles.warning_title}>
                                        <Text style={styles.text}>Invalid Number</Text>
                                    </View>
                                    <View style={styles.warning_body}>
                                        <Text style={styles.text1}>The Number Must be between 1 and 99</Text>
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
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input
                                style={styles.input}
                                blurONSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}>
                                    <Button title="Reset"
                                        onPress={resetInputHandler}
                                        color={Colors.accent} /></View>
                                <View style={{width: buttonWidth}}>
                                    <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
                            </View>
                        </Card>
                        {confirmedOutput}
        
                    </ImageBackground>
                </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                </ScrollView>
            );
        
        }; 
        
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
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
                            <View style={styles.warning_title}>
                                <Text style={styles.text}>Invalid Number</Text>
                            </View>
                            <View style={styles.warning_body}>
                                <Text style={styles.text1}>The Number Must be between 1 and 99</Text>
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
                <TitleText style={styles.title}>Start a New Game!</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>
                    <Input
                        style={styles.input}
                        blurONSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={{width: buttonWidth}}>
                            <Button title="Reset"
                                onPress={resetInputHandler}
                                color={Colors.accent} /></View>
                        <View style={{width: buttonWidth}}>
                            <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
                    </View>
                </Card>
                {confirmedOutput}

            </ImageBackground>
        </TouchableWithoutFeedback>
      
    );

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: "bold"
    },
    inputContainer: {
        width: '80%',
       maxWidth: '95%',
       minWidth:260,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // button: {
    //     //width: 90
    //    width: Dimensions.get('window').width / 4
    // },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
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
    warning_modal: {
        width: 300,
        height: 300,
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
    warning_title: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.accent,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    warning_body: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    warning_button: {
        backgroundColor: Colors.accent,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height:Dimensions.get('window') > 600 ? 50 : 40

    }

});

export default StartGameScreen
