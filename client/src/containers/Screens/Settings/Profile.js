import React, { Component } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import {
    Appbar,
    Avatar,
    Divider,
    withTheme,
    List,
    Button
} from "react-native-paper";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

class Profile extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.onGetUser();
    }

    render() {
        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <Appbar.Content title="Profile" />
                </Appbar.Header>
                <Image
                    style={styles.avatar}
                    source={require("../../../../assets/avatar.jpg")}
                />
                <View style={styles.userDetails}>
                    <List.Item
                        title={this.props.name}
                        left={props => <List.Icon icon="account" />}
                    />
                    <Divider />
                    <List.Item
                        title={this.props.phone}
                        left={props => <List.Icon icon="phone" />}
                    />
                    <Divider />
                    <List.Item
                        title={this.props.email}
                        left={props => <List.Icon icon="email" />}
                    />
                    <Divider />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    avatar: {
        resizeMode: "cover",
        width: "100%",
        height: 300
    },
    userDetails: {
        marginVertical: 20
    }
});

const mapStateToProps = state => {
    return {
        name: state.authReducer.name,
        phone: state.authReducer.phone,
        email: state.authReducer.email
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetUser: () => dispatch(actions.getUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
