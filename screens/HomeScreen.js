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
import MediaDisplay from '../components/MediaDisplay';
import person from '../assets/person.jpg';
import ahsoka from '../assets/ahsoka.png';
import lotr from '../assets/lotr.jpg';
export default function HomeScreen() {
    const { screenWidth } = useDimensions();
    const [categories, setCategories] = useState([
        'all',
        'movies',
        'series',
        'test',
        'jabuka',
        'aaaaaaaaa',
    ]);
    const allData = [
        { id: 1, title: 'Person', imageUri: person, category: 'movies' },
        { id: 2, title: 'Ahsoka', imageUri: ahsoka, category: 'series' },
        { id: 3, title: 'Lord of the rings', imageUri: lotr, category: 'movies' },
    ];
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredData, setFilteredData] = useState([]);

    const setCategoryFocused = (index) => {
        setFocusedIndex(index);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === 'all') {
            setFilteredData(allData);
        } else {
            const filteredItems = allData.filter((item) => item.category === category);
            setFilteredData(filteredItems);
        }
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
                                <TouchableOpacity
                                    onPress={() => {
                                        handleCategoryChange(category);
                                        setCategoryFocused(index);
                                    }}
                                >
                                    <Text style={styles.categoryText}>{category}</Text>
                                </TouchableOpacity>
                            </GradientBackground>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <ScrollView>
                <MediaDisplay useCarousel data={filteredData} title='Trending' />
                <MediaDisplay data={filteredData} title='Popular' />
                <MediaDisplay data={filteredData} title='Upcoming' />
            </ScrollView>
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
        alignItems: 'center',
        padding: 16,
    },
    profilePicture: {
        borderRadius: 100,
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
        paddingVertical: 10,
        marginRight: 20,
        alignItems: 'center',
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
