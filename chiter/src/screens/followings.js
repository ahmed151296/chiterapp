import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Button, ScrollView,StyleSheet, Alert, TouchableHighlight } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";

export default class Following extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    }

    componentDidMount() {
        this.makeRequest();
    }

    makeRequest = () => {
        const { page, seed } = this.state;
        const url = `http://10.0.2.2:3333/api/v0.0.5/user/25/following`;
        this.setState({ loading: true });

      return  fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log("Response: ", res)
                this.setState({
                    data: res,
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                console.warn("Error:", error)
                this.setState({ error, loading: false });
            });
    };

    Refresh = () => {
        this.setState(
            {
                page: 1,
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                this.makeRequest();
            }
        );
    };

    LoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.makeRequest();
            }
        );
    };

    _alertIndex() {

        this.props.navigation.navigate('Nr');

    }
    handlebtn() {
        alert("Assigned for post")
    }

    renderSeparator = () => {
        return (
            <View

            >

            </View>

        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    follow = () => {
        fetch("http://10.0.2.2:3333/api/v0.0.5/user/21/follow", {
            headers: {
                'Content-Type': 'application/json',
                "X-Authorization": "b9b8d5782d0fac23ff6b0ab483a11841"

            },
            method: 'POST',
            body: JSON.stringify({
                "id": 1,
            }),

        })
            .then(() => alert("Following"))
            .catch(error => {
                fetch("http://10.0.2.2:3333/api/v0.0.5/user/21/follow", {
            headers: {
                'Content-Type': 'application/json',
                "X-Authorization": "b9b8d5782d0fac23ff6b0ab483a11841"

            },
            method: 'DELETE',
            body: JSON.stringify({
                "id": 1,
            }),

        })
            .then()
            .catch(error => {
                console.warn("Error:", error)
                alert("Error: ", error)
            });

            });

    }

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View>
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    render() {
        return (
            <ScrollView>
                <View>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <ListItem
                                button onPress={() => { this._alertIndex() }}
                                roundAvatar
                                title={`${item.given_name} ${item.family_name}`}
                                subtitle={item.email}
                                containerStyle={{ borderBottomWidth: 0 }}
                            />
                        )}
                        keyExtractor={item => item.email}

                        ListFooterComponent={this.renderFooter}
                        onRefresh={this.handleRefresh}
                        refreshing={this.state.refreshing}

                    />
                </View>
                <View>
                    <Button style={styles.buttonContainer} title={"Follow"} onPress={() => this.follow()}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        width: 150,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#9400D3",
    },
    loginButtonx: {
        backgroundColor: "#FAF8F8",
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