import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import useDimensions from '../hooks/useDimensions';
import GradientBackground from '../components/GradientBackground';
import MediaDisplay from '../components/MediaDisplay';

import { categories, allData } from '../data/data';
import { useNavigation } from '@react-navigation/native';
import { fetchPopularMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api';

export default function HomeScreen() {
    const { width, height } = useDimensions();
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredData, setFilteredData] = useState([]);
    const navigation = useNavigation();
    const [upcoming, setUpcoming] = useState([]);
    const [popular, setPopular] = useState([]);
    const [trending, setTrending] = useState([]);

    const [seriesData, setSeriesData] = useState();
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

    useEffect(() => {
        getPopularMovies();
        getUpcomingMovies();
        getTrendingMovies();
    }, []);

    const getPopularMovies = async () => {
        const data = await fetchPopularMovies();

        setPopular(data);
    };
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();

        setUpcoming(data);
    };
    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();

        setTrending(data);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' />
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
                                width: width * 0.15,
                                height: height * 0.09,
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
                    onKeyPress={() => navigation.navigate('Search')}
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
                        height: width * 0.17,
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
                <MediaDisplay useCarousel data={trending} title='Trending' />
                <MediaDisplay data={popular} title='Popular' />
                <MediaDisplay data={upcoming} title='Upcoming' />
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
        borderColor: colors.grayPrimary,
    },
    menuContainer: {
        borderWidth: 2,
        borderColor: colors.grayPrimary,
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
