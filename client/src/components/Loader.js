import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

class Loader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Loader;
