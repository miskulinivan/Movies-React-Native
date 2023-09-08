import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import MediaScreen from '../screens/MediaScreen';
import CastMemberScreen from '../screens/CastMemberScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='Media'
                    component={MediaScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='CastMember'
                    component={CastMemberScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='Search'
                    component={SearchScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
