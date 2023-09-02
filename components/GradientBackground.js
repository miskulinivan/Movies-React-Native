import React, { useState } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientBackground({
    useGradient,
    children,
    style,
    linearGradientStyle,
    focused,
}) {
    if (useGradient) {
        return (
            <View style={style}>
                <LinearGradient
                    colors={
                        focused
                            ? ['rgb(189, 69, 65)', 'rgba(255, 93, 30, 1)']
                            : ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)'] // Transparent color
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1, ...linearGradientStyle }}
                >
                    {children}
                </LinearGradient>
            </View>
        );
    } else {
        return <View style={{ flex: 1, ...linearGradientStyle }}>{children}</View>;
    }
}
