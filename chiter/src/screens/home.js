import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet, Alert, TouchableHighlight, ScrollView } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";

export default class StudentData extends Component {
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
        const url = "http://10.0.2.2:3333/api/v0.0.5/chits";
        this.setState({ loading: true });

        return fetch(url, {
            headers: {
                'Content-Type': 'application/json',

            }
        })
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

    button() {
        alert("Assigned for post")
    }

    renderSeparator = () => {
        return (
            <View>

            </View>

        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };


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
                          
                                button onPress={() => { this.props.navigation.navigate("followings") }}
                                roundAvatar
                                title={`${item.user.given_name} ${item.user.family_name}`}
                                subtitle={item.chit_content}
                                leftAvatar={{ source:{ uri: "http://10.0.2.2:3333/api/v0.0.5/chits/${item.chits_id}/photo" }}}
                               
                               containerStyle={{ borderBottomWidth: 5 }}
                            />
                        )}
                        keyExtractor={item => item.email}

                        ListFooterComponent={this.renderFooter}
                        onRefresh={this.handleRefresh}
                        refreshing={this.state.refreshing}

                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.props.navigation.navigate("followers")}
                    >
                        <Text style={styles.loginText}>Followers</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.props.navigation.navigate("postChit")}
                    >
                        <Text style={styles.loginText}>Post Chit</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    loginText: {
        color: 'white',
    }
});

