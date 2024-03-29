import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default () => {
    return (
        <View style={styles.loadingContainer}>
            <Text style={styles.paragraph}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
