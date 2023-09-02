import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { Entypo } from '@expo/vector-icons';
import useDimensions from '../hooks/useDimensions';
import { FontAwesome } from '@expo/vector-icons';
import GradientBackground from '../components/GradientBackground';
import MediaCarousel from '../components/MediaCarousel';

export default function HomeScreen() {
    const { screenWidth } = useDimensions();
    const [categories, setCategories] = useState([
        'all',
        'movies',
        'series',
        'test',
        'jabuka',
        'xdxxxxxxxxx',
    ]);
    const [focusedIndex, setFocusedIndex] = useState(null); // Initialize focusedIndex state

    const setCategoryFocused = (index) => {
        setFocusedIndex(index);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.menuContainer}>
                    <Entypo name='menu' size={20} color='white' />
                </View>
                <Text style={styles.textStyle}>Movies</Text>
                <View>
                    <Image
                        source={require('../assets/person.jpg')}
                        style={[
                            styles.profilePicture,
                            {
                                width: screenWidth * 0.15,
                                height: screenWidth * 0.15,
                            },
                        ]}
                    />
                </View>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder='Search movie, series...'
                    style={styles.inputStyle}
                    placeholderTextColor={colors.textSecondary}
                />

                <GradientBackground
                    useGradient={true}
                    linearGradientStyle={styles.search}
                    focused={true}
                >
                    <FontAwesome name='search' size={25} color='white' />
                </GradientBackground>
            </View>
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        marginTop: 20,
                        height: screenWidth * 0.17,
                    }}
                >
                    {categories.map((category, index) => (
                        <View key={index} style={styles.category}>
                            <GradientBackground
                                useGradient={true}
                                linearGradientStyle={styles.categoryBackground}
                                focused={focusedIndex === index}
                            >
                                <TouchableOpacity onPress={() => setCategoryFocused(index)}>
                                    <Text style={styles.categoryText}>{category}</Text>
                                </TouchableOpacity>
                            </GradientBackground>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <MediaCarousel useCarousel />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    headerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically in the center
        padding: 16, // Add padding to the left and right
    },
    profilePicture: {
        borderRadius: 100, // Make it circular
        borderWidth: 2,
        borderColor: colors.lightGray,
    },
    menuContainer: {
        borderWidth: 2,
        borderColor: colors.lightGray,
        borderRadius: 100,
        padding: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 10,
    },
    inputStyle: {
        backgroundColor: colors.searchBackground,
        padding: 10,
        borderRadius: 15,
        flex: 1,
        marginRight: 20,
    },
    search: {
        borderRadius: 15,
        padding: 10,
    },
    category: {
        paddingVertical: 10, // Adjust the vertical padding as needed
        marginRight: 20,
        alignItems: 'center', // Center content horizontally
    },
    categoryBackground: {
        borderRadius: 15,
        padding: 10,
    },
    categoryText: {
        color: 'white',
        fontSize: 15,
    },
});
