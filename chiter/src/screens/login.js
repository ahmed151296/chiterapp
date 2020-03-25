import React, { Component } from 'react';
import { View, TextInput, StyleSheet, ImageBackground, Image, TouchableHighlight, Text, Modal } from 'react-native';
import ValidationComponent from 'react-native-form-validator';

export default class Login extends ValidationComponent {
    state = {
        email: '',
        password: '',
        given_name: '',
        family_name: '',
        modalVisible: false,
    };
    getModal(visible) {
        this.setState({ modalVisible: visible });
    }
    Login() {
        this.validate({
            password: { minlength: 8, maxlength: 20, required: true },
            email: { email: true, required: true },
        });

        fetch("http://10.0.2.2:3333/api/v0.0.5/login", {
            headers: { 'Content-Type': 'application/json' },

            method: 'POST',
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password,
            })

        })
            .then(res => res.json())
            .then(res => {
                console.log("Response: ", res)
                this.getModal(false)
                this.props.navigation.navigate('home')
            })
            .catch(error => {
                console.warn("Error:", error)
                alert("Error: ", error)

            });

    };

    Loginx() {
        this.validate({
            password: { minlength: 8, maxlength: 20, required: true },
            email: { email: true, required: true },
        });


        console.log("PARAMS: ", JSON.stringify({
            "given_name": this.state.given_name,
            "family_name": this.state.family_name,
            "email": this.state.email,
            "password": this.state.password,
        }))

        fetch("http://10.0.2.2:3333/api/v0.0.5/user", {
            headers: { 'Content-Type': 'application/json' },

            method: 'POST',
            body: JSON.stringify({
                "given_name": this.state.given_name,
                "family_name": this.state.family_name,
                "email": this.state.email,
                "password": this.state.password,
            }),

        }).then(res => res.json())
            .then(res => {
                console.log("Response: ", res)
                this.getModal(false)

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
                                placeholder="Email"
                                keyboardType="email-address"
                                underlineColorAndroid='transparent'
                                onChangeText={(email) => this.setState({ email })} />
                        </View>
                        <View style={styles.inputContainerx}>

                            <TextInput style={styles.inputs}
                                placeholder="Password"
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                                onChangeText={(password) => this.setState({ password })} />
                        </View>
                        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => { this.Login() }}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableHighlight>
                        <Modal animationType={"slide"} transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={this.closeModal}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0.5,0,0.5,0.5)' }}>
                                <View>
                                    <Text style={{ fontWeight: "bold", fontSize: 35, color: 'black', textAlign: 'center' }} >Sign Up!</Text>
                                    <Text style={{ fontWeight: "bold", fontSize: 17, color: 'black' }} >Enter Email:</Text>
                                    <TextInput
                                        style={{ borderBottomColor: 'black', borderRadius: 50, borderBottomWidth: 2, width: 350, borderColor: 'black', padding: 5 }}
                                        underlineColorAndroid='transparent'
                                        keyboardType="email-address"
                                        placeholderTextColor="black"
                                        onChangeText={(email) => this.setState({ email })} />
                                    <Text style={{ fontWeight: "bold", fontSize: 17, color: 'black' }}>Enter Password:</Text>
                                    <TextInput
                                        style={{ borderBottomColor: 'black', borderRadius: 50, borderBottomWidth: 2, width: 350 }}
                                        secureTextEntry={true}
                                        underlineColorAndroid='transparent'
                                        onChangeText={(password) => this.setState({ password })} />
                                    <Text style={{ fontWeight: "bold", fontSize: 17, color: 'black' }} >Enter Given Name:</Text>
                                    <TextInput
                                        style={{ borderBottomColor: 'black', borderRadius: 50, borderBottomWidth: 2, width: 350, borderColor: 'black', padding: 5 }}
                                        underlineColorAndroid='transparent'
                                        keyboardType="email-address"
                                        placeholderTextColor="black"
                                        onChangeText={(given_name) => this.setState({ given_name })} />
                                    <Text style={{ fontWeight: "bold", fontSize: 17, color: 'black' }}>Enter Family Name:</Text>
                                    <TextInput
                                        style={{ borderBottomColor: 'black', borderRadius: 50, borderBottomWidth: 2, width: 350 }}
                                        secureTextEntry={true}
                                        underlineColorAndroid='transparent'
                                        onChangeText={(family_name) => this.setState({ family_name })} />

                                </View>
                                <TouchableHighlight style={[styles.buttonContainer, styles.loginButtonx]}
                                    onPress={() => { this.Loginx() }}>
                                    <Text style={{ fontWeight: "bold", borderRadius: 30, fontSize: 17, color: 'black' }}>Signup</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={[styles.buttonContainer, styles.loginButtonx]}
                                    onPress={() => { this.getModal(!this.state.modalVisible) }}>
                                    <Text style={{ fontWeight: "bold", borderRadius: 30, fontSize: 17, color: 'black' }}>Close</Text>
                                </TouchableHighlight>
                            </View>
                        </Modal>
                        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => { this.getModal(true) }}>

                            <Text style={styles.loginText}>SignUp</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('home')}>
                            <Text style={{ color: '#ffff', borderBottomColor: '#F5FCFF', borderRadius: 50, borderBottomWidth: 1 }}>Continue Without Login</Text>
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
    inputContainerx: {
        borderBottomColor: '#F5FCFF',

        borderRadius: 50,
        borderBottomWidth: 2,
        width: 350,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
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
    loginButtonx: {
        backgroundColor: "#FAF8F8",
    },
    loginText: {
        color: 'black',
    },
    modal: {
        position: "relative",
        width: 250,
        height: 100,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'white'
    }
});