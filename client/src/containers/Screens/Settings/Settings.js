import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
    Appbar,
    Divider,
    List,
    Avatar,
    withTheme,
    Button,
    Switch
} from "react-native-paper";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { colors } = this.props.theme;

        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => this.props.navigation.goBack()}
                    />

                    <Appbar.Content title="Settings" />
                </Appbar.Header>
                <View style={styles.profileArea}>
                    <Avatar.Image
                        size={128}
                        source={require("../../../../assets/avatar.jpg")}
                        resizeMode="contain"
                    />
                    <Button
                        onPress={() =>
                            this.props.navigation.navigate("Profile")
                        }
                    >
                        View Profile
                    </Button>
                </View>
                <View style={styles.settingContainer}>
                    <List.Item
                        title="Dark Mode"
                        left={props => (
                            <List.Icon {...props} icon="box-shadow" />
                        )}
                        right={props => (
                            <Switch
                                value={this.props.isDark}
                                onValueChange={() =>
                                    this.props.changeTheme(this.props.isDark)
                                }
                            />
                        )}
                    />
                    <Divider />
                </View>
                <View style={styles.footer}>
                    <Button
                        icon="account"
                        mode="contained"
                        compact={true}
                        onPress={() => {
                            this.props.onLogout();
                        }}
                    >
                        Logout
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profileArea: {
        width: "100%",
        paddingVertical: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    settingContainer: {
        width: "100%",
        marginVertical: 20
    },
    footer: {
        justifyContent: "center",
        alignItems: "center"
    }
});
const mapStateToProps = state => {
    return {
        isDark: state.authReducer.isDarkTheme
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeTheme: isDark => dispatch(actions.changeTheme(isDark)),
        onLogout: () => dispatch(actions.logout())
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTheme(Settings));
