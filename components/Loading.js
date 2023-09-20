import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { colors } from '../theme';

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='white' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.backgroundPrimary,
    },
});
