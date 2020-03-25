import React, { Component } from 'react';
import { View, TextInput, StyleSheet, ImageBackground, Image, TouchableHighlight, Text, Modal } from 'react-native';
import ValidationComponent from 'react-native-form-validator';

export default class PostChit extends ValidationComponent {
    state = {
        chit_content: '',
        modalVisible: false,
    };

    Post() {

        fetch("http://10.0.2.2:3333/api/v0.0.5/chits", {
            headers: {
                'Content-Type': 'application/json',
                "X-Authorization": "b9b8d5782d0fac23ff6b0ab483a11841"

            },
            method: 'POST',
            body: JSON.stringify({
                "chit_id": 11,
                "location": {
                    "latitude": 5.637376656633329,
                    "longitude": 5.962133916683182
                },
                "user": {
                    "user_id": 22,
                    "given_name": "hello",
                    "family_name": "you",
                    "email": "hello@j.co.uk"
                },
                "chit_content": this.state.chit_content,
                "timestamp": new Date().getMilliseconds()
            }),

        })
            .then(res => res.json())
            .then(res => {
                console.log("Response: ", res)

            })
            .catch(error => {
                console.warn("Error:", error)
                alert("Error: ", error)
            });

    };




    render() {
        return (
            <View style={styles.container}>

                <ImageBackground source={require('../assets/main.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={styles.logo}>


                        <View style={styles.inputContainer}>

                            <TextInput style={styles.inputs}
                                placeholder="Chit"
                                underlineColorAndroid='transparent'
                                onChangeText={(chit_content) => this.setState({ chit_content })} />
                        </View>
                        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => { this.Post() }}>
                            <Text style={styles.loginText}>Post Chit</Text>
                        </TouchableHighlight>
                        <Text>
                            {this.getErrorMessages()}
                        </Text>
                    </View>

                </ImageBackground>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputs: {
        height: 155,
        marginLeft: 7,
        borderBottomColor: '#ffff',
        color: 'white',
        fontSize: 25
    },
    logo: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',

        borderRadius: 50,
        borderBottomWidth: 2,
        width: 350,
        height: 45,

        flexDirection: 'row',
        alignItems: 'center'
    },


    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#9400D3",
    },

    loginText: {
        color: 'white',
    },
    modal: {
        position: "relative",
        width: 250,
        height: 100,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignSelf: 'center',
    }
}); 
